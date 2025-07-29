const User = require("../models/User");
const UserQuest = require("../models/UserQuest");
const UserPreference = require("../models/UserPreference");
const Pets = require("../models/Pets");
const { Op } = require('sequelize');

const getHabitRadarData = async (req, res) => {
    try {
            const userId = req.user.id;
            
            // Get user data
            const user = await User.findByPk(userId);
            const userPreference = await UserPreference.findByPk(userId);
            const pet = await Pets.findOne({ where: { user_id: userId } });
            
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            // Calculate date ranges
            const now = new Date();
            const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
            const sevenDaysAgo = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000));

            // Get comprehensive quest data
            const allQuests = await UserQuest.findAll({
                where: {
                    user_id: userId,
                    instance_date: {
                        [Op.gte]: thirtyDaysAgo
                    }
                },
                order: [['instance_date', 'DESC'], ['createdAt', 'ASC']]
            });

            // Calculate patterns and predictions
            const patterns = await calculateUserPatterns(allQuests, now);
            const predictions = await generatePredictions(patterns, userPreference);
            const recommendations = await generateRecommendations(patterns, userPreference);
            const petInsights = await generatePetInsights(patterns, pet, user);

            res.status(200).json({
                user: {
                    name: user.name || "User",
                    currentStreak: user.streak_count || 0,
                    level: pet?.level || 1,
                    totalXp: pet?.total_xp || 0
                },
                patterns,
                predictions,
                recommendations,
                petInsights
            });

        } catch (err) {
            console.error("Error in getHabitRadarData:", err);
            res.status(500).json({ error: err.message });
        }
};

async function calculateUserPatterns(allQuests, now) {
    // Weekly success pattern
    const weeklyPattern = Array(7).fill(0).map(() => ({ completed: 0, total: 0 }));
    
    // Daily completion rates
    const dailyStats = {};
    
    // Quest type performance
    const questTypeStats = {
        daily: { completed: 0, total: 0 },
        bonus: { completed: 0, total: 0 }
    };

    // Category performance
    const categoryStats = {};
    
    // Time-based patterns
    const hourlyCompletions = Array(24).fill(0);
    
    // Streak analysis
    let currentStreak = 0;
    let longestStreak = 0;
    let streakBreaks = [];
    
    // Process each quest
    allQuests.forEach(quest => {
        const questDate = new Date(quest.instance_date);
        const dayOfWeek = questDate.getDay(); // 0 = Sunday, 1 = Monday, etc.
        const dateKey = questDate.toISOString().split('T')[0];
        
        // Weekly pattern
        weeklyPattern[dayOfWeek].total++;
        if (quest.status === 'Completed') {
            weeklyPattern[dayOfWeek].completed++;
            
            // Time analysis
            if (quest.completed_at) {
                const completedHour = new Date(quest.completed_at).getHours();
                hourlyCompletions[completedHour]++;
            }
        }
        
        // Daily stats
        if (!dailyStats[dateKey]) {
            dailyStats[dateKey] = { completed: 0, total: 0 };
        }
        dailyStats[dateKey].total++;
        if (quest.status === 'Completed') {
            dailyStats[dateKey].completed++;
        }
        
        // Quest type stats
        if (questTypeStats[quest.type]) {
            questTypeStats[quest.type].total++;
            if (quest.status === 'Completed') {
                questTypeStats[quest.type].completed++;
            }
        }
        
        // Category analysis (extract from quest text)
        const category = extractQuestCategory(quest.quest_text);
        if (category) {
            if (!categoryStats[category]) {
                categoryStats[category] = { completed: 0, total: 0 };
            }
            categoryStats[category].total++;
            if (quest.status === 'Completed') {
                categoryStats[category].completed++;
            }
        }
    });

    // Calculate success rates
    const weeklySuccessRates = weeklyPattern.map(day => 
        day.total > 0 ? Math.round((day.completed / day.total) * 100) : 0
    );
    
    // Find best and worst days
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let bestDay = { name: 'Monday', rate: 0 };
    let worstDay = { name: 'Monday', rate: 100 };
    
    weeklySuccessRates.forEach((rate, index) => {
        if (weeklyPattern[index].total >= 3) { // Only consider days with sufficient data
            if (rate > bestDay.rate) {
                bestDay = { name: dayNames[index], rate };
            }
            if (rate < worstDay.rate) {
                worstDay = { name: dayNames[index], rate };
            }
        }
    });
    
    // Find peak completion time
    const peakHour = hourlyCompletions.indexOf(Math.max(...hourlyCompletions));
    const peakTime = `${peakHour === 0 ? 12 : peakHour <= 12 ? peakHour : peakHour - 12}${peakHour < 12 ? ' AM' : ' PM'}`;
    
    // Calculate average quests per day
    const totalDays = Object.keys(dailyStats).length;
    const totalCompleted = Object.values(dailyStats).reduce((sum, day) => sum + day.completed, 0);
    const avgQuestsPerDay = totalDays > 0 ? (totalCompleted / totalDays).toFixed(1) : 0;
    
    // Recent trend (last 7 days vs previous 7 days)
    const sevenDaysAgo = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000));
    const fourteenDaysAgo = new Date(now.getTime() - (14 * 24 * 60 * 60 * 1000));
    
    const recentQuests = allQuests.filter(q => new Date(q.instance_date) >= sevenDaysAgo);
    const previousQuests = allQuests.filter(q => {
        const date = new Date(q.instance_date);
        return date >= fourteenDaysAgo && date < sevenDaysAgo;
    });
    
    const recentCompletionRate = recentQuests.length > 0 ? 
        (recentQuests.filter(q => q.status === 'Completed').length / recentQuests.length) * 100 : 0;
    const previousCompletionRate = previousQuests.length > 0 ? 
        (previousQuests.filter(q => q.status === 'Completed').length / previousQuests.length) * 100 : 0;
    
    const trend = recentCompletionRate - previousCompletionRate;

    return {
        weeklySuccessRates,
        bestDay,
        worstDay,
        peakTime,
        avgQuestsPerDay: parseFloat(avgQuestsPerDay),
        questTypeStats,
        categoryStats,
        dailyStats,
        trend: Math.round(trend),
        totalQuests: allQuests.length,
        completedQuests: allQuests.filter(q => q.status === 'Completed').length,
        overallSuccessRate: allQuests.length > 0 ? 
            Math.round((allQuests.filter(q => q.status === 'Completed').length / allQuests.length) * 100) : 0
    };
}

async function generatePredictions(patterns, userPreference) {
    const predictions = [];
    
    // Predict worst day failures
    if (patterns.worstDay.rate < 60 && patterns.worstDay.rate > 0) {
        predictions.push({
            type: "warning",
            probability: Math.round(100 - patterns.worstDay.rate),
            prediction: `Likely to struggle on ${patterns.worstDay.name}s`,
            reason: `Your ${patterns.worstDay.name} success rate is only ${patterns.worstDay.rate}%`,
            suggestion: `Try scheduling easier quests on ${patterns.worstDay.name}s or prep them the night before`,
            impact: `Could prevent streak breaks`,
            icon: "AlertTriangle"
        });
    }
    
    // Predict streak opportunities
    if (patterns.bestDay.rate > 80) {
        predictions.push({
            type: "opportunity",
            probability: patterns.bestDay.rate,
            prediction: `Strong performance expected on ${patterns.bestDay.name}s`,
            reason: `You have a ${patterns.bestDay.rate}% success rate on ${patterns.bestDay.name}s`,
            suggestion: `Use ${patterns.bestDay.name}s for challenging quest chains or bonus goals`,
            impact: `Perfect day to build momentum`,
            icon: "TrendingUp"
        });
    }
    
    // Predict based on recent trend
    if (patterns.trend < -15) {
        predictions.push({
            type: "warning",
            probability: 75,
            prediction: "Momentum is declining",
            reason: `Your completion rate dropped ${Math.abs(patterns.trend)}% this week`,
            suggestion: "Try easier quests for a few days to rebuild confidence",
            impact: "Early intervention can prevent habit breakdown",
            icon: "TrendingDown"
        });
    } else if (patterns.trend > 15) {
        predictions.push({
            type: "opportunity",
            probability: 80,
            prediction: "You're building strong momentum",
            reason: `Your completion rate improved ${patterns.trend}% this week`,
            suggestion: "Perfect time to tackle more challenging financial goals",
            impact: "Strike while motivation is high!",
            icon: "TrendingUp"
        });
    }
    
    // Category-specific predictions
    if (patterns.categoryStats.food && patterns.categoryStats.food.total >= 5) {
        const foodSuccessRate = Math.round((patterns.categoryStats.food.completed / patterns.categoryStats.food.total) * 100);
        if (foodSuccessRate < 50) {
            predictions.push({
                type: "pattern",
                probability: 70,
                prediction: "Food spending likely to be challenging",
                reason: `Only ${foodSuccessRate}% success rate on food-related quests`,
                suggestion: "Focus on meal prep and grocery budgeting first",
                impact: "Food habits impact 30-40% of discretionary spending",
                icon: "Brain"
            });
        }
    }
    
    return predictions;
}


module.exports = {
    getHabitRadarData
};
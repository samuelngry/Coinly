const { generateDynamicQuests } = require("../services/questGenerator");
const UserQuest = require("../models/UserQuest");
const Pets = require("../models/Pets");
const User = require("../models/User");
const DailyCompletion = require("../models/DailyCompletion");
const { Op } = require('sequelize');

const generateQuests = async (req, res) => {
    try {
        const userId = req.user.id;

        const quest = await generateDynamicQuests(userId);
        const pet = await Pets.findOne({ where: { user_id: userId } });

        const daily = quest.filter(q => q.type === 'daily');
        const bonus = quest.filter(q => q.type === 'bonus');

        const today = new Date();
        const lastFed = new Date(pet.last_fed);
        const diffDays = Math.floor((today - lastFed) / (1000 * 60 * 60 * 24));

        let recalculatedMood;
        if (diffDays === 0) recalculatedMood = "Happy";
        else if (diffDays === 1) recalculatedMood = "Neutral";
        else if (diffDays === 2) recalculatedMood = "Sad";
        else recalculatedMood = "Angry";

        if (recalculatedMood !== pet.mood) {
            await pet.update({ mood: recalculatedMood });
        }

        const latestCompletion = await UserQuest.findOne({
            where: {
                user_id: userId,
                status: 'Completed'
            },
            order: [['completed_at', 'DESC']]
        });

        res.status(200).json({ 
            message: "Daily and bonus quests generated successfully", 
            daily, 
            bonus,
            mood: recalculatedMood,
            last_completed_date: latestCompletion
                ? latestCompletion.completed_at.toISOString().slice(0, 10)
                : null
        });
    } catch (err) {
        console.error("Error in generateQuests:", err);
        res.status(500).json({ error: err.message });
    }
};
  
const completeQuests = async (req, res) => {
    try {
        const userId = req.user.id;
        const questId = parseInt(req.params.id);

        console.log("=== QUEST COMPLETION DEBUG ===");
        console.log("User ID:", userId);
        console.log("Quest ID:", questId);
        console.log("Current time:", new Date().toISOString());

        const existingQuest = await UserQuest.findOne({
            where: {
                id: questId,
                user_id: userId,
            }
        });

        console.log("Existing quest:", {
            id: existingQuest?.id,
            status: existingQuest?.status,
            completed_at: existingQuest?.completed_at,
            instance_date: existingQuest?.instance_date
        });

        if (!existingQuest) {
            return res.status(404).json({ error: 'Quest not found for this user.' });
        }

        if (existingQuest.status === 'Completed') {
            return res.status(400).json({ error: 'Quest already completed.' });
        }

        let completionTimestamp;
        
        if (existingQuest.completed_at) {
            completionTimestamp = existingQuest.completed_at;
            console.log("Preserving existing completion timestamp:", completionTimestamp.toISOString());
        } else {
            completionTimestamp = new Date();
            console.log("Setting new completion timestamp:", completionTimestamp.toISOString());
        }

        const [updatedRows] = await UserQuest.update(
            {
                status: 'Completed', 
                completed_at: completionTimestamp,
            },
            {
                where: {
                    id: questId,
                    user_id: userId,
                    status: 'Pending',
                },
            },
        );

        if (updatedRows === 0) {
            return res.status(404).json({ error: 'Quest not found or already completed.' });
        }

        // Use proper date handling for consistency
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const todayStr = today.toISOString().slice(0, 10);
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().slice(0, 10);

        // Create daily completion record
        try {
            await DailyCompletion.findOrCreate({
                where: {
                    user_id: userId,
                    date: todayStr,
                },
                defaults: {
                    user_id: userId,
                    date: todayStr,
                }
            });
        } catch (err) {
            console.error('DailyCompletion error:', err);
        }
        
        const user = await User.findOne({ where: { id: userId } });

        const todayStart = new Date(today);
        const todayEnd = new Date(today);
        todayEnd.setHours(23, 59, 59, 999);

        const questsCompletedToday = await UserQuest.count({
            where: {
                user_id: userId,
                status: 'Completed',
                completed_at: {
                    [Op.between]: [todayStart, todayEnd]
                },
            },
        });

        console.log("Quests completed today:", questsCompletedToday);

        let newStreak = user.streak_count;
        let newLongestStreak = user.longest_streak;

        if (questsCompletedToday === 1) {
            console.log("First quest of the day - updating streak");
            
            const yesterdayCompletion = await DailyCompletion.findOne({
                where: {
                    user_id: userId,
                    date: yesterdayStr
                }
            });

            const hasPreviousCompletions = await DailyCompletion.count({
                where: {
                    user_id: userId,
                    date: { [Op.lt]: todayStr }
                }
            });
            
            if (!hasPreviousCompletions) {
                newStreak = 1;
                console.log('First quest ever completed, streak started at 1');
            } else if (yesterdayCompletion) {
                newStreak = user.streak_count + 1;
                console.log('Streak continued, new count:', newStreak);
            } else {
                newStreak = 1;
                console.log('Streak broken, reset to 1');
            }

            if (newStreak > newLongestStreak) {
                newLongestStreak = newStreak;
                console.log('New longest streak achieved:', newLongestStreak);
            }

            // Update user's streak
            await user.update({ 
                streak_count: newStreak, 
                longest_streak: newLongestStreak
            });
        } else {
            console.log("Not first quest of day - streak unchanged");
        }

        const completedQuest = await UserQuest.findOne({
            where: { id: questId, user_id: userId }
        });

        const xpReward = completedQuest.xp || 0;

        const pet = await Pets.findOne({ where: { user_id: userId } });

        if(!pet) {
            return res.status(404).json({ error: 'Pet not found.' });
        }

        let levelUpXp = 100 + (pet.level - 1) * 50;
        let petXp = pet.xp + xpReward;
        let totalXp = (pet.total_xp || 0) + xpReward;
        let petLevel = pet.level;
        let leveledUp = false;

        while (petXp >= levelUpXp) {
            petLevel += 1;
            petXp -= levelUpXp;
            levelUpXp = 100 + (petLevel - 1) * 50;
            leveledUp = true;
        }

        const today_date = new Date();
        const petLastFed = new Date(pet.last_fed);
        const diffTime = today_date - petLastFed;
        const dayLastFed = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        let petMood = pet.mood;

        if (dayLastFed === 0) {
            petMood = 'Happy';
        } else if (dayLastFed === 1) {
            petMood = 'Neutral';
        } else if (dayLastFed === 2) {
            petMood = 'Sad';
        } else if (dayLastFed >= 3) {
            petMood = 'Angry';
        } 

        await pet.update({
            xp: petXp,
            level: petLevel,
            last_fed: new Date(),
            mood: petMood,
            total_xp: totalXp
        });

        const latestCompletion = await UserQuest.findOne({
            where: {
                user_id: userId,
                status: 'Completed'
            },
            order: [['completed_at', 'DESC']]
        });

        res.status(200).json({ 
            xp: petXp, 
            maxXp: levelUpXp, 
            level: petLevel, 
            mood: petMood, 
            streak: newStreak, 
            longestStreak: newLongestStreak, 
            last_completed_date: latestCompletion
                ? latestCompletion.completed_at.toISOString().slice(0, 10)
                : null,
            debug: {
                questsCompletedToday,
                completionTimestamp: completionTimestamp.toISOString(),
                wasPreserved: !!existingQuest.completed_at
            }
        });

    } catch (err) {
        console.error("Error in completeQuests:", err);
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    generateQuests,
    completeQuests,
};
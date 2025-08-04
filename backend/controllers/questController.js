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

        const daily = quest.filter(q => q.type === 'daily');
        const bonus = quest.filter(q => q.type === 'bonus');

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

        console.log("User ID:", userId);
        console.log("Quest ID:", questId);

        const existingQuest = await UserQuest.findOne({
            where: {
                id: questId,
                user_id: userId,
            }
        });

        console.log("Existing quest:", existingQuest);

        if (!existingQuest) {
            return res.status(404).json({ error: 'Quest not found for this user.' });
        }

        if (existingQuest.status === 'Completed') {
            return res.status(400).json({ error: 'Quest already completed.' });
        }

        const [updatedRows] = await UserQuest.update(
            {
                status: 'Completed', 
                completed_at: new Date(),
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

        const today = new Date().toISOString().slice(0, 10);

        try {
            await DailyCompletion.findOrCreate({
                where: {
                    user_id: userId,
                    date: today,
                },
                defaults: {
                    user_id: userId,
                    date: today,
                }
            });
        } catch (err) {
            console.error('DailyCompletion error:', err);
        }
        
        const user = await User.findOne({ where: { id: userId } });
        const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

        const questsCompletedToday = await UserQuest.count({
            where: {
                user_id: userId,
                status: 'Completed',
                completed_at: {
                    [Op.gte]: new Date(today + 'T00:00:00'),
                    [Op.lt]: new Date(today + 'T23:59:59')
                },
            },
        });

        let newStreak = user.streak_count;
        let newLongestStreak = user.longest_streak;

        if (questsCompletedToday === 1) {
            const hasPreviousCompletions = await DailyCompletion.count({
                where: {
                    user_id: userId,
                    date: { [Op.lt]: today }
                }
            });

            // Check if user has a completion record for yesterday
            const yesterdayCompletion = await DailyCompletion.findOne({
                where: {
                    user_id: userId,
                    date: yesterday
                }
            });
            
            if (yesterdayCompletion) {
                // User completed quests yesterday, increment streak
                newStreak = user.streak_count + 1;
                console.log('Streak continued, new count:', newStreak);
            } else if (!hasPreviousCompletions) {
                // First ever quest completion -> start streak to 1
                newStreak = 1;
                console.log('First quest completed, streak started');
            } else {
                newStreak = 1;
                console.log('Streak broken, reset to 1 (completed today)');
            }

            if (newStreak > newLongestStreak) {
                newLongestStreak = newStreak;
                console.log('New longest streak achieved:', newLongestStreak);
            }

            await user.update({ streak_count: newStreak, longest_streak: newLongestStreak});
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

        if (leveledUp) {
            petMood = 'Excited';
        } else if (dayLastFed === 0) {
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
            longestSreak: newLongestStreak,
            last_completed_date: latestCompletion
                ? latestCompletion.completed_at.toISOString().slice(0, 10)
                : null
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
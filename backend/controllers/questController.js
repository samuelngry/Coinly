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

        res.status(200).json({ message: "Daily and bonus quests generated successfully", daily, bonus });
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

        const completionTime = new Date();
        
        const now = new Date();
        const localDate = new Date(now.getTime() - (now.getTimezoneOffset() * 60000));
        const today = localDate.toISOString().slice(0, 10); // YYYY-MM-DD format
        
        console.log("Completion time:", completionTime.toISOString());
        console.log("Local today date:", today);

        // Update quest with completion
        const [updatedRows] = await UserQuest.update(
            {
                status: 'Completed', 
                completed_at: completionTime,
                instance_date: existingQuest.instance_date || today
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

        // Create/update daily completion record
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
            console.log("Daily completion record created/found for:", today);
        } catch (err) {
            console.error('DailyCompletion error:', err);
        }
        
        const user = await User.findOne({ where: { id: userId } });
        
        const yesterday = new Date(localDate);
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().slice(0, 10);
        
        console.log("Yesterday date:", yesterdayStr);

        const todayStart = new Date(today + 'T00:00:00.000Z');
        const todayEnd = new Date(today + 'T23:59:59.999Z');
        
        const timezoneOffset = now.getTimezoneOffset() * 60000;
        const localTodayStart = new Date(todayStart.getTime() - timezoneOffset);
        const localTodayEnd = new Date(todayEnd.getTime() - timezoneOffset);

        console.log("Counting quests between:", localTodayStart.toISOString(), "and", localTodayEnd.toISOString());

        const questsCompletedToday = await UserQuest.count({
            where: {
                user_id: userId,
                status: 'Completed',
                completed_at: {
                    [Op.gte]: localTodayStart,
                    [Op.lte]: localTodayEnd
                },
            },
        });

        console.log("Quests completed today:", questsCompletedToday);

        let newStreak = user.streak_count;

        // Only update streak on first quest completion of the day
        if (questsCompletedToday === 1) {
            const hasPreviousCompletions = await DailyCompletion.count({
                where: {
                    user_id: userId,
                    date: { [Op.lt]: today }
                }
            });

            console.log("Has previous completions:", hasPreviousCompletions);

            // Check if user has a completion record for yesterday
            const yesterdayCompletion = await DailyCompletion.findOne({
                where: {
                    user_id: userId,
                    date: yesterdayStr
                }
            });
            
            console.log("Yesterday completion found:", !!yesterdayCompletion);
            
            if (yesterdayCompletion) {
                // User completed quests yesterday, increment streak
                newStreak = user.streak_count + 1;
                console.log('Streak updated successfully from', user.streak_count, 'to', newStreak);
            } else if (!hasPreviousCompletions) {
                // First ever quest completion -> start streak to 1
                newStreak = 1;
                console.log('First quest completed, streak started');
            } else {
                // Had previous completions but not yesterday -> streak broken
                newStreak = 1;
                console.log('Streak broken, reset to 1');
            }

            await user.update({ streak_count: newStreak });
            console.log('User streak updated in database');
        }

        // Get the completed quest with updated data
        const completedQuest = await UserQuest.findOne({
            where: { id: questId, user_id: userId }
        });

        const xpReward = completedQuest.xp || 0;
        console.log("XP reward for this quest:", xpReward);

        const pet = await Pets.findOne({ where: { user_id: userId } });

        if(!pet) {
            return res.status(404).json({ error: 'Pet not found.' });
        }

        console.log("Pet before update:", { xp: pet.xp, level: pet.level, total_xp: pet.total_xp });

        let levelUpXp = 100 + (pet.level - 1) * 50;
        let petXp = pet.xp + xpReward;
        let totalXp = (pet.total_xp || 0) + xpReward;
        let petLevel = pet.level;
        let leveledUp = false;

        // Handle level ups
        while (petXp >= levelUpXp) {
            petLevel += 1;
            petXp -= levelUpXp;
            levelUpXp = 100 + (petLevel - 1) * 50;
            leveledUp = true;
        }

        console.log("Pet after calculation:", { xp: petXp, level: petLevel, total_xp: totalXp, leveledUp });

        const petLastFed = new Date(pet.last_fed);
        const diffTime = completionTime - petLastFed;
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

        console.log("Pet mood calculation:", { dayLastFed, oldMood: pet.mood, newMood: petMood });

        await pet.update({
            xp: petXp,
            level: petLevel,
            last_fed: completionTime, 
            mood: petMood,
            total_xp: totalXp
        });

        console.log("Quest completion successful!");

        res.status(200).json({ 
            xp: petXp, 
            maxXp: levelUpXp, 
            level: petLevel, 
            mood: petMood, 
            streak: newStreak,
            debug: {
                questsCompletedToday,
                completionTime: completionTime.toISOString(),
                localDate: today,
                xpReward
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
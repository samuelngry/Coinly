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

        res.status(200).json({ message: "Daily and bonus quesets generated successfully", daily, bonus });
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

        // Add this: Check if quest exists before updating
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

        const todayCompletion = new Date().toISOString().slice(0, 10);

        await DailyCompletion.findOrCreate({
            where: {
                user_id: userId,
                date: todayCompletion,
            },
            defaults: {
                user_id: userId,
                date: todayCompletion,
            }
        });

        const user = await User.findOne({ where: { id: userId } });
        let newStreak = 1;

        const now = new Date();
        now.setHours(0, 0, 0, 0);

        const yesterday = new Date(now);
        yesterday.setDate(now.getDate() - 1);

        const questsYesterday = await UserQuest.findAll({
        where: {
            user_id: userId,
            status: 'Completed',
            completed_at: {
            [Op.gte]: yesterday,
            [Op.lt]: now,
            },
        },
        });

        if (questsYesterday.length > 0) {
        newStreak = user.streak_count + 1;
        } else if (user.streak_count > 0) {
        newStreak = user.streak_count; // don't change if already updated today
        } else {
        newStreak = 1;
        }

        await user.update({ streak_count: newStreak });

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
        let petLevel = pet.level;
        let leveledUp = false;

        while (petXp >= levelUpXp) {
            petLevel += 1;
            petXp -= levelUpXp;
            levelUpXp = 100 + (petLevel - 1) * 50;
            leveledUp = true;
        }

        const today = new Date();
        const petLastFed = new Date(pet.last_fed);
        const diffTime = today - petLastFed;
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
        });

        res.status(200).json({ xp: petXp, level: petLevel, mood: petMood, streak: newStreak });
    } catch (err) {
        console.error("Error in completeQuests:", err);
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    generateQuests,
    completeQuests,
};
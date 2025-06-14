const { generateDynamicQuests } = require("../services/questGenerator");
const UserQuest = require("../models/UserQuest");
const Pets = require("../models/Pets");
const User = require("../models/User");
const { Op } = require('sequelize');

const generateQuests = async (req, res) => {
    try {
        const userId = req.user.id;

        const quest = await generateDynamicQuests(userId);

        res.status(200).json({ message: "Daily and bonus quesets generated successfully", quest });
    } catch (err) {
        console.error("Error in generateQuests:", err);
        res.status(500).json({ error: err.message });
    }
};

const acceptQuests = async (req, res) => {
    try {
        const questId = parseInt(req.params.id);
        const userId = req.user.id;

        const acceptedQuest = await UserQuest.count({
            where: {
                user_id: userId,
                status: 'Accepted',
            },
        });

        if (acceptedQuest >= 4) {
            return res.status(400).json({ error: 'You can only have up to 4 accepted quests at a time.' });
        }

        const [updatedRows] = await UserQuest.update(
            { 
                status: 'Accepted',
                accepted_at: new Date(),
            },
            {
                where: {
                    id: questId,
                    user_id: userId,
                    status: 'Pending',
                },
            },
        );

        if (updatedRows === 0){
            return res.status(404).json({ error: 'Quest not found or already accepted.' });
        }

        res.status(200).json({ message: 'Quest accepted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const completeQuests = async (req, res) => {
    try {
        const userId = req.user.id;
        const questId = parseInt(req.params.id);

        const [updatedRows] = await UserQuest.update(
            {
                status: 'Completed', 
                completed_at: new Date(),
            },
            {
                where: {
                    id: questId,
                    user_id: userId,
                    status: 'Accepted',
                },
            },
        );

        if (updatedRows === 0) {
            return res.status(404).json({ error: 'Quest not found or already completed.' });
        }

        const now = new Date();
        const user = await User.findOne({ where: { user_id: userId } });
        let newStreak = 0;

        const lastCompletedQuest = await UserQuest.findOne({
            where: {
                user_id: userId,
                status: 'Completed',
                id: { [Op.ne]: questId }, // Exclude current quest
            },
            order: [['completed_at', 'DESC']],
        });

        if (lastCompletedQuest) {
            const lastCompletedDate = new Date(lastCompletedQuest.completed_at);
            const diffDays = Math.floor((now - lastCompletedDate) / (1000 * 60 * 60 * 24));

            if (diffDays === 1) {
                newStreak = user.streak_count + 1;
            } else if (diffDays === 0) {
                newStreak = user.streak_count;
            } else {
                newStreak = 0;
            }
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

        res.status(200).json({ xp: petXp, level: petLevel, mood: petMood });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    generateQuests,
    acceptQuests,
    completeQuests,
};
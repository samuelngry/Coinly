const UserQuest = require("../models/UserQuest");
const User = require("../models/User");
const Pets = require("../models/Pets");
const { Op } = require('sequelize');

const expireCompletedQuests = async (userId) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    await UserQuest.update(
        { status: 'Expired'},
        {
            where: {
                user_id: userId,
                status: 'Completed',
                instance_date: { [Op.lt] : today },
            },
        }
    );
};

const getCustomQuests = async (req, res) => {
    try {
        const userId = req.user.id;
        const { status } = req.query;

        expireCompletedQuests(userId);

        const whereClause = {
            user_id: userId,
            type: 'custom',
        };

        if (status) {
            whereClause.status = status;
        }

        const quests = await UserQuest.findAll({ where: whereClause });

        res.status(200).json({ message: "Fetched custom quests", quests });
    } catch (err) {
        console.error("Error in getCustomQuests:", err);
        res.status(500).json({ error: err.message });
    }
};

const completeCustomQuest = async (req, res) => {
    try {
        const userId = req.user.id;
        const questId = parseInt(req.params.id);

        console.log("User ID:", userId);
        console.log("Quest ID:", questId);

        //Check if quest exists before updating
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

        const now = new Date();
        const user = await User.findOne({ where: { id: userId } });
        let newStreak = 1;

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
                newStreak = 1;
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

        res.status(200).json({ xp: petXp, level: petLevel, mood: petMood, streak: newStreak });
    } catch (err) {
        console.error("Error in completeQuests:", err);
        res.status(500).json({ error: err.message });
    }
}

const addCustomQuest = async (req, res) => {
    try {
        const userId = req.user.id;
        const { quest_text } = req.body;

        if (!quest_text || quest_text.trim() === '') {
            return res.status(400).json({ error: 'Quest text is required' });
        }

        const newQuest = await UserQuest.create({
            user_id: userId,
            quest_text,
            xp: 5,
            type: 'custom',
            status: 'Pending',
            instance_date: new Date(),
        });

        res.status(201).json({ message: 'Custom quest created successfully', quest: newQuest });
    } catch (err) {
        console.error('Error in addCustomQuest:', err);
        res.status(500).json({ error: err.message });
    }
};

const updateCustomQuest = async (req, res) => {
    try {
        const userId = req.user.id;
        const questId = parseInt(req.params.id);
        const { quest_text } = req.body;

        if(!quest_text || quest_text.trim() === '') {
            return res.status(400).json({ error: 'Quest text is required' });
        }

        const [updatedCount] = await UserQuest.update(
            { quest_text: quest_text },
            {
                where: {
                    id: questId,
                    user_id: userId,
                    status: 'Pending',
                    type: 'custom',
                },
            },
        );

        if (updatedCount === 0) {
            return res.status(404).json({ error: 'Custom quest not found not found or cannot be updated' });
        }

        const updatedQuest = await UserQuest.findOne({
            where: {
                id: questId,
                user_id: userId,
            }
        });

        res.status(200).json({ message: 'Custom quest updated successfully', quest: updatedQuest });
    } catch (err) {
        console.error('Error in updateCustomQuest:', err);
        res.status(500).json({ error: err.message });
    }
};

const deleteCustomQuest = async (req, res) => {
    try {
        const userId = req.user.id;
        const questId = parseInt(req.params.id);

        const questToDelete = await UserQuest.findOne({
            where: {
                id: questId,
                user_id: userId,
                type: 'custom',
            },
        });

        const deletedCount = await UserQuest.destroy({
            where: {
                id: questId,
                user_id: userId,
                type: 'custom',
            },
        });

        if (deletedCount === 0) {
            return res.status(404).json({ error: 'Custom quest not found or already deleted' });
        }

        res.status(200).json({ message: 'Custom quest deleted successfully', quest: questToDelete });
    } catch (err) {
        console.error('Error in deleteCustomQuest:', err);
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    completeCustomQuest,
    getCustomQuests,
    addCustomQuest,
    updateCustomQuest,
    deleteCustomQuest
};
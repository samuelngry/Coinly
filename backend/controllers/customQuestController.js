const UserQuest = require("../models/UserQuest");

const getCustomQuests = async (req, res) => {
    try {
        const userId = req.user.id;
        const { status } = req.query;

        const whereClause = {
            user_id: userId,
            type: 'Custom',
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
            xp: 1,
            type: 'Custom',
            status: 'Pending',
            instance_date: new Date(),
        });

        res.status(201).json({ message: 'Custom quest created successfully', quest: newQuest });
    } catch (err) {
        console.error('Error in addCustomQuest:', err);
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getCustomQuests,
    addCustomQuest
};
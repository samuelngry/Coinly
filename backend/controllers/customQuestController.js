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
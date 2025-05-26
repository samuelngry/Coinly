const UserQuest = require("../models/UserQuest");
const Pets = require("../models/Pets");
const User = require("../models/User");
const { Op } = require('sequelize');

// return level, streak, pet mood, daily goal progress
const getDashboardSummary = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findOne({ where: { id: userId } });
        const pet = await Pets.findOne({ where: { id: userId } });

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const todayQuests = await UserQuest.findAll({
            where: {
                user_id: userId,
                status: 'Completed',
                completed_at: {
                    [Op.gte]: today,
                },
            },
        });

        res.json({
            level: pet.level,
            streak: user.streak_count,
            mood: pet.mood,
            dailyGoalPercent: (todayQuests.length / 4) * 100,
        });
    } catch (err) {
        console.error("Dashboard Summary Error:", err);
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getDashboardSummary,

};
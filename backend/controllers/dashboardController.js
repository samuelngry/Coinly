const UserQuest = require("../models/UserQuest");
const Pets = require("../models/Pets");
const User = require("../models/User");
const { Op, fn, col } = require('sequelize');
const sequelize = require("../config/db");

// Return level, streak, pet mood, daily goal progress
const getDashboardSummary = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findOne({ where: { id: userId } });
        const pet = await Pets.findOne({ where: { user_id: userId } });

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

// Return sum of xp per category
const getXPBreakdown = async (req, res) => {
    try {
        const userId = req.user.id;

        const xpByCategory = await UserQuest.findAll({
            where: {
                user_id: userId,
                status: 'Completed',
            },
            attributes: ['category', [sequelize.fn('SUM', sequelize.col('xp')), 'totalXp']],
            group: ['category'],
        });

        const result = {};
        for (const row of xpByCategory) {
            result[row.category] = parseInt(row.totalXp);
        }

        res.json(result);
    } catch (err) {
        console.error("XP Breakdown Error:", err);
        res.status(500).json({ error: err.message });
    }
};

// TODO: Return sum xp completed by day
// Get xp each day
// Group by day
const getXPDaily = async (req, res) => {
    const userId = req.user.id;

    // Get current date and find start of the week
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 6);
    
    const weeklyCompletedQuests = await UserQuest.findAll({
        where: {
            user_id: userId,
            status: 'Completed',
            completed_at: {
                [Op.between]: [startDate, today],
            },
        },
        attributes: [
            [sequelize.fn('DATE', sequelize.col('completed_at')), 'date'],
            [sequelize.fn('SUM', sequelize.col('total')), 'totalXp']
        ],
        group: ['date'],
        order: [['date', 'ASC']],
    });

    const xpMap = {};
    weeklyCompletedQuests.forEach(q => {
        xpMap[q.date] = parseInt(q.totalXp);
    });
};

module.exports = {
    getDashboardSummary,
    getXPBreakdown,
    getXPDaily,
};
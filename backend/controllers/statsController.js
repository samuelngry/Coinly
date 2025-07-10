const { Op, fn, col, literal } = require('sequelize');
const UserQuest = require('../models/UserQuest');

const getWeeklyXP = async (req, res) => {
    try {
        const userId = req.user.id;

        const today = new Date();
        const startDate = new Date();
        startDate.setDate(today.getDate() - 6);

        const xpLogs = await UserQuest.findAll({
            where: {
                user_id: userId,
                status: 'Completed',
                completed_at: {
                    [Op.gte]: startDate,
                    [Op.lte]: today,
                },
            },
            attributes: [
                [fn('DATE', col('completed_at')), 'date'],
                [fn('SUM', col('xp')), 'totalXP']
            ],
            group: [literal('DATE(completed_at)')],
            order: [[literal('DATE(completed_at)'), 'ASC']],
            raw: true
        });

        // Format into fixed 7-day structure with 0 XP fallback
        const daysMap = {};
        xpLogs.forEach(entry => {
            const date = new Date(entry.date);
            daysMap[date.toDateString()] = parseInt(entry.totalXP);
        });

        const result = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            result.push({
                day: d.toLocaleDateString('en-US', { weekday: 'short' }).charAt(0), 
                xp: daysMap[d.toDateString()] || 0
            });
        }

        const totalXP = result.reduce((sum, day) => sum + day.xp, 0);

        res.json({ total: totalXP, result });
    } catch (err) {
        console.error('Error fetching weekly XP:', err);
        res.status(500).json({ error: 'Failed to fetch weekly XP' });
    }
};


module.exports = {
    getWeeklyXP,
};
const { Op, fn, col, literal } = require('sequelize');
const UserQuest = require('../models/UserQuest');

const getWeeklyXP = async (req, res) => {
    try {
        const userId = req.user.id;

        const now = new Date();
        
        const today = new Date(now);
        today.setHours(23, 59, 59, 999);

        const startDate = new Date(now); 
        startDate.setDate(now.getDate() - 6);
        startDate.setHours(0, 0, 0, 0);

        console.log('Date range:', startDate.toISOString(), 'to', today.toISOString());
        console.log('Current date:', now.toISOString());

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

        console.log('XP Logs found:', xpLogs);

        const daysMap = {};

        xpLogs.forEach(entry => {
            const date = new Date(entry.date);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const dateKey = `${year}-${month}-${day}`;
            daysMap[dateKey] = parseInt(entry.totalXP) || 0;
        });

        console.log('Days map:', daysMap);

        const result = [];
        
        const todayDate = new Date();
        console.log('Today is:', todayDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
        
        for (let i = 6; i >= 0; i--) {
            const d = new Date(); 
            d.setDate(d.getDate() - i); 
            
            // Use local date formatting to avoid timezone issues
            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            const dateKey = `${year}-${month}-${day}`;

            console.log(`Day ${6-i+1}: ${d.toLocaleDateString('en-US', { weekday: 'long' })} (${dateKey})`);

            result.push({
                day: d.toLocaleDateString('en-US', { weekday: 'short' }).charAt(0), 
                xp: daysMap[dateKey] || 0,
                date: dateKey,
                fullDay: d.toLocaleDateString('en-US', { weekday: 'long' }) 
            });
        }

        console.log('Final result:', result);

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
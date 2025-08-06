const { User, Pets } = require("../models");

const getLeaderboard = async (req, res) => {
    try {

        const users = await User.findAll({
            include: {
                model: Pets,
                as: 'Pet',
                attributes: ['mood', 'level', 'xp', 'total_xp'],
                required: true
            },
            attributes: ['id', 'username', 'avatar_url', 'streak_count'],
            order: [
                [{ model: Pets, as: 'Pet' }, 'level', 'DESC'],
                [{ model: Pets, as: 'Pet' }, 'xp', 'DESC']
            ],
            limit: 20,
        });

        const supabaseUrl = process.env.SUPABASE_URL || 'https://your-project-id.supabase.co';
        
        const leaderboard = users.map((user, index) => {
            let avatarUrl = null;
            
            if (user.avatar_url) {
                const cleanPath = user.avatar_url.startsWith('/') ? user.avatar_url.slice(1) : user.avatar_url;
                avatarUrl = `${supabaseUrl}/storage/v1/object/public/${cleanPath}`;
            }
            
            return {
                id: user.id,
                rank: index + 1,
                username: user.username,
                avatar_url: avatarUrl,
                xp: user.Pet?.total_xp || 0,
                level: user.Pet?.level || 1,
                streak: user.streak_count,
                mood: user.Pet?.mood || 'Neutral',
            };
        });

        res.json(leaderboard);
    } catch (err) {
        console.error("Error fetching leaderboard:", err);
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getLeaderboard
};

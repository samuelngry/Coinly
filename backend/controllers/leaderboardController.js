const { User, Pets } = require("../models");
const API_BASE = import.meta.env.VITE_API_BASE_URL;

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

        const leaderboard = users.map((user, index) => ({
            id: user.id,
            rank: index + 1,
            username: user.username,
            avatar_url: user.avatar_url ? `${API_BASE}${user.avatar_url}` : null,
            xp: user.Pet?.total_xp || 0,
            level: user.Pet?.level || 1,
            streak: user.streak_count,
            mood: user.Pet?.mood || 'Neutral',
        }));

        res.json(leaderboard);
    } catch (err) {
        console.error("Error fetching leaderboard:", err);
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getLeaderboard
};

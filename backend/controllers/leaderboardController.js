const User = require("../models/User");
const Pets = require("../models/Pets");

const getLeaderboard = async (req, res) => {
    try {
        User.hasOne(Pets, { foreignKey: 'user_id', as: 'Pet' });
        Pets.belongsTo(User, { foreignKey: 'user_id' });

        const users = await User.findAll({
            include: {
                model: Pets,
                as: 'Pet',
                attributes: ['mood', 'level', 'xp'],
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
            rank: index + 1,
            username: user.username,
            avatar_url: user.avatar_url,
            xp: user.Pet?.xp,
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

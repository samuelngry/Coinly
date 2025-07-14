const Pets = require("../models/Pets");
const User = require("../models/User");

const getLeaderboard = async (req, res) => {
    try {
        const users = await User.findAll({
            include: {
                model: Pets,
                attributes: ['mood', 'level']
            },
            order: [['xp', 'DESC']],
            limit: 10,
            attributes: ['id', 'username', 'xp', 'avatar_url']
        });

        const leaderboard = users.map((user, index) => ({
            rank: index + 1,
            username: user.username,
            avatar_url: user.avatar_url,
            xp: user.xp,
            level: user.Pet?.level || 1,
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

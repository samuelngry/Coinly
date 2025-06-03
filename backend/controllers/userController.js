const User = require("../models/User");
const UserPreference = require("../models/UserPreference");

const updateUsername = async (req, res) => {
    try {
        const userId = req.user.id;
        const { username } = req.body;

        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ error: "Username taken. "});
        }

        await User.update({ username }, { where: { id: userId } });
        res.status(200).json({ message: "Username changed successfully", username});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateAvatar = async (req, res) => {
    try {
        const userId = req.user.id;
        const { avatar_url } = req.body;

        await User.update({ avatar_url }, { where: { id: userId } });
        res.status(200).json({ message: "Avatar changed successfully", avatar_url});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const savePreferences = async (req, res) => {
    try {

    }
}

module.exports = {
    updateUsername,
    updateAvatar,
    savePreferences
};
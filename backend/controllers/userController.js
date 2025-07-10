const User = require("../models/User");
const Pets = require("../models/Pets");
const UserPreference = require("../models/UserPreference");

const getUserData = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findByPk(userId);

        const pet = await Pets.findOne({ where: { user_id: userId } });
        if (!pet) {
            return res.status(404).json({ error: 'User data not found' });
        }

        const userData = {
            xp: pet.xp,
            level: pet.level,
            streak: user.streak_count,
            mood: pet.mood,
        };

        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

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
        const userId = req.user.id;
        let { categories, struggle, goal, lifestyles } = req.body;

        if (!goal || !struggle || !lifestyles || !categories) {
            return res.status(400).json({ error: "All preferences are required." });
        }

        if (Array.isArray(struggle)) {
            struggle = struggle.join(', ');
        }

        if (Array.isArray(goal)) {
            goal = goal.join(', ');
        }

        await UserPreference.upsert({
            user_id: userId,
            struggle: struggle,
            goal: goal,
            categories: categories,
            lifestyle: lifestyles
        });

        await User.update(
            { onboarding_completed: true },
            {
                where: {
                    id: userId,
                },
            },
        );
        res.status(200).json({ message: "User Preferences saved successfully" });
    } catch (err) {
        console.error("Error in saving User Preferences", err);
        res.status(500).json({ error: err.message })
    }
};

module.exports = {
    getUserData,
    updateUsername,
    updateAvatar,
    savePreferences
};
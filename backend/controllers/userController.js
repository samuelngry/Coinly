const User = require("../models/User");
const Pets = require("../models/Pets");
const UserPreference = require("../models/UserPreference");
const DailyCompletion = require("../models/DailyCompletion");
const UserBadge = require("../models/UserBadge");
const { Op } = require('sequelize');
const { HfInference } = require('@huggingface/inference');

const getUserData = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findByPk(userId);

        console.log('User data from DB:', {
            id: user.id,
            username: user.username,
            streak_count: user.streak_count,
            longest_streak: user.longest_streak
        });

        const pet = await Pets.findOne({ where: { user_id: userId } });
        if (!pet) {
            return res.status(404).json({ error: 'User data not found' });
        }

        const today = new Date();
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const currentMonthKey = String(today.getMonth() + 1).padStart(2, '0');
        const currentMonthFull = `${today.getFullYear()}-${currentMonthKey}`;

        const completions = await DailyCompletion.findAll({
            where: {
                user_id: userId,
                date: {
                    [Op.gte]: startOfMonth,
                    [Op.lte]: today
                }
            }
        });

        const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
        let badge = null;

        // Create badge if all days completed
        if (completions.length === daysInMonth) {
            const [createdBadge] = await UserBadge.findOrCreate({
                where: {
                    user_id: userId,
                    month: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`,
                },
                defaults: {
                    user_id: userId,
                    badge_name: today.toLocaleString('default', { month: 'long' }),
                }
            });

            badge = createdBadge;
        }

        const unlockedBadges = await UserBadge.findAll({
            where: { user_id: userId },
            raw: true
        });

        const unlockedMonthMap = {};
        unlockedBadges.forEach(b => unlockedMonthMap[b.month] = true);

        const monthList = [
            { key: 'January', label: 'jan' }, { key: 'February', label: 'feb' }, { key: 'March', label: 'mar' },
            { key: 'April', label: 'apr' }, { key: 'May', label: 'may' }, { key: 'June', label: 'jun' },
            { key: 'July', label: 'jul' }, { key: 'August', label: 'aug' }, { key: 'September', label: 'sep' },
            { key: 'October', label: 'oct' }, { key: 'November', label: 'nov' }, { key: 'December', label: 'dec' }
        ];

        const fullYear = today.getFullYear();

        const badgesWithImages = monthList.map(m => {
            const fullMonth = `${fullYear}-${m.key}`;
            return {
                month: fullMonth,
                unlocked: !!unlockedMonthMap[fullMonth],
                image_url: `/badges/${m.label}.png`
            };
        });

        const level = Number(pet.level) || 1;
        const maxXp = 100 + (level - 1) * 50;

        const createdAt = new Date(user.createdAt);
        const now = new Date();

        const accountAgeDays = Math.floor((now - createdAt) / (1000 * 60 * 60 * 24));

        const userData = {
            xp: pet.xp,
            avatar_url: user.avatar_url,
            level: pet.level,
            maxXp: maxXp,
            streak: user.streak_count,
            longestStreak: user.longest_streak,
            mood: pet.mood,
            badges: badgesWithImages,
            recentBadge: badge,
            username: user.username,
            accountAge: accountAgeDays
        };

        res.status(200).json(userData);
    } catch (err) {
        console.error("Error in getUserData:", err);
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

        const avatarUrl = `/avatars/${req.file.filename}`;

        await User.update({ avatar_url: avatarUrl }, { where: { id: userId } });
        res.status(200).json({ message: "Avatar changed successfully", avatar_url: avatarUrl});
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
    savePreferences,
};
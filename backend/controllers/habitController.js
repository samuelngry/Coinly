const User = require("../models/User");
const UserQuest = require("../models/UserQuest");
const UserPreference = require("../models/UserPreference");
const Pets = require("../models/Pets");
const { Op } = require('sequelize');

const getHabitRadarData = async (req, res) => {
    try {
            const userId = req.user.id;
            
            // Get user data
            const user = await User.findByPk(userId);
            const userPreference = await UserPreference.findByPk(userId);
            const pet = await Pets.findOne({ where: { user_id: userId } });
            
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            // Calculate date ranges
            const now = new Date();
            const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
            const sevenDaysAgo = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000));

            // Get comprehensive quest data
            const allQuests = await UserQuest.findAll({
                where: {
                    user_id: userId,
                    instance_date: {
                        [Op.gte]: thirtyDaysAgo
                    }
                },
                order: [['instance_date', 'DESC'], ['createdAt', 'ASC']]
            });

            // Calculate patterns and predictions
            const patterns = await calculateUserPatterns(allQuests, now);
            const predictions = await generatePredictions(patterns, userPreference);
            const recommendations = await generateRecommendations(patterns, userPreference);
            const petInsights = await generatePetInsights(patterns, pet, user);

            res.status(200).json({
                user: {
                    name: user.name || "User",
                    currentStreak: user.streak_count || 0,
                    level: pet?.level || 1,
                    totalXp: pet?.total_xp || 0
                },
                patterns,
                predictions,
                recommendations,
                petInsights
            });

        } catch (err) {
            console.error("Error in getHabitRadarData:", err);
            res.status(500).json({ error: err.message });
        }
};

module.exports = {
    getHabitRadarData
};
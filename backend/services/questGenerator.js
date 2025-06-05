const questComponents = require("../config/questComponents");
const User = require("../models/User");
const UserPreference = require("../models/UserPreference");
const UserQuest = require("../models/UserQuest");
const { Op } = require('sequelize');

async function generateDynamicQuests(userId) {
    const user = await User.findByPk(userId);
    const userPreference = await UserPreference.findByPk(userId);
    
    if (!user || !userPreference) {
        throw new Error('User or user preferences not found');
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const lastGenerated = user.last_generated_at;
    const lastGeneratedDate = lastGenerated ? new Date(lastGenerated.setHours(0, 0, 0, 0)) : null;

    // Generate new quests if it's a new day
    if (!lastGeneratedDate || lastGeneratedDate < today) {
        await expireOldQuests(userId);

        let relevantItems = [];

        if (Array.isArray(userPreference.categories)) {
            userPreference.categories.forEach(category => {
                const itemsForCategory = questComponents.categoriesMap[category] || [];
                relevantItems.push(...itemsForCategory);
            });
        }

        relevantItems = [...new Set(relevantItems)];

        const generatedQuests = [];
        const actions = questComponents.actions;

        await generateQuest(user, relevantItems, actions, generatedQuests);

        user.last_generated_at = new Date();
        await user.save();

        return generatedQuests;
    }

    return []; // Already generated today
}

async function generateQuest(user, relevantItems, actions, generatedQuests) {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const availableCount = await UserQuest.count({
        where: { 
            user_id: user.id, 
            status: 'Pending',
            instance_date: {[Op.gte]: startOfToday }
        }
    });

    const questToGenerate = 5 - availableCount; 

    if (questToGenerate > 0) {
        await generateBatchQuests(user, relevantItems, actions, generatedQuests, questToGenerate);
    }
}

async function generateBatchQuests(user, relevantItems, actions, generatedQuests, questToGenerate, timeframe="today") {
    const questPromises = [];
    let count = 0;

    for (const action of actions) {
        const compatibleItems = relevantItems.filter(item => 
            questComponents.actionItemMap[action] && questComponents.actionItemMap[action].includes(item)
        );

        for (const item of compatibleItems) {
            if (count >= questToGenerate) break;

            const savingsAmount = calculateSavingsAmount(item, timeframe);
            const questText = questComponents.questTextTemplates[action]
                ? questComponents.questTextTemplates[action](item, timeframe)
                : `${action} ${item} ${timeframe}`;

            const questPromise = UserQuest.create({
                user_id: user.id,
                quest_text: questText,
                xp: calculateXpReward(savingsAmount),
                source_template_id: null,
                status: 'Pending',
                instance_date: new Date(),
                accepted_at: null,
                category: questComponents.itemToCategoryMap[item] || 'Uncategorised'
            });

            questPromises.push(questPromise);
            count++;
        }

        if (count >= questToGenerate) break;
    }

    const quests = await Promise.all(questPromises);
    generatedQuests.push(...quests);
}

async function expireOldQuests(userId) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 3);

    await UserQuest.update(
        { status: 'Expired'},
        {
            where: {
                user_id: userId,
                status: 'Pending',
                instance_date: {[Op.lt]: cutoffDate},
            },
        },
    );
}

function calculateSavingsAmount(item, timeframe) {
    const baseCosts = questComponents.baseCosts[item] || 10;
    const timeMultiplier = questComponents.timeMultipliers[timeframe] || 1;

    return Math.round(baseCosts * timeMultiplier);
}

function calculateXpReward(savingsAmount) {
    return Math.max(20, Math.min(100, savingsAmount * 5));
}

module.exports = {
    generateDynamicQuests
};
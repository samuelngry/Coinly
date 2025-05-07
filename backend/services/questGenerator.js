const questComponents = require("../config/questComponents");
const User = require("../models/User");
const UserPreference = require("../models/UserPreference");
const UserQuest = require("../models/UserQuest");

// Respect daily generation limits (max 5 per day)

async function generateDynamicQuests(userId) {
    const user = await User.findByPk(userId);
    const userPreference = await UserPreference.findByPk(userId);
    
    if (!user || !userPreference) {
        throw new Error('User or user preferences not found');
    }

    let relevantItems = [];

    const spendingCategories = Array.isArray(userPreference.spending_categories)
        ? userPreference.spending_categories
        : JSON.parse(userPreference.spending_categories || '[]' );

    relevantItems = questComponents.items.filter(item =>
        spendingCategories.includes(item)
    );

    // If user does not have enough spending categories, add some defaults
    if (relevantItems.length < 3) {
        relevantItems = ["coffee", "lunch", "entertainment", "snacks", "takeout food"].filter(
            item => !relevantItems.includes(item)  
        ).concat(relevantItems).slice(0, 5);
    }

    const generatedQuests = [];
    const actions = questComponents.actions;

    await generateBatchQuests(user, relevantItems, actions, generatedQuests);

    return generatedQuests;
}

async function generateBatchQuests(user, relevantItems, actions, generatedQuests, timeframe="today") {
    const questPromises = [];

    for (const action of actions) {
        const compatibleItems = relevantItems.filter(item => 
            questComponents.actionItemMap[action] && questComponents.actionItemMap[action].includes(item)
        );

        for (const item of compatibleItems) {
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
                accepted_at: null
            });

            questPromises.push(questPromise);
        }
    }

    const quests = await Promise.all(questPromises);
    generatedQuests.push(...quests);
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
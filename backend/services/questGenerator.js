const questComponents = require("../config/questComponents");
const User = require("../models/User");
const UserPreference = require("../models/UserPreference");
const UserQuest = require("../models/UserQuest");

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
}
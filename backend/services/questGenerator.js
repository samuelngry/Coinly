const questComponents = require("../config/questComponents");
const User = require("../models/User");
const UserPreference = require("../models/UserPreference");
const UserQuest = require("../models/UserQuest");
const { Op } = require('sequelize');

async function generateDailyQuests(userId) {
    const today = new Date();
    const dailyQuests = questComponents.mandatoryDaily.sort(() => Math.random() - 0.5).slice(0, 3);

    return await Promise.all(dailyQuests.map(q =>
        UserQuest.create({
            user_id: userId,
            quest_text: q.text,
            xp: q.xp,
            status: 'Pending',
            type: 'daily',
            instance_date: today,
        })
    ));
}

async function generateBonusQuests(user, userPreference) {
    let allQuests = [];

    const pushQuests = (map, key, type) => {
        if (Array.isArray(key)) {
            key.forEach(k => {
                const quests = map[k] || [];
                quests.forEach(q => allQuests.push({ ...q, type }));
            });
        } else {
            const quests = map[key] || [];
            quests.forEach(q => allQuests.push({ ...q, type }));
        }
    };

    pushQuests(questComponents.goalMap, userPreference.goal, 'goal');
    pushQuests(questComponents.categoriesMap, userPreference.categories, 'categories');
    pushQuests(questComponents.struggleMap, userPreference.struggle, 'struggles');
    pushQuests(questComponents.lifestyleMap, userPreference.lifestyle, 'lifestyles');

    const uniqueQuests = [...new Map(allQuests.map(q => [q.text, q])).values()];
    const selected = uniqueQuests.sort(() => Math.random() - 0.5).slice(0, 3);

    return await Promise.all(selected.map(q =>
        UserQuest.create({
            user_id: user.id,
            quest_text: q.text,
            xp: q.xp,
            status: 'Pending',
            type: 'bonus',
            instance_date: new Date(),
        })
    ));
}

async function generateDynamicQuests(userId) {
    const user = await User.findByPk(userId);
    const userPreference = await UserPreference.findByPk(userId);
    
    if (!user) {
        throw new Error('User not found');
    }

    // Create date for today at start of day
    const today = new Date();
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const todayEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999);

    console.log("Checking for existing quests between:", todayStart, "and", todayEnd);

    // FIRST: Always check for existing quests for today
    const existingQuests = await UserQuest.findAll({
        where: {
            user_id: userId,
            instance_date: {
                [Op.between]: [todayStart, todayEnd]
            },
            status: {
                [Op.in]: ['Pending', 'Completed']
            }
        },
        order: [['createdAt', 'ASC']]
    });

    console.log(`Found ${existingQuests.length} existing quests for today`);

    // If we already have quests for today, return them
    if (existingQuests.length > 0) {
        console.log('Returning existing quests for today');
        return existingQuests;
    }

    // Handle missing user preferences for new accounts
    if (!userPreference) {
        console.log('User preferences not found, generating daily quests only');
        await expireOldQuests(userId);
        
        const daily = await generateDailyQuests(userId);
        
        // Update last_generated_at
        user.last_generated_at = new Date();
        await user.save();
        
        return daily;
    }

    // Generate new quests for today
    console.log('No existing quests found, generating new quests for today');
    await expireOldQuests(userId);

    const daily = await generateDailyQuests(userId);
    const bonus = await generateBonusQuests(user, userPreference);

    // Update last_generated_at
    user.last_generated_at = new Date();
    await user.save();

    console.log(`Generated ${daily.length} daily quests and ${bonus.length} bonus quests`);
    return [...daily, ...bonus];
    
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

module.exports = {
    generateDynamicQuests
};
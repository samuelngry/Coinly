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

        const generatedQuests = [];

        await generateQuest(user, userPreference, generatedQuests);

        user.last_generated_at = new Date();
        await user.save();

        return generatedQuests;
    }

    return []; // Already generated today
}

async function generateQuest(user, userPreference, generatedQuests) {
    let allQuests = [];
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

    if (questComponents.goalMap[userPreference.goal]) {
        questComponents.goalMap[userPreference.goal].forEach(q => {
            allQuests.push({ text: q, type: "goal" });
        });
    }

    if (questComponents.struggleMap[userPreference.struggle]) {
        questComponents.struggleMap[userPreference.struggle].forEach(q => {
            allQuests.push({ text: q, type: "struggle" });
        })
    }

    if (Array.isArray(userPreference.lifestyle)) {
        userPreference.lifestyle.forEach(life => {
            const quests = questComponents.lifestyleMap[life] || [];
            quests.forEach(q => allQuests.push({ text: q, type: "lifestyle" }));
        });
    }

    if (Array.isArray(userPreference.categories)) {
        userPreference.categories.forEach(category => {
            const quests = questComponents.categoriesMap[category] || []
            quests.forEach(q => allQuests.push({ text: q, type: "categories" }));
        });
    }

    allQuests = [...new Set(allQuests)];

    const shuffledQuests = allQuests.sort(() => Math.random() - 0.5);
    const selectedQuests = shuffledQuests.slice(0, questToGenerate);

    if (questToGenerate > 0) {
        await generateBatchQuests(user, generatedQuests, selectedQuests, questToGenerate);
    }
}

async function generateBatchQuests(user, generatedQuests, selectedQuests) {
    const questPromises = [];

    for (const quest of selectedQuests) {
        const xp = getXpForType(quest.type);

        const questPromise = UserQuest.create({
            user_id: user.id,
            quest_text: quest.text,
            xp: xp,
            source_template_id: null,
            status: 'Pending',
            instance_date: new Date(),
            accepted_at: null,
        });
        questPromises.push(questPromise);
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

function getXpForType(type) {
    const xpValues = {
        goal: 40,
        categories: 35,
        struggle: 30,
        lifestyle: 25
    };
    return xpValues[type] || 20;
}

module.exports = {
    generateDynamicQuests
};
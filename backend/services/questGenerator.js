const questComponents = require("../config/questComponents");
const User = require("../models/User");
const UserPreference = require("../models/UserPreference");
const UserQuest = require("../models/UserQuest");
const { Op } = require('sequelize');

async function generateDailyQuests(userId, questToGenerate) {
    const today = new Date();
    const dailyQuests = questComponents.mandatoryDaily.sort(() => Math.random() - 0.5).slice(0, questToGenerate);

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

async function generateBonusQuests(user, userPreference, questToGenerate) {
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
    const selected = uniqueQuests.sort(() => Math.random() - 0.5).slice(0, questToGenerate);

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

    try {
        // Create date for today at start of day
        const nowSGT = new Date();

        const todayStartSGT = new Date(nowSGT.getFullYear(), nowSGT.getMonth(), nowSGT.getDate(), 0, 0, 0, 0);
        const todayEndSGT = new Date(nowSGT.getFullYear(), nowSGT.getMonth(), nowSGT.getDate(), 23, 59, 59, 999);

        console.log("Current SGT time:", nowSGT.toLocaleString());
        console.log("Checking for existing quests between:", todayStartSGT, "and", todayEndSGT);
        console.log("Singapore date:", nowSGT.toDateString());

        const existingQuests = await UserQuest.findAll({
            where: {
                user_id: userId,
                instance_date: {
                    [Op.between]: [todayStartSGT, todayEndSGT]
                },
                status: {
                    [Op.in]: ['Pending', 'Completed']
                }
            },
            order: [['createdAt', 'ASC']]
        });

        const dailyQuestsCount = existingQuests.filter(q => q.type === 'daily').length;
        const bonusQuestsCount = existingQuests.filter(q => q.type === 'bonus').length;


        // Fix: Use consistent timezone and correct logic
        const lastGeneratedAt = user.last_generated_at ? new Date(user.last_generated_at) : null;

        const needsGeneration = !lastGeneratedAt ||
            lastGeneratedAt.getFullYear() !== nowSGT.getFullYear() ||
            lastGeneratedAt.getMonth() !== nowSGT.getMonth() ||
            lastGeneratedAt.getDate() !== nowSGT.getDate();
        
        console.log("Last generated at:", lastGeneratedAt);
        console.log("Today start SGT:", todayStartSGT);
        console.log("Needs generation:", needsGeneration);
        console.log("Daily quests count:", dailyQuestsCount);
        console.log("Bonus quests count:", bonusQuestsCount);

        if(needsGeneration && (dailyQuestsCount < 3 || bonusQuestsCount < 3)) {
            console.log('Generating new quests for today');

            // Use atomic update with WHERE condition to prevent race conditions
            const [affectedRows] = await User.update(
                { last_generated_at: nowSGT },
                { 
                    where: {
                        id: userId,
                        [Op.or]: [
                            { last_generated_at: null },
                            { last_generated_at: { [Op.lt]: todayStartSGT } }
                        ]
                    }
                }
            );

            // Only proceed if this call successfully updated the timestamp
            if (affectedRows === 0) {
                console.log('Another process already generating quests, fetching existing ones...');
                // Refetch existing quests in case they were created by the other process
                const updatedQuests = await UserQuest.findAll({
                    where: {
                        user_id: userId,
                        instance_date: {
                            [Op.between]: [todayStartSGT, todayEndSGT]
                        },
                        status: {
                            [Op.in]: ['Pending', 'Completed']
                        }
                    },
                    order: [['createdAt', 'ASC']]
                });
                return updatedQuests;
            }

            // Generate new quests for today
            await expireOldQuests(userId);

            await UserQuest.update(
                { status: 'Expired' },
                {
                    where: {
                        user_id: userId,
                        status: 'Completed',
                        instance_date: { [Op.lt] : todayStartSGT }, // Use consistent date
                    },
                }
            );

            if (dailyQuestsCount < 3) {
                const daily = await generateDailyQuests(userId, 3 - dailyQuestsCount);
                existingQuests.push(...daily);
                console.log('Generated', daily.length, 'daily quests');
            }

            if (bonusQuestsCount < 3) {
                const bonus = await generateBonusQuests(user, userPreference, 3 - bonusQuestsCount);
                existingQuests.push(...bonus);
                console.log('Generated', bonus.length, 'bonus quests');
            }

            console.log('Updated last_generated_at to:', todayStartSGT);
        } else {
            console.log('No generation needed - already generated today or sufficient quests exist');
        }

        console.log('Returning existing quests for today');
        return existingQuests;
    } catch (err) {
        console.error("Error generating quests:", err);
        throw new Error('Failed to generate quests');
    }
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
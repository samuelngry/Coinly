const { User } = require("../models/User");
const { UserQuest } = require("../models/UserQuest");
const { generateDynamicQuests } = require("../services/questGenerator");

// Each user gets 5 daily quest options
// Users can accept up to 3 quests at a time
// Unaccepted quests expire after 3 days

async function refreshUserQuests() {
    try {
        const users = await User.findAll();

        for (const user of users) {
            const pendingQuestCount = await UserQuest.count({
                where: {
                    user_id: user.id,
                    status: 'Pending'
                }
            });
        }
    } catch (err) {
        console.error('Error in quest refresh job:', err);
    }
}

module.exports = {
    refreshUserQuests
};
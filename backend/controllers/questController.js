const { generateDynamicQuests } = require("../services/questGenerator");
const UserQuest = require("../models/UserQuest");

const generateQuests = async (req, res) => {
    try {
        const userId = req.user.id;

        const quest = await generateDynamicQuests(userId);

        res.status(200).json({ message: "Quest generated successfully", quest });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const acceptQuests = async (req, res) => {
    try {
        const questId = parseInt(req.params.id);
        const userId = req.user.id;

        const acceptedQuest = await UserQuest.count({
            where: {
                user_id: userId,
                status: 'Accepted',
            },
        });

        if (acceptedQuest >= 4) {
            return res.status(400).json({ error: 'You can only have up to 4 accepted quests at a time.' });
        }

        const [updatedRows] = await UserQuest.update(
            { 
                status: 'Accepted',
                accepted_at: new Date(),
            },
            {
                where: {
                    id: questId,
                    user_id: userId,
                    status: 'Pending',
                },
            },
        );

        if (updatedRows === 0){
            return res.status(404).json({ error: 'Quest not found or already accepted.' });
        }

        res.status(200).json({ message: 'Quest accepted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    generateQuests,
    acceptQuests,
};
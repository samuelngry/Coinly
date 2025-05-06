const { generateDynamicQuests } = require("../services/questGenerator");

const generateQuests = async (req, res) => {
    try {
        const userId = parseInt(req.params.id);

        const quest = await generateDynamicQuests(userId);

        res.status(200).json({ message: "Quest generated successfully", quest });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
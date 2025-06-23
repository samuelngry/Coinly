const Pets = require("../models/Pets");

const editPetName = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name } = req.body;

        const newPetName = await Pets.update(
            { name: name },
            {
                where: {
                    user_id: userId,
                },
            },
        );

        res.status(200).json({ message: "Pet name changed successfully", newPetName });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    editPetName,
};
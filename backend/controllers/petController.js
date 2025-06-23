const Pets = require("../models/Pets");

const editPetName = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name } = req.body;

        const pet = await Pets.findOne({ where: { user_id: userId } });
        if (!pet) {
            return res.status(404).json({ error: "Pet not found for this user." });
        }

        pet.name = name;
        await pet.save();

        res.status(200).json({ message: "Pet name changed successfully", newPetName: pet.name });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    editPetName,
};
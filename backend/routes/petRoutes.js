const express = require("express");
const router = express.Router();
const { getPetName, editPetName } = require("../controllers/petController");
const verifyToken = require("../middleware/authMiddleware");

router.get("/", verifyToken, getPetName);
router.post("/edit", verifyToken, editPetName);

module.exports = router;
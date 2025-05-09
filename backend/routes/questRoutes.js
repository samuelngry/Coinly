const express = require("express");
const router = express.Router();
const { generateQuests, acceptQuests, completeQuests } = require("../controllers/questController");
const verifyToken = require("../middleware/authMiddleware");

router.post("/generate", verifyToken, generateQuests);
router.post("/:id/accept", verifyToken, acceptQuests);
router.post("/:id/complete", verifyToken, completeQuests);

module.exports = router;
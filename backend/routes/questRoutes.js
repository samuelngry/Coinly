const express = require("express");
const router = express.Router();
const { generateQuests, completeQuests } = require("../controllers/questController");
const verifyToken = require("../middleware/authMiddleware");

router.post("/", verifyToken, generateQuests);
router.post("/:id/complete", verifyToken, completeQuests);

module.exports = router;
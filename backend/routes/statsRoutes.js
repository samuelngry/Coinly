const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const { getWeeklyXP } = require("../controllers/statsController");

router.get("/weekly-xp", verifyToken, getWeeklyXP);

module.exports = router;
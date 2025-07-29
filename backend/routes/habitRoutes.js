const express = require("express");
const router = express.Router();
const { getHabitRadarData } = require("../controllers/habitController");
const verifyToken = require("../middleware/authMiddleware");

router.get("/", verifyToken, getHabitRadarData);

module.exports = router;
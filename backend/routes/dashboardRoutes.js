const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");

router.get("/summary", verifyToken, getDashboardSummary);
router.get("/xp-breakdown", verifyToken, getXPBreakdown);
router.get("/xp-daily", verifyToken, getXPDaily);

module.exports = router;
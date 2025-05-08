const express = require("express");
const router = express.Router();
const { generateQuests, acceptQuests } = require("../controllers/questController");
const verifyToken = require("../middleware/authMiddleware");

router.post("/generate", verifyToken, generateQuests);
router.post("/accept/:id", verifyToken, acceptQuests);

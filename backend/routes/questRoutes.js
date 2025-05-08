const express = require("express");
const router = express.Router();
const { generatedQuests } = require("../controllers/questController");
const verifyToken = require("../middleware/authMiddleware");

router.post("/generate", verifyToken, generatedQuests);

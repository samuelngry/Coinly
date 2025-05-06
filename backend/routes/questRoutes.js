const express = require("express");
const router = express.Router();
const { generatedQuests } = require("../controllers/questController");

router.post("generate/:id", generatedQuests);

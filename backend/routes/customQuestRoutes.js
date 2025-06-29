const express = require("express");
const router = express.Router();
const { getCustomQuests, addCustomQuest, completeCustomQuest, updateCustomQuest, deleteCustomQuest } = require("../controllers/customQuestController");
const verifyToken = require("../middleware/authMiddleware");

router.get("/", verifyToken, getCustomQuests);
router.post("/", verifyToken, addCustomQuest);
router.post("/:id/complete", verifyToken, completeCustomQuest);
router.put("/:id", verifyToken, updateCustomQuest);
router.delete("/:id", verifyToken, deleteCustomQuest);

module.exports = router;
const express = require("express");
const router = express.Router();
const { getCustomQuests, addCustomQuest, updateCustomQuest, deleteCustomQuest } = require("../archived/customQuestController");
const verifyToken = require("../middleware/authMiddleware");

router.post('/', verifyToken, addCustomQuest);
router.get("/", verifyToken, getCustomQuests);
router.put("/:id", verifyToken, updateCustomQuest);
router.delete("/:id", verifyToken, deleteCustomQuest);

module.exports = router;
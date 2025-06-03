const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const { updateUsername, updateAvatar, savePreferences } = require("../controllers/userController");

router.put("/update-username", verifyToken, updateUsername);
router.put("/update-avatar", verifyToken, updateAvatar);
router.post("/preferences", verifyToken, savePreferences);

module.exports = router;
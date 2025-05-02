const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const { updateUsername, updateAvatar } = require("../controllers/userController");

router.put("/update-username", verifyToken, updateUsername);
router.put("/update-avatar", verifyToken, updateAvatar);

module.exports = router;
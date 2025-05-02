const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const { updateUsername, updateAvatar } = require("../controllers/userController");

router.put("/api/users/update-username", verifyToken, updateUsername);
router.put("/api/users/update-avatar", verifyToken, updateAvatar);

module.exports = router;
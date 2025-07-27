const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const multer = require('multer');
const path = require('path');
const { updateUsername, updateAvatar, savePreferences, getUserData, chatWithPet } = require("../controllers/userController");

// Storage config
const storage = multer.diskStorage({
  destination: './public/avatars',
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `user_${req.user.id}${ext}`);
  }
});
const upload = multer({ storage });

router.get("/", verifyToken, getUserData);
router.put("/update-username", verifyToken, updateUsername);
router.post("/avatar", verifyToken, upload.single('avatar'), updateAvatar);
router.post("/preferences", verifyToken, savePreferences);
router.post("/chat", verifyToken, chatWithPet);

module.exports = router;
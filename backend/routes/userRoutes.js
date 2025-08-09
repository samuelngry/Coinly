const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const multer = require('multer');
const path = require('path');
const { updateUsername, updateAvatar, savePreferences, getUserData } = require("../controllers/userController");

// Storage config
const storage = multer.memoryStorage();

const upload = multer({ 
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, 
  },
  fileFilter: (req, file, cb) => {
    // Check file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

router.get("/", verifyToken, getUserData);
router.put("/update-username", verifyToken, updateUsername);
router.post("/avatar", verifyToken, upload.single('avatar'), updateAvatar);
router.post("/preferences", verifyToken, savePreferences);

module.exports = router;
const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const { upload } = require("../middleware/multerMiddleware");

router.post("/register", upload.single('avatar'), register);
router.post("/login", upload.single('avatar'), login);

module.exports = router;
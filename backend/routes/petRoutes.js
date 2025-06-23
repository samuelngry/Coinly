const express = require("express");
const router = express.Router();
const editPetName = require("../controllers/petController");
const verifyToken = require("../middleware/authMiddleware");

router.post("/", verifyToken, editPetName);

module.exports = router;
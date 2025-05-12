const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");

router.post('/', verifyToken);
router.get("/", verifyToken);
router.put("/:id", verifyToken);
router.delete("/:id", verifyToken);

module.exports = router;
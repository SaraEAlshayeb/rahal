const express = require("express");
const router = express.Router();
const { updateUser } = require("../controllers/driverController");

// No need for multer anymore — you're just handling text data
router.put("/:email", updateUser);

module.exports = router;

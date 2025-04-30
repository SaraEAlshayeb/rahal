const express = require("express");
const router = express.Router();
const { getNotifications } = require("../controllers/notificationController");

router.get("/:driverId", getNotifications);

module.exports = router;

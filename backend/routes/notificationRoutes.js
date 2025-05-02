const express = require("express");
const router = express.Router();
const { getDriverNotifications, respondToNotification } = require("../controllers/notificationController");

router.get("/:driverId", getDriverNotifications);
router.post("/respond", respondToNotification); 

module.exports = router;

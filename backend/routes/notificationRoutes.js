const express = require("express");
const router = express.Router();
const {
  getDriverNotifications,
  respondToNotification,
  createNotification,
  getUserNotifications,
  getUserById,
  deleteNotification,
} = require("../controllers/notificationController");

// ⚠️ These must be different paths
router.get("/driver/:driverId", getDriverNotifications); // For driver
router.get("/user/:userId", getUserNotifications); // For rider

router.post("/respond", respondToNotification);
router.post("/", createNotification);
router.get("/id/:id", getUserById);
router.delete("/:id", deleteNotification);

module.exports = router;

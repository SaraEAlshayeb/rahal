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

router.get("/:userId", getUserNotifications);
router.post("/respond", respondToNotification);
router.post("/", createNotification);
router.get("/id/:id", getUserById); // return user by ObjectId
router.delete("/:id", deleteNotification);
module.exports = router;

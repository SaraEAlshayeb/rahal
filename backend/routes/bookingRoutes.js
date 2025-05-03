const express = require("express");
const router = express.Router();
const {
  getNotReservedRides,
  getRideById,
  updateRideStatus,
  completeRide,
  getUserRides,
  getRidesByUser,
} = require("../controllers/bookingController");

// DON'T use the same path twice for different controllers

router.put("/rides/:id/status", updateRideStatus);
router.post("/rides/:rideId/complete", completeRide);

// CORRECT - your History.js uses this one
//router.get("/rides/user", getRidesByUser);
router.get("/rides", getNotReservedRides); // For public available rides (not reserved)
router.get("/rides/user", getUserRides); // For rides history by user
router.get("/rides/:id", getRideById); // For getting one ride by ID

module.exports = router;

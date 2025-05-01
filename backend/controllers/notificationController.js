const { ObjectId } = require("mongodb");
const { client } = require("../config/db");

const getDriverNotifications = async (req, res) => {
  const driverId = req.params.driverId;
  if (!driverId) return res.status(400).json({ message: "Missing driver ID" });

  try {
    const db = client.db("RahalDb");
    const userCollection = db.collection("user");
    const rideCollection = db.collection("ride");
    const notifCollection = db.collection("notification");

    const driver = await userCollection.findOne({ _id: new ObjectId(driverId) });
    if (!driver || !Array.isArray(driver.notifications)) {
      return res.status(200).json([]);
    }

    const results = [];

    for (const notifId of driver.notifications) {
      const notif = await notifCollection.findOne({ _id: notifId });
      if (!notif || !notif.rideId || !notif.passengerId) continue;

      const ride = await rideCollection.findOne({ _id: notif.rideId });
      if (!ride || String(ride.driver) !== driverId) continue;

      const passenger = await userCollection.findOne({ _id: notif.passengerId });
      if (!passenger) continue;

      results.push({
        notificationId: notif._id,
        from: ride.origin,
        to: ride.destination,
        date: ride.date,
        time: ride.time,
        passengerName: passenger.name,
        passengerGender: passenger.gender,
        passengerId: passenger._id // 🔑 Add this for later use in Accept logic
      });
    }

    res.status(200).json(results);
  } catch (err) {
    console.error("Error loading notifications:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
};

const respondToNotification = async (req, res) => {
  const { notificationId, action, passengerId } = req.body;
  const driverId = req.headers['driver-id'];

  if (!notificationId || !action || !driverId || !passengerId) {
    return res.status(400).json({ message: "Missing required data" });
  }

  try {
    const db = client.db("RahalDb");
    const notifCollection = db.collection("notification");
    const userCollection = db.collection("user");
    const rideCollection = db.collection("ride");

    const notif = await notifCollection.findOne({ _id: new ObjectId(notificationId) });
    if (!notif || !notif.rideId) {
      return res.status(404).json({ message: "Notification not found" });
    }

    const ride = await rideCollection.findOne({ _id: notif.rideId });
    if (!ride) return res.status(404).json({ message: "Ride not found" });

    if (action === "accept") {
      await rideCollection.updateOne(
        { _id: ride._id },
        {
          $pull: { pendingRiders: new ObjectId(passengerId) },
          $addToSet: { acceptedRiders: new ObjectId(passengerId) }
        }
      );
    }

    await notifCollection.deleteOne({ _id: notif._id });

    await userCollection.updateOne(
      { _id: new ObjectId(driverId) },
      { $pull: { notifications: notif._id } }
    );

    res.status(200).json({ message: `Request ${action}ed successfully.` });
  } catch (err) {
    console.error("Respond error:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
};

module.exports = {
  getDriverNotifications,
  respondToNotification
};

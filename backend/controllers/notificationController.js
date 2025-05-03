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

    const driver = await userCollection.findOne({
      _id: new ObjectId(driverId),
    });
    if (!driver || !Array.isArray(driver.notifications)) {
      return res.status(200).json([]);
    }

    const results = [];

    for (const notifId of driver.notifications) {
      const notif = await notifCollection.findOne({ _id: notifId });
      if (!notif || !notif.rideId || !notif.passengerId) continue;

      const ride = await rideCollection.findOne({ _id: notif.rideId });
      if (!ride || String(ride.driver) !== driverId) continue;

      const passenger = await userCollection.findOne({
        _id: notif.passengerId,
      });
      if (!passenger) continue;

      results.push({
        notificationId: notif._id,
        from: ride.origin,
        to: ride.destination,
        date: ride.date,
        time: ride.time,
        passengerName: passenger.name,
        passengerGender: passenger.gender,
        passengerId: passenger._id, // 🔑 Add this for later use in Accept logic
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
  const driverId = req.headers["driver-id"];

  if (!notificationId || !action || !driverId || !passengerId) {
    return res.status(400).json({ message: "Missing required data" });
  }

  try {
    const db = client.db("RahalDb");
    const notifCollection = db.collection("notification");
    const userCollection = db.collection("user");
    const rideCollection = db.collection("ride");

    const notif = await notifCollection.findOne({
      _id: new ObjectId(notificationId),
    });
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
          $addToSet: { acceptedRiders: new ObjectId(passengerId) },
        }
      );
    } else if (action === "reject") {
      await rideCollection.updateOne(
        { _id: ride._id },
        {
          $pull: { pendingRiders: new ObjectId(passengerId) },
        }
      );
    }

    await notifCollection.insertOne({
      rideId: notif.rideId,
      passengerId: new ObjectId(passengerId),
      driverId: new ObjectId(driverId),
      sendTo: new ObjectId(passengerId), // 👈 ADD THIS LINE
      type: "response",
      status: action,
      message:
        action === "accept"
          ? "Your request was accepted. Click to proceed to checkout."
          : "Your request was rejected.",
      date: new Date(),
    });

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

const createNotification = async (req, res) => {
  const { rideId, passengerId } = req.body;

  if (!rideId || !passengerId) {
    return res.status(400).json({ message: "Missing rideId or passengerId" });
  }

  try {
    const db = client.db("RahalDb");
    const rideCol = db.collection("ride");
    const userCol = db.collection("user");
    const notifCol = db.collection("notification");

    const ride = await rideCol.findOne({ _id: new ObjectId(rideId) });
    if (!ride) return res.status(404).json({ message: "Ride not found" });

    const driverId = ride.driver;

    // ✅ Check if user already sent request before
    const existingNotif = await notifCol.findOne({
      rideId: new ObjectId(rideId),
      passengerId: new ObjectId(passengerId),
    });

    if (existingNotif) {
      return res.status(409).json({ message: "Already requested this ride" });
    }

    // ✅ Create new notification object
    const notifDoc = {
      rideId: new ObjectId(rideId),
      passengerId: new ObjectId(passengerId),
      driverId: new ObjectId(driverId),
      sendTo: new ObjectId(driverId), // 👈 ADD THIS LINE
      status: "pending",
      type: "request",
      date: new Date(),
    };

    const result = await notifCol.insertOne(notifDoc);

    // Update driver's notifications array
    await userCol.updateOne(
      { _id: new ObjectId(driverId) },
      { $addToSet: { notifications: result.insertedId } }
    );

    // Optionally store for rider too
    await userCol.updateOne(
      { _id: new ObjectId(passengerId) },
      { $addToSet: { notifications: result.insertedId } }
    );

    // Add passenger to pendingRiders
    await rideCol.updateOne(
      { _id: new ObjectId(rideId) },
      { $addToSet: { pendingRiders: new ObjectId(passengerId) } }
    );

    res
      .status(201)
      .json({ message: "Notification created", id: result.insertedId });
  } catch (err) {
    console.error("❌ Create notification error:", err);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

const getUserNotifications = async (req, res) => {
  const userId = req.params.userId;
  if (!userId) {
    return res.status(400).json({ message: "Missing userId" });
  }

  try {
    const db = client.db("RahalDb");
    const notifCol = db.collection("notification");
    const userCol = db.collection("user");
    const rideCol = db.collection("ride");

    // Get all notifications intended for this user
    const notifications = await notifCol
      .find({ sendTo: new ObjectId(userId) })
      .toArray();

    const results = [];

    for (const notif of notifications) {
      const ride = await rideCol.findOne({ _id: notif.rideId });
      if (!ride) continue;

      if (notif.type === "request") {
        const passenger = await userCol.findOne({ _id: notif.passengerId });
        if (!passenger) continue;

        results.push({
          notificationId: notif._id,
          rideId: notif.rideId,
          from: ride.origin,
          to: ride.destination,
          date: ride.date,
          time: ride.time,
          passengerName: passenger.name,
          passengerGender: passenger.gender,
          passengerId: passenger._id,
          type: "request",
        });
      } else if (notif.type === "response") {
        const driver = await userCol.findOne({ _id: notif.driverId });

        results.push({
          notificationId: notif._id,
          rideId: notif.rideId,
          from: ride.origin,
          to: ride.destination,
          date: ride.date,
          time: ride.time,
          driverName: driver?.name || "Driver",
          status: notif.status,
          type: "response",
        });
      }
    }

    res.status(200).json(results);
  } catch (err) {
    console.error("Get user notifications error:", err);
    res.status(500).json({ message: "Internal error", error: err.message });
  }
};

const getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const db = client.db("RahalDb");
    const user = await db
      .collection("user")
      .findOne({ _id: new ObjectId(userId) });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const deleteNotification = async (req, res) => {
  try {
    const notificationId = req.params.id;

    const db = client.db("RahalDb");
    const notificationCollection = db.collection("notification");

    const result = await notificationCollection.deleteOne({
      _id: new ObjectId(notificationId),
    });

    if (result.deletedCount === 1) {
      return res
        .status(200)
        .json({ message: "Notification deleted successfully" });
    } else {
      return res.status(404).json({ message: "Notification not found" });
    }
  } catch (error) {
    console.error("Error deleting notification:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getDriverNotifications,
  createNotification,
  respondToNotification,
  getUserNotifications,
  getUserById,
  deleteNotification,
};

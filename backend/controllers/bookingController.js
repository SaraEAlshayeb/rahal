// Controllers/rideController.js
const { client } = require("../config/db");

const { ObjectId } = require("mongodb"); // Make sure this is at the top

const getNotReservedRides = async (req, res) => {
  try {
    const userId = req.headers["user-id"];
    if (!userId) {
      return res.status(400).json({ message: "User ID header is missing" });
    }

    const db = client.db("RahalDb");
    const rideCollection = db.collection("ride");

    const notReservedRides = await rideCollection
      .find({
        status: "NotReserved",
        driver: { $ne: new ObjectId(userId) },
      })
      .project({
        _id: 1,
        origin: 1,
        destination: 1,
        date: 1,
        time: 1,
        vehicleType: 1,
        price: 1,
        seatCapacity: 1,
        preferredCommunity: 1,
        image: 1,
        driver: 1,
      })
      .toArray();

    return res.status(200).json(notReservedRides);
  } catch (error) {
    console.error("Failed to fetch NotReserved rides:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

function isValidObjectId(id) {
  return /^[a-f\d]{24}$/i.test(id);
}

const getRideById = async (req, res) => {
  try {
    const rideId = req.params.id;

    if (!isValidObjectId(rideId)) {
      return res.status(400).json({ message: "Invalid ride ID" });
    }

    const db = client.db("RahalDb");
    const rideCollection = db.collection("ride");

    const ride = await rideCollection.findOne({ _id: new ObjectId(rideId) });

    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }

    return res.status(200).json(ride);
  } catch (error) {
    console.error("Error fetching ride by ID:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

const updateRideStatus = async (req, res) => {
  try {
    const rideId = req.params.id;
    const db = client.db("RahalDb");
    const rideCollection = db.collection("ride");

    const result = await rideCollection.updateOne(
      { _id: new ObjectId(rideId) },
      { $set: { status: "InProgress" } }
    );

    if (result.modifiedCount === 1) {
      return res
        .status(200)
        .json({ message: "Ride status updated to InProgress" });
    } else {
      return res
        .status(404)
        .json({ message: "Ride not found or already updated" });
    }
  } catch (error) {
    console.error("Error updating ride status:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const completeRide = async (req, res) => {
  const db = client.db("RahalDb");
  const rideCollection = db.collection("ride");
  const userCollection = db.collection("user");

  const { rideId } = req.params;
  const { rating, feedback, userId, role } = req.body;

  try {
    await rideCollection.updateOne(
      { _id: new ObjectId(rideId) },
      { $set: { status: "Completed" } }
    );

    const ratingField = role === "driver" ? "rate" : "rate";
    const feedbackField = role === "driver" ? "feedback" : "feedback";

    await userCollection.updateOne(
      { _id: new ObjectId(userId) },
      {
        $push: {
          [ratingField]: rating,
          [feedbackField]: feedback,
        },
        $inc: { totalRides: 1 },
      }
    );

    res.status(200).json({ message: "Ride completed and feedback added." });
  } catch (err) {
    res.status(500).json({ error: "Failed to update ride." });
  }
};

const getUserRides = async (req, res) => {
  try {
    const userId = req.headers["user-id"];
    const role = req.headers["role"];

    if (!userId || !role) {
      return res.status(400).json({ message: "Missing user ID or role" });
    }

    const db = client.db("RahalDb");
    const rideCollection = db.collection("ride");

    let rides;

    if (role === "driver") {
      rides = await rideCollection
        .find({ driver: new ObjectId(userId) })
        .toArray();
    } else if (role === "rider") {
      rides = await rideCollection
        .find({ acceptedRiders: { $in: [new ObjectId(userId)] } })
        .toArray();
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    return res.status(200).json(rides);
  } catch (error) {
    console.error("Failed to fetch user rides:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getRidesByUser = async (req, res) => {
  try {
    const userId = req.headers["user-id"];
    const role = req.headers["role"];
    if (!userId || !role) {
      return res
        .status(400)
        .json({ message: "Missing user ID or role in headers" });
    }

    const db = client.db("RahalDb");
    const rideCollection = db.collection("ride");

    let query;
    if (role === "driver") {
      query = { driver: new ObjectId(userId) };
    } else if (role === "rider") {
      query = { acceptedRiders: { $elemMatch: { $eq: new ObjectId(userId) } } };
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    const rides = await rideCollection.find(query).toArray();
    return res.status(200).json(rides);
  } catch (error) {
    console.error("Error fetching user rides:", error.message);
    return res.status(500).json({ error: "Failed to fetch rides" });
  }
};

module.exports = {
  getNotReservedRides,
  getRideById,
  updateRideStatus,
  completeRide,
  getUserRides,
  getRidesByUser,
};

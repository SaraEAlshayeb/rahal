const { ObjectId } = require("mongodb");
const { client } = require("../config/db");

const getNotifications = async (req, res) => {
    const driverId = req.params.driverId;

    if (!driverId) {
        return res.status(400).json({ message: "Driver ID is required" });
    }

    try {
        const db = client.db("RahalDb");

        const rides = await db.collection("ride").find({
            pendingRiders: { $exists: true, $not: { $size: 0 } }
        }).toArray();

        const userCollection = db.collection("user");
        const notifications = [];

        for (const ride of rides) {
            for (const riderName of ride.pendingRiders) {
                const passenger = await userCollection.findOne({ name: riderName });

                if (passenger) {
                    notifications.push({
                        from: ride.origin,
                        to: ride.destination,
                        date: ride.date,
                        passengerName: passenger.name
                    });
                }
            }
        }

        console.log("✅ Notifications found:", notifications);
        res.status(200).json(notifications);

    } catch (err) {
        console.error("❌ Error fetching notifications:", err);
        res.status(500).json({ message: "Server error", error: err });
    }
};

module.exports = { getNotifications };

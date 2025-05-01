const { client } = require("../config/db");
const { ObjectId } = require("mongodb");

// GET /api/users
const getAllUsers = async (req, res) => {
    try {
        const db = client.db("RahalDb");
        const users = await db.collection("user").find({}).toArray();
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// PUT /api/users/suspend
const suspendUser = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    try {
        const db = client.db("RahalDb");
        const result = await db.collection("user").updateOne(
            { email: email },
            { $set: { status: "suspended" } }
        );

        if (result.modifiedCount === 1) {
            res.status(200).json({ message: "User suspended" });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error("Error suspending user:", error);
        res.status(500).json({ message: "Server error" });
    }
};


const getUserByEmail = async (req, res) => {
    const { email } = req.params;

    try {
        const db = client.db("RahalDb");
        const user = await db.collection("user").findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { getAllUsers, suspendUser, getUserByEmail };

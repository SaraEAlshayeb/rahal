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
const registerUser = async (req, res) => {
    const { name, email, password, gender, phone } = req.body;

    if (!name || !email || !password || !gender || !phone) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const db = client.db("RahalDb");
        const userCollection = db.collection("user");

        // Check for duplicate email
        const existingUser = await userCollection.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "Email already registered" });
        }

        // Insert new user
        const newUser = {
            name,
            email,
            password, // consider hashing later
            gender,
            phone,
            status: "active",
            nationalId: "",
            drivingLicense: "",
            vehicleRegistration: "",
            vehicleType: "",
            community: [],
            profileImage: "/profile.png",            
            roles: ["rider"],
            feedback: [],
            notifications: [],
            rate: [],
            totalRides: 0,
            totalEarnings: 0
        };

        await userCollection.insertOne(newUser);

        res.status(201).json({ message: "User registered successfully", name });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Server error", error });
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
const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const db = client.db("RahalDb");
        const user = await db.collection("user").findOne({ _id: new ObjectId(id) });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ name: user.name });
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { getAllUsers, suspendUser ,getUserByEmail,registerUser , getUserById};

const jwt = require('jsonwebtoken');
const { client } = require("../config/db");
const SECRET_KEY = "Thisisthesecret";

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const db = client.db("RahalDb");
        const userCollection = db.collection("user");
        const adminCollection = db.collection("Admin");

        // Check for the user first
        let user = await userCollection.findOne({ email, password });
        if (user) {
            const token = jwt.sign(
                { id: user._id, role: "user", email: user.email },
                SECRET_KEY,
                { expiresIn: '2h' }
            );
            return res.status(200).json({
                role: "user",
                email: user.email,
                id: user._id,
                token
            });
        }

        // Then check for the admin
        let admin = await adminCollection.findOne({ email, password });
        if (admin) {
            const token = jwt.sign(
                { role: "admin", email: admin.email },
                SECRET_KEY,
                { expiresIn: '2h' }
            );
            return res.status(200).json({
                role: "admin",
                email: admin.email,
                token
            });
        }

        // If neither user nor admin is found, return error
        return res.status(401).json({ message: "Invalid credentials" });

    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};

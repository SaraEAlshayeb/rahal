const { client } = require("../config/db");

// GET /profile controller
exports.getProfile = async (req, res) => {
    const email = req.query.email;
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    try {
        const db = client.db("RahalDb");
        const user = await db.collection("user").findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (err) {
        console.error("Profile fetch error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

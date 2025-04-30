const { getDB } = require('../config/db');

const checkUserRole = async (req, res) => {
    const { email } = req.query; // Get email from query params

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    try {
        const db = getDB();
        const collection = db.collection('users'); // Assumes users collection exists
        const user = await collection.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the user is a driver
        if (user.role === 'driver') {
            return res.status(200).json({ role: 'driver' });
        } else {
            return res.status(200).json({ role: 'non-driver' });
        }
    } catch (error) {
        console.error('Error fetching user role:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { checkUserRole };

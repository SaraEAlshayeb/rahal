const { client } = require("../config/db");

const updateUser = async (req, res) => {
    const { email } = req.params;
    const { vehicleType, status, nationalId, drivingLicense, vehicleRegistration } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    try {
        const db = client.db("RahalDb");

        // Prepare the fields to be updated
        const updateFields = {
            vehicleType,
            status,
            nationalId,
            drivingLicense,
            vehicleRegistration,
        };

        const result = await db.collection("user").updateOne(
            { email },
            { $set: updateFields }
        );

        if (result.modifiedCount === 1) {
            res.status(200).json({ message: "User updated successfully" });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { updateUser };
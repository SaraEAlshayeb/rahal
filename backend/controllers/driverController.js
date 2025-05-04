const { client } = require("../config/db");

const updateUser = async (req, res) => {
  const { email } = req.params;
  const { vehicleType, status } = req.body;
  const { drivingLicense, nationalId, vehicleRegistration } = req.files;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const db = client.db("RahalDb");

    const updateFields = {
      vehicleType,
      status,
      ...(drivingLicense && { drivingLicense: drivingLicense[0] }),
      ...(nationalId && { nationalId: nationalId[0] }),
      ...(vehicleRegistration && {
        vehicleRegistration: vehicleRegistration[0],
      }),
    };

    // Remove undefined fields (if no file is uploaded)
    for (const key in updateFields) {
      if (updateFields[key] === undefined) {
        delete updateFields[key];
      }
    }

    const result = await db
      .collection("user")
      .updateOne({ email: email }, { $set: updateFields });

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

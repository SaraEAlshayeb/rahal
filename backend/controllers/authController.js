const { client } = require("../config/db");
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const db = client.db("RahalDb");
        const userCollection = db.collection("user");
        const adminCollection = db.collection("Admin");

        console.log("User Collection:", userCollection); // Debug log for collections
        console.log("Admin Collection:", adminCollection);

        let user = await userCollection.findOne({ email, password });
        if (user) {
            res.status(200).json({ role: "user", email: user.email, id: user._id });
            return;
        }

        let admin = await adminCollection.findOne({ email, password });
        if (admin) {
            res.status(200).json({ role: "admin", email: admin.email });
            return;
        }

        res.status(401).json({ message: "Invalid credentials" });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Server error", error: err });
    }
};

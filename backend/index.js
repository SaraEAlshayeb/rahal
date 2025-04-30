const { MongoClient } = require("mongodb");
const express = require("express");
const cors = require("cors");
 
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json()); // for JSON body parsing
 
app.get("/", (req, res) => {
    res.send("Welcome to Rahal Backend API ");
  });
 
// Replace the uri string with your connection string.
const uri = "mongodb+srv://reemasy24:Rahal%40kfupm@rahaldb.b7mrw16.mongodb.net/?retryWrites=true&w=majority&appName=RahalDb";
const client = new MongoClient(uri);
 
 
// Connect to MongoDB once
async function connectDB() {
    try {
      await client.connect();
      console.log("Connected to MongoDB");
    } catch (err) {
      console.error("MongoDB connection error", err);
    }
}
connectDB();
 
// Login route
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      const db = client.db("RahalDb");
      const userCollection = db.collection("user");
      const adminCollection = db.collection("Admin");
 
      let user = await userCollection.findOne({ email, password });
      if (user) {
        res.status(200).json({ role: "user", email: user.email });
        return;
      }
 
      let admin = await adminCollection.findOne({ email, password });
      if (admin) {
        res.status(200).json({ role: "admin", email: admin.email });
        return;
      }
 
      res.status(401).json({ message: "Invalid credentials" });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err });
    }
});
 
// profile route
app.get("/profile", async (req, res) => {
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
 
        res.status(200).json(user); // ✅ return full user object
    } catch (err) {
        console.error("Profile fetch error:", err);
        res.status(500).json({ message: "Server error" });
    }
});
 
 
 
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});


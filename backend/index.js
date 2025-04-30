const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");
const bodyParser = require('body-parser');
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const communityRouter = require('./routes/communityRoutes');  // Import the router
const userRoutes = require('./routes/user');


const app = express();
const port = 5000;

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
});

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/community", communityRouter);


app.use("/api/profile", profileRoutes);
app.use(bodyParser.json());


/*// profile route
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
// Join a community route
app.post("/joinCommunity", async (req, res) => {
    // Extract userId and communityName from the request body
    const { userId, communityName } = req.body;

    // Check if both userId and communityName are provided
    if (!userId || !communityName) {
        return res.status(400).json({ message: "User ID and community name are required" });
    }

    try {
        const db = client.db("RahalDb");
        const userCollection = db.collection("user");
        const communityCollection = db.collection("Community");




        // 1. Update user's community array
        const userUpdate = await userCollection.updateOne(
            { _id: new ObjectId(userId) }, // Find user by their ID
            { $addToSet: { community: communityName } } // Add communityName to community array
        );

        if (userUpdate.modifiedCount === 0) {
            return res.status(400).json({ message: "Failed to add community to user" });
        }

        // 2. Update community's members array
        const communityUpdate = await communityCollection.updateOne(
            { name: communityName }, // Find community by its name
            { $addToSet: { members: userId } } // Add userId to members array
        );

        if (communityUpdate.modifiedCount === 0) {
            return res.status(400).json({ message: "Failed to add user to community members" });
        }

        // 3. Return success message
        res.status(200).json({ message: `Successfully joined ${communityName} community` });
    } catch (err) {
        console.error("Error joining community:", err);
        res.status(500).json({ message: "Server error", error: err });
    }
});
app.get("/getCommunityData", async (req, res) => {
    try {
        const db = client.db("RahalDb");
        const communityCollection = db.collection("Community");
        console.log(communityCollection.toString());

        // Fetch all communities from the database
        const communities = await communityCollection.find({}).toArray();

        // Map over the communities and add members count
        const communityData = communities.map(community => {
            return {
                name: community.name,
                img: `./${community.name}.png`, // Assuming image name is the same as the community name
                members: community.members ? community.members.length : 0 // Get the length of the members array
            };
        });

        res.status(200).json(communityData);

    } catch (err) {
        console.error("Error fetching community data:", err);
        res.status(500).json({ message: "Server error", error: err });
    }
});*/






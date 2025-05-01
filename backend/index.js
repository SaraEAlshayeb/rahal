const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");
const bodyParser = require('body-parser');
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const communityRouter = require('./routes/communityRoutes');  // Import the router
const postRideRoutes = require('./routes/postRideRoutes');
const userRoutes = require("./routes/user");

const app = express();
const port = 5000;

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/community", communityRouter); // Ensure this route is only listed once


app.use("/api/profile", profileRoutes);
app.use("/api/rides", postRideRoutes);

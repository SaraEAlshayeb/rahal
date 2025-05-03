const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const communityRouter = require("./routes/communityRoutes");
const postRideRoutes = require("./routes/postRideRoutes");
const userRoutes = require("./routes/user");
const driverRoutes = require("./routes/driverRoutes"); // <-- add this
const notificationRoutes = require("./routes/notificationRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

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
app.use("/api", bookingRoutes);

// Serve uploaded files statically
app.use("/uploads", express.static("uploads"));
app.use("/api/notifications", notificationRoutes);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/community", communityRouter);
app.use("/api/profile", profileRoutes);
app.use("/api/rides", postRideRoutes);
app.use("/api/drivers", driverRoutes); // <-- register route here

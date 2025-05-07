require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");
const bodyParser = require("body-parser");

// Import route files
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const communityRouter = require("./routes/communityRoutes");
const postRideRoutes = require("./routes/postRideRoutes");
const userRoutes = require("./routes/user");
const driverRoutes = require("./routes/driverRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const approveDriverRoutes = require("./routes/approveDriverRoutes");
const historyRoutes = require("./routes/historyRoute");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();
const port = process.env.PORT || 5000;

// Connect to DB and start server
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});

// Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Static file serving
app.use("/uploads", express.static("uploads"));

// API routes — clean and scoped
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/community", communityRouter);
app.use("/api/rides", postRideRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/approve", approveDriverRoutes);
app.use("/api/bookings", bookingRoutes);

// Catch-all 404 handler for unhandled routes
app.use((req, res) => {
  res.status(404).send("Route not found.");
});

import { client } from "../config/db.js";
import asyncHandler from 'express-async-handler';
import {ObjectId} from "mongodb";


const checkUserRole = async (req, res) => {
    const { email } = req.query;

    console.log("Received email in checkUserRole:", email);  // Debug log

    if (!email) {
        return res.status(400).json({ message: "Email query parameter is required" });
    }

    try {
        const db = client.db("RahalDb");
        const collection = db.collection('user');

        const normalizedEmail = email.trim().toLowerCase();

        const user = await collection.findOne({ email: normalizedEmail });

        if (!user) {
            console.log("User not found for email:", normalizedEmail);
            return res.status(404).json({ message: "User not found" });
        }

        console.log("User roles:", user.roles);

        const roles = user.roles || [];
        if (roles.includes('driver')) {
            return res.status(200).json({ role: 'driver', driverId: user._id });
        } else {
            return res.status(200).json({ role: 'non-driver' });
        }

    } catch (error) {
        console.error('Error fetching user role:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
const postRide = asyncHandler(async (req, res) => {
    const { from, to, date, time, vehicleType, seatCapacity, price, preferredCommunity, driver } = req.body;

    if (!from || !to || !date || !time) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const rideDate = new Date(date);

    if (isNaN(rideDate)) {
        return res.status(400).json({ message: "Invalid date format" });
    }

    const rideData = {
        driver:new ObjectId(driver),
        origin: from,
        destination: to,
        date: rideDate,
        time,
        vehicleType,
        seatCapacity: Number(seatCapacity),
        price: Number(price),
        preferredCommunity,
        status: "in progress",
        pendingRiders: [],
        acceptedRiders: [],
    };

    const db = client.db("RahalDb");
    const ridesCollection = db.collection("ride");

    const result = await ridesCollection.insertOne(rideData);
    const insertedRide = await ridesCollection.findOne({ _id: result.insertedId });

    return res.status(201).json({
        message: "Ride posted successfully",
        ride: insertedRide,
    });
});


export { checkUserRole, postRide };

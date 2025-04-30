const { MongoClient } = require("mongodb");

const uri = "mongodb://reemasy24:Rahal%40kfupm@ac-ykvpn67-shard-00-00.b7mrw16.mongodb.net:27017,ac-ykvpn67-shard-00-01.b7mrw16.mongodb.net:27017,ac-ykvpn67-shard-00-02.b7mrw16.mongodb.net:27017/?ssl=true&replicaSet=atlas-6o3iwo-shard-0&authSource=admin&retryWrites=true&w=majority&appName=RahalDb";

const client = new MongoClient(uri);

const connectDB = async () => {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("MongoDB connection error", err);
        process.exit(1);  // Optional: Can remove to keep the server running
    }
};

module.exports = { client, connectDB };

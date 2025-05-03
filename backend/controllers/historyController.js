const { client } = require('../config/db');
const { ObjectId } = require('mongodb');

const getDriverHistory = async (req, res) => {
  const db = client.db('RahalDb');
  const { id } = req.params;

  try {
    const rideCollection = db.collection('ride');
    const userCollection = db.collection('user');

    const rides = await rideCollection.find({ driver: new ObjectId(id) }).toArray();

    for (const ride of rides) {
      // Convert IDs to strings
      ride._id = ride._id.toString();
      ride.driver = ride.driver?.toString();
      ride.acceptedRiders = ride.acceptedRiders?.map(rid => rid.toString());

      // Get passenger name from first accepted rider (if any)
      if (ride.acceptedRiders && ride.acceptedRiders.length > 0) {
        const passengerId = new ObjectId(ride.acceptedRiders[0]);
        const passenger = await userCollection.findOne({ _id: passengerId });
        ride.passengerName = passenger ? passenger.name : "Unknown Passenger";
      }
    }

    res.status(200).json(rides);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch driver history' });
  }
};

const getRiderHistory = async (req, res) => {
  const db = client.db('RahalDb');
  const { id } = req.params;

  try {
    const rides = await db.collection('ride').find({
      acceptedRiders: { $in: [new ObjectId(id)] }
    }).toArray();

    rides.forEach(r => {
      r._id = r._id.toString();
      r.driver = r.driver?.toString();
      r.acceptedRiders = r.acceptedRiders?.map(rid => rid.toString());
    });

    res.status(200).json(rides);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch rider history' });
  }
};
const submitComplaint = async (req, res) => {
    const db = client.db('RahalDb');
    const { issuedBy, driverId, rideId, description } = req.body;

    if (!issuedBy || !driverId || !rideId || !description) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
  
    try {
      const complaint = {
        issuedBy: new ObjectId(issuedBy),
        driverId: new ObjectId(driverId),
        rideId: new ObjectId(rideId),
        description,
        date: new Date(),
        status: 'pending'
      };
  
      const result = await db.collection('complaint').insertOne(complaint);
      res.status(201).json({ message: 'Complaint submitted', id: result.insertedId });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to submit complaint' });
    }
  };
  
module.exports = {
  getDriverHistory,
  getRiderHistory,
  submitComplaint 
};

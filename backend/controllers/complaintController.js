const { ObjectId } = require('mongodb');
const { client } = require('../config/db'); // or your MongoDB client setup


  
exports.getAllComplaints = async (req, res) => {
    try {
      const db = client.db('RahalDb');
      const complaintCollection = db.collection('complaint');
      const userCollection = db.collection('user');
  
      const complaints = await complaintCollection.find().toArray();
  
      const populated = await Promise.all(complaints.map(async (c) => {
        const user = await userCollection.findOne({ _id: new ObjectId(c.issuedBy) });
        const driver = await userCollection.findOne({ _id: new ObjectId(c.driverId) });
  
        return {
          ...c,
          issuedByName: user ? user.name : 'Unknown User',
          issuedByEmail: user?.email || 'N/A',
          issuedByPhone: user?.phone || 'N/A',
          driverName: driver ? driver.name : 'Unknown Driver'
        };
      }));
  
      res.json(populated);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch complaints' });
    }
  };
  
exports.updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const db = client.db('RahalDb');
    const complaintCollection = db.collection('complaint');

    const result = await complaintCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: status } }
    );

    res.json({ success: true, modifiedCount: result.modifiedCount });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update status' });
  }
};

exports.deleteComplaint = async (req, res) => {
    const { id } = req.params;
    try {
      const db = client.db('RahalDb');
      const complaintCollection = db.collection('complaint');
  
      const result = await complaintCollection.deleteOne({ _id: new ObjectId(id) });
      res.json({ success: true, deletedCount: result.deletedCount });
    } catch (err) {
      console.error("Error deleting complaint:", err);
      res.status(500).json({ error: 'Failed to delete complaint' });
    }
  };
  
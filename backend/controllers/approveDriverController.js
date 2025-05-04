const { client } = require('../config/db');
const { ObjectId } = require('mongodb');

// ✅ Fetch all users with status "InProgress"
const getPendingDrivers = async (req, res) => {
    try {
        const db = client.db('RahalDb');
        const users = db.collection('user');

        const pending = await users.find(
            { status: 'InProgress' },
            { projection: { name: 1, _id: 1 } }
        ).toArray();

        // ✅ Convert _id from ObjectId to string for safe frontend usage
        const formatted = pending.map(user => ({
            _id: user._id.toString(),
            name: user.name
        }));

        res.status(200).json(formatted);
    } catch (err) {
        console.error('Error fetching pending drivers:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// ✅ Fetch single user by ID
const getUserById = async (req, res) => {
    const userId = req.params.id;

    // ✅ Validate ObjectId format
    if (!ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }

    try {
        const db = client.db('RahalDb');
        const users = db.collection('user');

        const user = await users.findOne({ _id: new ObjectId(userId) });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (err) {
        console.error('Error fetching user by ID:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const approveUserById = async (req, res) => {
    const userId = req.params.id;

    if (!ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }

    try {
        const db = client.db('RahalDb');
        const users = db.collection('user');

        // Fetch the user to get current roles
        const user = await users.findOne({ _id: new ObjectId(userId) });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Add 'driver' role without duplication
        const updatedRoles = Array.isArray(user.roles)
            ? [...new Set([...user.roles, 'driver'])]
            : ['driver'];

        // Update status and roles
        const result = await users.updateOne(
            { _id: new ObjectId(userId) },
            {
                $set: {
                    status: 'Active',
                    roles: updatedRoles
                }
            }
        );

        if (result.modifiedCount === 0) {
            return res.status(400).json({ message: 'User not modified' });
        }

        res.status(200).json({ message: 'User approved and role updated' });
    } catch (err) {
        console.error('Error approving user:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const rejectUserById = async (req, res) => {
    const userId = req.params.id;

    if (!ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }

    try {
        const db = client.db('RahalDb');
        const users = db.collection('user');

        const result = await users.updateOne(
            { _id: new ObjectId(userId) },
            { $set: { status: 'Rejected' } }
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: 'User not found or already rejected' });
        }

        res.status(200).json({ message: 'User rejected' });
    } catch (err) {
        console.error('Error rejecting user:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = {
    getPendingDrivers,
    getUserById,
    approveUserById,
    rejectUserById
};




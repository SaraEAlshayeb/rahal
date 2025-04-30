const jwt = require('jsonwebtoken');
const User = require('../models/user');

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Step 1: Find the user in MongoDB by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials (email not found)' });
        }

        // Step 2: Compare the entered password with plain password from MongoDB
        if (password !== user.password) {
            return res.status(400).json({ message: 'Invalid credentials (wrong password)' });
        }

        // Step 3: If login successful, return user info and a JWT token
        const token = generateToken(user._id);

        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            token
        });

    } catch (error) {
        console.error(' Full Login error:', JSON.stringify(error, null, 2));
        res.status(500).json({ message: 'Server error during login' });
    }
    
};

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, 'your_jwt_secret', { expiresIn: '30d' });
};

module.exports = {
    loginUser,
};

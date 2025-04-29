const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');

const jwtSecret = 'mySimpleSecret123'; // ✅ Simple hardcoded secret

// Register user
const registerUser = async (req, res) => {
    const { name, email, password, phone, gender } = req.body;

    if (!name || !email || !password  ||!phone || !gender) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        phone,
        gender,
    });

    const token = jwt.sign({ id: newUser._id }, jwtSecret, { expiresIn: '30d' });

    res.status(201).json({
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        token,
    });
};

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '30d' });

    res.json({
        id: user._id,
        name: user.name,
        email: user.email,
        token,
    });
};

module.exports = { registerUser, loginUser };
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Temporary fake database
const users = [];

// @desc    Register new user
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name  ||!email || !password) {
        return res.status(400).json({ message: 'Please provide all fields' });
    }

    const userExists = users.find(u => u.email === email);
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
        id: users.length + 1,
        name,
        email,
        password: hashedPassword
    };

    users.push(newUser);

    const token = generateToken(newUser.id);

    res.status(201).json({ id: newUser.id, name: newUser.name, email: newUser.email, token });
};

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email);

    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user.id);

    res.json({ id: user.id, name: user.name, email: user.email, token });
};

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, 'your_jwt_secret', { expiresIn: '30d' });
};

module.exports = {
    registerUser,
    loginUser
};
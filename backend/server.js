const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db');
const cors = require('cors'); // ⭐ Add this

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors()); // ⭐ Allow frontend to access backend
app.use(express.json());

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

app.get('/api', (req, res) => {
    res.json({ message: "Hello from the server!" });
});

connectDB();
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

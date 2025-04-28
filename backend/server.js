const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(express.json());

// Import routes
const userRoutes = require('./routes/userRoutes');

// Use routes
app.use('/api/users', userRoutes);

// Default route (optional)
app.get('/api', (req, res) => {
    res.json({ message: "Hello from the server!" });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
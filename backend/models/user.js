// Will be used later when MongoDB is ready
// For now, just a placeholder
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });

const user = mongoose.model('user', userSchema);

module.exports = user;
const express = require('express');
const { checkUserRole, postRide } = require('../controllers/postRideController');
const router = express.Router();

// Check user role
router.get('/checkRole', checkUserRole);

// Post a new ride
router.post('/create', postRide);

module.exports = router;

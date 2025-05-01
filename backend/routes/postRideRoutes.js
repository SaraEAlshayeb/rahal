const express = require('express');
const { checkUserRole, postRide } = require('../controllers/postRideController');
const router = express.Router();

// Check user role
router.get('/checkRole', checkUserRole);

router.post('/postRide', postRide);

module.exports = router;

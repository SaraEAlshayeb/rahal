const express = require('express');
const { checkUserRole } = require('../controllers/postRideController');
const router = express.Router();

// Define the route to check if the user is a driver
router.get('/checkRole', checkUserRole);

module.exports = router;

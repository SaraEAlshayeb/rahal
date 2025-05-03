const express = require('express');
const router = express.Router();
const { getPendingDrivers , getUserById, approveUserById , rejectUserById} = require('../controllers/approveDriverController');

router.get('/pending', getPendingDrivers); // GET /approve/pending
router.get('/user/:id', getUserById);
router.put('/user/:id/approve', approveUserById);
router.put('/user/:id/reject', rejectUserById);

module.exports = router;

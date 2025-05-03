const express = require('express');
const router = express.Router();
const controller = require('../controllers/complaintController');

router.get('/', controller.getAllComplaints);
router.put('/:id', controller.updateStatus);
router.delete('/:id', controller.deleteComplaint);

module.exports = router;

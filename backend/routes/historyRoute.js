const express = require('express');
const router = express.Router();
const { getDriverHistory, getRiderHistory, submitComplaint  } = require('../controllers/historyController');

router.get('/driver/:id', getDriverHistory);
router.get('/rider/:id', getRiderHistory);
router.post('/submit', submitComplaint);
module.exports = router;


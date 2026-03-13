const express = require('express');
const router = express.Router();
const { getAlerts, createAlert } = require('../controllers/alertController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', protect, authorize('Admin', 'Counselor'), getAlerts);
router.post('/create', protect, authorize('Admin', 'Counselor'), createAlert);

module.exports = router;

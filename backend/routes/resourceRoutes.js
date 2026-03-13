const express = require('express');
const router = express.Router();
const { getResources, updateResource } = require('../controllers/resourceController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', protect, authorize('Admin', 'Counselor'), getResources);
router.post('/update', protect, authorize('Admin'), updateResource);

module.exports = router;

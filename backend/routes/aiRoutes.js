const express = require('express');
const router = express.Router();
const { analyzeRisk, getRiskScore, getHighRiskStudents } = require('../controllers/aiController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/analyze', protect, analyzeRisk);
router.get('/risk/:studentId', protect, getRiskScore);
router.get('/high-risk', protect, authorize('Admin', 'Counselor'), getHighRiskStudents);

module.exports = router;

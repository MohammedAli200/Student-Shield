const express = require('express');
const router = express.Router();
const { getStudentData } = require('../controllers/studentController');
const { protect } = require('../middleware/authMiddleware');

// POST /data removed - only Faculty can enter student data via POST /api/faculty/student-data
router.get('/:id', protect, getStudentData);

module.exports = router;

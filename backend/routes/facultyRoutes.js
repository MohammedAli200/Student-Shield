const express = require('express');
const router = express.Router();
const { submitStudentData, getStudents } = require('../controllers/facultyController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/student-data', protect, authorize('Faculty'), submitStudentData);
router.get('/students', protect, authorize('Faculty'), getStudents);

module.exports = router;

const mongoose = require('mongoose');

const academicRecordSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  attendancePercentage: { type: Number, required: true },
  assignmentSubmissionRate: { type: Number, required: true },
  gpa: { type: Number, required: true },
  courseBacklogCount: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('AcademicRecord', academicRecordSchema);

const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  riskScore: { type: Number, required: true },
  status: { type: String, enum: ['Open', 'Resolved', 'In Progress'], default: 'Open' },
  sentTo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Counselors/Admins
}, { timestamps: true });

module.exports = mongoose.model('Alert', alertSchema);

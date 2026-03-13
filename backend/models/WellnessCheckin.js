const mongoose = require('mongoose');

const wellnessCheckinSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mood: { type: String, enum: ['Happy', 'Neutral', 'Sad', 'Stressed', 'Burnout', 'Critical'], required: true },
  stressLevel: { type: Number, min: 1, max: 10, required: true },
  sleepHours: { type: Number, required: true },
  notes: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('WellnessCheckin', wellnessCheckinSchema);

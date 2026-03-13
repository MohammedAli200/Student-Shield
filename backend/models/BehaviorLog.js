const mongoose = require('mongoose');

const behaviorLogSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  libraryUsageHoursPerWeek: { type: Number, default: 0 },
  campusEventParticipation: { type: Number, default: 0 }, // events per month
  hostelEntryExitLogIssues: { type: Number, default: 0 }, // irregular entries count
  socialActivityParticipation: { type: Number, default: 0 }, // activities count
}, { timestamps: true });

module.exports = mongoose.model('BehaviorLog', behaviorLogSchema);

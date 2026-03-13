const mongoose = require('mongoose');

const riskScoreSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, required: true }, // 0 to 100
  dropoutProbability: { type: Number, required: true }, // 0 to 1
  burnoutRisk: { type: Number, required: true }, // 0 to 1
  mentalStressLevel: { type: Number, required: true }, // 0 to 10
  suicideRisk: { type: Number, required: true }, // 0 to 1
  riskLevel: { type: String, enum: ['Low Risk', 'Medium Risk', 'High Risk', 'Critical Risk'], required: true },
}, { timestamps: true });

module.exports = mongoose.model('RiskScore', riskScoreSchema);

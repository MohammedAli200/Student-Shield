const mongoose = require('mongoose');

const campusResourceSchema = new mongoose.Schema({
  type: { type: String, enum: ['HostelRoom', 'StudyRoom', 'Classroom', 'EnergyZone', 'WaterZone'], required: true },
  name: { type: String, required: true },
  capacity: { type: Number },
  currentOccupancy: { type: Number, default: 0 },
  energyCurrentUsage: { type: Number, default: 0 }, // in kW or relevant unit
  waterCurrentUsage: { type: Number, default: 0 }, // in Liters
}, { timestamps: true });

module.exports = mongoose.model('CampusResource', campusResourceSchema);

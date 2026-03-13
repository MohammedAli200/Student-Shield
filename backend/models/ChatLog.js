const mongoose = require('mongoose');

const chatLogSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  response: { type: String, required: true },
  sentimentScore: { type: Number, default: 0 }, // -1 to +1
}, { timestamps: true });

module.exports = mongoose.model('ChatLog', chatLogSchema);

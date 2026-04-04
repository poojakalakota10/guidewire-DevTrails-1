const mongoose = require('mongoose');

const ClaimSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  policy: { type: mongoose.Schema.Types.ObjectId, ref: 'Policy', required: true },
  triggerType: { type: String, required: true }, // Rain Trigger, Temp Trigger, etc.
  triggerZone: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected', 'Flagged'], default: 'Pending' },
  fraudScore: { type: Number, default: 0 },
  fraudReasons: [{ type: String }],
  snapshotData: { type: mongoose.Schema.Types.Mixed }, // e.g. { rainfall: 18, aqi: 285 }
  payoutTime: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Claim', ClaimSchema);

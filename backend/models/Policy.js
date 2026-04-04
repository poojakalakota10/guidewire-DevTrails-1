const mongoose = require('mongoose');

const PolicySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  planName: { type: String, enum: ['Basic Shield', 'Pro Shield', 'Max Shield'], required: true },
  weeklyPremium: { type: Number, required: true },
  payoutPerDay: { type: Number, required: true },
  maxDays: { type: Number, required: true },
  startDate: { type: Date, default: Date.now },
  expiryDate: { type: Date, required: true },
  status: { type: String, enum: ['Active', 'Expired', 'Cancelled'], default: 'Active' }
}, { timestamps: true });

module.exports = mongoose.model('Policy', PolicySchema);

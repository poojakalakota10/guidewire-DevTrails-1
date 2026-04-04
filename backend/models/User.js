const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['worker', 'admin'], default: 'worker' },
  platform: { type: String },
  zone: { type: String },
  avgDailyEarnings: { type: Number },
  hoursPerDay: { type: Number },
  yearsOnPlatform: { type: Number },
  riskScore: { type: Number, default: 0 },
  riskTier: { type: String, enum: ['Low Risk', 'Medium Risk', 'High Risk'] },
  basePremium: { type: Number, default: 0 },
  hasActivePolicy: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);

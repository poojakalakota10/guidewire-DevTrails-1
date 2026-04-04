const express = require('express');
const router = express.Router();
const Policy = require('../models/Policy');
const Claim = require('../models/Claim');
const User = require('../models/User');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

router.get('/stats', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const activePolicies = await Policy.countDocuments({ status: 'Active' });
    
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const recentPolicies = await Policy.find({ status: 'Active', createdAt: { $gte: weekAgo } });
    const premiumRevenue = recentPolicies.reduce((sum, p) => sum + p.weeklyPremium, 0);

    const paidClaims = await Claim.find({ status: 'Approved', payoutTime: { $gte: weekAgo } });
    const claimsPaidSum = paidClaims.reduce((sum, c) => sum + c.amount, 0);

    const lossRatio = premiumRevenue > 0 ? (claimsPaidSum / premiumRevenue) * 100 : 0;

    res.json({
      activePolicies,
      weeklyPremiumRevenue: premiumRevenue,
      claimsPaidThisWeek: claimsPaidSum,
      lossRatio: lossRatio.toFixed(2)
    });
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

router.get('/claims', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const claims = await Claim.find().populate('user', 'name email zone').sort({ createdAt: -1 });
    res.json(claims);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

router.post('/claims/:id/action', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { action } = req.body; // 'Approved' or 'Rejected'
    if (!['Approved', 'Rejected'].includes(action)) return res.status(400).json({ error: 'Invalid action' });

    const update = { status: action };
    if (action === 'Approved') update.payoutTime = new Date();
    
    const claim = await Claim.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json(claim);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;

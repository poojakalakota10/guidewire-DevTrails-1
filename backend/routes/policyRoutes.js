const express = require('express');
const router = express.Router();
const Policy = require('../models/Policy');
const User = require('../models/User');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/create', authMiddleware, async (req, res) => {
  try {
    const { planName, weeklyPremium, payoutPerDay, maxDays } = req.body;
    
    // Deactivate old policies
    await Policy.updateMany({ user: req.user.id, status: 'Active' }, { status: 'Expired' });

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7); // 7 days from now

    const policy = new Policy({
      user: req.user.id,
      planName,
      weeklyPremium,
      payoutPerDay,
      maxDays,
      expiryDate,
      status: 'Active'
    });

    await policy.save();

    await User.findByIdAndUpdate(req.user.id, { hasActivePolicy: true });

    res.status(201).json({ message: 'Policy Activated', policy });
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

router.get('/active', authMiddleware, async (req, res) => {
  try {
    const policy = await Policy.findOne({ user: req.user.id, status: 'Active' });
    if (!policy) return res.json(null);
    res.json(policy);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;

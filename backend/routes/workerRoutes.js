const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { authMiddleware } = require('../middleware/authMiddleware');

router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

router.get('/risk-score', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('riskScore riskTier basePremium zone hoursPerDay yearsOnPlatform');
    const factors = [
      `Zone Risk: ${user.zone}`,
      `Hours Risk: ${user.hoursPerDay} hrs/day`,
      `Experience Risk: ${user.yearsOnPlatform} years`
    ];
    res.json({ ...user.toObject(), factors });
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;

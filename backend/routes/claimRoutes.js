const express = require('express');
const router = express.Router();
const Claim = require('../models/Claim');
const Policy = require('../models/Policy');
const User = require('../models/User');
const { authMiddleware } = require('../middleware/authMiddleware');
const { calculateFraudScore } = require('../services/fraudDetection');

router.get('/my-claims', authMiddleware, async (req, res) => {
  try {
    const claims = await Claim.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(claims);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Demo Simulation Route
router.post('/trigger-demo', authMiddleware, async (req, res) => {
  try {
    const { triggerType, triggerZone, snapshotData } = req.body;
    
    const worker = await User.findById(req.user.id);
    const activePolicy = await Policy.findOne({ user: req.user.id, status: 'Active' });
    
    if (!activePolicy) {
      return res.status(400).json({ error: 'No active policy found' });
    }

    // Run Fraud Engine
    const { score, reasons, status } = await calculateFraudScore(worker, { triggerZone, triggerType });
    
    const claim = new Claim({
      user: worker._id,
      policy: activePolicy._id,
      triggerType,
      triggerZone,
      amount: activePolicy.payoutPerDay,
      status,
      fraudScore: score,
      fraudReasons: reasons,
      snapshotData,
      payoutTime: status === 'Approved' ? new Date() : null
    });

    await claim.save();

    res.status(201).json({ message: 'Claim triggered and evaluated', claim });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;

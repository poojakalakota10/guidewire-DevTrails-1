const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { calculateRiskScore } = require('../services/riskEngine');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretjwt';

router.post('/register', async (req, res) => {
  try {
    const { name, phone, email, password, platform, zone, avgDailyEarnings, hoursPerDay, yearsOnPlatform, role } = req.body;
    
    // Check if user exists
    let existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'User already exists' });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Initial Risk Score
    const newUserData = {
      name, phone, email, password: hashedPassword, platform, zone, 
      avgDailyEarnings: Number(avgDailyEarnings),
      hoursPerDay: Number(hoursPerDay),
      yearsOnPlatform: Number(yearsOnPlatform),
      role: role || 'worker'
    };

    const riskProfile = await calculateRiskScore(newUserData);

    const user = new User({
      ...newUserData,
      riskScore: riskProfile.score,
      riskTier: riskProfile.riskTier,
      basePremium: riskProfile.basePremium
    });

    await user.save();

    // Generate Token
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ 
      token, 
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email, 
        role: user.role, 
        ...riskProfile 
      } 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email, role: user.role, riskScore: user.riskScore } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;

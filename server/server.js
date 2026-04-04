const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cron = require('node-cron');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

// In-Memory Database for Hackathon Speed & Reliability (Mocking MongoDB collections)
const db = {
  users: [],
  policies: [],
  claims: []
};

// =======================
// ROUTES
// =======================

// 1. Onboarding & Registration
app.post('/api/auth/register', async (req, res) => {
  const { name, city, zone, platform, avg_earnings, hours_per_week } = req.body;
  
  // Call AI Microservice for Risk Scoring
  let risk_score, risk_tier, premium_modifier;
  try {
    const aiResponse = await axios.post('http://127.0.0.1:5000/api/ai/risk-score', {
      zone,
      hours_per_week
    });
    const riskData = aiResponse.data;
    risk_score = riskData.score;
    risk_tier = riskData.tier;
    premium_modifier = riskData.premium_modifier;
  } catch (error) {
    console.warn("AI Service unavailable, using default risk");
    risk_score = 50; risk_tier = "Medium"; premium_modifier = 0;
  }

  const user = {
    id: `U${Date.now()}`,
    name, city, zone, platform, avg_earnings, hours_per_week,
    risk_score, risk_tier, premium_modifier,
    active_policy: null
  };
  
  db.users.push(user);
  res.status(201).json({ message: "Registered successfully", user });
});

app.get('/api/users/:userId', (req, res) => {
  const user = db.users.find(u => u.id === req.params.userId);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

// 2. Buy / Renew Policy
const PLAN_TIERS = {
  basic: { base_price: 29, payout: 300, max_days: 2 },
  pro: { base_price: 49, payout: 500, max_days: 3 },
  max: { base_price: 69, payout: 700, max_days: 5 }
};

app.post('/api/policies/buy', (req, res) => {
  const { userId, plan_type } = req.body;
  const user = db.users.find(u => u.id === userId);
  if (!user) return res.status(404).json({ error: "User not found" });
  
  const plan = PLAN_TIERS[plan_type.toLowerCase()];
  if (!plan) return res.status(400).json({ error: "Invalid plan" });
  
  const final_premium = plan.base_price + (user.premium_modifier || 0);
  
  const policy = {
    id: `POL${Date.now()}`,
    userId,
    plan_type,
    weekly_premium: final_premium,
    payout_per_day: plan.payout,
    status: "Active",
    valid_until: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
  };
  
  db.policies.push(policy);
  user.active_policy = policy.id;
  
  res.status(200).json({ message: "Policy purchased", policy });
});

// 3. Claims Dashboard Data
app.get('/api/claims/:userId', (req, res) => {
  const userClaims = db.claims.filter(c => c.userId === req.params.userId);
  res.json(userClaims);
});

// Admin endpoints
app.get('/api/admin/stats', (req, res) => {
  res.json({
    total_users: db.users.length,
    active_policies: db.policies.filter(p => p.status === 'Active').length,
    total_claims: db.claims.length,
    claims: db.claims
  });
});

// 4. Mock Parametric Trigger (Simulating the Cron Job for Demo)
app.post('/api/trigger/simulate', async (req, res) => {
  const { zone, trigger_type, description } = req.body;
  
  // Find all active users in that zone
  const affectedUsers = db.users.filter(u => u.zone === zone && u.active_policy);
  const newClaims = [];
  
  for (const user of affectedUsers) {
    const policy = db.policies.find(p => p.id === user.active_policy);
    
    // Call AI Service for Fraud detection
    let fraud_status = "AUTO_APPROVE", reasons = ["System clean"];
    try {
      const aiResponse = await axios.post('http://127.0.0.1:5000/api/ai/fraud-score', {
        user_zone: user.zone,
        disruption_zone: zone,
        recent_claims: db.claims.filter(c => c.userId === user.id).length,
        weather_verified: true
      });
      fraud_status = aiResponse.data.action;
      reasons = aiResponse.data.reasons;
    } catch (error) {
      console.warn("AI Fraud Service unavailable");
    }
    
    let final_status = fraud_status === "AUTO_APPROVE" ? "Approved" : 
                       fraud_status === "MANUAL_REVIEW" ? "Pending" : "Rejected";
                       
    const claim = {
      id: `CLM${Date.now()}${user.id}`,
      userId: user.id,
      trigger_type,
      description,
      amount: policy.payout_per_day,
      status: final_status,
      fraud_reasons: reasons,
      timestamp: new Date()
    };
    
    db.claims.push(claim);
    newClaims.push(claim);
  }
  
  res.json({ message: `Triggered ${trigger_type} in ${zone}`, claimants: newClaims.length, newClaims });
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
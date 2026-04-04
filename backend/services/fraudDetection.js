const axios = require('axios');
const Claim = require('../models/Claim');

async function calculateFraudScore(worker, claimParams) {
  let score = 0;
  let reasons = [];
  let status = "Approved";

  try {
    // Attempt to call AI Fraud Detection
    const aiUrl = process.env.AI_SERVICE_URL || 'https://guidewire-devtrails-1-1.onrender.com';
    const aiResponse = await axios.post(`${aiUrl}/api/ai/fraud-score`, {
      user_zone: worker.zone,
      disruption_zone: claimParams.triggerZone,
      recent_claims: 0, // Simplified for AI call
      weather_verified: true
    });

    if (aiResponse.data) {
      score = aiResponse.data.fraud_score;
      reasons = aiResponse.data.reasons;
      
      if (score >= 40 && score <= 70) status = "Flagged";
      else if (score > 70) status = "Rejected";

      console.log(`[AI SERVICE] Fraud Score for ${worker.email}: ${score} (${status})`);
      return { score, reasons, status };
    }
  } catch (error) {
    console.error("[AI SERVICE ERROR] Falling back to rule-based fraud detection:", error.message);
  }

  // FALLBACK: Rule-based logic (original)
  // Rule 1: Zone mismatch
  if (worker.zone !== claimParams.triggerZone) {
    score += 40;
    reasons.push(`User zone (${worker.zone}) does not match disruption zone (${claimParams.triggerZone})`);
  }
  
  // Rule 2: Too many claims this month
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0,0,0,0);
  
  const claimsThisMonth = await Claim.countDocuments({
    user: worker._id,
    createdAt: { $gte: startOfMonth }
  });

  if (claimsThisMonth > 5) {
    score += 30;
    reasons.push("Excessive claim frequency (>5 this month)");
  }
  
  // Rule 3: Duplicate claim same event
  const today = new Date();
  today.setHours(0,0,0,0);

  const duplicateExists = await Claim.findOne({
    user: worker._id,
    triggerZone: claimParams.triggerZone,
    triggerType: claimParams.triggerType,
    createdAt: { $gte: today }
  });

  if (duplicateExists) {
    score += 50;
    reasons.push("Duplicate claim detected for the same event today");
  }
  
  // Rule 4: No active policy at time of claim
  if (!worker.hasActivePolicy) {
    score += 60;
    reasons.push("Worker did not have an active policy");
  }
  
  score = Math.min(score, 100);

  if (score >= 40 && score <= 70) status = "Flagged";
  if (score > 70) status = "Rejected";

  return { score, reasons, status };
}

module.exports = { calculateFraudScore };


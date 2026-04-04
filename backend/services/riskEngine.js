const axios = require('axios');

async function calculateRiskScore(user) {
  let score = 0;
  let riskTier = "Medium Risk";
  let basePremium = 49;

  try {
    // Attempt to get AI-powered risk score
    const aiServiceUrl = process.env.AI_SERVICE_URL || 'http://127.0.0.1:5000';
    const aiResponse = await axios.post(`${aiServiceUrl}/api/ai/risk-score`, {
      zone: user.zone,
      hours_per_week: (user.hoursPerDay || 8) * 5, // Estimate weekly
      platform: user.platform
    });

    if (aiResponse.data && aiResponse.data.risk_score !== undefined) {
      score = aiResponse.data.risk_score;
      riskTier = aiResponse.data.risk_tier;
      
      // Calculate premium based on AI score
      if (score <= 35) basePremium = 29;
      else if (score <= 65) basePremium = 49;
      else basePremium = 69;

      console.log(`[AI SERVICE] Risk Score calculated for ${user.email}: ${score} (${riskTier})`);
      return { score, riskTier, basePremium };
    }
  } catch (error) {
    console.error("[AI SERVICE ERROR] Falling back to rule-based risk scoring:", error.message);
  }

  // FALLBACK: Rule-based logic (original)
  // Zone risk (based on Hyderabad flood/rain history)
  const zoneRisk = { 
    'LB Nagar': 35, 'Uppal': 30, 'Kukatpally': 20, 
    'Kondapur': 15, 'Madhapur': 15, 'Secunderabad': 25 
  };
  score += zoneRisk[user.zone] || 20;
  
  if (user.hoursPerDay > 10) score += 20;
  else if (user.hoursPerDay > 7) score += 10;
  else score += 5;
  
  if (user.yearsOnPlatform < 1) score += 20;
  else if (user.yearsOnPlatform < 3) score += 10;
  else score += 5;
  
  if (user.avgDailyEarnings < 400) score += 25;
  else if (user.avgDailyEarnings < 600) score += 15;
  else score += 5;
  
  score = Math.min(score, 100);

  if (score <= 35) {
    riskTier = "Low Risk";
    basePremium = 29;
  } else if (score <= 65) {
    riskTier = "Medium Risk";
    basePremium = 49;
  } else {
    riskTier = "High Risk";
    basePremium = 69;
  }

  return { score, riskTier, basePremium };
}

module.exports = { calculateRiskScore };


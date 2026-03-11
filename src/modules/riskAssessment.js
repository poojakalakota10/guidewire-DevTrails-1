export const calculateRiskScore = (apiData, workerProfile) => {
  let score = 0;
  let triggers = [];
  let zoneRisk = 'Low';
  let rainRisk = 'Low';
  let pollutionRisk = 'Low';

  // Weather risk
  if (apiData.weather.rainfall > 40) {
    score += 45;
    triggers.push('Heavy Rain');
    rainRisk = 'High';
  } else if (apiData.weather.rainfall > 15) {
    score += 20;
    rainRisk = 'Medium';
  }

  // Heat risk
  if (apiData.weather.temperature > 40) {
    score += 30;
    triggers.push('Extreme Heat');
  } else if (apiData.weather.temperature > 35) {
    score += 15;
  }

  // Pollution risk
  if (apiData.aqi > 300) {
    score += 25;
    triggers.push('Severe Pollution');
    pollutionRisk = 'High';
  } else if (apiData.aqi > 150) {
    score += 10;
    pollutionRisk = 'Medium';
  }

  // Profile risk adjustments
  if (workerProfile.city === 'Hyderabad') {
    // Hyderabad specific weights
    if (apiData.weather.rainfall > 30) score += 10; 
  }

  if (score > 60) zoneRisk = 'High';
  else if (score > 30) zoneRisk = 'Medium';

  return {
    score: Math.min(score, 100),
    level: score > 60 ? 'High Risk' : (score > 30 ? 'Medium Risk' : 'Low Risk'),
    triggers,
    profileMap: {
      zoneRisk,
      rainRisk,
      pollutionRisk
    }
  };
};

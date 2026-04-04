const cron = require('node-cron');
const Policy = require('../models/Policy');
const Claim = require('../models/Claim');
const User = require('../models/User');
const { calculateFraudScore } = require('./fraudDetection');

// Mock data object
const mockWeatherData = {
  'Kukatpally': { rainfall: 18, temp: 32, aqi: 285, curfew: false },
  'LB Nagar': { rainfall: 22, temp: 34, aqi: 320, curfew: false },
  'Uppal': { rainfall: 8, temp: 44, aqi: 290, curfew: true },
  'Kondapur': { rainfall: 0, temp: 35, aqi: 150, curfew: false },
  'Madhapur': { rainfall: 5, temp: 36, aqi: 160, curfew: false },
  'Secunderabad': { rainfall: 16, temp: 38, aqi: 305, curfew: false }
};

async function evaluateTriggersForZone(zone, wData) {
  let matchedTrigger = null;

  if (wData.rainfall > 15) matchedTrigger = 'Rain Trigger';
  else if (wData.temp > 43) matchedTrigger = 'Heat Trigger';
  else if (wData.aqi > 300) matchedTrigger = 'AQI Trigger';
  else if (wData.curfew) matchedTrigger = 'Curfew Trigger';

  if (!matchedTrigger) return;

  // Find users in this zone with active policies
  const usersInZone = await User.find({ zone, hasActivePolicy: true });

  for (const user of usersInZone) {
    const policy = await Policy.findOne({ user: user._id, status: 'Active' });
    if (!policy) continue;

    const today = new Date();
    today.setHours(0,0,0,0);

    const duplicateClaim = await Claim.findOne({
      user: user._id,
      triggerType: matchedTrigger,
      createdAt: { $gte: today }
    });

    if (duplicateClaim) {
      continue; // Skip because user already claimed this event today
    }

    const { score, reasons, status } = await calculateFraudScore(user, { triggerZone: zone, triggerType: matchedTrigger });

    const newClaim = new Claim({
      user: user._id,
      policy: policy._id,
      triggerType: matchedTrigger,
      triggerZone: zone,
      amount: policy.payoutPerDay,
      status,
      fraudScore: score,
      fraudReasons: reasons,
      snapshotData: wData,
      payoutTime: status === 'Approved' ? new Date() : null
    });
    
    await newClaim.save();
    console.log(`[TRIGGER CRON] Auto-Created claim for ${user.email} -> ${matchedTrigger}`);
  }
}

cron.schedule('* * * * *', async () => {
  console.log('[TRIGGER CRON] Running parametric checks...');
  for (const [zone, wData] of Object.entries(mockWeatherData)) {
    await evaluateTriggersForZone(zone, wData);
  }
});

// Export mock data so triggerRoutes can serve it to frontend
module.exports = { mockWeatherData };

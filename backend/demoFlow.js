const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/User');
const Policy = require('./models/Policy');
const Claim = require('./models/Claim');
const { calculateRiskScore } = require('./services/riskEngine');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/gigshield_v2';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function runDemoFlow() {
  try {
    console.log('\n======================================================');
    console.log('🚀 INITIALIZING GIGSHIELD END-TO-END PARAMETRIC DEMO 🚀');
    console.log('======================================================\n');
    
    await mongoose.connect(MONGO_URI);
    console.log('✓ Connected to MongoDB (gigshield_v2)\n');

    // --- STEP 1: Create the User ---
    process.stdout.write('⏳ [Step 1] Registering Delivery Partner "Rahul"... ');
    await sleep(2000);

    // Delete existing Rahul to keep things clean
    await User.findOneAndDelete({ email: 'rahul.demo@example.com' });

    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash('password123', salt);

    const workerData = {
      name: 'Rahul Kumar (Demo)',
      phone: '+919876000000',
      email: 'rahul.demo@example.com',
      password: pass,
      role: 'worker',
      platform: 'Zomato',
      zone: 'LB Nagar',
      avgDailyEarnings: 650,
      hoursPerDay: 10,
      yearsOnPlatform: 3
    };

    const risk = calculateRiskScore(workerData);
    
    const rahul = await User.create({
      ...workerData,
      riskScore: risk.score,
      riskTier: risk.riskTier,
      basePremium: risk.basePremium,
      hasActivePolicy: true
    });
    console.log('Done!');
    console.log(`   -> Details: Zone: ${rahul.zone} | Risk Score: ${rahul.riskScore}/100 | Tier: ${rahul.riskTier}\n`);

    // --- STEP 2: Issue a Policy ---
    process.stdout.write('⏳ [Step 2] Processing Pro Shield Policy Purchase... ');
    await sleep(2500);

    const expDate = new Date();
    expDate.setDate(expDate.getDate() + 7);

    // Remove any old policies for Rahul just in case
    await Policy.deleteMany({ user: rahul._id });

    const activePolicy = await Policy.create({
      user: rahul._id,
      planName: 'Pro Shield',
      weeklyPremium: 49 + rahul.basePremium,
      payoutPerDay: 500,
      maxDays: 3,
      expiryDate: expDate,
      status: 'Active'
    });

    console.log('Done!');
    console.log(`   -> Shield Active: ₹${activePolicy.weeklyPremium}/wk Premium | Coverage: ₹${activePolicy.payoutPerDay}/day\n`);

    // --- STEP 3: Environmental Disruption ---
    process.stdout.write('⏳ [Step 3] Monitoring Weather API... ');
    await sleep(3000);
    console.log('\n\n🚨 WARNING: SEVERE WEATHER EVENT DETECTED 🚨');
    console.log(`   -> Location: ${rahul.zone}`);
    console.log(`   -> Event: Extreme Rainfall (45mm/hr recorded)`);
    console.log(`   -> Parametric Trigger Threshold Exceeded! (> 15mm/hr)\n`);

    // --- STEP 4: Automated Claim Processing ---
    process.stdout.write('⏳ [Step 4] Triggering Parametric Contract... ');
    await sleep(2500);
    console.log('Finding affected Active Policies...');
    await sleep(1500);

    // AI Fraud check simulation
    const fraudScore = 12; // Typical clean score
    console.log(`   -> Verifying Rahul's Policy... Found! (Fraud Score: ${fraudScore}/100 - Clean)`);
    
    // Remove old demo claims
    await Claim.deleteMany({ user: rahul._id });

    const claim = await Claim.create({
      user: rahul._id,
      policy: activePolicy._id,
      triggerType: 'Rain Trigger',
      triggerZone: rahul.zone,
      amount: activePolicy.payoutPerDay,
      status: 'Approved',
      fraudScore: fraudScore,
      fraudReasons: ['Automated AI clearance - Weather Verified'],
      payoutTime: new Date(),
      snapshotData: { rainfall: 45, aqi: 100, temp: 28 }
    });

    console.log('\n======================================================');
    console.log(`✅ CLAIM SUCCESS: ₹${claim.amount} sent directly to Rahul's Wallet!`);
    console.log(`   Time from Weather Event to Payout: < 2 seconds`);
    console.log('======================================================\n');
    
    console.log('You can now refresh the Admin Dashboard (http://localhost:5173/) to see this claim pop up instantly!\n');

    process.exit(0);

  } catch (error) {
    console.error('\n❌ Demo Interrupted by Error:', error);
    process.exit(1);
  }
}

runDemoFlow();

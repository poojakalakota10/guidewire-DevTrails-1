const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/User');
const Policy = require('./models/Policy');
const Claim = require('./models/Claim');
const { calculateRiskScore } = require('./services/riskEngine');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/gigshield_v2';

const zones = ['Kukatpally', 'LB Nagar', 'Uppal', 'Kondapur', 'Madhapur', 'Secunderabad'];
const platforms = ['Zomato', 'Swiggy', 'Zepto', 'Blinkit', 'Amazon'];

async function seedData() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to DB');

    // CLEAR DB
    await User.deleteMany();
    await Policy.deleteMany();
    await Claim.deleteMany();

    // 1 Admin
    const salt = await bcrypt.genSalt(10);
    const adminPass = await bcrypt.hash('admin123', salt);
    await User.create({
      name: 'Super Admin',
      email: 'admin@gigshield.com',
      password: adminPass,
      role: 'admin'
    });
    console.log('Created Admin: admin@gigshield.com / admin123');

    // 5 Mock Workers
    const workers = [];
    for (let i = 1; i <= 5; i++) {
        const pass = await bcrypt.hash('worker123', salt);
        const wData = {
          name: `Mock Worker ${i}`,
          phone: `+91987654321${i}`,
          email: `worker${i}@example.com`,
          password: pass,
          role: 'worker',
          platform: platforms[i % platforms.length],
          zone: zones[i % zones.length],
          avgDailyEarnings: 400 + (i * 100),
          hoursPerDay: 6 + i,
          yearsOnPlatform: i
        };
        const risk = await calculateRiskScore(wData);
        
        const user = await User.create({
          ...wData,
          riskScore: risk.score,
          riskTier: risk.riskTier,
          basePremium: risk.basePremium,
          hasActivePolicy: i <= 3 // First 3 have policies
        });
        workers.push(user);
    }
    console.log('Created 5 Mock Workers');

    // 3 Active Policies
    for (let i = 0; i < 3; i++) {
      const exp = new Date();
      exp.setDate(exp.getDate() + 7);
      
      const policy = await Policy.create({
        user: workers[i]._id,
        planName: 'Pro Shield',
        weeklyPremium: 49,
        payoutPerDay: 500,
        maxDays: 3,
        expiryDate: exp,
        status: 'Active'
      });

      // Claims
      await Claim.create({
        user: workers[i]._id,
        policy: policy._id,
        triggerType: 'Rain Trigger',
        triggerZone: workers[i].zone,
        amount: 500,
        status: 'Approved',
        fraudScore: 23,
        fraudReasons: ['Clean'],
        payoutTime: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        snapshotData: { rainfall: 25, aqi: 150 }
      });
      
      await Claim.create({
        user: workers[i]._id,
        policy: policy._id,
        triggerType: 'Heat Trigger',
        triggerZone: workers[i].zone,
        amount: 500,
        status: 'Rejected',
        fraudScore: 85,
        fraudReasons: ['High claim frequency (>5 this month)', 'Duplicate claim detected for the same event today'],
        snapshotData: { temp: 45 }
      });
      
      await Claim.create({
        user: workers[i]._id,
        policy: policy._id,
        triggerType: 'Curfew Trigger',
        triggerZone: 'Different Zone',
        amount: 500,
        status: 'Flagged',
        fraudScore: 55,
        fraudReasons: ['User zone does not match disruption zone'],
        snapshotData: { curfew: true }
      });
    }

    // Give remaining ones just some old claims to hit the 10 count
    for(let i = 3; i < 5; i++) {
        // dummy policy (expired)
        const exp = new Date();
        exp.setDate(exp.getDate() - 1);
        const policy = await Policy.create({
            user: workers[i]._id,
            planName: 'Basic Shield',
            weeklyPremium: 29,
            payoutPerDay: 300,
            maxDays: 2,
            expiryDate: exp,
            status: 'Expired'
        });
        await Claim.create({
            user: workers[i]._id,
            policy: policy._id,
            triggerType: 'AQI Trigger',
            triggerZone: workers[i].zone,
            amount: 300,
            status: 'Approved',
            fraudScore: 12,
            fraudReasons: ['Clean'],
            payoutTime: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days
            snapshotData: { aqi: 450 }
        });
    }

    console.log('Created Policies and Claims');
    console.log('Seed completed successfully.');
    process.exit(0);

  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
}

seedData();

import { runFraudVerification } from './fraudDetection';

export const processClaim = async (riskAssessment, workerProfile) => {
  // Check if a trigger occurred
  if (riskAssessment.triggers.length === 0) {
    return { status: 'NO_ACTION', message: 'No parametric triggers met.' };
  }

  // Estimate lost income (e.g., missed 4 hours of ₹100/hr)
  const estimatedLoss = 400; 
  const payoutAmount = Math.floor(estimatedLoss * 0.9); // 90% income replacement

  // Run Fraud Detection
  const fraudResult = await runFraudVerification({
    workerId: workerProfile.email,
    triggers: riskAssessment.triggers,
    location: workerProfile.city
  });

  if (!fraudResult.verified) {
    return {
      status: 'REJECTED',
      payout: 0,
      reason: fraudResult.message,
      fraudDetails: fraudResult.checks
    };
  }

  // Approve Claim
  return {
    status: 'APPROVED',
    payout: payoutAmount,
    reason: `Disruption verified: ${riskAssessment.triggers.join(', ')}`,
    fraudDetails: fraudResult.checks,
    transferMessage: `₹${payoutAmount} transferred to worker UPI.`
  };
};

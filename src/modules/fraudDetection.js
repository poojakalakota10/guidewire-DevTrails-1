export const runFraudVerification = async (claimRequest) => {
  // Simulate verification delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // In a real system, verify GPS, compare timestamps, cross-reference APIs
  
  // 95% chance of valid worker activity (for prototype purposes)
  const isValid = Math.random() > 0.05;

  return {
    verified: isValid,
    checks: {
      locationVerified: isValid, // Is GPS in affected zone
      noDuplicateClaims: true, // Hasn't claimed today already
      activityValid: isValid, // Was active on delivery platform 30 mins prior
    },
    message: isValid ? 'All checks passed.' : 'Potential Fraud Detected - Location/Activity mismatch.'
  };
};

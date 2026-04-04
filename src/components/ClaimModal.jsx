import React, { useEffect, useState } from 'react';
import { FiCheckCircle, FiXCircle, FiShield, FiLoader, FiZap } from 'react-icons/fi';

const ClaimModal = ({ claimResult, onClose }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Animate through the workflow steps
    if (step < 3) {
      const timer = setTimeout(() => {
        setStep(prev => prev + 1);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [step]);

  // Steps definition
  const stepsList = [
    { title: "Parametric Trigger Detected", icon: <FiZap /> },
    { title: "Verifying Location & Activity", icon: <FiShield /> },
    { title: "Running Fraud Detection", icon: <FiShield /> },
    { title: claimResult.status === 'APPROVED' ? "Claim Approved!" : "Claim Rejected", icon: claimResult.status === 'APPROVED' ? <FiCheckCircle /> : <FiXCircle /> }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="glass bg-white max-w-lg w-full rounded-2xl shadow-2xl border border-slate-100 overflow-hidden transform transition-all">
        
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <FiShield /> AI Claim Processor
          </h3>
        </div>

        <div className="p-8">
          <div className="space-y-6">
            {stepsList.map((s, index) => (
              <div 
                key={index} 
                className={`flex items-center gap-4 transition-all duration-500 ${index <= step ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${index < step ? 'bg-green-100 text-green-600' : (index === step && index < 3 ? 'bg-blue-100 text-blue-600 animate-spin' : (index === 3 && claimResult.status === 'APPROVED' ? 'bg-green-100 text-green-600' : (index === 3 ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-400')))}`}>
                  {index === step && index < 3 ? <FiLoader /> : s.icon}
                </div>
                <div className="flex-1">
                  <h4 className={`font-semibold ${index <= step ? 'text-slate-900' : 'text-slate-400'}`}>{s.title}</h4>
                  
                  {index === 1 && step >= 1 && (
                     <p className="text-xs text-slate-500 mt-1">
                       Location: {claimResult.fraudDetails?.locationVerified ? 'Verified' : 'Mismatch'} | Activity: {claimResult.fraudDetails?.activityValid ? 'Valid' : 'Inactive'}
                     </p>
                  )}
                  {index === 2 && step >= 2 && (
                     <p className="text-xs text-slate-500 mt-1">
                       Duplicates: {claimResult.fraudDetails?.noDuplicateClaims ? 'None' : 'Detected'}
                     </p>
                  )}
                  
                </div>
              </div>
            ))}
          </div>

          {step === 3 && (
            <div className={`mt-8 p-4 rounded-xl text-center ${claimResult.status === 'APPROVED' ? 'bg-green-50' : 'bg-red-50'}`}>
              <h4 className={`font-bold text-xl mb-1 ${claimResult.status === 'APPROVED' ? 'text-green-800' : 'text-red-800'}`}>
                {claimResult.status === 'APPROVED' ? 'Instant Payout Processing' : 'Review Failed'}
              </h4>
              <p className={`text-sm ${claimResult.status === 'APPROVED' ? 'text-green-700' : 'text-red-700'}`}>
                {claimResult.status === 'APPROVED' ? claimResult.transferMessage : claimResult.reason}
              </p>
            </div>
          )}

          <div className="mt-8 flex justify-end">
            <button
              onClick={onClose}
              disabled={step < 3}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${step < 3 ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'}`}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaimModal;

import React from 'react';
import { FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

const RiskAlert = ({ riskLevel, triggers }) => {
  if (riskLevel === 'Low Risk') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-4">
        <div className="text-green-600 mt-1">
          <FiCheckCircle size={24} />
        </div>
        <div>
          <h4 className="font-bold text-green-800">Low Risk - All Clear</h4>
          <p className="text-sm text-green-700 mt-1">Conditions in your delivery zone are optimal for working.</p>
        </div>
      </div>
    );
  }

  const isHighRisk = riskLevel === 'High Risk';
  const colorClass = isHighRisk ? 'red' : 'orange';

  return (
    <div className={`bg-${colorClass}-50 border border-${colorClass}-200 rounded-xl p-4 flex items-start gap-4 animate-pulse`}>
      <div className={`text-${colorClass}-600 mt-1`}>
        <FiAlertCircle size={24} />
      </div>
      <div>
        <h4 className={`font-bold text-${colorClass}-800`}>{riskLevel} Detected</h4>
        <p className={`text-sm text-${colorClass}-700 mt-1 mb-2`}>
          We have detected external disruptions that may affect your delivery flow.
        </p>
        {triggers && triggers.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {triggers.map((trigger, index) => (
              <span key={index} className={`inline-block px-2 py-1 bg-${colorClass}-100 text-${colorClass}-800 text-xs font-semibold rounded-md`}>
                {trigger}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RiskAlert;

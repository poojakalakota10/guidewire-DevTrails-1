import React from 'react';
import { FiUser, FiTruck, FiBriefcase, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

const PERSONAS = [
  {
    id: 'rider',
    name: 'Delivery Rider',
    platform: 'Food & Grocery',
    icon: <FiTruck className="w-5 h-5" />,
    why: "Delivery riders are heavily impacted by sudden weather changes (heavy rain). Being outdoors means safety risks and significantly slower delivery speeds, directly causing missed trips and lost hourly income.",
    solution: "AI dynamically profiles hyper-local weather risk via APIs. When rain exceeds thresholds, GigShield auto-triggers parametric payouts for anticipated lost trips, without manual claims.",
    city: 'Mumbai',
    riskModifiers: { rain: 1.5, heat: 1.2, traffic: 1.0, aqi: 1.0 }
  },
  {
    id: 'driver',
    name: 'Rideshare Driver',
    platform: 'Cab Services',
    icon: <FiBriefcase className="w-5 h-5" />,
    why: "Drivers face severe income loss during heavy traffic gridlocks and flooded roads. A single 2-hour jam can eliminate half a day's earnings, while platforms often under-compensate for wait times.",
    solution: "AI integrates with traffic and mapping APIs. If abnormal gridlocks or zone closures are detected while logged in, GigShield compensates for the unearned mileage/time seamlessly.",
    city: 'Bengaluru',
    riskModifiers: { rain: 1.1, heat: 1.0, traffic: 2.0, aqi: 1.0 }
  }
];

const PersonaSelector = ({ currentPersonaId, onSelectPersona }) => {
  const currentPersona = PERSONAS.find(p => p.id === currentPersonaId) || PERSONAS[0];

  return (
    <div className="glass p-6 rounded-2xl border border-slate-100 shadow-sm mb-8 transition-all duration-300">
      <div className="flex flex-col md:flex-row gap-6">
        
        {/* Selection Area */}
        <div className="md:w-1/3 border-r border-slate-100 pr-0 md:pr-6">
          <h3 className="font-bold text-lg text-slate-900 mb-4 flex items-center gap-2">
            <FiUser className="text-blue-600" /> Select Worker Persona
          </h3>
          <div className="space-y-3">
            {PERSONAS.map(persona => (
              <button
                key={persona.id}
                onClick={() => onSelectPersona(persona.id)}
                className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
                  currentPersonaId === persona.id 
                    ? 'bg-blue-50 border-blue-200 text-blue-800 shadow-sm' 
                    : 'bg-white border-slate-200 text-slate-600 hover:border-blue-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${currentPersonaId === persona.id ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
                    {persona.icon}
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-sm">{persona.name}</div>
                    <div className="text-xs opacity-80">{persona.platform}</div>
                  </div>
                </div>
                {currentPersonaId === persona.id && <FiCheckCircle className="text-blue-600" />}
              </button>
            ))}
          </div>
        </div>

        {/* Details Area */}
        <div className="md:w-2/3 space-y-4 pt-4 md:pt-0">
          <div>
            <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
              <FiAlertCircle className="text-amber-500" /> Why Protection is Needed
            </h4>
            <p className="text-slate-700 bg-amber-50/50 p-4 rounded-xl border border-amber-100/50 leading-relaxed text-sm">
              {currentPersona.why}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
              <FiCheckCircle className="text-emerald-500" /> The AI/ML Solution
            </h4>
            <p className="text-slate-700 bg-emerald-50/50 p-4 rounded-xl border border-emerald-100/50 leading-relaxed text-sm">
              {currentPersona.solution}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export { PERSONAS };
export default PersonaSelector;

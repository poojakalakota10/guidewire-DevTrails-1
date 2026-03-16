import React from 'react';
import { FiDatabase, FiCpu, FiShield, FiDollarSign, FiArrowRight, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

const WorkflowStage = ({ active, completed, icon, title, description, step }) => {
  let stateClass = "border-slate-200 bg-white text-slate-500 opacity-50";
  let iconClass = "bg-slate-100 text-slate-400";
  
  if (completed) {
    stateClass = "border-emerald-200 bg-emerald-50/50 text-emerald-800 opacity-100 shadow-sm";
    iconClass = "bg-emerald-100 text-emerald-600";
  } else if (active) {
    stateClass = "border-blue-400 bg-blue-50 text-blue-900 opacity-100 shadow-md ring-2 ring-blue-100";
    iconClass = "bg-blue-600 text-white animate-pulse";
  }

  return (
    <div className={`relative flex flex-col items-center text-center p-4 rounded-xl border transition-all duration-500 z-10 w-full sm:w-1/4 min-h-[140px] ${stateClass}`}>
      <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 shadow-sm ${iconClass}`}>
        {icon}
      </div>
      <div className="absolute top-2 left-2 text-[10px] font-black text-slate-300 opacity-50">0{step}</div>
      <h4 className="font-bold text-sm mb-1">{title}</h4>
      <p className="text-xs opacity-80 leading-tight">{description}</p>
    </div>
  );
};

const AIMLWorkflow = ({ workflowState }) => {
  // workflowState: 'idle', 'ingestion', 'profiling', 'fraud', 'payout', 'completed', 'rejected'
  
  const stages = [
    {
      id: 'ingestion',
      icon: <FiDatabase size={20} />,
      title: "API Data Ingestion",
      description: "Fetching real-time weather, traffic & AQI mock APIs."
    },
    {
      id: 'profiling',
      icon: <FiCpu size={20} />,
      title: "AI Risk Profiling",
      description: "ML scoring based on persona & current API conditions."
    },
    {
      id: 'fraud',
      icon: <FiShield size={20} />,
      title: "Fraud Detection",
      description: "Verifying timestamps & location against platform data."
    },
    {
      id: 'payout',
      icon: <FiDollarSign size={20} />,
      title: "Smart Contract",
      description: "Executing parametric payout instantly if verified."
    }
  ];

  const getStageStatus = (stageId, index) => {
    const stageOrder = ['idle', 'ingestion', 'profiling', 'fraud', 'payout', 'completed', 'rejected'];
    const currentIndex = stageOrder.indexOf(workflowState);
    const stageDbIndex = stageOrder.indexOf(stageId);

    if (workflowState === 'idle') return { active: false, completed: false };
    
    // For rejected state, we halt at fraud or payout
    if (workflowState === 'rejected') {
        if (stageId === 'fraud') return { active: false, completed: false, isError: true }; // Make fraud red if you want
        if (stageDbIndex > stageOrder.indexOf('fraud')) return { active: false, completed: false };
        return { active: false, completed: true };
    }

    if (currentIndex === stageDbIndex) return { active: true, completed: false };
    if (currentIndex > stageDbIndex) return { active: false, completed: true };
    
    return { active: false, completed: false };
  };

  return (
    <div className="glass p-6 rounded-2xl border border-slate-100 shadow-sm mt-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 rounded-bl-full -z-10"></div>
      
      <div className="mb-6 flex justify-between items-end">
         <div>
            <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                <FiCpu className="text-indigo-600" /> AI/ML Integration Workflow
            </h3>
            <p className="text-sm text-slate-500 mt-1">Live visualization of the automated parametric claim logic.</p>
         </div>
         {workflowState !== 'idle' && workflowState !== 'completed' && workflowState !== 'rejected' && (
             <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full animate-pulse border border-blue-100">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span> Processing
             </div>
         )}
      </div>

      <div className="relative flex flex-col sm:flex-row gap-4 justify-between items-center sm:items-stretch">
        
        {/* Connecting Line (Desktop) */}
        <div className="hidden sm:block absolute top-[44px] left-[10%] right-[10%] h-0.5 bg-slate-100 z-0">
            <div 
                className="h-full bg-blue-500 transition-all duration-700 ease-in-out"
                style={{ 
                    width: workflowState === 'idle' ? '0%' : 
                           workflowState === 'ingestion' ? '15%' :
                           workflowState === 'profiling' ? '50%' :
                           workflowState === 'fraud' ? '85%' :
                           '100%' 
                }}
            ></div>
        </div>

        {/* Connecting Arrows (Mobile) */}
        <div className="sm:hidden absolute inset-y-0 left-1/2 w-0.5 bg-slate-100 z-0 transform -translate-x-1/2"></div>

        {stages.map((stage, index) => {
          const status = getStageStatus(stage.id, index);
          let extraClasses = "";
          // Custom red styling for rejected at Fraud stage
          if (workflowState === 'rejected' && stage.id === 'fraud') {
              extraClasses = "!border-red-300 !bg-red-50 !text-red-900 !opacity-100";
          }

          return (
            <React.Fragment key={stage.id}>
              <div className={`relative flex flex-col items-center text-center p-4 rounded-xl border transition-all duration-500 z-10 w-full sm:w-1/4 min-h-[140px] ${
                  status.completed 
                    ? "border-emerald-200 bg-emerald-50/50 text-emerald-800 opacity-100 shadow-sm" 
                    : status.active 
                      ? "border-blue-400 bg-blue-50 text-blue-900 opacity-100 shadow-md ring-2 ring-blue-100" 
                      : "border-slate-200 bg-white text-slate-500 opacity-50"
              } ${extraClasses}`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 shadow-sm transition-colors duration-500 ${
                       status.completed 
                        ? "bg-emerald-100 text-emerald-600" 
                        : status.active 
                          ? "bg-blue-600 text-white animate-pulse shadow-blue-200 shadow-lg" 
                          : "bg-slate-100 text-slate-400"
                  } ${workflowState === 'rejected' && stage.id === 'fraud' ? '!bg-red-100 !text-red-600' : ''}`}>
                    {stage.icon}
                  </div>
                  <div className="absolute top-2 left-2 text-[10px] font-black text-slate-300 opacity-50">0{index + 1}</div>
                  <h4 className="font-bold text-sm mb-1">{stage.title}</h4>
                  <p className="text-xs opacity-80 leading-tight">{stage.description}</p>
              </div>
              
              {/* Mobile arrow indicator */}
              {index < stages.length - 1 && (
                  <div className="sm:hidden py-1 z-10 bg-white rounded-full">
                      <FiArrowRight className="rotate-90 text-slate-300" />
                  </div>
              )}
            </React.Fragment>
          );
        })}

      </div>
      
      {/* Result Message */}
      {workflowState === 'completed' && (
          <div className="mt-6 p-3 bg-emerald-50 border border-emerald-100 rounded-lg text-emerald-700 text-sm font-medium flex justify-center items-center gap-2 animate-fade-in">
              <FiCheckCircle /> Workflow completed successfully. Claim approved or no disruption detected.
          </div>
      )}
      {workflowState === 'rejected' && (
          <div className="mt-6 p-3 bg-red-50 border border-red-100 rounded-lg text-red-700 text-sm font-medium flex justify-center items-center gap-2 animate-fade-in">
              <FiAlertCircle /> Workflow halted: Fraud checks failed or parameters not met.
          </div>
      )}

    </div>
  );
};

export default AIMLWorkflow;
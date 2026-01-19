
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import HabilitationList from './components/HabilitationList';
import EvaluationForm from './components/EvaluationForm';
import SystemStatus from './components/SystemStatus';
import MissionControl from './components/MissionControl';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'habilitations': return <HabilitationList />;
      case 'evaluations': return <EvaluationForm />;
      case 'mission': return <MissionControl />;
      case 'system': return <SystemStatus />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans selection:bg-blue-100 selection:text-blue-900">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 overflow-y-auto p-8 lg:p-12">
        <div className="max-w-7xl mx-auto">
          {/* Header Action Bar */}
          <div className="flex justify-between items-center mb-10">
            <div className="flex items-center space-x-3 text-sm">
              <span className="text-slate-400 font-medium">Plateforme</span>
              <span className="text-slate-300">/</span>
              <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg font-bold capitalize shadow-sm border border-blue-100">
                {activeTab}
              </span>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="hidden md:flex flex-col text-right">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Dernier Sync</span>
                <span className="text-xs font-bold text-slate-600">Aujourd'hui, 14:42</span>
              </div>
              <div className="h-8 w-px bg-slate-200"></div>
              <div className="relative group">
                <button className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all flex items-center justify-center shadow-sm">
                  🔔
                  <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white translate-x-1 -translate-y-1"></span>
                </button>
              </div>
            </div>
          </div>

          {/* Page Content */}
          <div className="transition-all duration-300">
            {renderContent()}
          </div>
        </div>
      </main>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        /* Personnalisation de la barre de défilement */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #f8fafc;
        }
        ::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
};

export default App;

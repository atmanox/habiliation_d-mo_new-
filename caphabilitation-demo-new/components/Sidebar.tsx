
import React from 'react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: '📊' },
    { id: 'habilitations', label: 'Habilitations', icon: '📜' },
    { id: 'evaluations', label: 'Évaluations', icon: '📝' },
    { id: 'mission', label: 'Mission Control', icon: '🚀' },
    { id: 'system', label: 'État Système', icon: '⚙️' },
  ];

  return (
    <div className="w-64 bg-slate-950 text-white min-h-screen p-6 flex flex-col border-r border-slate-800">
      <div className="mb-10 px-2">
        <h1 className="text-xl font-bold tracking-tight text-white flex items-center">
          <span className="text-blue-500 mr-2">●</span> CAPHABILITATION
        </h1>
        <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest font-bold">Expertise Django/Python</p>
      </div>

      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              activeTab === item.id 
                ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]' 
                : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="font-semibold text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-slate-800/50">
        <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-800/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-xs font-bold shadow-lg">
              JD
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate">Jean Développeur</p>
              <p className="text-[10px] text-blue-400 font-bold uppercase tracking-tighter">Freelance Python Expert</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

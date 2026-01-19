
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, AreaChart, Area 
} from 'recharts';

const data = [
  { name: 'Jan', count: 12 },
  { name: 'Feb', count: 19 },
  { name: 'Mar', count: 15 },
  { name: 'Apr', count: 22 },
  { name: 'May', count: 30 },
  { name: 'Jun', count: 25 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <header>
        <h2 className="text-2xl font-bold text-slate-800">Tableau de bord analytique</h2>
        <p className="text-slate-500">Vue d'ensemble des certifications et habilitations en cours.</p>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Habilitations Actives', value: '1,284', color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Évaluations ce mois', value: '142', color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Certificats expirants', value: '28', color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Taux de réussite', value: '94.2%', color: 'text-indigo-600', bg: 'bg-indigo-50' },
        ].map((stat, i) => (
          <div key={i} className={`p-6 rounded-xl border border-slate-100 bg-white shadow-sm`}>
            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
            <h3 className={`text-2xl font-bold mt-1 ${stat.color}`}>{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <h4 className="font-semibold text-slate-800 mb-4">Volume de certifications (2024)</h4>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="count" stroke="#3b82f6" fillOpacity={1} fill="url(#colorCount)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col">
          <h4 className="font-semibold text-slate-800 mb-4">Missions Prioritaires</h4>
          <div className="space-y-4 flex-1">
            {[
              { title: 'Migration PostgreSQL v16', progress: 85, tag: 'Technique' },
              { title: 'Refonte Module PDF (WeasyPrint)', progress: 40, tag: 'Feature' },
              { title: 'Optimisation Requêtes ORM', progress: 100, tag: 'Perf' },
              { title: 'Audit Sécurité OWASP', progress: 15, tag: 'Sécurité' },
            ].map((task, i) => (
              <div key={i} className="group">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-slate-700">{task.title}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-500">{task.tag}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ${task.progress === 100 ? 'bg-green-500' : 'bg-blue-500'}`} 
                    style={{ width: `${task.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

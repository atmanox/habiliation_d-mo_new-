
import React, { useState, useEffect } from 'react';

const SystemStatus: React.FC = () => {
  const [metrics, setMetrics] = useState({
    cpu: 24,
    mem: 58,
    lat: 12,
    disk: 42
  });

  // Mock real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        cpu: Math.max(5, Math.min(95, prev.cpu + (Math.random() * 4 - 2))),
        mem: Math.max(40, Math.min(80, prev.mem + (Math.random() * 0.5 - 0.25))),
        lat: Math.max(8, Math.min(45, prev.lat + (Math.random() * 2 - 1))),
        disk: prev.disk
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const logs = [
    { time: '14:22:01', level: 'INFO', msg: 'Gunicorn worker (pid:440) started.' },
    { time: '14:22:15', level: 'SUCCESS', msg: 'PostgreSQL connection established.' },
    { time: '14:23:45', level: 'INFO', msg: 'User login: admin_root@caphab.fr' },
    { time: '14:25:12', level: 'WARN', msg: 'Slow query detected in /api/habilitations/all/ (450ms)' },
    { time: '14:30:00', level: 'INFO', msg: 'Scheduled task: cleanup_expired_tokens executed.' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Santé du Système</h2>
          <p className="text-slate-500">Supervision technique de l'infrastructure Django.</p>
        </div>
        <div className="flex space-x-2">
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold border border-green-200">Server: ONLINE</span>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold border border-blue-200">V. 2.4.0-STABLE</span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'CPU Load', val: metrics.cpu, unit: '%', color: 'bg-blue-600' },
          { label: 'RAM Usage', val: metrics.mem, unit: '%', color: 'bg-purple-600' },
          { label: 'DB Latency', val: metrics.lat, unit: 'ms', color: 'bg-indigo-600' },
          { label: 'Disk Space', val: metrics.disk, unit: '%', color: 'bg-slate-600' },
        ].map((m, i) => (
          <div key={i} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase">{m.label}</span>
              <span className="text-lg font-bold text-slate-800">{m.val.toFixed(0)}{m.unit}</span>
            </div>
            <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
              <div className={`h-full transition-all duration-500 ${m.color}`} style={{ width: `${m.val}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900 rounded-xl shadow-2xl overflow-hidden flex flex-col h-[400px]">
          <div className="bg-slate-800 px-4 py-2 border-b border-slate-700 flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-4 text-slate-400 text-xs font-mono uppercase tracking-widest">Logs /var/log/caphabilitation/access.log</span>
          </div>
          <div className="p-4 font-mono text-sm overflow-y-auto space-y-1">
            {logs.map((log, i) => (
              <div key={i} className="flex space-x-3">
                <span className="text-slate-600 whitespace-nowrap">[{log.time}]</span>
                <span className={`font-bold whitespace-nowrap ${
                  log.level === 'ERROR' ? 'text-red-400' : 
                  log.level === 'WARN' ? 'text-amber-400' : 
                  log.level === 'SUCCESS' ? 'text-green-400' : 'text-blue-400'
                }`}>{log.level}</span>
                <span className="text-slate-300">{log.msg}</span>
              </div>
            ))}
            <div className="animate-pulse text-slate-500">_</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col">
          <h4 className="font-semibold text-slate-800 mb-4">Stack Technique</h4>
          <div className="space-y-4">
            {[
              { label: 'Language', val: 'Python 3.12' },
              { label: 'Framework', val: 'Django 5.0.3' },
              { label: 'ORM / DB', val: 'PostgreSQL 16' },
              { label: 'Web Server', val: 'Nginx + Gunicorn' },
              { label: 'Async Tasks', val: 'Celery + Redis' },
              { label: 'PDF Engine', val: 'WeasyPrint' },
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-center border-b border-slate-50 pb-2 last:border-0">
                <span className="text-sm text-slate-500">{item.label}</span>
                <span className="text-sm font-semibold text-slate-800">{item.val}</span>
              </div>
            ))}
          </div>
          <div className="mt-auto pt-6">
            <button className="w-full py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-200 transition">
              Redémarrer Worker Celery
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemStatus;

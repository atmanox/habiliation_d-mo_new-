
import React from 'react';

const MissionControl: React.FC = () => {
  const roadmap = [
    { step: 'Core Backend', status: 'Done', color: 'bg-green-500', desc: 'Django 5.0 base setup, Custom User Model, JWT Auth.' },
    { step: 'Business Logic', status: 'In Progress', color: 'bg-blue-500', desc: 'Calculateurs de scores complexes et validation de dates.' },
    { step: 'PDF Generation', status: 'Testing', color: 'bg-amber-500', desc: 'Mise en page WeasyPrint pour les certificats officiels.' },
    { step: 'Production Deployment', status: 'Planned', color: 'bg-slate-300', desc: 'Dockerization & Nginx setup on Debian.' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <header>
        <h2 className="text-2xl font-bold text-slate-800">Mission Control</h2>
        <p className="text-slate-500">Suivi de l'avancement technique du projet pour le client.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-6 flex items-center">
              <span className="mr-2">🛤️</span> Roadmap du Développement
            </h3>
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
              {roadmap.map((item, i) => (
                <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-200 group-[.is-active]:bg-blue-500 text-slate-500 group-[.is-active]:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-colors duration-500">
                    {item.status === 'Done' ? '✓' : i + 1}
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
                    <div className="flex items-center justify-between space-x-2 mb-1">
                      <div className="font-bold text-slate-800">{item.step}</div>
                      <time className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full text-white ${item.color}`}>{item.status}</time>
                    </div>
                    <div className="text-slate-500 text-sm leading-relaxed">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl overflow-hidden relative">
            <h3 className="font-bold mb-4 relative z-10">Qualité du Code (CI/CD)</h3>
            <div className="space-y-4 relative z-10">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Couverture de tests</span>
                <span className="text-green-400 font-bold">92%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full">
                <div className="bg-green-500 h-full w-[92%] rounded-full shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
              </div>
              
              <div className="flex justify-between text-xs mt-4">
                <span className="text-slate-400">Intégration API</span>
                <span className="text-blue-400 font-bold">18 / 24</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full">
                <div className="bg-blue-500 h-full w-[75%] rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-slate-800">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Environnement</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-800/50 p-2 rounded-lg text-center">
                  <div className="text-[10px] text-slate-500">PostgreSQL</div>
                  <div className="text-xs font-bold text-green-400">UP</div>
                </div>
                <div className="bg-slate-800/50 p-2 rounded-lg text-center">
                  <div className="text-[10px] text-slate-500">Redis/Celery</div>
                  <div className="text-xs font-bold text-green-400">UP</div>
                </div>
              </div>
            </div>

            <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4">Contact Freelance</h3>
            <div className="text-sm text-slate-600 space-y-3">
              <p>Besoin d'un point technique ?</p>
              <button className="w-full bg-blue-600 text-white py-2 rounded-xl font-bold hover:bg-blue-700 transition">
                Planifier un Zoom
              </button>
              <p className="text-[10px] text-center text-slate-400 italic">Disponibilité : Lun - Ven (09:00 - 18:00)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionControl;

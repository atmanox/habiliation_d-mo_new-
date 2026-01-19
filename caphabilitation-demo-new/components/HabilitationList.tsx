
import React, { useState } from 'react';
import { Habilitation, HabilitationStatus } from '../types';

const MOCK_DATA: Habilitation[] = [
  { id: '1', title: 'Habilitation Électrique B1V', candidateName: 'Alice Martin', issueDate: '2023-10-12', expiryDate: '2025-10-12', status: HabilitationStatus.ACTIVE, score: 95 },
  { id: '2', title: 'CACES R489 - Cat 3', candidateName: 'Bob Dupont', issueDate: '2024-01-05', expiryDate: '2029-01-05', status: HabilitationStatus.ACTIVE, score: 88 },
  { id: '3', title: 'Travaux en Hauteur', candidateName: 'Claire Bernard', issueDate: '2023-11-20', expiryDate: '2024-11-20', status: HabilitationStatus.EXPIRED, score: 92 },
  { id: '4', title: 'Habilitation Nucléaire SCN1', candidateName: 'David Petit', issueDate: '2024-03-01', expiryDate: '2026-03-01', status: HabilitationStatus.PENDING, score: 0 },
];

const HabilitationList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showPreview, setShowPreview] = useState<Habilitation | null>(null);

  const filtered = MOCK_DATA.filter(h => 
    h.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    h.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: HabilitationStatus) => {
    switch (status) {
      case HabilitationStatus.ACTIVE: return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case HabilitationStatus.EXPIRED: return 'bg-rose-50 text-rose-700 border-rose-100';
      case HabilitationStatus.PENDING: return 'bg-sky-50 text-sky-700 border-sky-100';
      default: return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Registre des Habilitations</h2>
          <p className="text-slate-500">Gestion centrale des titres et validités techniques.</p>
        </div>
        <button className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-500/20 active:scale-95">
          + Nouvelle Certification
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/30 flex items-center">
          <div className="relative flex-1 max-w-md">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
            <input 
              type="text" 
              placeholder="Rechercher par nom ou habilitation..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 text-slate-500 uppercase text-[10px] font-bold tracking-widest border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Candidat</th>
                <th className="px-6 py-4">Habilitation</th>
                <th className="px-6 py-4">Date de Validité</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Documents</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((item) => (
                <tr key={item.id} className="group hover:bg-blue-50/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-xs">
                        {item.candidateName.charAt(0)}
                      </div>
                      <span className="font-bold text-slate-800">{item.candidateName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-slate-700">{item.title}</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase">ID: CAP-{item.id}092</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs text-slate-600">Fin : <span className="font-bold">{item.expiryDate}</span></div>
                    <div className="text-[10px] text-slate-400">Émis le {item.issueDate}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => setShowPreview(item)}
                      className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-bold text-blue-600 hover:bg-blue-100 transition-colors border border-transparent hover:border-blue-200"
                    >
                      <span>👁️</span>
                      <span>Aperçu PDF</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Preview Modal Simulation */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-slate-100">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-slate-800">Génération de Certificat (Moteur WeasyPrint)</h3>
              <button onClick={() => setShowPreview(null)} className="text-slate-400 hover:text-slate-600 p-2">✕</button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-12 bg-slate-100/50">
              <div className="bg-white aspect-[1/1.414] shadow-xl p-12 border-[12px] border-slate-200 relative">
                <div className="absolute top-8 left-8 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                  CAPHABILITATION v2.4 <br/> Official Technical Document
                </div>
                
                <div className="mt-20 text-center space-y-8">
                  <h1 className="text-4xl font-serif text-slate-900 border-b-2 border-slate-900 pb-4 inline-block">ATTESTATION D'HABILITATION</h1>
                  <p className="text-lg text-slate-600 italic italic">Ce document certifie que :</p>
                  <h2 className="text-5xl font-bold text-blue-600 tracking-tight">{showPreview.candidateName}</h2>
                  <p className="text-slate-600 max-w-sm mx-auto leading-relaxed">
                    A complété avec succès les épreuves théoriques et pratiques relatives à :
                  </p>
                  <div className="bg-slate-50 py-4 rounded-xl border border-slate-200">
                    <span className="text-2xl font-bold text-slate-800">{showPreview.title}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-8 pt-12 text-sm">
                    <div className="text-left border-t border-slate-200 pt-4">
                      <p className="text-slate-400 uppercase text-[10px] font-bold">Délivré le</p>
                      <p className="font-bold text-slate-800">{showPreview.issueDate}</p>
                    </div>
                    <div className="text-left border-t border-slate-200 pt-4">
                      <p className="text-slate-400 uppercase text-[10px] font-bold">Expire le</p>
                      <p className="font-bold text-slate-800">{showPreview.expiryDate}</p>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-12 right-12 w-24 h-24 border-4 border-blue-600 rounded-full flex items-center justify-center opacity-10 -rotate-12 select-none">
                  <span className="font-bold text-blue-600 text-[10px] uppercase text-center leading-none">Certifié <br/> Conforme</span>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 flex justify-end space-x-3 bg-white">
              <button onClick={() => setShowPreview(null)} className="px-6 py-2 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-50">Fermer</button>
              <button className="px-6 py-2 rounded-xl text-sm font-bold bg-blue-600 text-white shadow-lg shadow-blue-500/20">Télécharger PDF</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HabilitationList;

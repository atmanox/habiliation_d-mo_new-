
import React, { useState } from 'react';
import { generateEvaluationSummary } from '../services/geminiService';

const EvaluationForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState('');
  const [formData, setFormData] = useState({
    candidate: 'Alice Martin',
    technicalSkills: 8,
    safetyCompliance: 9,
    theoreticalKnowledge: 7,
    comments: "Bonne maîtrise globale, mais doit être plus vigilante sur le port des EPI en zone ATEX."
  });

  const handleAiAnalyze = async () => {
    setLoading(true);
    const result = await generateEvaluationSummary(formData);
    setSummary(result);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
      <header>
        <h2 className="text-2xl font-bold text-slate-800">Évaluation Technique</h2>
        <p className="text-slate-500">Saisie des résultats d'examen et génération de rapport.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm space-y-4">
          <h3 className="font-semibold text-lg border-bottom pb-2">Formulaire de notation</h3>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Candidat</label>
            <input type="text" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none" value={formData.candidate} disabled />
          </div>

          {[
            { key: 'technicalSkills', label: 'Compétences Techniques (0-10)' },
            { key: 'safetyCompliance', label: 'Conformité Sécurité (0-10)' },
            { key: 'theoreticalKnowledge', label: 'Connaissances Théoriques (0-10)' },
          ].map(field => (
            <div key={field.key}>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-slate-700">{field.label}</label>
                <span className="text-blue-600 font-bold">{formData[field.key as keyof typeof formData]}/10</span>
              </div>
              <input 
                type="range" min="0" max="10" step="1"
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                value={formData[field.key as keyof typeof formData] as number}
                onChange={(e) => setFormData({...formData, [field.key]: parseInt(e.target.value)})}
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Observations du jury</label>
            <textarea 
              rows={4}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.comments}
              onChange={(e) => setFormData({...formData, comments: e.target.value})}
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 transition shadow-sm">
              Enregistrer l'évaluation
            </button>
            <button 
              onClick={handleAiAnalyze}
              disabled={loading}
              className="flex-1 bg-indigo-50 text-indigo-700 py-2 rounded-lg font-bold hover:bg-indigo-100 transition border border-indigo-200 flex items-center justify-center space-x-2"
            >
              <span>{loading ? 'Analyse...' : '🪄 Synthèse IA'}</span>
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-indigo-900 text-white p-6 rounded-xl shadow-lg relative overflow-hidden h-full">
            <div className="relative z-10 h-full flex flex-col">
              <h3 className="font-bold text-lg mb-4 flex items-center space-x-2">
                <span>🤖 Rapport Assisté par IA</span>
              </h3>
              
              <div className="flex-1 bg-indigo-800/50 p-4 rounded-lg border border-indigo-700/50 text-indigo-100 text-sm leading-relaxed overflow-y-auto">
                {summary ? (
                  <p>{summary}</p>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center opacity-50 space-y-2">
                    <p className="italic">Appuyez sur "Synthèse IA" pour générer un résumé automatique basé sur les scores et commentaires.</p>
                  </div>
                )}
              </div>
              
              <div className="mt-4 pt-4 border-t border-indigo-700 text-[10px] uppercase tracking-wider text-indigo-400 font-bold">
                Moteur: Gemini 3 Flash Preview • Module Python/Django Bridge
              </div>
            </div>
            
            {/* Decorative circles */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-400 rounded-full blur-3xl opacity-20"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvaluationForm;

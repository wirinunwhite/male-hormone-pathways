import React from 'react';
import { AppSettings } from '../types';

interface ControlPanelProps {
  settings: AppSettings;
  onToggle: (key: keyof AppSettings) => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({ settings, onToggle }) => {
  return (
    <div className="flex gap-2 pointer-events-auto">
      <button 
        onClick={() => onToggle('finasteride')}
        className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-all duration-300 shadow-lg flex items-center gap-2
          ${settings.finasteride 
            ? 'bg-red-500/20 border-red-500 text-red-200' 
            : 'bg-slate-800 border-slate-600 text-slate-400 hover:border-slate-400 hover:text-slate-200'
          }`}
      >
        <span className={`w-2 h-2 rounded-full ${settings.finasteride ? 'bg-red-500' : 'bg-slate-600'}`} />
        {settings.finasteride ? 'Finasteride Active' : 'Simulate Finasteride'}
      </button>

      <button 
        onClick={() => onToggle('stress')}
        className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-all duration-300 shadow-lg flex items-center gap-2
          ${settings.stress 
            ? 'bg-orange-500/20 border-orange-500 text-orange-200' 
            : 'bg-slate-800 border-slate-600 text-slate-400 hover:border-slate-400 hover:text-slate-200'
          }`}
      >
        <span className={`w-2 h-2 rounded-full ${settings.stress ? 'bg-orange-500' : 'bg-slate-600'}`} />
        {settings.stress ? 'Stress Mode Active' : 'Simulate Stress'}
      </button>
    </div>
  );
};
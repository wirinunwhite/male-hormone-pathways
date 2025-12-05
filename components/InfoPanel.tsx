import React from 'react';
import { MousePointerClick, X, Activity, AlertTriangle, ShieldAlert, TrendingDown, TrendingUp } from 'lucide-react';
import { HormoneNode, PathwayEdge } from '../types';
import { NODES } from '../constants';

interface InfoPanelProps {
  activeNode: HormoneNode | null;
  activeSimulation: 'finasteride' | 'stress' | null;
  onClose: () => void;
  edges: PathwayEdge[];
  onSelectNode: (id: string) => void;
}

export const InfoPanel: React.FC<InfoPanelProps> = ({ 
  activeNode, 
  activeSimulation, 
  onClose, 
  edges, 
  onSelectNode 
}) => {

  // 1. ACTIVE NODE VIEW
  if (activeNode) {
    const inputs = edges.filter(e => e.to === activeNode.id);
    const outputs = edges.filter(e => e.from === activeNode.id);

    return (
      <div className="h-64 md:h-full md:w-96 bg-slate-900 border-t md:border-l border-slate-700 flex flex-col shadow-2xl z-40">
        <div className="p-6 flex-1 overflow-y-auto">
          <div className="flex justify-between items-start mb-4">
            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-400 uppercase tracking-widest border border-slate-700">
              {activeNode.type}
            </span>
            <button 
              onClick={onClose} 
              className="p-1 -mr-2 -mt-2 text-slate-500 hover:text-white transition-colors rounded-full hover:bg-slate-800"
            >
              <X size={18} />
            </button>
          </div>

          <h2 className="text-3xl font-bold text-white mb-4 leading-tight tracking-tight">{activeNode.label}</h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-8 border-l-4 border-blue-500/50 pl-4 bg-slate-800/30 py-2 pr-2 rounded-r">
            {activeNode.desc}
          </p>

          <div className="space-y-6">
            {/* Inputs Section */}
            <div className="relative">
              <h3 className="text-[10px] uppercase font-bold text-slate-500 mb-3 flex items-center gap-2">
                <span className="w-4 h-[1px] bg-slate-600"></span>
                Created From (Inputs)
              </h3>
              <div className="flex flex-wrap gap-2">
                {inputs.length === 0 ? (
                  <span className="text-xs text-slate-600 italic px-2">Primary Source (Start)</span>
                ) : (
                  inputs.map((e) => {
                     const sourceNode = NODES.find(n => n.id === e.from);
                     if (!sourceNode) return null;
                     return (
                      <button 
                        key={e.from} 
                        onClick={() => onSelectNode(e.from)} 
                        className="group flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 hover:border-blue-500/50 rounded-md text-xs border border-slate-700 transition-all text-left"
                      >
                        <span className="font-semibold text-blue-200 group-hover:text-white">{sourceNode.label}</span>
                        {e.label && <span className="text-slate-500 text-[10px] italic border-l border-slate-600 pl-2">via {e.label}</span>}
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            {/* Outputs Section */}
            <div className="relative">
              <h3 className="text-[10px] uppercase font-bold text-slate-500 mb-3 flex items-center gap-2">
                <span className="w-4 h-[1px] bg-slate-600"></span>
                Converts To (Outputs)
              </h3>
              <div className="flex flex-wrap gap-2">
                {outputs.length === 0 ? (
                  <span className="text-xs text-slate-600 italic px-2">End Product (Target)</span>
                ) : (
                  outputs.map((e) => {
                    const targetNode = NODES.find(n => n.id === e.to);
                    if (!targetNode) return null;
                    return (
                      <button 
                        key={e.to} 
                        onClick={() => onSelectNode(e.to)} 
                        className="group flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 hover:border-green-500/50 rounded-md text-xs border border-slate-700 transition-all text-left"
                      >
                        <span className="font-semibold text-green-200 group-hover:text-white">{targetNode.label}</span>
                        {e.label && <span className="text-slate-500 text-[10px] italic border-l border-slate-600 pl-2">via {e.label}</span>}
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* Contextual Alerts */}
          <div className="mt-8 space-y-3">
            {activeNode.id === 'dht' && (
              <div className="p-4 bg-red-950/30 border border-red-900/50 rounded-md text-xs text-red-200 shadow-sm">
                <strong className="block mb-1 text-red-400 uppercase text-[10px] tracking-wider">Inhibition Factors</strong> 
                5-Alpha Reductase is inhibited by Finasteride, Prolactin, Stress, Phthalates, and Sunlight Deficiency.
              </div>
            )}
            {activeNode.id === 'estradiol' && (
              <div className="p-4 bg-pink-950/30 border border-pink-900/50 rounded-md text-xs text-pink-200 shadow-sm">
                <strong className="block mb-1 text-pink-400 uppercase text-[10px] tracking-wider">Aromatase Triggers</strong> 
                Excess body fat, stress, blue light, and alcohol significantly increase conversion of T to Estrogen.
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 2. FINASTERIDE SIMULATION VIEW
  if (activeSimulation === 'finasteride') {
    return (
      <div className="h-64 md:h-full md:w-96 bg-slate-900 border-t md:border-l border-slate-700 flex flex-col shadow-2xl z-40">
        <div className="p-6 flex-1 overflow-y-auto">
          <div className="flex justify-between items-start mb-4">
             <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold bg-red-900/30 text-red-400 uppercase tracking-widest border border-red-900/50">
              <ShieldAlert size={10} /> 5α-Reductase Inhibitor
            </span>
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-4 leading-tight tracking-tight">Finasteride Therapy</h2>
          
          <p className="text-slate-300 text-sm leading-relaxed mb-6">
            Finasteride is a drug used to treat hair loss and BPH. It works by specifically inhibiting the 
            <strong> 5-alpha-reductase</strong> enzyme, preventing the conversion of Testosterone into its more potent form, DHT.
          </p>

          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50 space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Physiological Effects</h3>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm">
                <div className="mt-0.5 p-1 bg-red-500/20 rounded text-red-400"><TrendingDown size={14} /></div>
                <div>
                  <strong className="text-slate-200 block">Lower DHT</strong>
                  <span className="text-slate-400 text-xs">Reduces androgenic activity in scalp and prostate. Systemic DHT drops by ~70%.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm">
                <div className="mt-0.5 p-1 bg-green-500/20 rounded text-green-400"><TrendingUp size={14} /></div>
                <div>
                  <strong className="text-slate-200 block">Higher Testosterone</strong>
                  <span className="text-slate-400 text-xs">Because conversion is blocked, Testosterone levels typically rise by 10-15%.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm">
                <div className="mt-0.5 p-1 bg-pink-500/20 rounded text-pink-400"><Activity size={14} /></div>
                <div>
                  <strong className="text-slate-200 block">Estrogen Risk</strong>
                  <span className="text-slate-400 text-xs">With more Testosterone available, more substrate is available for Aromatase, potentially increasing Estrogen.</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-3 bg-red-950/20 border-l-2 border-red-600 text-xs text-red-200/80">
            <strong>Note:</strong> While effective for hair loss, blocking this pathway also reduces neurosteroids like 3α-Diol, which modulate GABA receptors in the brain.
          </div>
        </div>
      </div>
    );
  }

  // 3. STRESS SIMULATION VIEW
  if (activeSimulation === 'stress') {
    return (
      <div className="h-64 md:h-full md:w-96 bg-slate-900 border-t md:border-l border-slate-700 flex flex-col shadow-2xl z-40">
        <div className="p-6 flex-1 overflow-y-auto">
          <div className="flex justify-between items-start mb-4">
             <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold bg-orange-900/30 text-orange-400 uppercase tracking-widest border border-orange-900/50">
              <AlertTriangle size={10} /> Physiological State
            </span>
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-4 leading-tight tracking-tight">Chronic Stress</h2>
          
          <p className="text-slate-300 text-sm leading-relaxed mb-6">
            Under chronic stress, the HPA axis is hyperactive. The body prioritizes immediate survival (Cortisol production) over reproduction and repair (Anabolic hormones).
          </p>

          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50 space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">The "Pregnenolone Steal"</h3>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm">
                <div className="mt-0.5 p-1 bg-red-500/20 rounded text-red-400"><TrendingUp size={14} /></div>
                <div>
                  <strong className="text-slate-200 block">Elevated Cortisol</strong>
                  <span className="text-slate-400 text-xs">Resource-intensive production diverts Pregnenolone and Progesterone away from DHEA/Testosterone pathways.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm">
                <div className="mt-0.5 p-1 bg-blue-500/20 rounded text-blue-400"><TrendingDown size={14} /></div>
                <div>
                  <strong className="text-slate-200 block">Low Androgens</strong>
                  <span className="text-slate-400 text-xs">DHEA, Testosterone, and DHT levels drop, leading to low libido, muscle loss, and fatigue.</span>
                </div>
              </div>

               <div className="flex items-start gap-3 text-sm">
                <div className="mt-0.5 p-1 bg-yellow-500/20 rounded text-yellow-400"><Activity size={14} /></div>
                <div>
                  <strong className="text-slate-200 block">Insulin Resistance</strong>
                  <span className="text-slate-400 text-xs">High cortisol desensitizes insulin receptors, which in turn lowers SHBG levels.</span>
                </div>
              </div>
            </div>
          </div>
          
           <div className="mt-6 p-3 bg-orange-950/20 border-l-2 border-orange-600 text-xs text-orange-200/80">
            <strong>Impact:</strong> Chronic stress is one of the most common causes of functional hypogonadism (Low T) in modern men.
          </div>
        </div>
      </div>
    );
  }

  // 4. PLACEHOLDER VIEW
  return (
    <div className="h-64 md:h-full md:w-96 bg-slate-900/95 backdrop-blur-sm border-t md:border-l border-slate-700/50 flex flex-col shadow-2xl z-40 transition-all duration-300">
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-500">
        <MousePointerClick size={48} className="mb-4 opacity-50 animate-pulse" />
        <p className="text-lg font-medium text-slate-400">Select a Hormone</p>
        <p className="text-xs mt-2 max-w-[200px] leading-relaxed text-slate-500">
          Click any node in the map to reveal its pathways, enzymes, and inhibitors.
        </p>

        <div className="mt-8 text-left w-full bg-slate-800/50 p-4 rounded-lg border border-slate-700/50 shadow-inner">
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Quick Reference</h4>
          <ul className="text-xs space-y-2">
            <li className="flex items-center gap-2">
               <span className="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]"></span>
               <span><strong className="text-blue-400">Testosterone:</strong> The central hub.</span>
            </li>
            <li className="flex items-center gap-2">
               <span className="w-2 h-2 bg-red-500 rounded-full"></span>
               <span><strong className="text-red-400">Cortisol:</strong> Competes for resources.</span>
            </li>
            <li className="flex items-center gap-2">
               <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
               <span><strong className="text-indigo-400">DHT:</strong> Potent androgen (Hair/Prostate).</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
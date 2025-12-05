import React from 'react';
import { HormoneNode, PathwayEdge, AppSettings, EdgeStatus, NodeType } from '../types';

interface HormoneMapProps {
  nodes: HormoneNode[];
  edges: PathwayEdge[];
  selectedId: string | null;
  settings: AppSettings;
  onSelectNode: (id: string | null) => void;
}

export const HormoneMap: React.FC<HormoneMapProps> = ({ 
  nodes, 
  edges, 
  selectedId, 
  settings, 
  onSelectNode 
}) => {

  // --- Logic Helpers ---

  const getEdgeStatus = (edge: PathwayEdge): EdgeStatus => {
    // Finasteride Logic: Blocks 5-Alpha Reductase
    if (settings.finasteride && edge.label === '5α-Reductase') return 'blocked';
    
    // Stress Logic: Highlights Cortisol path, Dims Androgen path
    if (settings.stress) {
      if (edge.to === 'cort') return 'boosted';
      if (['dhea', 'andro', 'test'].includes(edge.to) && edge.from !== 'shbg') return 'dimmed';
    }
    
    // Selection Logic
    if (selectedId) {
      if (edge.from === selectedId) return 'outgoing';
      if (edge.to === selectedId) return 'incoming';
      return 'dimmed';
    }
    
    return 'normal';
  };

  const getNodeOpacity = (node: HormoneNode): number => {
    if (settings.finasteride && node.id === 'dht') return 0.4;
    if (settings.stress && ['test', 'dhea', 'dht'].includes(node.id)) return 0.5;
    
    if (selectedId && node.id !== selectedId) {
      const isConnected = edges.some(e => 
        (e.from === selectedId && e.to === node.id) || 
        (e.to === selectedId && e.from === node.id)
      );
      return isConnected ? 1 : 0.3;
    }
    return 1;
  };

  const getNodeColorClass = (type: NodeType): string => {
    switch(type) {
      case 'source': return 'bg-yellow-600/90 border-yellow-400 text-yellow-50';
      case 'precursor': return 'bg-slate-600/90 border-slate-400 text-slate-100';
      case 'stress': return 'bg-red-800/90 border-red-500 text-red-100';
      case 'androgen': return 'bg-blue-800/90 border-blue-500 text-blue-100';
      case 'hero': return 'bg-blue-600 border-blue-300 shadow-[0_0_30px_rgba(37,99,235,0.6)] text-white scale-110 font-bold';
      case 'estrogen': return 'bg-pink-800/90 border-pink-500 text-pink-100';
      case 'potent': return 'bg-indigo-600/90 border-indigo-400 text-indigo-100';
      default: return 'bg-slate-700/90 border-slate-500 text-slate-300';
    }
  };

  return (
    <div 
      className="relative flex-1 bg-slate-950 overflow-hidden cursor-grab active:cursor-grabbing touch-pan-x touch-pan-y w-full"
      onClick={() => onSelectNode(null)}
    >
      {/* BACKGROUND GRID */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{ 
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', 
          backgroundSize: '20px 20px' 
        }} 
      />

      {/* SVG LAYER FOR EDGES */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <defs>
          <marker id="arrow" markerWidth="8" markerHeight="8" refX="10" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#475569" />
          </marker>
          <marker id="arrow-active" markerWidth="8" markerHeight="8" refX="10" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#60a5fa" />
          </marker>
          <marker id="arrow-blocked" markerWidth="8" markerHeight="8" refX="10" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#ef4444" />
          </marker>
          <marker id="arrow-boosted" markerWidth="8" markerHeight="8" refX="10" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#f97316" />
          </marker>
        </defs>
        
        {edges.map((edge, i) => {
          const start = nodes.find(n => n.id === edge.from);
          const end = nodes.find(n => n.id === edge.to);
          
          if (!start || !end) return null;

          const status = getEdgeStatus(edge);

          let stroke = '#334155'; // default slate-700
          let width = 2;
          let marker = 'url(#arrow)';
          let dash = edge.style === 'dashed' ? '5,5' : '0';

          if (status === 'incoming' || status === 'outgoing') { stroke = '#60a5fa'; width = 3; marker = 'url(#arrow-active)'; }
          if (status === 'boosted') { stroke = '#f97316'; width = 4; marker = 'url(#arrow-boosted)'; }
          if (status === 'blocked') { stroke = '#ef4444'; width = 2; dash = '5,5'; marker = 'url(#arrow-blocked)'; }
          if (status === 'dimmed') { stroke = '#1e293b'; width = 1; marker = ''; }

          return (
            <g key={`${edge.from}-${edge.to}`} className="transition-all duration-500 ease-in-out">
              <line 
                x1={`${start.x}%`} y1={`${start.y}%`}
                x2={`${end.x}%`} y2={`${end.y}%`}
                stroke={stroke} strokeWidth={width}
                strokeDasharray={dash}
                markerEnd={status !== 'dimmed' ? marker : ''}
                className="transition-all duration-500"
              />
              
              {/* EDGE LABEL */}
              {edge.label && status !== 'dimmed' && (
                <g className="transition-opacity duration-300">
                  <rect 
                    x={`${(start.x + end.x) / 2 - 4}%`} 
                    y={`${(start.y + end.y) / 2 - 1.5}%`} 
                    width="8%" height="3%" 
                    fill="#020617" opacity="0.9" rx="4"
                  />
                  <text 
                    x={`${(start.x + end.x) / 2}%`} 
                    y={`${(start.y + end.y) / 2}%`} 
                    dy=".3em" textAnchor="middle" 
                    fill={status === 'blocked' ? '#ef4444' : '#94a3b8'} 
                    fontSize="10" fontWeight="bold"
                    className="select-none font-mono"
                  >
                    {edge.label}
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>

      {/* NODES LAYER */}
      {nodes.map(node => (
        <div 
          key={node.id}
          onClick={(e) => {
            e.stopPropagation();
            onSelectNode(node.id);
          }}
          className={`
            absolute transform -translate-x-1/2 -translate-y-1/2 
            w-28 md:w-40 p-2 rounded-xl border-2 text-center shadow-lg 
            transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer
            hover:scale-105 hover:z-20
            flex flex-col items-center justify-center
            ${getNodeColorClass(node.type)}
            ${selectedId === node.id ? 'scale-110 z-30 ring-2 ring-white shadow-[0_0_20px_rgba(255,255,255,0.3)]' : 'z-10'}
          `}
          style={{ 
            left: `${node.x}%`, 
            top: `${node.y}%`, 
            opacity: getNodeOpacity(node)
          }}
        >
          <span className="text-[10px] md:text-xs font-bold uppercase leading-tight tracking-wide break-words w-full">
            {node.label}
          </span>
        </div>
      ))}

      {/* LEGEND */}
      <div className="absolute bottom-6 left-6 bg-slate-900/90 backdrop-blur border border-slate-700 p-4 rounded-xl shadow-2xl pointer-events-none hidden md:block">
        <h5 className="text-[10px] font-bold uppercase text-slate-500 mb-2 tracking-wider">Legend</h5>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <div className="w-2.5 h-2.5 bg-blue-800 rounded-sm border border-blue-500"></div> Androgen
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <div className="w-2.5 h-2.5 bg-pink-800 rounded-sm border border-pink-500"></div> Estrogen
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <div className="w-2.5 h-2.5 bg-red-800 rounded-sm border border-red-500"></div> Stress
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <div className="w-2.5 h-2.5 bg-indigo-600 rounded-sm border border-indigo-400"></div> Potent (DHT)
          </div>
        </div>
      </div>
    </div>
  );
};
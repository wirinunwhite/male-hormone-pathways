import React, { useState, useMemo, useEffect } from 'react';
import { HormoneMap } from './components/HormoneMap';
import { InfoPanel } from './components/InfoPanel';
import { ControlPanel } from './components/ControlPanel';
import { NODES, EDGES } from './constants';
import { AppSettings } from './types';

const App: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [settings, setSettings] = useState<AppSettings>({
    finasteride: false,
    stress: false
  });
  // Track which simulation view to show in the sidebar if no node is selected
  const [activeSimulation, setActiveSimulation] = useState<'finasteride' | 'stress' | null>(null);

  const activeNode = useMemo(() => NODES.find(n => n.id === selectedId) || null, [selectedId]);

  // Handle keyboard shortcuts (Escape to deselect)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedId(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleToggle = (key: keyof AppSettings) => {
    const willBeActive = !settings[key];
    
    setSettings(prev => ({ ...prev, [key]: willBeActive }));

    if (willBeActive) {
      // If turning ON, show the info in sidebar immediately
      setActiveSimulation(key);
      setSelectedId(null); // Deselect any node to focus on the simulation
    } else {
      // If turning OFF, check if we need to fallback to the other active simulation
      if (activeSimulation === key) {
        if (key === 'finasteride' && settings.stress) {
          setActiveSimulation('stress');
        } else if (key === 'stress' && settings.finasteride) {
          setActiveSimulation('finasteride');
        } else {
          setActiveSimulation(null);
        }
      }
    }
  };

  return (
    <div className="flex flex-col h-screen md:flex-row bg-slate-950 font-sans selection:bg-blue-500/30">
      
      {/* LEFT: VISUALIZATION CANVAS */}
      <div className="relative flex-1 flex flex-col h-full overflow-hidden">
        
        {/* Header - Static Position to avoid overlap */}
        <div className="flex-none p-4 md:p-6 z-20 bg-slate-950 border-b border-slate-900 shadow-md">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 tracking-tight filter drop-shadow-sm">
                MALE HORMONE PATHWAYS
              </h1>
              <p className="text-slate-400 text-xs md:text-sm mt-1 font-medium">Interactive Steroidogenesis Map & Enzyme Inhibitors</p>
            </div>
            
            {/* Control Panel */}
            <ControlPanel settings={settings} onToggle={handleToggle} />
          </div>
        </div>

        {/* Map Component */}
        <HormoneMap 
          nodes={NODES} 
          edges={EDGES} 
          selectedId={selectedId}
          settings={settings}
          onSelectNode={setSelectedId}
        />
      </div>

      {/* RIGHT: INFO PANEL */}
      <InfoPanel 
        activeNode={activeNode} 
        activeSimulation={activeSimulation}
        onClose={() => setSelectedId(null)} 
        edges={EDGES}
        onSelectNode={setSelectedId}
      />
    </div>
  );
};

export default App;
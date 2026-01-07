import React, { useState } from 'react';

const PowerIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
    <line x1="12" y1="2" x2="12" y2="12" />
  </svg>
);

const KillSwitchDemo = () => {
  const [locked, setLocked] = useState(false);

  return (
    <div className="w-full h-full bg-[#050505] rounded-xl border border-slate-800 flex flex-col overflow-hidden relative font-body shadow-2xl">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-20" 
           style={{ backgroundImage: 'linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      {/* Top Bar */}
      <div className="h-16 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-900/90 backdrop-blur z-10">
        <div className="text-lg font-bold tracking-tight text-white flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center font-heading font-bold text-white shadow-[0_0_15px_rgba(147,51,234,0.5)]">A</div>
          <span className="font-heading tracking-tight">AgentEval Console</span>
        </div>
        <div className={`px-4 py-1.5 rounded-full text-[10px] font-bold border flex items-center gap-2 transition-all duration-500 tracking-widest uppercase font-tech ${locked ? 'bg-red-950/30 border-red-500/50 text-red-500 shadow-[0_0_20px_rgba(220,38,38,0.2)]' : 'bg-green-950/30 border-green-500/50 text-green-500 shadow-[0_0_20px_rgba(34,197,94,0.2)]'}`}>
          <div className={`w-1.5 h-1.5 rounded-full ${locked ? 'bg-red-500 animate-[ping_1s_infinite]' : 'bg-green-500'}`}></div>
          {locked ? 'FLEET HALTED' : 'FLEET ACTIVE'}
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="flex-1 p-8 relative z-10 flex gap-8">
        {/* Left Metrics */}
        <div className="flex-1 space-y-4">
          <div className="p-5 bg-slate-900/40 border border-slate-800 rounded-xl backdrop-blur-sm hover:border-slate-600 transition-colors group">
             <div className="text-slate-500 text-[10px] uppercase tracking-widest font-tech mb-1">Active Agents</div>
             <div className="text-4xl font-heading font-bold text-white group-hover:text-purple-400 transition-colors">{locked ? '0' : '1,248'}</div>
          </div>
          <div className="p-5 bg-slate-900/40 border border-slate-800 rounded-xl backdrop-blur-sm hover:border-slate-600 transition-colors group">
             <div className="text-slate-500 text-[10px] uppercase tracking-widest font-tech mb-1">Requests / Sec</div>
             <div className="text-4xl font-heading font-bold text-blue-400 font-mono group-hover:text-blue-300 transition-colors">{locked ? '0' : '842'}</div>
          </div>
          <div className="p-5 bg-slate-900/40 border border-slate-800 rounded-xl backdrop-blur-sm hover:border-slate-600 transition-colors">
             <div className="text-slate-500 text-[10px] uppercase tracking-widest font-tech mb-1">Risk Score</div>
             <div className={`text-4xl font-heading font-bold transition-colors duration-300 ${locked ? 'text-red-500' : 'text-green-400'}`}>
               {locked ? 'CRITICAL' : 'LOW'}
             </div>
          </div>
        </div>

        {/* The Button */}
        <div className="flex-1 flex flex-col items-center justify-center bg-black/40 rounded-2xl border border-dashed border-slate-800 p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-800/20 to-transparent pointer-events-none"></div>
          
          <div className="text-slate-300 mb-8 text-center relative z-10">
            <h3 className="text-xl font-heading font-semibold text-white">Emergency Controls</h3>
            <p className="text-[10px] text-slate-500 mt-2 font-tech uppercase tracking-widest">Level 3 Governance Protocol</p>
          </div>
          
          <button 
            onClick={() => setLocked(!locked)}
            className={`
              w-40 h-40 rounded-full border-[6px] shadow-[0_0_60px_rgba(0,0,0,0.8)] 
              flex flex-col items-center justify-center transition-all duration-300 relative z-10
              group
              ${locked 
                ? 'bg-slate-900 border-slate-700 shadow-none scale-95' 
                : 'bg-gradient-to-b from-[#b91c1c] to-[#7f1d1d] border-[#ef4444] hover:scale-105 hover:shadow-[0_0_100px_rgba(220,38,38,0.5)]'
              }
            `}
          >
            <PowerIcon className={`w-12 h-12 text-white mb-2 transition-opacity ${locked ? 'opacity-30' : 'opacity-100 group-hover:animate-pulse'}`} />
            <span className="text-white font-bold tracking-[0.2em] text-[10px] font-heading">
              {locked ? 'RESET' : 'KILL SWITCH'}
            </span>
          </button>
          
          {locked && (
            <div className="mt-8 text-red-500 font-tech text-center animate-bounce border border-red-500/30 bg-red-950/30 px-4 py-2 rounded">
              ⚠ 503 SERVICE PAUSED
            </div>
          )}
        </div>
      </div>
      
      {/* Overlay when locked */}
      {locked && (
        <div className="absolute inset-0 bg-red-950/20 pointer-events-none z-0 flex items-center justify-center backdrop-grayscale-[50%]">
           <div className="w-full h-[1px] bg-red-500/50 absolute top-1/2 shadow-[0_0_20px_rgba(239,68,68,1)]"></div>
           <div className="h-full w-[1px] bg-red-500/50 absolute left-1/2 shadow-[0_0_20px_rgba(239,68,68,1)]"></div>
        </div>
      )}
    </div>
  );
};

export default KillSwitchDemo;

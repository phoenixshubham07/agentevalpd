import React from 'react';
import { Activity, Globe } from 'lucide-react';

const DashboardDemo = () => (
  <div className="w-full h-full bg-[#050505] rounded-xl border border-slate-800 flex flex-col overflow-hidden relative font-body shadow-2xl">
     {/* Dashboard Header */}
     <div className="h-12 border-b border-slate-800 flex items-center justify-between px-4 bg-slate-900/50">
        <div className="flex gap-4">
           <div className="flex items-center gap-2 text-xs font-tech text-slate-300">
              <Activity size={14} className="text-blue-400"/> Live Monitor
           </div>
           <div className="flex items-center gap-2 text-xs font-tech text-slate-500">
              <Globe size={14}/> Network Map
           </div>
        </div>
        <div className="flex items-center gap-3">
           <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
           <span className="text-[10px] font-tech text-green-400 uppercase tracking-widest">System Stable</span>
        </div>
     </div>

     {/* Dashboard Grid */}
     <div className="flex-1 p-4 grid grid-cols-3 gap-4">
        {/* Col 1: Live Feed */}
        <div className="col-span-2 bg-slate-900/30 border border-slate-800 rounded-lg p-4 flex flex-col">
           <h4 className="text-xs font-heading font-bold text-slate-400 mb-3 uppercase tracking-widest">Real-time Threat Log</h4>
           <div className="flex-1 overflow-hidden space-y-2 font-tech text-[10px]">
              <div className="flex justify-between p-2 bg-slate-800/50 rounded border-l-2 border-green-500">
                 <span className="text-slate-300">Agent-007 requesting DB Access...</span>
                 <span className="text-green-400">ALLOWED</span>
              </div>
              <div className="flex justify-between p-2 bg-slate-800/50 rounded border-l-2 border-red-500">
                 <span className="text-white">Agent-042 detected PII leakage (SSN)</span>
                 <span className="text-red-400 font-bold animate-pulse">BLOCKED</span>
              </div>
              <div className="flex justify-between p-2 bg-slate-800/50 rounded border-l-2 border-green-500">
                 <span className="text-slate-300">Agent-009 executed SQL query...</span>
                 <span className="text-green-400">ALLOWED</span>
              </div>
              <div className="flex justify-between p-2 bg-slate-800/50 rounded border-l-2 border-yellow-500">
                 <span className="text-slate-300">Agent-101 high latency warning (4s)</span>
                 <span className="text-yellow-400">FLAGGED</span>
              </div>
              <div className="flex justify-between p-2 bg-slate-800/50 rounded border-l-2 border-green-500">
                 <span className="text-slate-300">Agent-003 Tool Call: Search API</span>
                 <span className="text-green-400">ALLOWED</span>
              </div>
           </div>
        </div>

        {/* Col 2: Stats */}
        <div className="col-span-1 flex flex-col gap-4">
           <div className="flex-1 bg-slate-900/30 border border-slate-800 rounded-lg p-4 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="text-4xl font-heading font-bold text-white mb-1">99.9<span className="text-lg text-slate-500">%</span></div>
              <div className="text-[9px] font-tech text-slate-400 uppercase tracking-widest">Safety Score</div>
              <div className="absolute bottom-0 left-0 h-1 bg-green-500 w-full"></div>
           </div>
           <div className="flex-1 bg-slate-900/30 border border-slate-800 rounded-lg p-4 flex flex-col items-center justify-center">
              <div className="text-4xl font-heading font-bold text-red-400 mb-1">12</div>
              <div className="text-[9px] font-tech text-slate-400 uppercase tracking-widest">Threats Blocked</div>
           </div>
           <div className="flex-1 bg-slate-900/30 border border-slate-800 rounded-lg p-4 flex flex-col items-center justify-center">
              <div className="text-4xl font-heading font-bold text-blue-400 mb-1">24ms</div>
              <div className="text-[9px] font-tech text-slate-400 uppercase tracking-widest">Avg Latency</div>
           </div>
        </div>
     </div>
  </div>
);

export default DashboardDemo;

import React from 'react';
import { 
  Shield, 
  CheckCircle, 
  Code, 
  Cpu, 
  Globe, 
  Database 
} from 'lucide-react';

const TraceTreeMRI = () => (
  <div className="w-full h-full bg-[#0f172a] overflow-hidden flex flex-col font-tech text-xs relative group">
    {/* Header */}
    <div className="h-8 bg-slate-900 border-b border-slate-800 flex items-center px-4 justify-between select-none flex-shrink-0">
      <div className="flex items-center space-x-2">
        <span className="text-slate-400 font-heading font-medium tracking-wide text-[10px]">trace_id: 8f92-a1b2</span>
      </div>
      <div className="flex space-x-3 text-slate-500 font-tech text-[9px] tracking-wider uppercase">
        <span className="text-green-400 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span> Online</span>
        <span>42ms</span>
      </div>
    </div>

    {/* Body */}
    <div className="flex-1 flex overflow-hidden">
      {/* Sidebar */}
      <div className="w-40 bg-slate-900/50 border-r border-slate-800 p-3 flex flex-col gap-3 flex-shrink-0">
        <div className="flex flex-col gap-1">
            <div className="text-[9px] uppercase text-slate-500 font-bold tracking-wider">Run Stats</div>
            <div className="p-2 rounded bg-slate-800/50 border border-slate-700/50">
               <div className="flex justify-between mb-1"><span className="text-slate-400">Tokens</span> <span className="text-white">420</span></div>
               <div className="flex justify-between"><span className="text-slate-400">Cost</span> <span className="text-white">$0.012</span></div>
            </div>
        </div>
        
        <div className="flex flex-col gap-1 mt-2">
            <div className="text-[9px] uppercase text-slate-500 font-bold tracking-wider">Safety</div>
            <div className="p-2 rounded bg-green-500/10 border border-green-500/20 text-green-400 flex items-center gap-2">
               <Shield size={10} /> PII Safe
            </div>
            <div className="p-2 rounded bg-green-500/10 border border-green-500/20 text-green-400 flex items-center gap-2">
               <CheckCircle size={10} /> Fact Check
            </div>
        </div>
      </div>

      {/* Main Graph Area */}
      <div className="flex-1 bg-[#0b0f19] relative p-4 flex flex-col items-center overflow-y-auto">
        
        {/* Node 1: User Input */}
        <div className="z-10 w-64 p-3 bg-slate-800 border border-slate-700 rounded-lg shadow-lg flex justify-between items-center flex-shrink-0">
            <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-blue-500/20 flex items-center justify-center text-blue-400"><Code size={12}/></div>
                <span className="text-blue-200 font-bold">User Input</span>
            </div>
            <span className="text-slate-500 italic truncate max-w-[80px]">"Transfer $5k..."</span>
        </div>

        {/* Connector Line */}
        <div className="h-6 w-px bg-slate-700 flex-shrink-0"></div>

        {/* Node 2: Guardrail (The Hook) */}
        <div className="z-10 w-64 p-3 bg-purple-900/10 border border-purple-500/50 rounded-lg shadow-[0_0_20px_rgba(168,85,247,0.1)] flex justify-between items-center backdrop-blur-sm flex-shrink-0">
            <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-purple-500/20 flex items-center justify-center text-purple-400"><Shield size={12}/></div> 
                <span className="text-purple-200 font-bold">Guardrail</span>
            </div>
            <span className="text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded text-[9px] font-bold tracking-wider">PASSED</span>
        </div>

        {/* Connector Line */}
        <div className="h-6 w-px bg-slate-700 flex-shrink-0"></div>

        {/* Node 3: LLM Router */}
        <div className="z-10 w-64 p-3 bg-slate-800 border border-slate-700 rounded-lg shadow-lg flex justify-between items-center flex-shrink-0">
            <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-yellow-500/20 flex items-center justify-center text-yellow-400"><Cpu size={12}/></div>
                <span className="text-yellow-100 font-bold">Orchestrator</span>
            </div>
            <span className="text-slate-500 text-[9px] border border-slate-700 px-1.5 rounded bg-slate-900">GPT-4</span>
        </div>

        {/* Connector Line (Split) */}
        <div className="h-4 w-px bg-slate-700 flex-shrink-0"></div>
        
        {/* Branching Lines */}
        <div className="w-32 h-px bg-slate-700 flex-shrink-0 relative">
            <div className="absolute left-0 top-0 h-3 w-px bg-slate-700"></div>
            <div className="absolute right-0 top-0 h-3 w-px bg-slate-700"></div>
        </div>
        <div className="h-3 flex-shrink-0"></div> 

        {/* Split Nodes */}
        <div className="flex gap-8 w-64 justify-between">
             <div className="w-28 p-2 bg-slate-800/50 border border-slate-700 rounded text-center opacity-60 flex flex-col items-center gap-1">
                <Globe size={12} className="text-slate-400"/>
                <span className="text-slate-400">Search</span>
             </div>
             <div className="w-28 p-2 bg-slate-800/50 border border-slate-700 rounded text-center opacity-60 flex flex-col items-center gap-1">
                <Database size={12} className="text-slate-400"/>
                <span className="text-slate-400">DB</span>
             </div>
        </div>
      </div>
    </div>
  </div>
);

export default TraceTreeMRI;

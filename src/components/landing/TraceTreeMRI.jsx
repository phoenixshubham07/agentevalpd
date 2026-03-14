import React from 'react';
import { Lock, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

const TraceNode = ({ label, latency, type = 'default', Icon }) => {
  const isError = type === 'error';
  
  const bgClass = isError ? 'bg-red-950/30' : 'bg-blue-950/30';
  const borderClass = isError ? 'border-red-500/50 group-hover:border-red-400' : 'border-blue-500/50 group-hover:border-blue-400';
  const textClass = isError ? 'text-red-300' : 'text-blue-300';
  const latencyClass = isError ? 'text-red-400/80 font-mono' : 'text-blue-400/80 font-mono';
  const glowClass = isError ? 'shadow-[0_0_15px_rgba(239,68,68,0.15)] group-hover:shadow-[0_0_20px_rgba(239,68,68,0.25)]' : 'shadow-[0_0_15px_rgba(59,130,246,0.15)] group-hover:shadow-[0_0_20px_rgba(59,130,246,0.25)]';

  return (
    <div className={`relative px-4 py-2 border rounded-md min-w-[160px] flex flex-col items-center justify-center transition-all duration-300 backdrop-blur-sm group ${bgClass} ${borderClass} ${textClass} ${glowClass}`}>
      {Icon && (
        <div className="absolute top-1 right-1 text-red-500/80">
          <Icon size={14} className={isError ? "animate-pulse" : ""} />
        </div>
      )}
      <div className="text-sm font-tech tracking-wider uppercase flex items-center gap-2">
        {/* Redacted element */}
        <span className="inline-block w-3 h-1 bg-current opacity-50"></span>
        {label}
        <span className="inline-block w-3 h-1 bg-current opacity-50"></span>
      </div>
      <div className={`text-xs mt-0.5 ${latencyClass}`}>{latency}</div>
      
      {/* Corner UI */}
      <div className={`absolute top-0 left-0 w-2 h-2 border-t border-l ${isError ? 'border-red-500' : 'border-blue-500'} opacity-50 rounded-tl-sm`} />
      <div className={`absolute bottom-0 right-0 w-2 h-2 border-b border-r ${isError ? 'border-red-500' : 'border-blue-500'} opacity-50 rounded-br-sm`} />
    </div>
  );
};

export default function TraceTreeMRI() {
  return (
    <div className="font-sans text-slate-200 w-full relative group">
      
      {/* Cyberpunk Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none z-0"></div>
      
      <div className="mb-10 relative z-10">
        <div className="flex items-center justify-between mb-2">
           <h3 className="text-xl font-bold font-heading text-white tracking-wide">
             Trace Tree MRI
           </h3>
           <div className="px-2 py-1 bg-red-500/10 border border-red-500/30 text-red-400 text-[10px] font-tech uppercase tracking-widest rounded flex items-center gap-2">
             <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-[ping_1s_infinite]"></span>
             PII Leak Detected
           </div>
        </div>
        <p className="text-slate-400 text-sm font-tech tracking-wider">
          Node Hierarchy: Manager &gt; Proxy Auth &gt; Workers
        </p>
        <div className="mt-2 text-slate-500 font-mono text-[10px] tracking-widest uppercase flex items-center gap-2 bg-black/40 inline-flex px-2 py-1 rounded border border-white/5">
          Trace ID: <span className="bg-slate-700/50 px-1 rounded text-transparent text-shadow-sm blur-[2px] select-none">XXXXXXXXXXXXXXXX</span>
        </div>
      </div>

      <div className="flex justify-center mt-8 pb-4 relative z-10 zoom-90 sm:zoom-100 overflow-x-auto">
        <div className="flex items-center min-w-max">
          
          {/* Parent Node */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="relative z-20 flex items-center"
          >
            <TraceNode label="MAIN_ORCHESTRATOR" latency="2200 ms" type="error" Icon={ShieldAlert} />
            <div className="w-8 h-px bg-slate-600" />
          </motion.div>

          {/* Children block */}
          <div className="relative py-4">
            {/* Vertical joining line */}
            <div className="absolute top-8 bottom-8 left-0 w-px bg-gradient-to-b from-slate-600 via-blue-500/50 to-slate-600" />
            
            <div className="flex flex-col gap-6 pl-8">
              
              {/* Row 1 */}
              <motion.div 
                className="relative flex items-center"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="absolute -left-8 w-8 h-px bg-slate-600" />
                <TraceNode label="SYS_AUTH" latency="600 ms" type="error" Icon={Lock} />
              </motion.div>

              {/* Row 2 */}
              <motion.div 
                className="relative flex items-center"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="absolute -left-8 w-8 h-px bg-slate-600" />
                <div className="flex cursor-default hover:scale-[1.02] transition-transform">
                  <div className="relative px-4 py-2 border border-red-500/50 rounded-l-md shadow-[0_0_15px_rgba(239,68,68,0.1)] bg-red-950/30 min-w-[140px] flex flex-col items-center justify-center text-red-300 border-r-0 backdrop-blur-sm">
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-red-500 opacity-50 rounded-tl-sm"/>
                    <div className="text-sm font-tech uppercase tracking-widest">SEC_VAL</div>
                    <div className="text-xs mt-0.5 text-red-400 font-mono">900 ms</div>
                  </div>
                  <div className="relative px-4 py-2 border border-red-500/50 rounded-r-md shadow-[0_0_15px_rgba(239,68,68,0.1)] bg-red-950/30 min-w-[140px] flex flex-col items-center justify-center text-red-300 backdrop-blur-sm">
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-red-500 opacity-50 rounded-br-sm"/>
                    <div className="text-sm font-tech uppercase tracking-widest">ID_VERIFY</div>
                    <div className="text-xs mt-0.5 text-red-400 font-mono">500 ms</div>
                  </div>
                </div>
              </motion.div>

              {/* Row 3 */}
              <motion.div 
                className="relative flex items-center"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="absolute -left-8 w-8 h-px bg-slate-600" />
                <TraceNode label="REQ_TICKET" latency="400 ms" type="default" />
              </motion.div>

              {/* Row 4 */}
              <motion.div 
                className="relative flex items-center"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="absolute -left-8 w-8 h-px bg-slate-600" />
                <TraceNode label="EXEC_WORKER" latency="300 ms" type="default" />
              </motion.div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

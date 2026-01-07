import React from 'react';
import { 
  Globe, 
  Shield, 
  Activity, 
  Lock, 
  Zap, 
  Bug, 
  CheckCircle, 
  Server,
  Code,
  Cpu,
  BarChart3
} from 'lucide-react';
import { Slide, SlideHeader } from '../components/SlideComponents';
import TraceTreeMRI from '../components/demos/TraceTreeMRI';
import DashboardDemo from '../components/demos/DashboardDemo';

export const slidesPart2 = [
    // Slide 8: Market Opportunity (REDESIGNED: High-Impact Cards)
    <Slide key="8" className="flex flex-col">
       <SlideHeader title="Market Capture" subtitle="The Governance Tax" />
       
       <div className="flex-1 flex flex-col justify-center gap-12 min-h-0 relative z-10">
          {/* Main Stats Row */}
          <div className="flex items-stretch justify-center gap-8 h-[60%]">
             
             {/* TAM Card - Subtle Dark Theme */}
             <div className="flex-1 bg-slate-900/40 border border-slate-800 p-8 rounded-3xl backdrop-blur-sm relative group overflow-hidden hover:border-slate-700 transition-colors flex flex-col justify-between">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                   <Globe size={120} className="text-slate-400" />
                </div>
                <div>
                    <div className="text-slate-500 font-tech uppercase tracking-[0.2em] text-xs mb-4 font-bold">Total Addressable Market (2032)</div>
                    <div className="text-7xl lg:text-8xl font-heading font-bold text-white tracking-tighter mb-4 group-hover:scale-105 transition-transform origin-left duration-500 leading-none">
                        $1.3<span className="text-slate-700 text-5xl lg:text-6xl align-top ml-2">T</span>
                    </div>
                </div>
                <p className="text-slate-400 font-body text-lg max-w-sm leading-relaxed">
                    Global Generative AI Market spend projected by <span className="text-slate-300 font-medium">Bloomberg Intelligence</span>.
                </p>
             </div>

             {/* SAM Card - Highlighted/Active Theme */}
             <div className="flex-1 bg-gradient-to-br from-blue-950/40 to-purple-950/40 border border-blue-500/40 p-8 rounded-3xl backdrop-blur-md relative group overflow-hidden shadow-[0_0_60px_rgba(59,130,246,0.15)] hover:shadow-[0_0_80px_rgba(59,130,246,0.25)] transition-shadow flex flex-col justify-between">
                <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-30 transition-opacity">
                   <Shield size={120} className="text-blue-400" />
                </div>
                
                <div>
                    <div className="text-blue-400 font-tech uppercase tracking-[0.2em] text-xs mb-4 font-bold flex items-center gap-3 relative z-10">
                       <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shadow-[0_0_10px_rgba(96,165,250,0.8)]"></span> 
                       Serviceable Obtainable Market
                    </div>
                    
                    <div className="relative z-10">
                        <div className="text-7xl lg:text-8xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-purple-200 tracking-tighter mb-4 group-hover:scale-105 transition-transform origin-left duration-500 leading-none">
                            $18<span className="text-blue-500/50 text-5xl lg:text-6xl align-top ml-2">B</span>
                        </div>
                    </div>
                </div>
                <p className="text-blue-100 font-body text-xl max-w-sm leading-relaxed font-medium">
                    Agent Ops & Governance Software.
                </p>
             </div>
          </div>

          {/* Logic Bar - Explains the Math */}
          <div className="w-full max-w-5xl mx-auto bg-black/40 border border-slate-800/60 rounded-2xl p-6 flex items-center justify-between backdrop-blur-md hover:border-slate-700 transition-colors">
             <div className="flex flex-col pl-4">
                <span className="text-slate-500 font-tech text-[10px] uppercase tracking-widest mb-1 font-bold">The Logic</span>
                <span className="text-white font-heading font-medium text-xl tracking-tight">Security layers capture <span className="text-blue-400 font-bold">5-10%</span> of total AI infrastructure spend.</span>
             </div>
             
             <div className="h-10 w-px bg-slate-800 mx-8"></div>
             
             <div className="flex flex-col items-end pr-4">
                <span className="text-slate-500 font-tech text-[10px] uppercase tracking-widest mb-1 font-bold">Market Velocity</span>
                <span className="text-green-400 font-heading font-bold text-xl flex items-center gap-2 tracking-tight">
                   <Activity size={18} className="animate-pulse" /> 42% CAGR
                </span>
             </div>
          </div>
       </div>
    </Slide>,

    // Slide 9: Competitive Landscape (REDESIGNED 4-COLUMN GRID, FIXED SPACING)
    <Slide key="9" className="flex flex-col">
      <SlideHeader title="Competitive Landscape" subtitle="From Debugging to Governing" />
      
      <div className="flex-1 flex flex-col justify-center min-h-0 relative z-10">
        
        {/* Comparison Grid */}
        <div className="grid grid-cols-4 gap-0 border border-slate-800 rounded-3xl overflow-hidden bg-slate-950/50 backdrop-blur-sm relative">
            
            {/* Background Highlight for AgentEval Column (Col 2) */}
            <div className="absolute top-0 bottom-0 left-[25%] w-[25%] bg-gradient-to-b from-purple-900/10 to-blue-900/10 border-x border-purple-500/20 z-0"></div>
            <div className="absolute top-0 left-[25%] w-[25%] h-1 bg-gradient-to-r from-purple-500 to-blue-500 z-10"></div>

            {/* HEADER ROW */}
            <div className="p-3 lg:p-4 border-b border-slate-800/50 flex items-end">
               <span className="text-slate-500 font-tech uppercase tracking-widest text-[10px] lg:text-xs">Feature</span>
            </div>
            <div className="p-3 lg:p-4 border-b border-purple-500/20 relative z-10">
               <div className="text-lg lg:text-xl font-heading font-bold text-white mb-1">AgentEval</div>
               <div className="text-purple-400 text-[8px] lg:text-[10px] font-tech uppercase tracking-widest">Enterprise Standard</div>
            </div>
            <div className="p-3 lg:p-4 border-b border-slate-800/50 relative z-10 opacity-70">
               <div className="text-base lg:text-lg font-heading font-bold text-slate-400 mb-1">LangSmith</div>
               <div className="text-slate-500 text-[8px] lg:text-[10px] font-tech uppercase tracking-widest">Observability</div>
            </div>
            <div className="p-3 lg:p-4 border-b border-slate-800/50 relative z-10 opacity-50">
               <div className="text-base lg:text-lg font-heading font-bold text-slate-400 mb-1">DIY Scripts</div>
               <div className="text-slate-500 text-[8px] lg:text-[10px] font-tech uppercase tracking-widest">In-House</div>
            </div>

            {/* ROW 1: CORE FUNCTION */}
            <div className="p-3 lg:p-4 border-b border-slate-800/50 flex flex-col justify-center">
               <h4 className="text-sm lg:text-base font-heading font-bold text-white">Core Function</h4>
            </div>
            <div className="p-3 lg:p-4 border-b border-purple-500/20 relative z-10 flex flex-col justify-center">
               <div className="text-xs lg:text-sm font-bold text-white flex items-center gap-2">
                  <Activity size={14} className="text-blue-400" />
                  Active Intervention
               </div>
               <p className="text-slate-400 text-[9px] mt-1 leading-relaxed">Blocks bad actions <span className="text-white">before</span> they happen.</p>
            </div>
            <div className="p-3 lg:p-4 border-b border-slate-800/50 relative z-10 opacity-70 flex flex-col justify-center">
               <div className="text-xs lg:text-sm font-medium text-slate-400">Passive Monitoring</div>
               <p className="text-slate-500 text-[9px] mt-1">Logs errors after money is lost.</p>
            </div>
            <div className="p-3 lg:p-4 border-b border-slate-800/50 relative z-10 opacity-50 flex flex-col justify-center">
               <div className="text-xs lg:text-sm font-medium text-slate-400">Manual Regex</div>
               <p className="text-slate-500 text-[9px] mt-1">Brittle, hard-coded rules.</p>
            </div>

            {/* ROW 2: DEPLOYMENT */}
            <div className="p-3 lg:p-4 border-b border-slate-800/50 flex flex-col justify-center">
               <h4 className="text-sm lg:text-base font-heading font-bold text-white">Deployment</h4>
            </div>
            <div className="p-3 lg:p-4 border-b border-purple-500/20 relative z-10 flex flex-col justify-center">
               <div className="text-xs lg:text-sm font-bold text-white flex items-center gap-2">
                  <Lock size={14} className="text-green-400" />
                  On-Prem / VPC
               </div>
               <p className="text-slate-400 text-[9px] mt-1 leading-relaxed">Data never leaves the premise.</p>
            </div>
            <div className="p-3 lg:p-4 border-b border-slate-800/50 relative z-10 opacity-70 flex flex-col justify-center">
               <div className="text-xs lg:text-sm font-medium text-slate-400">Cloud SaaS</div>
               <p className="text-slate-500 text-[9px] mt-1">Requires sending data to 3rd party.</p>
            </div>
            <div className="p-3 lg:p-4 border-b border-slate-800/50 relative z-10 opacity-50 flex flex-col justify-center">
               <div className="text-xs lg:text-sm font-medium text-slate-400">Local Only</div>
               <p className="text-slate-500 text-[9px] mt-1">Hard to scale across teams.</p>
            </div>

            {/* ROW 3: CONTROL */}
            <div className="p-3 lg:p-4 flex flex-col justify-center">
               <h4 className="text-sm lg:text-base font-heading font-bold text-white">Control</h4>
            </div>
            <div className="p-3 lg:p-4 relative z-10 flex flex-col justify-center">
               <div className="text-xs lg:text-sm font-bold text-white flex items-center gap-2">
                  <Zap size={14} className="text-red-400" />
                  Global Kill Switch
               </div>
               <p className="text-slate-400 text-[9px] mt-1 leading-relaxed">Instant freeze for rogue fleets.</p>
            </div>
            <div className="p-3 lg:p-4 relative z-10 opacity-70 flex flex-col justify-center">
               <div className="text-xs lg:text-sm font-medium text-slate-400">No Emergency Brake</div>
               <p className="text-slate-500 text-[9px] mt-1">Manual rollback required.</p>
            </div>
            <div className="p-3 lg:p-4 relative z-10 opacity-50 flex flex-col justify-center">
               <div className="text-xs lg:text-sm font-medium text-slate-400">None</div>
               <p className="text-slate-500 text-[9px] mt-1">No centralized control.</p>
            </div>

        </div>

        {/* Quote */}
        <div className="mt-6 text-center">
            <p className="text-xl text-white font-serif italic font-light opacity-80 max-w-4xl mx-auto">
                "Competitors build tools for developers; we build safety gear for the <span className="text-purple-400 font-normal not-italic font-heading">C-Suite</span>."
            </p>
        </div>
      </div>
    </Slide>,

    // Slide 10: GTM
    <Slide key="10">
      <SlideHeader title="GTM Strategy" subtitle="The Trojan Horse Adoption" />
      
      <div className="grid grid-cols-3 gap-12 mt-20 relative">
        {/* Connector Line */}
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-slate-800 via-blue-900 to-purple-900 -translate-y-1/2 z-0"></div>

        <div className="bg-slate-950 p-10 rounded-2xl border border-slate-800 relative z-10 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-500 shadow-2xl">
           <div className="w-20 h-20 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-3xl font-heading font-bold text-white mb-8 shadow-lg group-hover:bg-blue-600 group-hover:border-blue-500 transition-colors">1</div>
           <h3 className="text-2xl font-heading font-bold text-white mb-3">The Wedge</h3>
           <p className="text-slate-400 font-body font-light leading-relaxed">Offer <span className="font-tech text-slate-300 text-xs">@trace SDK</span> free to solve dev debugging pains.</p>
        </div>

        <div className="bg-slate-950 p-10 rounded-2xl border border-slate-800 relative z-10 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-500 shadow-2xl">
           <div className="w-20 h-20 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-3xl font-heading font-bold text-white mb-8 shadow-lg group-hover:bg-purple-600 group-hover:border-purple-500 transition-colors">2</div>
           <h3 className="text-2xl font-heading font-bold text-white mb-3">The Audit</h3>
           <p className="text-slate-400 font-body font-light leading-relaxed">Free 2-Week "Shadow Test". Deliver Risk Report on PII.</p>
        </div>

        <div className="bg-slate-950 p-10 rounded-2xl border border-slate-800 relative z-10 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-500 shadow-2xl">
           <div className="w-20 h-20 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-3xl font-heading font-bold text-white mb-8 shadow-lg group-hover:bg-green-600 group-hover:border-green-500 transition-colors">3</div>
           <h3 className="text-2xl font-heading font-bold text-white mb-3">The License</h3>
           <p className="text-slate-400 font-body font-light leading-relaxed">Convert audit to <span className="font-tech text-green-400 font-bold">$150k/yr</span> Enterprise VPC License.</p>
        </div>
      </div>
    </Slide>,

    // Slide 11: Product UI Demo (FIXED)
    <Slide key="11" className="flex flex-col">
       {/* Compact Header to save vertical space */}
       <div className="mb-6 z-10 relative">
          <h2 className="text-5xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-slate-500 tracking-tighter drop-shadow-sm">
            Something Developers Are Screaming For
          </h2>
          <h3 className="text-xs text-purple-400 mt-2 font-tech font-bold tracking-[0.2em] uppercase pl-1">Full Observability for Stochastic Systems</h3>
          <div className="h-1 w-24 bg-gradient-to-r from-purple-600 to-blue-600 mt-4 rounded-full" />
       </div>
       
       <div className="flex-1 flex gap-8 min-h-0 items-center">
         {/* Left Col: The Narrative */}
         <div className="w-1/3 flex flex-col justify-center space-y-8">
            <div>
               <div className="flex items-center gap-2 text-red-400 mb-2">
                  <Bug size={20} />
                  <span className="font-tech uppercase tracking-widest text-xs font-bold">The Pain Point</span>
               </div>
               <h3 className="text-3xl font-heading font-bold text-white mb-3">"Why did my Agent spend $50 on a loop?"</h3>
               <p className="text-slate-400 font-body text-sm leading-relaxed">
                 LLMs are black boxes. When they fail, they fail silently and expensively. Developers are currently debugging this with <code className="bg-slate-800 px-1 py-0.5 rounded text-blue-300 text-xs">print()</code> statements.
               </p>
            </div>

            <div className="pl-6 border-l-2 border-purple-500">
               <div className="flex items-center gap-2 text-purple-400 mb-2">
                  <Activity size={20} />
                  <span className="font-tech uppercase tracking-widest text-xs font-bold">The Solution</span>
               </div>
               <h3 className="text-2xl font-heading font-bold text-white mb-2">MRI for Agents</h3>
               <ul className="space-y-2 mt-3">
                  <li className="flex items-center gap-3 text-slate-300 font-body text-sm">
                     <CheckCircle size={16} className="text-green-400" /> Real-time Cost & Latency Tracking
                  </li>
                  <li className="flex items-center gap-3 text-slate-300 font-body text-sm">
                     <CheckCircle size={16} className="text-green-400" /> Visual "Thought Process" Mapping
                  </li>
                  <li className="flex items-center gap-3 text-slate-300 font-body text-sm">
                     <CheckCircle size={16} className="text-green-400" /> Instant PII Detection
                  </li>
               </ul>
            </div>
         </div>

         {/* Right Col: The UI Demo */}
         <div className="flex-1 h-full max-h-[500px] relative group">
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-br from-blue-600/30 to-purple-600/30 rounded-xl blur-xl opacity-50 group-hover:opacity-75 transition duration-1000"></div>
            
            {/* Window Frame */}
            <div className="relative w-full h-full bg-[#0f172a] rounded-xl border border-slate-700/50 shadow-2xl flex flex-col overflow-hidden">
               {/* Window Controls */}
               <div className="h-8 bg-slate-900 border-b border-slate-800 flex items-center px-4 gap-2 flex-shrink-0">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  <div className="ml-4 px-3 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-[10px] font-tech text-slate-400 flex items-center gap-2">
                     <Lock size={8} /> agenteval.internal/trace/8f92-a1b2
                  </div>
               </div>
               
               {/* UI Component */}
               <TraceTreeMRI />
            </div>
         </div>
       </div>
    </Slide>,

    // Slide 12: Central Command UI (NEW)
    <Slide key="12" className="flex flex-col">
       <SlideHeader title="Central Command" subtitle="Mission Control for AI Fleets" />
       
       <div className="flex-1 flex items-center justify-center p-4">
          {/* Dashboard Container */}
          <div className="w-full h-full max-h-[600px] relative group">
             <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl blur-xl opacity-50 group-hover:opacity-75 transition duration-1000"></div>
             <DashboardDemo />
          </div>
       </div>
    </Slide>,

    // Slide 13: Ask & Vision
    <Slide key="13">
      <SlideHeader title="The Ask & Vision" subtitle="The Standard for Safe AI" />
      
      <div className="flex gap-20 mt-12">
        <div className="w-1/2 bg-slate-900/30 p-10 rounded-3xl border border-slate-800 backdrop-blur-sm">
           <h3 className="text-4xl font-heading font-bold text-white mb-8">Raising Seed Round</h3>
           <div className="space-y-6">
             <div className="flex items-start gap-4">
                <CheckCircle className="text-blue-500 mt-1" />
                <span className="text-slate-300 text-xl font-body font-light">Scale Sales Engineering for <span className="text-white font-medium">Banking Pipeline</span></span>
             </div>
             <div className="flex items-start gap-4">
                <CheckCircle className="text-blue-500 mt-1" />
                <span className="text-slate-300 text-xl font-body font-light">Harden "Self-Healing" agent capabilities</span>
             </div>
           </div>
        </div>

        <div className="w-1/2 flex flex-col justify-center border-l-4 border-purple-500 pl-10">
           <p className="text-3xl font-light leading-relaxed text-white font-serif italic opacity-90">
             "In 5 years, no AI Agent will execute a financial transaction without passing through the <span className="font-bold text-purple-400 not-italic font-heading">AgentEval</span> protocol first."
           </p>
        </div>
      </div>
    </Slide>,

    // Slide 14: Impact (FINAL EYE CANDY)
    <Slide key="14" className="flex items-center justify-center text-center">
       <div className="max-w-4xl relative z-10 flex flex-col items-center">
         {/* Animated Background Glow */}
         <div className="absolute -inset-32 bg-gradient-to-tr from-blue-500/10 via-purple-500/10 to-green-500/10 blur-[100px] opacity-60 rounded-full pointer-events-none animate-pulse"></div>
         
         <div className="relative">
            <h1 className="text-5xl lg:text-7xl font-heading font-bold text-white leading-tight tracking-tight drop-shadow-2xl mb-8">
              Making a dent in the digital universe by saving <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">Tens of Billions</span> annually.
            </h1>
            <p className="text-xl text-slate-400 font-tech uppercase tracking-[0.3em] opacity-80">
               Protecting the Agentic Economy
            </p>
         </div>
       </div>
    </Slide>
];

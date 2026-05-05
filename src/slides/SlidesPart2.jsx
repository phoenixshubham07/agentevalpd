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
   Cpu,
   BarChart3,
   Rocket,
   Award,
   GraduationCap
} from 'lucide-react';
import { Slide, SlideHeader } from '../components/SlideComponents';
import SyntroxWordmark from '../brand/SyntroxWordmark';
import DashboardDemo from '../components/demos/DashboardDemo';
import { Suspense } from 'react';

const TraceTree = React.lazy(() => import('../components/trace').then(m => ({ default: m.TraceTree })));
const TraceTreeSlide = React.lazy(() => import('../components/trace/TraceTreeSlide'));

export const slidesPart2 = [
   // Slide 8: Market Opportunity (REDESIGNED: High-Impact Cards)
   <Slide key="8">
      <SlideHeader title="Market Capture" subtitle="The Governance Tax" />

      <div className="flex-1 flex flex-col justify-center gap-12 min-h-0 relative z-10">
         {/* Main Stats Row */}
         <div className="flex items-stretch justify-center gap-8 h-[60%]">

            {/* TAM Card - Subtle Dark Theme */}
            <div className="flex-1 bg-slate-950 border border-slate-800 p-8 rounded-3xl backdrop-blur-sm relative group overflow-hidden hover:border-slate-700 transition-colors flex flex-col justify-between">
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
            <div className="flex-1 bg-slate-950 border border-blue-500/40 p-8 rounded-3xl backdrop-blur-md relative group overflow-hidden shadow-[0_0_60px_rgba(59,130,246,0.15)] hover:shadow-[0_0_80px_rgba(59,130,246,0.25)] transition-shadow flex flex-col justify-between">
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

   // Slide 9: Competitive Landscape
   <Slide key="9">
      <SlideHeader title="Competitive Landscape" subtitle="From Debugging to Governing" />

      <div className="flex-1 flex flex-col justify-center min-h-0 relative z-10 gap-3">

         {/* Column Headers — fixed row above the cards */}
         <div className="grid grid-cols-[160px_1fr_1fr_1fr] px-1">
            <div />
            <div className="px-5 py-2">
               <span className="text-base font-heading font-bold text-white">Syntrox</span>
               <span className="ml-2 text-[10px] font-tech uppercase tracking-widest text-purple-400 align-middle">★ Us</span>
            </div>
            <div className="px-5 py-2">
               <span className="text-base font-heading font-semibold text-slate-400">LangSmith</span>
            </div>
            <div className="px-5 py-2">
               <span className="text-base font-heading font-semibold text-slate-500">DIY Scripts</span>
            </div>
         </div>

         {/* Row 1: Core Function */}
         <div className="grid grid-cols-[160px_1fr_1fr_1fr] border border-slate-800 rounded-xl overflow-hidden bg-slate-950/60 relative">
            <div className="absolute top-0 left-[160px] w-[calc((100%-160px)/3)] h-[2px] bg-gradient-to-r from-purple-500 to-blue-500" />
            <div className="absolute top-0 bottom-0 left-[160px] w-[calc((100%-160px)/3)] bg-purple-900/10 border-x border-purple-500/20" />
            {/* Label */}
            <div className="px-5 py-5 flex flex-col justify-center border-r border-slate-800/60 bg-slate-900/30">
               <h4 className="text-xs font-tech font-bold text-slate-400 uppercase tracking-widest">Core</h4>
               <h4 className="text-xs font-tech font-bold text-slate-400 uppercase tracking-widest">Function</h4>
            </div>
            {/* Syntrox */}
            <div className="px-5 py-5 flex flex-col justify-center gap-1 relative z-10">
               <div className="flex items-center gap-2 text-white font-bold text-base">
                  <Activity size={16} className="text-blue-400 flex-shrink-0" />
                  Active Intervention
               </div>
               <p className="text-slate-300 text-sm leading-snug">Blocks bad actions <span className="text-white font-semibold">before</span> they happen via real-time proxy.</p>
            </div>
            {/* LangSmith */}
            <div className="px-5 py-5 flex flex-col justify-center gap-1 border-l border-slate-800/60">
               <div className="text-slate-300 font-semibold text-base">Passive Monitoring</div>
               <p className="text-slate-500 text-sm leading-snug">Logs errors after money is already lost.</p>
            </div>
            {/* DIY */}
            <div className="px-5 py-5 flex flex-col justify-center gap-1 border-l border-slate-800/60 opacity-55">
               <div className="text-slate-400 font-semibold text-base">Manual Regex</div>
               <p className="text-slate-500 text-sm leading-snug">Brittle rules that break at scale.</p>
            </div>
         </div>

         {/* Row 2: Deployment */}
         <div className="grid grid-cols-[160px_1fr_1fr_1fr] border border-slate-800 rounded-xl overflow-hidden bg-slate-950/60 relative">
            <div className="absolute top-0 left-[160px] w-[calc((100%-160px)/3)] h-[2px] bg-gradient-to-r from-purple-500 to-blue-500" />
            <div className="absolute top-0 bottom-0 left-[160px] w-[calc((100%-160px)/3)] bg-purple-900/10 border-x border-purple-500/20" />
            <div className="px-5 py-5 flex flex-col justify-center border-r border-slate-800/60 bg-slate-900/30">
               <h4 className="text-xs font-tech font-bold text-slate-400 uppercase tracking-widest">Deploy-</h4>
               <h4 className="text-xs font-tech font-bold text-slate-400 uppercase tracking-widest">ment</h4>
            </div>
            <div className="px-5 py-5 flex flex-col justify-center gap-1 relative z-10">
               <div className="flex items-center gap-2 text-white font-bold text-base">
                  <Lock size={16} className="text-green-400 flex-shrink-0" />
                  On-Prem / VPC
               </div>
               <p className="text-slate-300 text-sm leading-snug">Data never leaves your enterprise firewall.</p>
            </div>
            <div className="px-5 py-5 flex flex-col justify-center gap-1 border-l border-slate-800/60">
               <div className="text-slate-300 font-semibold text-base">Cloud SaaS</div>
               <p className="text-slate-500 text-sm leading-snug">Requires sending data to a 3rd party.</p>
            </div>
            <div className="px-5 py-5 flex flex-col justify-center gap-1 border-l border-slate-800/60 opacity-55">
               <div className="text-slate-400 font-semibold text-base">Local Only</div>
               <p className="text-slate-500 text-sm leading-snug">Hard to scale or govern across teams.</p>
            </div>
         </div>

         {/* Row 3: Control */}
         <div className="grid grid-cols-[160px_1fr_1fr_1fr] border border-slate-800 rounded-xl overflow-hidden bg-slate-950/60 relative">
            <div className="absolute top-0 left-[160px] w-[calc((100%-160px)/3)] h-[2px] bg-gradient-to-r from-purple-500 to-blue-500" />
            <div className="absolute top-0 bottom-0 left-[160px] w-[calc((100%-160px)/3)] bg-purple-900/10 border-x border-purple-500/20" />
            <div className="px-5 py-5 flex flex-col justify-center border-r border-slate-800/60 bg-slate-900/30">
               <h4 className="text-xs font-tech font-bold text-slate-400 uppercase tracking-widest">Control</h4>
            </div>
            <div className="px-5 py-5 flex flex-col justify-center gap-1 relative z-10">
               <div className="flex items-center gap-2 text-white font-bold text-base">
                  <Zap size={16} className="text-red-400 flex-shrink-0" />
                  Global Kill Switch
               </div>
               <p className="text-slate-300 text-sm leading-snug">Freeze any rogue agent in under 1 second.</p>
            </div>
            <div className="px-5 py-5 flex flex-col justify-center gap-1 border-l border-slate-800/60">
               <div className="text-slate-300 font-semibold text-base">No Emergency Brake</div>
               <p className="text-slate-500 text-sm leading-snug">Manual rollback. Downtime in minutes.</p>
            </div>
            <div className="px-5 py-5 flex flex-col justify-center gap-1 border-l border-slate-800/60 opacity-55">
               <div className="text-slate-400 font-semibold text-base">None</div>
               <p className="text-slate-500 text-sm leading-snug">No centralized control at all.</p>
            </div>
         </div>

         {/* Quote */}
         <div className="text-center pt-1">
            <p className="text-lg text-white font-serif italic font-light opacity-70 max-w-4xl mx-auto">
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

   // Slide 11: Product UI Demo
   <Slide key="11">
      <SlideHeader title="Something Developers Are Screaming For" subtitle="Full Observability for Stochastic Systems" />

      <div className="flex-1 flex gap-10 min-h-0">
         {/* Left Col: The Narrative */}
         <div className="w-[38%] flex flex-col justify-center gap-10">
            {/* Pain Point */}
            <div>
               <div className="flex items-center gap-2 text-red-400 mb-3">
                  <Bug size={18} />
                  <span className="font-tech uppercase tracking-widest text-[10px] font-bold">The Pain Point</span>
               </div>
               <h3 className="text-3xl font-heading font-bold text-white mb-4 leading-tight">
                  "Why did my Agent spend $50 on a loop?"
               </h3>
               <p className="text-slate-400 font-body text-base leading-relaxed">
                  LLMs are black boxes. When they fail, they fail silently and expensively. Developers are currently debugging this with{' '}
                  <code className="bg-slate-800 px-1.5 py-0.5 rounded text-blue-300 text-sm">print()</code>{' '}
                  statements.
               </p>
            </div>

            {/* Solution */}
            <div className="pl-6 border-l-2 border-blue-500">
               <div className="flex items-center gap-2 text-blue-400 mb-3">
                  <Activity size={18} />
                  <span className="font-tech uppercase tracking-widest text-[10px] font-bold">The Solution</span>
               </div>
               <h3 className="text-2xl font-heading font-bold text-white mb-4">MRI for Agents</h3>
               <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-slate-300 font-body text-base">
                     <CheckCircle size={16} className="text-green-400 flex-shrink-0" />
                     Real-time Cost &amp; Latency Tracking
                  </li>
                  <li className="flex items-center gap-3 text-slate-300 font-body text-base">
                     <CheckCircle size={16} className="text-green-400 flex-shrink-0" />
                     Visual "Thought Process" Mapping
                  </li>
                  <li className="flex items-center gap-3 text-slate-300 font-body text-base">
                     <CheckCircle size={16} className="text-green-400 flex-shrink-0" />
                     Instant PII Detection &amp; Redaction
                  </li>
               </ul>
            </div>
         </div>

         {/* Right Col: Mac OS Window — clean empty shell */}
         <div className="flex-1 flex flex-col min-h-0 relative group">
            {/* Ambient glow */}
            <div className="absolute -inset-1 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition duration-700 pointer-events-none" />

            {/* Window */}
            <div className="relative flex-1 flex flex-col bg-[#0d1117] rounded-xl border border-slate-700/60 shadow-2xl overflow-hidden">
               {/* Title bar */}
               <div className="h-9 bg-[#161b22] border-b border-slate-700/60 flex items-center px-4 gap-2 flex-shrink-0">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <div className="ml-4 flex-1 flex justify-center">
                     <div className="px-4 py-1 rounded-md bg-[#0d1117] border border-slate-700/50 text-[11px] font-tech text-slate-400 flex items-center gap-2 max-w-xs">
                        <Lock size={9} className="text-slate-500" />
                        syntrox.internal/trace/8f92-a1b2
                     </div>
                  </div>
               </div>

               {/* Trace tree — compact version fitted to this window */}
               <Suspense fallback={<div className="flex-1 bg-[#0d1117] animate-pulse" />}>
                  <TraceTreeSlide />
               </Suspense>
            </div>
         </div>
      </div>
   </Slide>,

   // Slide 12: Central Command UI (NEW)
   <Slide key="12">
      <SlideHeader title="Central Command" subtitle="Mission Control for AI Fleets" />

      <div className="flex-1 flex items-center justify-center p-4">
         {/* Dashboard Container */}
         <div className="w-full h-full max-h-[600px] relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl blur-xl opacity-50 group-hover:opacity-75 transition duration-1000"></div>
            <DashboardDemo />
         </div>
      </div>
   </Slide>,

   // Slide 14: Ask & Vision
   <Slide key="14">
      <SlideHeader title="The Ask & Vision" subtitle="The Standard for Safe AI" />

      <div className="flex-1 flex items-center">
         <div className="flex gap-20 w-full">
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
                  "In 5 years, no AI Agent will execute a financial transaction without passing through the <span className="font-bold text-purple-400 not-italic font-heading">Syntrox</span> protocol first."
               </p>
            </div>
         </div>
      </div>
   </Slide>,

   // Slide 15: Impact (FINAL EYE CANDY)
   <Slide key="15" className="flex items-center justify-center text-center">
      <div className="max-w-4xl relative z-10 flex flex-col items-center">
         {/* Animated Background Glow */}
         <div className="absolute -inset-32 bg-gradient-to-tr from-blue-500/10 via-purple-500/10 to-green-500/10 blur-[100px] opacity-60 rounded-full pointer-events-none animate-pulse"></div>

         <div className="relative">
            <h1 className="text-5xl lg:text-7xl font-heading font-bold text-white leading-tight tracking-tight drop-shadow-2xl mb-8">
               Making a dent in the digital universe by saving <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">Tens of Billions</span> annually.
            </h1>
            <p className="text-xl text-slate-400 font-tech uppercase tracking-[0.3em] opacity-80 mb-10">
               Protecting the Agentic Economy
            </p>

            {/* CTA Button - Sleek, Enterprise Glassmorphism Design */}
            <div className="flex justify-center w-full mt-4">
               <a 
                  href="https://syntrox.ai/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative flex items-center gap-6 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl px-8 py-5 transition-all duration-500 backdrop-blur-md shadow-2xl overflow-hidden"
               >
                  {/* Subtle shine effect on hover */}
                  <div className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:transition-transform group-hover:duration-1000 group-hover:translate-x-[150%]" />
                  
                  <div className="flex flex-col items-start pr-6 border-r border-white/10 relative z-10">
                     <span className="text-slate-400 text-xs font-auto font-body font-light tracking-wide group-hover:text-slate-300 transition-colors">
                        Ready to elevate your infrastructure?
                     </span>
                     <span className="text-white font-heading font-medium mt-1 text-lg">
                        Click here to enter
                     </span>
                  </div>
                  
                  <div className="pl-2 relative z-10 flex items-center group-hover:scale-105 transition-transform duration-500">
                     <SyntroxWordmark fontSize={24} animate={false} color="#ffffff" />
                  </div>
               </a>
            </div>
         </div>
      </div>
   </Slide>
];

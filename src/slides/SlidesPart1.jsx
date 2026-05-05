import React from 'react';
import {
  Zap,
  Lock,
  Activity,
  Globe,
  Shield,
  AlertTriangle,
  Server,
  Code,
  Cpu,
  BarChart3,
  Briefcase,
  Rocket,
  Award,
  GraduationCap,
  Linkedin
} from 'lucide-react';
import { Slide, SlideHeader, ScaleIcon } from '../components/SlideComponents';
import SyntroxWordmark from '../brand/SyntroxWordmark';
import { Suspense } from 'react';

const KillSwitchDemo = React.lazy(() => import('../components/demos/KillSwitchDemo'));

export const slidesPart1 = [
  // Slide 1: Title
  <Slide key="1" className="justify-center items-center text-center">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0f172a] via-[#020617] to-black z-0"></div>
    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] z-0 mix-blend-overlay"></div>

    <div className="z-10 flex flex-col items-center justify-center flex-1 gap-8">
      {/* SYNTROX.ai logo — the full wordmark, static, large hero size */}
      <div className="drop-shadow-[0_0_60px_rgba(255,255,255,0.08)]">
        <SyntroxWordmark fontSize={90} animate={false} color="#ffffff" />
      </div>

      {/* Tagline */}
      <p className="text-2xl text-slate-300 font-body font-light max-w-3xl leading-relaxed tracking-wide">
        The Governance and Safety Standard for the <span className="text-blue-400 font-medium">Agentic Economy</span>.
      </p>

      {/* Body statement */}
      <div className="max-w-5xl mx-auto">
        <p className="text-4xl font-heading font-medium text-white leading-tight tracking-tight">
          We stop Enterprise AI Agents from <span className="text-purple-400 border-b border-purple-500/30 pb-1">hallucinating</span>, <span className="text-blue-400 border-b border-blue-500/30 pb-1">leaking data</span>, and <span className="text-red-400 border-b border-red-500/30 pb-1">burning cash</span>—automatically.
        </p>
      </div>
    </div>
  </Slide>,

  // Slide 1.1: Team
  <Slide key="team">
    <SlideHeader title="The Team" subtitle="Veterans & Visionaries" />

    <div className="flex-1 flex gap-8 items-stretch justify-center relative z-10 mt-4">

      {/* Praveen */}
      <div className="flex-1 flex flex-col bg-slate-900/40 border border-slate-800 p-8 rounded-3xl backdrop-blur-sm relative group overflow-hidden hover:border-blue-500/30 transition-all duration-500">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
          <Briefcase size={100} className="text-blue-400" />
        </div>

        <div className="relative z-10 flex-1 flex flex-col">
          <h3 className="text-4xl font-heading font-bold text-white mb-2 tracking-tight">Praveen Tumma</h3>
          <div className="text-blue-400 font-tech uppercase tracking-widest text-xs mb-8 font-bold">Product & Data Lead</div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 mt-1">
                <Activity size={18} />
              </div>
              <div>
                <div className="text-slate-200 font-heading font-bold text-lg">20+ Years Experience</div>
                <div className="text-slate-400 font-body text-sm leading-relaxed">M.Tech • Product Management • Data Science</div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 mt-1">
                <Rocket size={18} />
              </div>
              <div>
                <div className="text-slate-200 font-heading font-bold text-lg">Startup Founder</div>
                <div className="text-slate-400 font-body text-sm leading-relaxed">Medicine Delivery eCommerce Marketplace</div>
              </div>
            </div>
          </div>

          {/* LinkedIn Link */}
          <div className="mt-auto pt-8 flex justify-center w-full">
            <a 
              href="https://www.linkedin.com/in/praveen-kumar-tumma/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-between w-full border border-slate-700/60 hover:border-blue-500/50 bg-slate-800/40 hover:bg-slate-800/80 rounded-xl px-6 py-4 transition-all duration-300 group"
            >
              <div className="flex flex-col items-start text-left">
                <span className="text-slate-400 text-xs font-tech uppercase tracking-wider mb-0.5">Connect on LinkedIn</span>
                <span className="text-slate-200 group-hover:text-blue-400 font-heading font-bold text-lg transition-colors">in/praveen-kumar-tumma</span>
              </div>
              <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400">
                <Linkedin size={22} className="group-hover:scale-110 transition-transform" />
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Sai */}
      <div className="flex-1 flex flex-col bg-slate-900/40 border border-slate-800 p-8 rounded-3xl backdrop-blur-sm relative group overflow-hidden hover:border-purple-500/30 transition-all duration-500">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
          <Zap size={100} className="text-purple-400" />
        </div>

        <div className="relative z-10 flex-1 flex flex-col">
          <h3 className="text-4xl font-heading font-bold text-white mb-2 tracking-tight">Sai Praneeth</h3>
          <div className="text-purple-400 font-tech uppercase tracking-widest text-xs mb-8 font-bold">GenAI & Strategy</div>

          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 mt-1">
                <Award size={18} />
              </div>
              <div>
                <div className="text-slate-200 font-heading font-bold text-lg">2x YC-Interviewed Founder</div>
                <div className="text-slate-400 font-body text-sm leading-relaxed">Founding Partner @ Brightcone.ai</div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 mt-1">
                <Briefcase size={18} />
              </div>
              <div>
                <div className="text-slate-200 font-heading font-bold text-lg">VC & Consulting</div>
                <div className="text-slate-400 font-body text-sm leading-relaxed">GenAI Sr. Consultant @ EXL • VC Industry Exp.</div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 mt-1">
                <GraduationCap size={18} />
              </div>
              <div>
                <div className="text-slate-200 font-heading font-bold text-lg">IIT Guwahati</div>
                <div className="text-slate-400 font-body text-sm leading-relaxed">Founding Member of IITG-YC Community</div>
              </div>
            </div>
          </div>

          {/* LinkedIn Link */}
          <div className="mt-auto pt-8 flex justify-center w-full">
            <a 
              href="https://www.linkedin.com/in/saipraneeth-iit/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-between w-full border border-slate-700/60 hover:border-purple-500/50 bg-slate-800/40 hover:bg-slate-800/80 rounded-xl px-6 py-4 transition-all duration-300 group"
            >
              <div className="flex flex-col items-start text-left">
                <span className="text-slate-400 text-xs font-tech uppercase tracking-wider mb-0.5">Connect on LinkedIn</span>
                <span className="text-slate-200 group-hover:text-purple-400 font-heading font-bold text-lg transition-colors">in/saipraneeth-iit</span>
              </div>
              <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400">
                <Linkedin size={22} className="group-hover:scale-110 transition-transform" />
              </div>
            </a>
          </div>
        </div>
      </div>

    </div>
  </Slide>,

  // Slide 2: The Shift
  <Slide key="2">
    <SlideHeader title="The Shift" subtitle="The World has Moved to Level 3 Autonomy" />

    <div className="flex-1 grid grid-cols-2 gap-8 min-h-0 items-center">
      {/* Left Col: The Trigger Event */}
      <div className="flex flex-col gap-6 justify-center">
        {/* The Quote Card */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative bg-[#0b0f19] border border-slate-800 p-6 rounded-xl shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-tech font-bold tracking-widest uppercase flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                Critical Alert
              </div>
              <span className="text-slate-500 text-xs font-tech uppercase tracking-widest">Dec 28, 2025</span>
            </div>

            <p className="text-2xl font-heading font-medium text-white leading-normal mb-6">
              "AI models are beginning to find <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-red-400 font-bold">critical vulnerabilities</span> and creating risks of severe harm."
            </p>

            <div className="flex items-center justify-between border-t border-slate-800/50 pt-4">
              <div className="flex flex-col">
                <span className="text-white font-bold font-body text-sm">Sam Altman</span>
                <span className="text-slate-500 text-xs uppercase tracking-wider font-tech">CEO, OpenAI</span>
              </div>
            </div>
          </div>
        </div>

        {/* The Response/Opportunity */}
        <div className="pl-6 border-l-2 border-slate-800 group hover:border-blue-500 transition-colors duration-500">
          <p className="text-slate-400 text-base font-body leading-relaxed mb-2">
            OpenAI is hiring a "Head of Preparedness" for <span className="text-green-400 font-bold font-tech">$555k/yr</span>.
          </p>
          <p className="text-xl text-blue-400 font-heading font-bold mt-2">
            Syntrox automates this entire role.
          </p>
        </div>
      </div>

      {/* Right Col: The Levels */}
      <div className="h-full flex flex-col justify-center gap-2 relative">
        <div className="absolute left-8 top-10 bottom-10 w-px bg-gradient-to-b from-transparent via-slate-800 to-transparent z-0"></div>

        <div className="relative z-10 pl-20 py-3 opacity-40 hover:opacity-100 transition-opacity duration-300 group">
          <div className="absolute left-8 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-slate-900 border-2 border-slate-700 group-hover:border-slate-500 transition-colors z-10"></div>
          <div className="text-2xl font-heading font-bold text-slate-500 group-hover:text-slate-300 transition-colors">Level 1</div>
          <div className="text-slate-500 font-tech uppercase text-xs tracking-widest mt-1">Chatbots</div>
        </div>

        <div className="relative z-10 pl-20 py-3 opacity-60 hover:opacity-100 transition-opacity duration-300 group">
          <div className="absolute left-8 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-slate-800 border-2 border-slate-600 group-hover:border-slate-400 transition-colors z-10"></div>
          <div className="text-2xl font-heading font-bold text-slate-400 group-hover:text-slate-200 transition-colors">Level 2</div>
          <div className="text-slate-400 font-tech uppercase text-xs tracking-widest mt-1">Reasoners</div>
        </div>

        <div className="relative z-10 pl-20 mt-4">
          <div className="absolute left-8 top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-purple-500 border-4 border-black shadow-[0_0_20px_rgba(168,85,247,0.8)] z-20"></div>

          <div className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 border border-purple-500/50 p-6 rounded-2xl backdrop-blur-md shadow-[0_0_40px_rgba(168,85,247,0.15)] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><Activity size={64} className="text-white" /></div>

            <div className="flex justify-between items-center mb-3">
              <div className="text-4xl font-heading font-bold text-white tracking-tight">Level 3</div>
              <div className="px-3 py-1 bg-purple-500/20 rounded-full text-purple-300 text-[10px] font-tech uppercase tracking-widest font-bold border border-purple-500/30">Current Era</div>
            </div>
            <div className="text-xl font-heading font-medium text-blue-200 mb-2">Autonomous Agents</div>
            <div className="text-slate-400 font-body text-sm leading-relaxed max-w-sm">
              Agents that move money, write code, and access databases without human oversight.
            </div>
          </div>
        </div>
      </div>
    </div>
  </Slide>,

  // Slide 3: The Problem
  <Slide key="3">
    <SlideHeader title="The Hair on Fire Problem" subtitle="The Trust Gap is Blocking Adoption" />
    <div className="grid grid-cols-3 gap-10 mt-16">
      {[
        { Icon: Zap, title: "Unpredictability", color: "text-yellow-400", desc: "Agents stuck in infinite loops can burn $20,000 in API credits overnight." },
        { Icon: Lock, title: "Security Risks", color: "text-red-400", desc: "Hackers using agents to target global entities with minimal intervention." },
        { Icon: ScaleIcon, title: "Compliance", color: "text-blue-400", desc: "Banks cannot deploy agents that might hallucinate regs or leak PII." }
      ].map(({ Icon, title, color, desc }, i) => (
        <div key={i} className="bg-slate-950 p-10 rounded-3xl border border-slate-800 hover:border-slate-600 transition-all duration-500 group hover:-translate-y-2 hover:shadow-2xl">
          <div className={`w-16 h-16 rounded-2xl bg-slate-800/50 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform border border-slate-700`}>
            <Icon className={`w-8 h-8 ${color}`} />
          </div>
          <h3 className="text-3xl font-heading font-bold text-white mb-4 tracking-tight">{title}</h3>
          <p className="text-slate-400 font-body font-light text-lg leading-relaxed">{desc}</p>
        </div>
      ))}
    </div>
  </Slide>,

  // Slide 4: The Solution
  <Slide key="4">
    <SlideHeader title="The Solution" subtitle="Active Governance" />
    <div className="flex-1 flex flex-col relative z-10 min-h-0 justify-start">
      <div className="absolute right-0 top-0 text-[10rem] font-heading font-black text-slate-800 opacity-10 z-0 tracking-tighter leading-none select-none pointer-events-none">ATC</div>

      {/* Features Grid */}
      <div className="grid grid-cols-3 gap-8 z-10 mt-2">
        {/* Feature 1 */}
        <div className="border-t-2 border-blue-500 pt-6 group">
          <h3 className="text-2xl font-heading font-bold text-white mb-2 flex items-center gap-3"><Globe className="text-blue-500" size={24} /> The Firewall</h3>
          <p className="text-[10px] text-blue-400 font-tech uppercase tracking-widest mb-4">The Proxy</p>
          <p className="text-slate-400 font-body font-light text-base leading-relaxed">Intercepts PII and "Poison Prompts" in real-time with <span className="text-white font-bold">&lt;20ms latency</span>.</p>
        </div>

        {/* Feature 2 */}
        <div className="border-t-2 border-purple-500 pt-6 group">
          <h3 className="text-2xl font-heading font-bold text-white mb-2 flex items-center gap-3"><ScaleIcon className="text-purple-500" size={24} /> The Judge</h3>
          <p className="text-[10px] text-purple-400 font-tech uppercase tracking-widest mb-4">Async Eval</p>
          <p className="text-slate-400 font-body font-light text-base leading-relaxed">Scoring every interaction using <span className="text-white font-bold">DeepEval</span> to ensure Truthfulness and Policy Adherence.</p>
        </div>

        {/* Feature 3 */}
        <div className="border-t-2 border-red-500 pt-6 group">
          <h3 className="text-2xl font-heading font-bold text-white mb-2 flex items-center gap-3"><Activity className="text-red-500" size={24} /> The Kill Switch</h3>
          <p className="text-[10px] text-red-400 font-tech uppercase tracking-widest mb-4">Instant Freeze</p>
          <p className="text-slate-400 font-body font-light text-base leading-relaxed">Instantly freeze a rogue agent or the entire fleet if <span className="text-white font-bold">risk thresholds</span> are breached.</p>
        </div>
      </div>

      {/* Visual Diagram */}
      <div className="flex-1 flex items-center justify-center relative mt-4">
        <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-slate-700 to-transparent -translate-y-1/2 opacity-30"></div>

        <div className="flex items-center gap-4 w-full justify-center relative z-10">
          <div className="flex flex-col items-center gap-3 group">
            <div className="w-16 h-16 rounded-full bg-slate-900 border-2 border-slate-700 flex items-center justify-center shadow-lg group-hover:border-slate-500 transition-colors">
              <div className="text-slate-400 font-tech font-bold">USR</div>
            </div>
            <div className="px-4 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-500 font-tech uppercase tracking-widest text-[10px]">User</div>
          </div>

          <div className="w-24 h-[2px] bg-gradient-to-r from-slate-700 to-blue-500 relative">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          </div>

          <div className="bg-gradient-to-b from-slate-900 to-black border border-blue-500/50 p-1 rounded-2xl shadow-[0_0_60px_rgba(59,130,246,0.2)] transform hover:scale-105 transition-transform duration-500">
            <div className="bg-slate-900/80 backdrop-blur-xl px-10 py-8 rounded-xl border border-white/5 flex flex-col items-center text-center">
              <Shield size={48} className="text-blue-400 mb-3 drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]" />
              <span className="text-2xl font-heading font-bold text-white tracking-tight mb-1">Syntrox Proxy</span>
              <div className="flex gap-2 mt-2">
                <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">PII Scan</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">Guardrails</span>
              </div>
            </div>
          </div>

          <div className="w-24 h-[2px] bg-gradient-to-r from-blue-500 to-purple-500 relative">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
          </div>

          <div className="flex flex-col items-center gap-3 group">
            <div className="w-16 h-16 rounded-full bg-slate-900 border-2 border-slate-700 flex items-center justify-center shadow-lg group-hover:border-purple-500 transition-colors">
              <div className="text-purple-400 font-tech font-bold">AI</div>
            </div>
            <div className="px-4 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-500 font-tech uppercase tracking-widest text-[10px]">LLM Fleet</div>
          </div>
        </div>
      </div>
    </div>
  </Slide>,

  // Slide 5: Technical Moat
  <Slide key="5">
    <SlideHeader title="Technical Moat" subtitle="Built for the Paranoid Enterprise" />
    <div className="grid grid-cols-2 gap-16 mt-12 h-[65%]">
      <div className="space-y-10 flex flex-col justify-center">
        <div className="flex gap-6 group">
          <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center flex-shrink-0 group-hover:border-purple-500/50 transition-colors"><Server className="text-purple-400 w-8 h-8" /></div>
          <div>
            <h4 className="text-2xl font-heading font-bold text-white mb-2">VPC-Native</h4>
            <p className="text-slate-400 font-body font-light leading-relaxed">Runs entirely inside the bank’s firewall as a Universal Docker Image. <span className="text-purple-200">Data never leaves the premise.</span></p>
          </div>
        </div>
        <div className="flex gap-6 group">
          <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center flex-shrink-0 group-hover:border-blue-500/50 transition-colors"><Code className="text-blue-400 w-8 h-8" /></div>
          <div>
            <h4 className="text-2xl font-heading font-bold text-white mb-2">Universal Proxy</h4>
            <p className="text-slate-400 font-body font-light leading-relaxed">Powered by LiteLLM. Compatible with Azure OpenAI, AWS Bedrock, and Anthropic out of the box.</p>
          </div>
        </div>
        <div className="flex gap-6 group">
          <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center flex-shrink-0 group-hover:border-yellow-500/50 transition-colors"><Zap className="text-yellow-400 w-8 h-8" /></div>
          <div>
            <h4 className="text-2xl font-heading font-bold text-white mb-2">Performance Core</h4>
            <p className="text-slate-400 font-body font-light leading-relaxed">Built on ClickHouse (OLAP) and Redis (Hot state) to handle <span className="font-tech text-yellow-200">10k+ spans/sec</span>.</p>
          </div>
        </div>
      </div>

      {/* Architecture Diagram */}
      <div className="bg-slate-900/30 p-8 rounded-3xl border border-slate-800 flex flex-col relative overflow-hidden backdrop-blur-sm shadow-2xl">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(30,41,59,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(30,41,59,0.2)_1px,transparent_1px)] bg-[size:20px_20px]" />

        <div className="relative z-10 flex-1 flex flex-col items-center justify-center">
          <div className="w-full max-w-sm p-8 rounded-xl border-2 border-dashed border-slate-600 bg-slate-950/50 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 bg-slate-950 border border-slate-700 rounded text-slate-400 font-tech text-[10px] uppercase tracking-widest flex items-center gap-2 whitespace-nowrap">
              <Lock size={12} className="text-green-500" /> Enterprise Firewall / VPC
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-gradient-to-b from-purple-900 to-blue-900 border border-purple-500 p-6 rounded-xl shadow-[0_0_40px_rgba(168,85,247,0.2)] flex flex-col items-center text-center w-full relative z-20">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-2">
                  <Cpu size={24} className="text-white" />
                </div>
                <div className="font-heading font-bold text-white text-xl tracking-tight">Syntrox Engine</div>
                <div className="text-[10px] text-blue-200 mt-1 font-tech uppercase tracking-widest bg-black/30 px-2 py-0.5 rounded border border-white/10">Docker / K8s</div>
              </div>

              <div className="h-8 w-[2px] bg-slate-600 relative"></div>
              <div className="w-[80%] h-[2px] bg-slate-600 relative flex justify-between">
                <div className="h-4 w-[2px] bg-slate-600 absolute left-0 top-0"></div>
                <div className="h-4 w-[2px] bg-slate-600 absolute right-0 top-0"></div>
              </div>

              <div className="flex gap-4 justify-between w-full mt-4">
                <div className="flex-1 bg-slate-900 border border-slate-700 p-3 rounded-lg flex flex-col items-center relative shadow-lg group hover:border-yellow-500/50 transition-colors">
                  <BarChart3 size={16} className="text-yellow-500 mb-2" />
                  <div className="text-slate-200 font-heading font-bold text-sm">ClickHouse</div>
                  <div className="text-[9px] text-slate-500 font-tech uppercase tracking-wider mt-1">OLAP Logs</div>
                </div>

                <div className="flex-1 bg-slate-900 border border-slate-700 p-3 rounded-lg flex flex-col items-center relative shadow-lg group hover:border-red-500/50 transition-colors">
                  <Zap size={16} className="text-red-500 mb-2" />
                  <div className="text-slate-200 font-heading font-bold text-sm">Redis</div>
                  <div className="text-[9px] text-slate-500 font-tech uppercase tracking-wider mt-1">Hot State</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Slide>,

  // Slide 6: Killer Feature UI
  <Slide key="6">
    <SlideHeader title='The "Killer Feature"' subtitle="What happens when an agent goes rogue?" />
    <div className="flex flex-1 gap-16 min-h-0">
      <div className="w-1/3 flex flex-col justify-center gap-8">

        <div className="pl-6 border-l-2 border-slate-700">
          <div className="text-xs uppercase text-slate-500 font-tech font-bold mb-2 tracking-widest">Status Quo</div>
          <p className="text-slate-300 font-body text-lg">Developers redeploy code. <br /><span className="text-red-500 font-bold">Time: 15+ Minutes.</span></p>
        </div>

        <div className="pl-6 border-l-2 border-green-500 bg-green-900/5 rounded-r-lg py-2">
          <div className="text-xs uppercase text-green-400 font-tech font-bold mb-2 tracking-widest">Syntrox</div>
          <p className="text-white font-body text-lg">Ops Manager hits one button.</p>
          <p className="text-green-400 font-bold font-heading text-2xl mt-1">Time: &lt; 1 Second.</p>
        </div>
      </div>
      <div className="flex-1 h-full py-2">
        <Suspense fallback={<div className="w-full h-full bg-slate-900/50 rounded-2xl animate-pulse flex items-center justify-center text-slate-500 font-tech">Loading Demo System...</div>}>
          <KillSwitchDemo />
        </Suspense>
      </div>
    </div>
  </Slide>,

  // Slide 7: Digital Workforce
  <Slide key="7">
    <SlideHeader title="The Digital Workforce" subtitle="Governing the Next Trillion Dollars of Autonomy" />

    <div className="flex-1 grid grid-cols-2 gap-8 min-h-0 items-center">
      {/* Left Col: Market Pulse */}
      <div className="flex flex-col gap-8 justify-center">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative bg-[#0b0f19] border border-slate-800 p-8 rounded-xl shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-tech font-bold tracking-widest uppercase flex items-center gap-2">
                <Activity size={12} />
                Market Intelligence
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-6">
              <div>
                <div className="text-6xl font-heading font-bold text-white tracking-tighter mb-2">82<span className="text-purple-500">%</span></div>
                <p className="text-slate-400 text-xs font-tech uppercase tracking-wider">Plan to adopt agents</p>
                <p className="text-slate-500 text-[10px] mt-1">(Capgemini)</p>
              </div>
              <div>
                <div className="text-6xl font-heading font-bold text-white tracking-tighter mb-2">15<span className="text-blue-500">%</span></div>
                <p className="text-slate-400 text-xs font-tech uppercase tracking-wider">Of all work by 2025</p>
                <p className="text-slate-500 text-[10px] mt-1">(Gartner)</p>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-6">
              <p className="text-xl font-heading font-medium text-slate-200 leading-normal italic">
                "In 10 years, there will be more Digital Agents than Human Employees."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Col: The Surge */}
      <div className="h-full flex flex-col justify-center gap-2 relative">
        <div className="absolute left-8 top-10 bottom-10 w-px bg-gradient-to-b from-transparent via-slate-800 to-transparent z-0"></div>

        <div className="relative z-10 pl-20 py-4 group">
          <div className="absolute left-8 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-slate-900 border-2 border-purple-500/50 group-hover:border-purple-500 transition-colors z-10"></div>
          <div className="text-3xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-slate-400 mb-1">Level 3 Inflection</div>
          <div className="text-slate-400 font-body text-sm leading-relaxed max-w-sm">
            Moving from passive Chatbots (L2) to Agents (L3) that actively move money.
          </div>
        </div>

        <div className="relative z-10 pl-20 py-4 group">
          <div className="absolute left-8 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-slate-900 border-2 border-blue-500/50 group-hover:border-blue-500 transition-colors z-10"></div>
          <div className="text-3xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-slate-400 mb-1">2025 Benchmark</div>
          <div className="text-slate-400 font-body text-sm leading-relaxed max-w-sm">
            1,000+ global enterprises deploying 100,000+ autonomous agents.
          </div>
        </div>

        <div className="relative z-10 pl-20 mt-4">
          <div className="absolute left-8 top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-red-500 border-4 border-black shadow-[0_0_20px_rgba(220,38,38,0.6)] z-20"></div>

          <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 border border-red-500/30 p-6 rounded-2xl backdrop-blur-md relative overflow-hidden group hover:border-red-500/50 transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle size={20} className="text-red-500" />
              <div className="text-red-400 text-[10px] font-tech uppercase tracking-widest font-bold">The Adoption Wall</div>
            </div>
            <div className="text-2xl font-heading font-medium text-white mb-2">Governance Paralysis</div>
            <div className="text-slate-400 font-body text-sm leading-relaxed max-w-sm">
              <span className="text-white font-bold">&lt;5% in production</span> because Compliance teams are blocking deployment due to safety risks.
            </div>
          </div>
        </div>
      </div>
    </div>
  </Slide>
];

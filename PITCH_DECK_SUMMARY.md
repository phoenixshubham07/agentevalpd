# AgentEval Pitch Deck Summary

> **Purpose**: This document provides a comprehensive summary of each slide in the AgentEval investor pitch deck. It serves as part of the intern onboarding material to help new team members understand the product vision, market positioning, and value proposition of AgentEval.

---

## Table of Contents

1. [Slide 1: Title](#slide-1-title)
2. [Slide 2: The Shift](#slide-2-the-shift)
3. [Slide 3: The Problem](#slide-3-the-hair-on-fire-problem)
4. [Slide 4: The Solution](#slide-4-the-solution)
5. [Slide 5: Technical Moat](#slide-5-technical-moat)
6. [Slide 6: Killer Feature](#slide-6-killer-feature)
7. [Slide 7: The Digital Workforce](#slide-7-the-digital-workforce)
8. [Slide 8: Market Opportunity](#slide-8-market-opportunity)
9. [Slide 9: Competitive Landscape](#slide-9-competitive-landscape)
10. [Slide 10: GTM Strategy](#slide-10-gtm-strategy)
11. [Slide 11: Product UI Demo](#slide-11-product-ui-demo)
12. [Slide 12: Central Command](#slide-12-central-command)
13. [Slide 13: The Team](#slide-13-the-team)
14. [Slide 14: The Ask & Vision](#slide-14-the-ask--vision)
15. [Slide 15: Impact](#slide-15-impact)

---

## Slide 1: Title

**Header**: AgentEval

**Tagline**: "The Governance and Safety Standard for the Agentic Economy"

### Key Message

The title slide establishes AgentEval's core value proposition: **stopping Enterprise AI Agents from hallucinating, leaking data, and burning cash—automatically**.

### Why This Matters

This opening statement immediately positions AgentEval as a solution to the three biggest pain points enterprises face when deploying AI agents:
- **Hallucinations**: Agents generating inaccurate or fabricated information
- **Data Leakage**: Sensitive information (PII) being exposed through agent interactions
- **Cost Overruns**: Runaway API costs from uncontrolled agent behavior

---

## Slide 2: The Shift

**Header**: "The World has Moved to Level 3 Autonomy"

### Key Message

The AI industry is undergoing a fundamental transition from passive chatbots to autonomous agents that can take real-world actions without human oversight.

### Critical Alert Referenced

> **Sam Altman (CEO, OpenAI) - December 28, 2025**:  
> "AI models are beginning to find critical vulnerabilities and creating risks of severe harm."

### The Three Levels of AI Autonomy

| Level | Name | Description |
|-------|------|-------------|
| **Level 1** | Chatbots | Simple Q&A interfaces |
| **Level 2** | Reasoners | AI that can think and plan |
| **Level 3** | Autonomous Agents | Agents that move money, write code, and access databases **without human oversight** |

### Market Signal

OpenAI is hiring a "Head of Preparedness" at **$555k/year**. AgentEval's pitch: *"AgentEval automates this entire role."*

### Why This Slide Matters for Onboarding

This slide establishes the **market timing** opportunity. We are at an inflection point where enterprises are deploying autonomous agents at scale, but the governance infrastructure hasn't caught up. This creates the need for AgentEval.

---

## Slide 3: The Hair on Fire Problem

**Header**: "The Trust Gap is Blocking Adoption"

### The Three Core Problems

| Icon | Problem | Description |
|------|---------|-------------|
| ⚡ **Yellow** | Unpredictability | Agents stuck in infinite loops can burn **$20,000 in API credits overnight** |
| 🔒 **Red** | Security Risks | Hackers using agents to target global entities with minimal intervention |
| ⚖️ **Blue** | Compliance | Banks cannot deploy agents that might hallucinate regulations or leak PII |

### Why This Matters

This slide identifies the **pain points** that create demand for our product. Enterprises want to deploy AI agents but are paralyzed by:
- **Regulatory risk**: Compliance teams blocking deployments
- **Financial risk**: Uncontrolled costs from runaway agents
- **Reputational risk**: Security breaches and data leakage

---

## Slide 4: The Solution

**Header**: "Active Governance"

### AgentEval's Three-Pillar Architecture

| Component | Name | Technical Implementation | Capability |
|-----------|------|-------------------------|------------|
| 🌐 **The Firewall** | Proxy | Real-time interception | Intercepts PII and "Poison Prompts" with **<20ms latency** |
| ⚖️ **The Judge** | Async Eval | DeepEval integration | Scores every interaction for Truthfulness and Policy Adherence |
| 🔴 **The Kill Switch** | Instant Freeze | Emergency controls | Instantly freeze a rogue agent or entire fleet if risk thresholds are breached |

### Architecture Flow

```
[USER] → [AgentEval Proxy] → [LLM Fleet]
              │
          ┌───┴───┐
          │ PII   │ Guardrails │
          │ Scan  │            │
          └───────────────────┘
```

### Why This Architecture Matters

The proxy-based approach means:
1. **No code changes required** in client applications
2. **Universal compatibility** with any LLM provider
3. **Real-time intervention** before damage occurs (not just logging after)

---

## Slide 5: Technical Moat

**Header**: "Built for the Paranoid Enterprise"

### Core Technical Differentiators

| Feature | Technology | Benefit |
|---------|------------|---------|
| **VPC-Native** | Universal Docker Image | Data **never leaves the premise** - runs inside the bank's firewall |
| **Universal Proxy** | LiteLLM | Compatible with Azure OpenAI, AWS Bedrock, and Anthropic out of the box |
| **Performance Core** | ClickHouse (OLAP) + Redis (Hot State) | Handles **10k+ spans/sec** |

### Architecture Diagram Components

```
┌─────────────────────────────────────────┐
│        Enterprise Firewall / VPC        │
│  ┌───────────────────────────────────┐  │
│  │       AgentEval Engine            │  │
│  │       (Docker / K8s)              │  │
│  └───────────────┬───────────────────┘  │
│                  │                       │
│       ┌──────────┴──────────┐           │
│       │                     │           │
│  ┌────┴────┐         ┌──────┴────┐     │
│  │ClickHouse│        │   Redis    │     │
│  │OLAP Logs │        │ Hot State  │     │
│  └─────────┘         └───────────┘     │
└─────────────────────────────────────────┘
```

### Why This Technical Stack Matters

1. **Security**: On-premise deployment satisfies the strictest enterprise security requirements
2. **Performance**: The ClickHouse + Redis combination ensures minimal latency overhead
3. **Compatibility**: LiteLLM integration means immediate support for all major cloud AI providers

---

## Slide 6: Killer Feature

**Header**: "The Kill Switch"

### The Problem

> **What happens when an agent goes rogue?**

**Status Quo**: Developers redeploy code.  
**Time Required**: 15+ minutes

**AgentEval**: Ops Manager hits one button.  
**Time Required**: < 1 second

### Key Value Proposition

This slide features an **interactive demo** (`KillSwitchDemo` component) showing how an operations manager can instantly freeze a problematic agent or an entire fleet with a single action.

### Why This Feature Matters

In enterprise environments, the ability to **immediately stop** a malfunctioning AI system is critical. This is especially important for:
- Financial services (stopping unauthorized transactions)
- Healthcare (preventing incorrect medical advice)
- Critical infrastructure (immediate safety controls)

---

## Slide 7: The Digital Workforce

**Header**: "Governing the Next Trillion Dollars of Autonomy"

### Market Statistics

| Statistic | Value | Source |
|-----------|-------|--------|
| Enterprises planning to adopt agents | **82%** | Capgemini |
| All work to be done by AI by 2025 | **15%** | Gartner |

### Key Quote

> "In 10 years, there will be more Digital Agents than Human Employees."

### The Adoption Timeline

| Stage | Description |
|-------|-------------|
| **Level 3 Inflection** | Moving from passive Chatbots (L2) to Agents (L3) that actively move money |
| **2025 Benchmark** | 1,000+ global enterprises deploying 100,000+ autonomous agents |
| **The Adoption Wall** | <5% in production because Compliance teams are blocking deployment due to safety risks |

### Why This Slide Matters

This establishes the **market opportunity**: massive demand for AI agents, but governance paralysis preventing deployment. AgentEval solves this bottleneck.

---

## Slide 8: Market Opportunity

**Header**: "Market Capture - The Governance Tax"

### Market Size

| Market Type | Value | Description |
|-------------|-------|-------------|
| **TAM (2032)** | $1.3 Trillion | Global Generative AI Market (Bloomberg Intelligence) |
| **SAM** | $18 Billion | Agent Ops & Governance Software |

### Market Logic

- Security layers capture **5-10%** of total AI infrastructure spend
- Market Velocity: **42% CAGR**

### Why These Numbers Matter for Interns

Understanding market size helps contextualize our pricing and sales strategy. The $18B SAM represents the addressable market for governance and operations tooling around AI agents.

---

## Slide 9: Competitive Landscape

**Header**: "From Debugging to Governing"

### Competitive Comparison Matrix

| Feature | AgentEval | LangSmith | DIY Scripts |
|---------|-----------|-----------|-------------|
| **Core Function** | Active Intervention (blocks bad actions *before* they happen) | Passive Monitoring (logs errors after money is lost) | Manual Regex (brittle, hard-coded rules) |
| **Deployment** | On-Prem / VPC (data never leaves premise) | Cloud SaaS (requires sending data to 3rd party) | Local Only (hard to scale across teams) |
| **Control** | Global Kill Switch (instant freeze for rogue fleets) | No Emergency Brake (manual rollback required) | None (no centralized control) |

### Key Positioning Statement

> "Competitors build tools for developers; we build safety gear for the **C-Suite**."

### Competitive Advantage Summary

1. **Proactive vs. Reactive**: We stop problems before they occur; competitors only log them
2. **Enterprise-Ready**: On-premise deployment meets strict compliance requirements
3. **Emergency Controls**: The kill switch is a unique capability no competitor offers

---

## Slide 10: GTM Strategy

**Header**: "The Trojan Horse Adoption"

### Three-Phase Go-To-Market Strategy

| Phase | Name | Description | Investment |
|-------|------|-------------|------------|
| **1** | The Wedge | Offer `@trace SDK` free to solve developer debugging pains | Free |
| **2** | The Audit | Free 2-Week "Shadow Test" delivering Risk Report on PII | Free |
| **3** | The License | Convert audit to Enterprise VPC License | **$150k/year** |

### Why This Strategy Works

1. **Developer-Led Adoption**: Free SDK gets us into organizations through dev teams
2. **Risk Report**: Creates urgency by showing actual PII exposure incidents
3. **Enterprise Conversion**: Once risk is demonstrated, compliance teams mandate the full solution

---

## Slide 11: Product UI Demo

**Header**: "Something Developers Are Screaming For - Full Observability for Stochastic Systems"

### The Pain Point

> "Why did my Agent spend $50 on a loop?"

LLMs are black boxes. When they fail, they fail silently and expensively. Developers are currently debugging this with `print()` statements.

### The Solution: "MRI for Agents"

| Feature | Description |
|---------|-------------|
| ✅ Real-time Cost & Latency Tracking | Monitor spend and performance in real-time |
| ✅ Visual "Thought Process" Mapping | See exactly how the agent reasoned through its task |
| ✅ Instant PII Detection | Automatically flag sensitive data exposure |

### UI Component

This slide features the `TraceTreeMRI` component, which provides a visual trace of agent execution showing:
- Each step the agent took
- Time and cost for each step
- Any flags or warnings detected

---

## Slide 12: Central Command

**Header**: "Mission Control for AI Fleets"

### Overview

This slide showcases the `DashboardDemo` component—the central command interface where operations teams can:
- Monitor all agents across the organization
- View real-time health metrics
- Access emergency controls
- Generate compliance reports

### Why This Matters

For enterprise customers, having a **single pane of glass** to monitor all AI agent activity is critical for:
- Compliance reporting
- Incident response
- Capacity planning
- Cost management

---

## Slide 13: The Team

**Header**: "Veterans & Visionaries"

### Founders

#### Praveen Tumma - Product & Data Lead

| Area | Details |
|------|---------|
| **Experience** | 20+ Years - M.Tech, Product Management, Data Science |
| **Background** | Startup Founder - Medicine Delivery eCommerce Marketplace |

#### Sai Praneeth - GenAI & Strategy

| Area | Details |
|------|---------|
| **Achievements** | 2x YC-Interviewed Founder, Founding Partner @ Brightcone.ai |
| **Experience** | GenAI Sr. Consultant @ EXL, VC Industry Experience |
| **Education** | IIT Guwahati - Founding Member of IITG-YC Community |

### Why Team Matters

Investors look for:
1. **Domain expertise**: Both founders have deep AI and product experience
2. **Startup experience**: Previous founding experience indicates execution capability
3. **Network**: YC interviews and IIT connections provide access to talent and capital

---

## Slide 14: The Ask & Vision

**Header**: "The Standard for Safe AI"

### Current Fundraise

**Raising**: Seed Round

### Use of Funds

| Priority | Initiative |
|----------|------------|
| ✅ | Scale Sales Engineering for **Banking Pipeline** |
| ✅ | Harden "Self-Healing" agent capabilities |

### The Vision

> "In 5 years, no AI Agent will execute a financial transaction without passing through the **AgentEval** protocol first."

### What This Means for Interns

We are at the seed stage, focused on:
1. **Sales Engineering**: Building relationships with enterprise customers, especially banks
2. **Product Development**: Enhancing autonomous remediation capabilities

---

## Slide 15: Impact

**Header**: Final Vision Statement

### Closing Statement

> "Making a dent in the digital universe by saving **Tens of Billions** annually."
>
> *Protecting the Agentic Economy*

### Purpose

This final slide reinforces the massive scale of impact AgentEval can have—protecting enterprises from billions in potential losses from uncontrolled AI agents.

---

## Summary for Interns

### What AgentEval Does

AgentEval is an **enterprise AI governance platform** that acts as a security layer between organizations and their AI agents. We provide:

1. **Real-time Protection**: Proxy-based interception of problematic agent behavior
2. **Continuous Evaluation**: Scoring every AI interaction for safety and compliance
3. **Emergency Controls**: Instant kill switch for rogue agents

### Why It Matters Now

The market is at an inflection point:
- Enterprises want AI agents (82% planning to adopt)
- But only <5% are in production due to governance concerns
- AgentEval removes this blocker

### Our Competitive Edge

- **Proactive, not reactive**: We stop problems before they happen
- **VPC-native**: Meets the strictest enterprise security requirements
- **Kill switch**: A unique emergency control capability

### The Opportunity

- **$18B SAM** in Agent Ops & Governance
- **42% CAGR** market growth
- **First-mover advantage** in enterprise AI governance

---

## Related Files

- **Slide Implementation**: 
  - `src/slides/SlidesPart1.jsx` (Slides 1-7)
  - `src/slides/SlidesPart2.jsx` (Slides 8-15)
- **Shared Components**: `src/components/SlideComponents.jsx`
- **Demo Components**:
  - `src/components/demos/KillSwitchDemo.jsx`
  - `src/components/demos/TraceTreeMRI.jsx`
  - `src/components/demos/DashboardDemo.jsx`

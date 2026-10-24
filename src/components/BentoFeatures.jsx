import React, { useState, useEffect, useRef } from 'react';
import { 
  Network, 
  Workflow, 
  Bot, 
  Layers, 
  Compass, 
  Cpu, 
  Sparkles, 
  TrendingUp, 
  CheckCircle2, 
  Radio, 
  ArrowRight,
  Maximize2
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { sound } from '../utils/sound';

export default function BentoFeatures() {
  const { theme, setIsSimulatorOpen } = useTheme();

  // 1. Neural Intent Mapping Interactive State
  const [intentSensitivity, setIntentSensitivity] = useState(88);
  const [activeSignal, setActiveSignal] = useState('High Purchase Propensity');

  // 2. Spatial Campaign Builder Node State
  const [activeNode, setActiveNode] = useState(2);
  const nodes = [
    { id: 0, title: 'Spatial Ingest', desc: 'XR headset & sensor telemetry telemetry', status: 'Optimal' },
    { id: 1, title: 'Neural Vectorizer', desc: 'Multi-modal embedding generation', status: 'Active' },
    { id: 2, title: 'Intent Clustering', desc: 'Predictive 4D affinity mapping', status: 'Synthesizing' },
    { id: 3, title: 'Dynamic Placement', desc: 'Sub-frame spatial creative delivery', status: 'Live' },
    { id: 4, title: 'Omni Conversion', desc: 'Zero-friction autonomous checkout', status: 'Scaling' },
  ];

  // 3. Autonomous Conversion Agents Live Log State
  const [agentLogs, setAgentLogs] = useState([
    { id: 1, agent: 'Agent Alpha-7', action: 'Resolved spatial intent trajectory in Vision Pro viewport', latency: '0.42ms', lift: '+38%' },
    { id: 2, agent: 'Agent Nexus-X', action: 'Synthesized dynamic 3D asset variant for high-intent node', latency: '0.61ms', lift: '+44%' },
    { id: 3, agent: 'Agent Mirage-04', action: 'Autonomous bid reallocation across spatial cluster Tokyo-1', latency: '0.33ms', lift: '+52%' }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const actions = [
        'Detected micro-gaze dwell on spatial product display',
        'Optimized volumetric pricing tier for immersive showroom',
        'Triggered contextual spatial waypoint conversion nudge',
        'Rebalanced multi-touch attribution weights for AR cohort',
        'Broadcasted zero-latency dynamic creative to 4,200 XR users'
      ];
      const agents = ['Agent Alpha-7', 'Agent Nexus-X', 'Agent Mirage-04', 'Agent Cipher-9'];
      const latencies = ['0.38ms', '0.45ms', '0.29ms', '0.52ms', '0.34ms'];
      const lifts = ['+41%', '+33%', '+56%', '+48%', '+62%'];

      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      const randomAgent = agents[Math.floor(Math.random() * agents.length)];
      const randomLatency = latencies[Math.floor(Math.random() * latencies.length)];
      const randomLift = lifts[Math.floor(Math.random() * lifts.length)];

      setAgentLogs(prev => [
        { id: Date.now(), agent: randomAgent, action: randomAction, latency: randomLatency, lift: randomLift },
        prev[0],
        prev[1]
      ]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Spotlight mouse tracking for cards
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section id="features" className="relative py-28 px-4 sm:px-6 lg:px-8 z-10 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-pill mb-4 border border-white/10">
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-xs font-mono uppercase tracking-wider text-slate-300">
            Spatial Intelligence Architecture
          </span>
        </div>
        
        <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
          Bento-Engineered for <br className="hidden sm:inline" />
          <span 
            className="bg-gradient-to-r text-transparent bg-clip-text"
            style={{ backgroundImage: `linear-gradient(135deg, ${theme.primary}, ${theme.accent})` }}
          >
            Spatial Hyper-Growth.
          </span>
        </h2>
        
        <p className="mt-4 text-base sm:text-lg text-slate-400 font-light">
          Harness the next dimension of consumer engagement with five autonomous spatial layers working in perpetual concert.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* CARD 1: Neural Intent Mapping (Large 8 Cols) */}
        <div 
          onMouseMove={handleMouseMove}
          className="spotlight-card border-beam-container md:col-span-8 glass-panel-elevated rounded-3xl p-6 sm:p-8 flex flex-col justify-between group hover:border-white/20 transition-all duration-500"
        >
          <div className="border-beam" />
          
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div 
                  className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400"
                  style={{ color: theme.primary }}
                >
                  <Network className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Neural Intent Mapping
                  </h3>
                  <span className="text-xs font-mono text-slate-400">
                    Real-Time 4D Volumetric Vectorization
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono text-emerald-400">
                <Radio className="w-3 h-3 animate-pulse" />
                <span>ACTIVE STREAM</span>
              </div>
            </div>

            <p className="text-slate-300 text-sm sm:text-base font-light mb-6">
              Detects subconscious intent patterns across spatial interfaces, gaze micro-movements, and 3D interactions with sub-millisecond neural clustering.
            </p>

            {/* Interactive Waveform / Intent Radar Widget */}
            <div className="rounded-2xl bg-slate-950/70 border border-white/10 p-4 sm:p-5 backdrop-blur-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div className="text-xs font-mono text-slate-400">
                  SIGNAL DISCOVERY ENGINE: <span className="text-cyan-400 font-bold block sm:inline">{activeSignal}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-mono self-start sm:self-auto">
                  <span className="text-slate-500">Sensitivity:</span>
                  <span className="text-white font-bold">{intentSensitivity}%</span>
                  <input 
                    type="range" 
                    min="50" 
                    max="99" 
                    value={intentSensitivity} 
                    onChange={(e) => {
                      sound.playHover();
                      setIntentSensitivity(Number(e.target.value));
                    }}
                    className="w-24 accent-cyan-400 cursor-pointer"
                  />
                </div>
              </div>

              {/* Dynamic Waveform Visualizer */}
              <div className="h-32 w-full flex items-end justify-between gap-1 sm:gap-1.5 px-2 py-3 bg-slate-900/40 rounded-xl border border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-cyber opacity-20 pointer-events-none" />
                
                {Array.from({ length: 32 }).map((_, i) => {
                  const heightFactor = Math.sin(i * 0.35 + (intentSensitivity / 20)) * 35 + 50;
                  const isActive = i > 12 && i < 24;
                  return (
                    <div 
                      key={i} 
                      className="flex-1 rounded-t-sm transition-all duration-300 relative group cursor-pointer"
                      style={{
                        height: `${Math.max(12, Math.min(95, heightFactor))}%`,
                        backgroundColor: isActive ? theme.primary : 'rgba(255,255,255,0.15)',
                        boxShadow: isActive ? `0 0 12px ${theme.glow}` : 'none'
                      }}
                      onClick={() => {
                        sound.playClick();
                        setActiveSignal(i % 2 === 0 ? 'High Spatial Engagement' : 'Autonomous Conversion Vector');
                      }}
                    >
                      <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 border border-white/20 text-[9px] font-mono px-1.5 py-0.5 rounded text-white pointer-events-none whitespace-nowrap z-20">
                        {Math.round(heightFactor)}%
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Interactive Signal Hotspots */}
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { label: 'Spatial Dwell Time', val: '4.8s (Avg)', status: 'High' },
                  { label: 'Foveated Attention', val: '98.2%', status: 'Peak' },
                  { label: 'Predictive Propensity', val: '94.6%', status: 'Optimal' },
                ].map((stat, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex flex-col">
                    <span className="text-[10px] font-mono text-slate-400">{stat.label}</span>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-sm font-bold text-white">{stat.val}</span>
                      <span className="text-[10px] font-mono text-emerald-400 font-semibold">{stat.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/[0.06]">
            <span className="text-xs font-mono text-slate-400">
              Latency: 0.82ms • Adaptive Thresholding
            </span>
            <button 
              onClick={() => { sound.playClick(); setIsSimulatorOpen(true); }}
              className="text-xs font-semibold text-cyan-300 hover:text-white flex items-center space-x-1 transition-colors cursor-pointer"
            >
              <span>Test Real-Time Mapping</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* CARD 2: Autonomous Conversion Agents (4 Cols) */}
        <div 
          onMouseMove={handleMouseMove}
          className="spotlight-card border-beam-container md:col-span-4 glass-panel-elevated rounded-3xl p-6 sm:p-8 flex flex-col justify-between group hover:border-white/20 transition-all duration-500"
        >
          <div className="border-beam" />
          
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-white tracking-tight">
                  Autonomous Agents
                </h3>
                <span className="text-xs font-mono text-slate-400">
                  Self-Tuning Conversion Swarm
                </span>
              </div>
            </div>

            <p className="text-slate-300 text-sm font-light mb-5">
              Reinforcement agents that dynamically reconstruct spatial marketing experiences in real time based on active consumer intentions.
            </p>

            {/* Live Agent Terminal Feed */}
            <div className="space-y-2.5">
              {agentLogs.map((log) => (
                <div 
                  key={log.id} 
                  className="p-3 rounded-xl bg-slate-950/80 border border-white/5 text-xs font-mono transition-all duration-300 hover:border-purple-500/30"
                >
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span className="font-bold text-purple-300">{log.agent}</span>
                    <span className="text-emerald-400 font-semibold">{log.lift}</span>
                  </div>
                  <div className="text-slate-300 text-[11px] leading-tight line-clamp-2">
                    {log.action}
                  </div>
                  <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-500">
                    <span>Latency: {log.latency}</span>
                    <span className="text-cyan-400">Verified Proof</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Swarm Health: 100%</span>
            <span className="text-emerald-400 font-bold">18,400 Ops/Sec</span>
          </div>
        </div>

        {/* CARD 3: Spatial Campaign Builder (Interactive Node Pipeline - 7 Cols) */}
        <div 
          onMouseMove={handleMouseMove}
          className="spotlight-card border-beam-container md:col-span-7 glass-panel-elevated rounded-3xl p-6 sm:p-8 flex flex-col justify-between group hover:border-white/20 transition-all duration-500"
        >
          <div className="border-beam" />
          
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <Workflow className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Spatial Campaign Builder
                </h3>
                <span className="text-xs font-mono text-slate-400">
                  Interactive Node-Based Deployment Pipeline
                </span>
              </div>
            </div>

            <p className="text-slate-300 text-sm font-light mb-6">
              Click any node in the pipeline below to inspect state, simulate spatial creative injection, and preview autonomous routing.
            </p>

            {/* Interactive Node Flow */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-950/70 border border-white/10 space-y-3">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                {nodes.map((n) => {
                  const isSelected = activeNode === n.id;
                  return (
                    <button
                      key={n.id}
                      onClick={() => {
                        sound.playClick();
                        setActiveNode(n.id);
                      }}
                      className={`p-2.5 rounded-xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                        isSelected 
                          ? 'bg-amber-500/15 border-amber-400/60 shadow-[0_0_15px_rgba(245,158,11,0.25)]' 
                          : 'bg-white/[0.02] border-white/5 hover:border-white/20 hover:bg-white/[0.05]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-slate-500">0{n.id + 1}</span>
                        {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-ping" />}
                      </div>
                      <div className={`text-xs font-semibold mt-2 line-clamp-1 ${isSelected ? 'text-amber-200' : 'text-slate-300'}`}>
                        {n.title}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Node Inspector Display */}
              <div className="mt-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div>
                  <div className="text-xs font-mono text-slate-400">SELECTED PIPELINE STAGE:</div>
                  <div className="text-sm font-bold text-white mt-0.5">
                    {nodes[activeNode].title} — <span className="text-slate-400 font-normal">{nodes[activeNode].desc}</span>
                  </div>
                </div>
                <div className="self-start sm:self-auto px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-300 font-bold shrink-0">
                  {nodes[activeNode].status}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Spatial Graph Execution: Deterministic</span>
            <span className="text-cyan-400">Zero-Config API</span>
          </div>
        </div>

        {/* CARD 4: Quantum Omni-Channel Attribution (5 Cols) */}
        <div 
          onMouseMove={handleMouseMove}
          className="spotlight-card border-beam-container md:col-span-5 glass-panel-elevated rounded-3xl p-6 sm:p-8 flex flex-col justify-between group hover:border-white/20 transition-all duration-500"
        >
          <div className="border-beam" />
          
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-white tracking-tight">
                  Quantum Attribution
                </h3>
                <span className="text-xs font-mono text-slate-400">
                  Cross-Reality Multi-Touch Lift
                </span>
              </div>
            </div>

            <p className="text-slate-300 text-sm font-light mb-5">
              Unifies Apple Vision Pro, Meta Quest, mobile AR, and web touchpoints into a unified cryptographically verified attribution graph.
            </p>

            {/* Attribution Breakdown Bars */}
            <div className="space-y-3">
              {[
                { channel: 'Spatial XR Headsets', share: 48, lift: '9.2x', color: theme.primary },
                { channel: 'Interactive WebGL Demos', share: 32, lift: '6.4x', color: '#8b5cf6' },
                { channel: 'Spatial Audio Nudges', share: 20, lift: '5.1x', color: '#10b981' }
              ].map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-950/70 border border-white/5 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-200 font-medium">{item.channel}</span>
                    <span className="text-emerald-400 font-bold">{item.lift} ROI</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-1000"
                      style={{ width: `${item.share}%`, backgroundColor: item.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Total Attributed Lift: +340%</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
        </div>

      </div>
    </section>
  );
}

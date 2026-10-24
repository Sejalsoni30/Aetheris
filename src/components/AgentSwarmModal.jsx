import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  Bot, 
  Zap, 
  Sparkles, 
  Sliders, 
  Power, 
  Activity, 
  RefreshCw, 
  ShieldCheck, 
  ArrowUpRight 
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { sound } from '../utils/sound';

export default function AgentSwarmModal() {
  const { 
    theme, 
    isAgentSwarmOpen, 
    setIsAgentSwarmOpen, 
    agentsConfig, 
    updateAgent 
  } = useTheme();

  const [selectedAgentId, setSelectedAgentId] = useState('alpha');
  const [isOptimizing, setIsOptimizing] = useState(false);

  if (!isAgentSwarmOpen) return null;

  const currentAgent = agentsConfig.find(a => a.id === selectedAgentId) || agentsConfig[0];

  const handleTriggerSwarmBurst = () => {
    sound.playLaunchChord();
    setIsOptimizing(true);

    setTimeout(() => {
      setIsOptimizing(false);
      confetti({
        particleCount: 90,
        spread: 65,
        origin: { y: 0.6 },
        colors: [theme.primary, theme.secondary, '#8b5cf6', '#10b981']
      });
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-2xl animate-fade-in">
      <div 
        className="relative w-full max-w-4xl rounded-3xl glass-panel-elevated border border-white/20 p-5 sm:p-8 shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto touch-momentum overscroll-contain"
        style={{ boxShadow: `0 0 80px ${theme.glow}` }}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div 
              className="p-3 rounded-2xl bg-white/5 border border-white/10"
              style={{ color: theme.primary }}
            >
              <Bot className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                  Autonomous AI Agent Swarm Deck
                </h3>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${theme.badge}`}>
                  SWARM CONTROL
                </span>
              </div>
              <p className="text-xs font-mono text-slate-400">
                Configure real-time neural conversion agents, calibrate aggressiveness, and dispatch swarm optimizations
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              setIsAgentSwarmOpen(false);
            }}
            className="w-11 h-11 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center justify-center active:scale-95 touch-manipulation"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Agent Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {agentsConfig.map((agent) => {
            const isSelected = agent.id === selectedAgentId;
            return (
              <button
                key={agent.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedAgentId(agent.id);
                }}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                  isSelected 
                    ? 'bg-purple-500/15 border-purple-400/60 shadow-lg' 
                    : 'bg-white/[0.02] border-white/5 hover:border-white/20 hover:bg-white/[0.05]'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs font-mono text-slate-400">{agent.id.toUpperCase()}</span>
                  <span className={`w-2 h-2 rounded-full ${agent.active ? 'bg-emerald-400 animate-ping' : 'bg-slate-600'}`} />
                </div>

                <div className="my-2">
                  <div className="text-sm font-bold text-white">{agent.name}</div>
                  <div className="text-[10px] font-mono text-slate-400 line-clamp-1">{agent.role}</div>
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-400">Aggressiveness:</span>
                  <span className="text-purple-300 font-bold">{agent.aggressiveness}%</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Agent Deep Inspector */}
        <div className="p-5 rounded-2xl bg-slate-950/80 border border-white/10 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-white/10 gap-2">
            <div>
              <span className="text-xs font-mono text-purple-400 uppercase">Selected Swarm Node</span>
              <h4 className="text-lg font-bold text-white font-display">
                {currentAgent.name} — <span className="text-slate-400 text-sm font-normal">{currentAgent.role}</span>
              </h4>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => {
                  sound.playClick();
                  updateAgent(currentAgent.id, { active: !currentAgent.active });
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center space-x-1.5 transition-all cursor-pointer ${
                  currentAgent.active 
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                    : 'bg-slate-800 text-slate-400 border border-white/10'
                }`}
              >
                <Power className="w-3.5 h-3.5" />
                <span>{currentAgent.active ? 'AGENT ONLINE' : 'AGENT OFFLINE'}</span>
              </button>
            </div>
          </div>

          {/* Aggressiveness Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300">AUTONOMOUS CONVERSION AGGRESSIVENESS:</span>
              <span className="text-purple-300 font-bold">{currentAgent.aggressiveness}%</span>
            </div>
            <input 
              type="range"
              min="50"
              max="99"
              value={currentAgent.aggressiveness}
              onChange={(e) => {
                sound.playHover();
                updateAgent(currentAgent.id, { 
                  aggressiveness: Number(e.target.value),
                  ops: `${Math.round(Number(e.target.value) * 62)}/s` 
                });
              }}
              className="w-full accent-purple-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span>50% (Conservative)</span>
              <span>75% (Balanced)</span>
              <span>99% (Maximum Lift)</span>
            </div>
          </div>

          {/* Live Telemetry Readouts */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-2">
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-[10px] font-mono text-slate-400">INFERENCE LATENCY</span>
              <div className="text-base font-bold text-cyan-300 mt-0.5">{currentAgent.latency}</div>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-[10px] font-mono text-slate-400">DISPATCH THROUGHPUT</span>
              <div className="text-base font-bold text-emerald-400 mt-0.5">{currentAgent.ops}</div>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-[10px] font-mono text-slate-400">PROOF STATUS</span>
              <div className="text-base font-bold text-purple-300 mt-0.5">Cryptographic</div>
            </div>
          </div>
        </div>

        {/* Global Swarm Optimization Action */}
        <div className="pt-2">
          <button
            onClick={handleTriggerSwarmBurst}
            disabled={isOptimizing}
            className="w-full py-3.5 rounded-2xl font-bold text-sm text-slate-950 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-2xl flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
            style={{
              background: `linear-gradient(135deg, #ffffff 0%, ${theme.primary} 70%, ${theme.secondary} 100%)`
            }}
          >
            <Sparkles className="w-4 h-4 text-slate-950" />
            <span>{isOptimizing ? 'Broadcasting Swarm Optimization...' : 'Trigger Global Swarm Optimization Burst'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}

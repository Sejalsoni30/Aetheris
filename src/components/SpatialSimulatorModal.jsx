import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  Orbit, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  Layers, 
  TrendingUp, 
  CheckCircle, 
  RotateCw,
  Cpu,
  ArrowRight
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { sound } from '../utils/sound';

export default function SpatialSimulatorModal() {
  const { theme, isSimulatorOpen, setIsSimulatorOpen } = useTheme();

  const [selectedCohort, setSelectedCohort] = useState('VisionOS Spatial Shoppers');
  const [budgetTier, setBudgetTier] = useState('Enterprise (650 Nodes)');
  const [strategy, setStrategy] = useState('Predictive Gaze & Volumetric Placement');
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentResult, setDeploymentResult] = useState(null);

  if (!isSimulatorOpen) return null;

  const handleDeploy = () => {
    sound.playLaunchChord();
    setIsDeploying(true);
    setDeploymentResult(null);

    // Simulate multi-stage quantum deployment
    setTimeout(() => {
      setIsDeploying(false);
      setDeploymentResult({
        roi: '9.4x',
        reach: '184,200 Spatial Touchpoints',
        intentAccuracy: '99.6%',
        conversionLift: '+342%',
        latency: '0.41ms'
      });

      // Confetti burst
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: [theme.primary, theme.secondary, '#ffffff', '#10b981']
      });
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-fade-in">
      <div 
        className="relative w-full max-w-2xl rounded-3xl glass-panel-elevated border border-white/20 p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
        style={{
          boxShadow: `0 0 70px ${theme.glow}`
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div 
              className="p-3 rounded-2xl bg-white/5 border border-white/10"
              style={{ color: theme.primary }}
            >
              <Orbit className="w-6 h-6 animate-spin" style={{ animationDuration: '10s' }} />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                  Spatial Growth Console
                </h3>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${theme.badge}`}>
                  SIMULATOR
                </span>
              </div>
              <p className="text-xs font-mono text-slate-400">
                Autonomous 4D Campaign Strategy Synthesizer
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              setIsSimulatorOpen(false);
            }}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step 1: Target Cohort */}
        <div className="space-y-2.5">
          <label className="text-xs font-mono text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>1. Spatial Consumer Cohort:</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              'VisionOS Spatial Shoppers',
              'Metaverse High-Net-Worth Luxury',
              'Autonomous EV Spatial Commuters',
              'XR Interactive Gaming Enthusiasts'
            ].map((cohort) => (
              <button
                key={cohort}
                onClick={() => {
                  sound.playClick();
                  setSelectedCohort(cohort);
                }}
                className={`p-3 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer ${
                  selectedCohort === cohort
                    ? 'bg-cyan-500/15 border-cyan-400/50 text-cyan-200'
                    : 'bg-white/[0.02] border-white/5 text-slate-400 hover:border-white/20 hover:text-white'
                }`}
              >
                {cohort}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Deployment Nodes & Budget */}
        <div className="space-y-2.5">
          <label className="text-xs font-mono text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>2. Edge Node Deployment Tier:</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { tier: 'Starter (120 Nodes)', price: '$5,000/mo' },
              { tier: 'Enterprise (650 Nodes)', price: '$25,000/mo' },
              { tier: 'Hyper-Scale (3.2K Nodes)', price: '$80,000/mo' }
            ].map((item) => (
              <button
                key={item.tier}
                onClick={() => {
                  sound.playClick();
                  setBudgetTier(item.tier);
                }}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  budgetTier === item.tier
                    ? 'bg-amber-500/15 border-amber-400/50 text-amber-200'
                    : 'bg-white/[0.02] border-white/5 text-slate-400 hover:border-white/20 hover:text-white'
                }`}
              >
                <div className="text-xs font-bold">{item.tier.split(' ')[0]}</div>
                <div className="text-[10px] font-mono text-slate-400 mt-1">{item.price}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 3: Autonomous AI Strategy */}
        <div className="space-y-2.5">
          <label className="text-xs font-mono text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
            <Layers className="w-3.5 h-3.5 text-purple-400" />
            <span>3. Autonomous Execution Model:</span>
          </label>
          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between text-xs">
            <div>
              <div className="font-bold text-white">4D Intent Clustering & Gaze Micro-Optimization</div>
              <div className="text-slate-400 text-[11px] font-mono mt-0.5">Sub-frame volumetric injection • Cryptographic attribution</div>
            </div>
            <span className="px-2.5 py-1 rounded-md bg-purple-500/10 border border-purple-500/30 text-purple-300 font-mono text-[10px] font-bold">
              AI SWARM
            </span>
          </div>
        </div>

        {/* Deployment Simulation Display */}
        {isDeploying && (
          <div className="p-5 rounded-2xl bg-slate-950/90 border border-cyan-400/30 text-center space-y-3 animate-pulse">
            <div className="flex items-center justify-center space-x-2 text-cyan-400 font-mono text-xs">
              <RotateCw className="w-4 h-4 animate-spin" />
              <span>SYNCHRONIZING 650 SPATIAL NODES ACROSS GLOBAL EDGE...</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 h-full w-full animate-shimmer" />
            </div>
          </div>
        )}

        {/* Results Screen */}
        {deploymentResult && (
          <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-slate-950 to-slate-950 border border-emerald-500/30 space-y-4 animate-fade-in">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="flex items-center space-x-2 text-emerald-400 font-bold">
                <CheckCircle className="w-4 h-4" />
                <span>SPATIAL CAMPAIGN SYNCED TO PRODUCTION</span>
              </span>
              <span className="text-slate-400">{deploymentResult.latency} Bus Latency</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="text-[10px] font-mono text-slate-400">PROJECTED ROI</div>
                <div className="text-2xl font-bold font-display text-emerald-400 mt-1">{deploymentResult.roi}</div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="text-[10px] font-mono text-slate-400">CONVERSION LIFT</div>
                <div className="text-2xl font-bold font-display text-white mt-1">{deploymentResult.conversionLift}</div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="text-[10px] font-mono text-slate-400">INTENT PRECISION</div>
                <div className="text-2xl font-bold font-display text-cyan-300 mt-1">{deploymentResult.intentAccuracy}</div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="text-[10px] font-mono text-slate-400">XR AUDIENCE</div>
                <div className="text-lg font-bold font-display text-purple-300 mt-1">184K Touch</div>
              </div>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={handleDeploy}
            disabled={isDeploying}
            className="w-full py-4 rounded-2xl font-bold text-sm text-slate-950 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-2xl flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
            style={{
              background: `linear-gradient(135deg, #ffffff 0%, ${theme.primary} 70%, ${theme.secondary} 100%)`
            }}
          >
            <Sparkles className="w-4 h-4 text-slate-950" />
            <span>{isDeploying ? 'Deploying Spatial Mesh...' : 'Execute Spatial Campaign Trajectory'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}

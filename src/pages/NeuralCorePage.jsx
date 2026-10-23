import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import Footer from '../components/Footer';
import { Cpu, Zap, Activity, ShieldCheck, Terminal, Layers, ArrowRight, CheckCircle2, Copy, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { sound } from '../utils/sound';

export default function NeuralCorePage() {
  const { theme, setIsSimulatorOpen } = useTheme();
  const [copied, setCopied] = useState(false);
  const [activePipelineStage, setActivePipelineStage] = useState(0);

  const pipelineStages = [
    {
      step: '01',
      title: 'Volumetric Ray-Casting',
      latency: '1.2ms',
      desc: 'High-frequency 120Hz optic ray projection intersecting 4D bounding frustums without rasterizing background geometry.',
      stat: '1,024 RAYS/FRAME'
    },
    {
      step: '02',
      title: 'Ephemerality Gaze Hashing',
      latency: '2.8ms',
      desc: 'Raw eye-tracking coordinates are converted into non-reversible localized vectors, ensuring absolute cryptographic privacy.',
      stat: 'SHA-256 ZERO-LEAK'
    },
    {
      step: '03',
      title: 'Latent Intent Inference',
      latency: '4.5ms',
      desc: 'Micro-transformer neural network classifies dwell micro-saccades into immediate purchase or exploration trajectories.',
      stat: '98.7% ACCURACY'
    },
    {
      step: '04',
      title: '60FPS Spatial Anchor Injection',
      latency: '2.7ms',
      desc: 'Dynamically synthesizes personalized holographic UI touchpoints anchored directly in the user’s volumetric viewport.',
      stat: '60FPS ZERO JITTER'
    }
  ];

  const sampleCode = `import { AetherisNeuralCore, VolumetricConfig } from '@aetheris/core';

// Initialize the 4D Spatial Neural Core
const core = new AetherisNeuralCore({
  pipeline: 'tensor-4d-v4',
  targetFrameRate: 120,
  zeroKnowledgeGaze: true,
  volumetricBounds: { x: 5.0, y: 3.5, z: 8.0 }, // meters
  privacyProtocol: 'soc2-ephemeral-tokens'
});

// Stream real-time volumetric gaze telemetry
core.onIntentDetected((intent) => {
  console.log(\`[Aetheris] Projected Conversion Intent: \${intent.confidence * 100}%\`);
  core.injectSpatialAnchor({
    id: intent.cohortId,
    coordinates: intent.predictedVector,
    shaderVariant: 'cyber-cyan-hologram'
  });
});

await core.startAutonomousInference();`;

  const copyCode = () => {
    sound.playClick();
    navigator.clipboard.writeText(sampleCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col selection:bg-cyan-500/30">
      <PageHeader section="Architecture" title="Neural Core" />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-cyan-950/40 backdrop-blur-2xl p-8 sm:p-12 lg:p-16 shadow-2xl">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>4D TENSOR ACCELERATION SUITE</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white leading-tight">
              Aetheris Neural Core: <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500">
                Sub-12ms Volumetric Intent Inference
              </span>
            </h1>

            <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-normal">
              The foundational autonomous backbone behind Aetheris. By synthesizing real-time 4D tensor transformations, eye-tracking micro-saccades, and spatial physics, the Neural Core forecasts user purchase intent before a physical gesture occurs.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => { sound.playLaunchChord(); setIsSimulatorOpen(true); }}
                className="px-6 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition-all shadow-[0_0_25px_rgba(6,182,212,0.35)] flex items-center space-x-2 cursor-pointer"
              >
                <span>Launch Interactive Neural Simulator</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Technical Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {[
            { label: 'Total End-to-End Latency', val: '11.2 ms', badge: 'Ultra-Realtime', icon: Zap },
            { label: 'Ray-Casting Frequency', val: '120 Hz', badge: 'HMD Native', icon: Activity },
            { label: 'Tensor Accuracy Score', val: '98.9%', badge: 'Evaluated v4.2', icon: ShieldCheck },
            { label: 'Volumetric Memory Footprint', val: '42.8 MB', badge: 'Zero VRAM Bloat', icon: Layers },
          ].map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-900/90 border border-white/15 hover:border-cyan-500/50 transition-all shadow-xl">
              <div className="flex items-center justify-between text-xs font-mono text-slate-300 mb-2">
                <span>{item.label}</span>
                <item.icon className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-black font-display text-white">{item.val}</div>
              <span className="inline-block mt-2 text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                {item.badge}
              </span>
            </div>
          ))}
        </div>

        {/* 4-Stage Neural Pipeline Interactive Explainer */}
        <div className="space-y-6">
          <div>
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold">
              Execution Architecture
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mt-1">
              The 4D Inference Pipeline
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {pipelineStages.map((stage, i) => (
              <div
                key={i}
                onClick={() => { sound.playClick(); setActivePipelineStage(i); }}
                className={`p-6 rounded-2xl border transition-all cursor-pointer shadow-xl ${
                  activePipelineStage === i
                    ? 'bg-cyan-950/80 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.3)]'
                    : 'bg-slate-900/90 border-white/15 hover:border-white/30'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono px-2 py-1 rounded bg-white/10 text-white border border-white/15">
                    STAGE {stage.step}
                  </span>
                  <span className="text-xs font-mono text-cyan-300 font-bold">{stage.latency}</span>
                </div>
                <h3 className="font-bold text-white text-base mb-2">{stage.title}</h3>
                <p className="text-slate-300 text-xs leading-relaxed mb-4">{stage.desc}</p>
                <div className="text-[10px] font-mono text-cyan-400 border-t border-white/10 pt-3">
                  {stage.stat}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Code Integration Block */}
        <div className="rounded-3xl border border-white/15 bg-[#080d1a] shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 bg-slate-900/90 border-b border-white/10">
            <div className="flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-mono text-white font-semibold">
                core-neural-initialization.ts
              </span>
            </div>
            <button
              onClick={copyCode}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono text-white transition-all cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy SDK'}</span>
            </button>
          </div>
          <div className="p-6 font-mono text-xs sm:text-sm text-cyan-300/90 overflow-x-auto leading-relaxed">
            <pre className="text-slate-200">{sampleCode}</pre>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}

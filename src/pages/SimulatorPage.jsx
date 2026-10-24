import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import Footer from '../components/Footer';
import SpatialModuleExplorer from '../components/SpatialModuleExplorer';
import { Orbit, Sliders, Eye, Target, Sparkles, CheckCircle2, RotateCcw } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { sound } from '../utils/sound';

export default function SimulatorPage() {
  const { theme } = useTheme();
  const [fov, setFov] = useState(110);
  const [depth, setDepth] = useState(4.2);
  const [gazeSensitivity, setGazeSensitivity] = useState(85);
  const [intentConfidence, setIntentConfidence] = useState(94.2);
  const [activeTarget, setActiveTarget] = useState(1);

  const simulateTargetHit = (id) => {
    sound.playQuantumBeep();
    setActiveTarget(id);
    setIntentConfidence((91 + Math.random() * 8).toFixed(1));
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col selection:bg-cyan-500/30">
      <PageHeader section="Architecture" title="Spatial Simulator" />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12 relative">
        
        {/* Ambient Glow Halos */}
        <div className="absolute top-8 left-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-purple-500/15 rounded-full blur-[140px] pointer-events-none" />
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-cyan-400 font-bold">
            <Orbit className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
            <span>INTERACTIVE VOLUMETRIC SANDBOX</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-display text-white">
            Spatial Engine Simulator
          </h1>
          <p className="text-slate-200 text-sm font-normal">
            Configure volumetric viewing frustums, calibrate gaze tracking sensitivity, and test 4D conversion trajectories.
          </p>
        </div>

        {/* Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Panel */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-white/15 space-y-6 shadow-2xl">
            <div className="flex items-center space-x-2 pb-4 border-b border-white/10">
              <Sliders className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                Frustum & Gaze Controls
              </span>
            </div>

            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-slate-300">Field of View (FOV)</span>
                  <span className="text-cyan-300 font-bold">{fov}°</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="135"
                  value={fov}
                  onChange={(e) => setFov(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-slate-300">Room Depth Frustum</span>
                  <span className="text-cyan-300 font-bold">{depth} meters</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="10.0"
                  step="0.1"
                  value={depth}
                  onChange={(e) => setDepth(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-slate-300">Gaze Saccade Sensitivity</span>
                  <span className="text-cyan-300 font-bold">{gazeSensitivity}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={gazeSensitivity}
                  onChange={(e) => setGazeSensitivity(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300">Computed Intent Confidence</span>
              <span className="text-emerald-400 font-bold text-base">{intentConfidence}%</span>
            </div>
          </div>

          {/* Interactive Simulation Display */}
          <div className="lg:col-span-7 p-8 rounded-3xl bg-slate-900/90 border border-cyan-500/40 relative min-h-[380px] flex flex-col justify-between overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between z-10">
              <span className="text-xs font-mono text-cyan-300 font-bold">
                ACTIVE FRUSTUM: {fov}° // {depth}m DEPTH
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold">
                ONLINE 120HZ
              </span>
            </div>

            {/* Interactive Target Nodes in 3D Space */}
            <div className="relative h-64 flex items-center justify-around z-10">
              {[1, 2, 3].map((node) => (
                <button
                  key={node}
                  onClick={() => simulateTargetHit(node)}
                  className={`group relative p-6 rounded-2xl border transition-all duration-300 cursor-pointer shadow-lg ${
                    activeTarget === node
                      ? 'bg-cyan-950/90 border-cyan-400 scale-110 shadow-[0_0_30px_rgba(6,182,212,0.4)]'
                      : 'bg-white/10 border-white/20 hover:border-white/40'
                  }`}
                >
                  <Target className={`w-8 h-8 ${activeTarget === node ? 'text-cyan-300 animate-pulse' : 'text-slate-300'}`} />
                  <div className="text-xs font-mono font-bold mt-2 text-white">ANCHOR {node}</div>
                  <div className="text-[10px] font-mono text-cyan-300 font-semibold">{(depth * 0.3 * node).toFixed(1)}m DIST</div>
                </button>
              ))}
            </div>

            <div className="text-center z-10 text-xs font-mono text-slate-300">
              Click an anchor to test volumetric ray-casting and trigger real-time intent telemetry
            </div>
          </div>

        </div>

        {/* Cross-Protocol Matrix Navigation Deck */}
        <SpatialModuleExplorer currentPath="/architecture/simulator" />

      </main>

      <Footer />
    </div>
  );
}

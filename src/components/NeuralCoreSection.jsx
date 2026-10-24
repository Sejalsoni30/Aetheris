import React, { useState, useEffect, useRef } from 'react';
import { Cpu, Eye, Crosshair, Sparkles, Sliders, PlayCircle, Shield, Globe } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { sound } from '../utils/sound';

export default function NeuralCoreSection() {
  const { theme, setIsSimulatorOpen } = useTheme();
  const [coords, setCoords] = useState({ x: 0, y: 0, z: 12.4 });
  const [activeCluster, setActiveCluster] = useState('Cluster Alpha: Luxury Spatial Commerce');
  const [activePreset, setActivePreset] = useState('High Density');
  const containerRef = useRef(null);

  const handlePointerCoord = (clientX, clientY) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((clientY - rect.top) / rect.height) * 2 - 1);
    const z = Number((12.4 + Math.sin(x * 3) * 2.2).toFixed(2));

    setCoords({
      x: Number(Math.max(-1, Math.min(1, x)).toFixed(3)),
      y: Number(Math.max(-1, Math.min(1, y)).toFixed(3)),
      z
    });
  };

  const handleMouseMove = (e) => {
    handlePointerCoord(e.clientX, e.clientY);
  };

  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      handlePointerCoord(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const clusters = [
    { name: 'Cluster Alpha: Luxury Spatial Commerce', score: '99.4%', volume: '142K/hr' },
    { name: 'Cluster Beta: Automotive XR Configurator', score: '97.8%', volume: '88K/hr' },
    { name: 'Cluster Gamma: Immersive Entertainment & Spatial Audio', score: '98.5%', volume: '210K/hr' }
  ];

  return (
    <section 
      id="neural-core" 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchMove}
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 z-10 max-w-7xl mx-auto"
    >
      <div className="glass-panel-elevated rounded-3xl p-6 sm:p-10 lg:p-12 border border-white/10 relative overflow-hidden">
        
        {/* Subtle Ambient Radial Glow */}
        <div 
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-[120px] pointer-events-none opacity-30"
          style={{ background: theme.primary }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Information & Controls */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full glass-pill border border-white/10">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-mono uppercase text-slate-300">
                Spatial Coordinate Telemetry
              </span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
              Real-Time Neural <br />
              <span 
                className="bg-gradient-to-r text-transparent bg-clip-text"
                style={{ backgroundImage: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }}
              >
                Raycasting Matrix.
              </span>
            </h2>

            <p className="text-slate-300 font-light text-base leading-relaxed">
              Move your cursor over this interactive viewport to observe sub-frame vector tracking. Aetheris calculates consumer gaze depth, spatial dwell, and conversion readiness in under one millisecond.
            </p>

            {/* Live Raycasting Vector HUD */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/10 font-mono text-xs space-y-3">
              <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-white/5">
                <span className="flex items-center space-x-2">
                  <Crosshair className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '10s' }} />
                  <span>FOVEATED RAYCAST VECTOR</span>
                </span>
                <span className="text-emerald-400 font-semibold">CALIBRATED</span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                  <div className="text-[10px] text-slate-500">VECTOR X</div>
                  <div className="text-sm font-bold text-cyan-300 mt-1">{coords.x}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                  <div className="text-[10px] text-slate-500">VECTOR Y</div>
                  <div className="text-sm font-bold text-cyan-300 mt-1">{coords.y}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                  <div className="text-[10px] text-slate-500">DEPTH Z (m)</div>
                  <div className="text-sm font-bold text-emerald-400 mt-1">{coords.z}</div>
                </div>
              </div>
            </div>

            {/* Cluster Selection */}
            <div className="space-y-2">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Select Active Spatial Cohort:
              </div>
              <div className="space-y-2">
                {clusters.map((c, i) => {
                  const isCurrent = activeCluster === c.name;
                  return (
                    <button
                      key={i}
                      onClick={() => {
                        sound.playClick();
                        setActiveCluster(c.name);
                      }}
                      className={`w-full p-3 rounded-xl border text-left text-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 cursor-pointer ${
                        isCurrent 
                          ? 'bg-cyan-500/10 border-cyan-400/40 text-white' 
                          : 'bg-white/[0.02] border-white/5 text-slate-400 hover:border-white/20 hover:text-slate-200'
                      }`}
                    >
                      <span className="font-medium">{c.name}</span>
                      <div className="flex items-center space-x-3 font-mono self-start sm:self-auto text-[11px]">
                        <span className="text-emerald-400 font-bold">{c.score}</span>
                        <span className="text-slate-500">{c.volume}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center space-x-4 pt-2">
              <button
                onClick={() => {
                  sound.playLaunchChord();
                  setIsSimulatorOpen(true);
                }}
                className="px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-500 hover:scale-105 active:scale-95 transition-all shadow-lg flex items-center space-x-2 cursor-pointer"
              >
                <PlayCircle className="w-4 h-4" />
                <span>Simulate Cohort Trajectory</span>
              </button>
            </div>

          </div>

          {/* Right Column: Visual Spatial Target Hologram */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            <div className="relative w-full aspect-square max-w-md rounded-3xl bg-slate-950/80 border border-white/10 p-6 flex flex-col items-center justify-center overflow-hidden">
              
              {/* Radar Rings & Crosshairs */}
              <div className="absolute inset-0 bg-grid-cyber opacity-30" />
              
              {/* Rotating Outer Radar Ring */}
              <div 
                className="absolute w-72 h-72 rounded-full border border-dashed border-cyan-400/30 animate-spin"
                style={{ animationDuration: '24s' }}
              />

              {/* Middle Pulsing Ring */}
              <div 
                className="absolute w-52 h-52 rounded-full border border-white/20 animate-pulse-slow"
              />

              {/* Core Reticle */}
              <div 
                className="absolute w-28 h-28 rounded-full border border-cyan-400/50 flex items-center justify-center"
                style={{
                  transform: `translate(${coords.x * 35}px, ${-coords.y * 35}px)`,
                  transition: 'transform 0.15s ease-out'
                }}
              >
                <div 
                  className="w-3 h-3 rounded-full animate-ping-slow"
                  style={{ backgroundColor: theme.primary }}
                />
                <div 
                  className="w-2 h-2 rounded-full absolute"
                  style={{ backgroundColor: theme.primary, boxShadow: `0 0 15px ${theme.glow}` }}
                />
              </div>

              {/* Dynamic Coordinate Cross lines */}
              <div className="absolute top-0 bottom-0 w-[1px] bg-white/10" />
              <div className="absolute left-0 right-0 h-[1px] bg-white/10" />

              {/* Holographic Data Readouts */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-slate-400 px-3 py-2 rounded-xl bg-slate-900/90 border border-white/10 backdrop-blur-md">
                <span className="flex items-center space-x-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-white">SYNAPSE LOCK</span>
                </span>
                <span className="text-cyan-400">FPS: 60.0 • LATENCY: 0.8ms</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

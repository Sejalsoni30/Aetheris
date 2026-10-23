import React from 'react';
import { 
  Sparkles, 
  X, 
  RotateCcw, 
  Sliders, 
  Layers, 
  Zap, 
  Volume2, 
  VolumeX, 
  Palette, 
  Activity,
  Check
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { sound } from '../utils/sound';

export default function ExperiencePlayground() {
  const {
    theme,
    currentThemeKey,
    setTheme,
    particleDensity,
    setParticleDensity,
    rotationSpeed,
    setRotationSpeed,
    showConnections,
    setShowConnections,
    turbulence,
    setTurbulence,
    audioEnabled,
    setAudioEnabled,
    isSandboxOpen,
    setIsSandboxOpen,
    allThemes
  } = useTheme();

  const handleReset = () => {
    sound.playClick();
    setTheme('cyan');
    setParticleDensity(2400);
    setRotationSpeed(1);
    setShowConnections(true);
    setTurbulence(true);
  };

  return (
    <>
      {/* Floating Trigger Button on bottom-right */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => {
            sound.playClick();
            setIsSandboxOpen(!isSandboxOpen);
          }}
          onMouseEnter={() => sound.playHover()}
          className="relative group p-3.5 sm:px-5 sm:py-3.5 rounded-2xl glass-panel-elevated border border-white/20 text-white shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center space-x-3 cursor-pointer"
          style={{
            boxShadow: `0 0 30px ${theme.glow}`
          }}
        >
          <div className="relative">
            <Sparkles className="w-5 h-5 animate-spin" style={{ color: theme.primary, animationDuration: '8s' }} />
            <span 
              className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full animate-ping"
              style={{ backgroundColor: theme.primary }}
            />
          </div>
          <span className="hidden sm:inline font-mono text-xs font-bold tracking-wider uppercase">
            3D Shader Sandbox
          </span>
        </button>
      </div>

      {/* Floating Interactive Drawer Modal */}
      {isSandboxOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-fade-in">
          <div 
            className="w-full max-w-md rounded-3xl glass-panel-elevated border border-white/15 p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
            style={{
              boxShadow: `0 25px 60px -15px ${theme.glow}`
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center space-x-2.5">
                <div 
                  className="p-2 rounded-xl bg-white/5 border border-white/10"
                  style={{ color: theme.primary }}
                >
                  <Sliders className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-white">
                    3D Spatial Sandbox
                  </h3>
                  <p className="text-xs font-mono text-slate-400">
                    Real-Time WebGL Shader & Color Matrix
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  sound.playClick();
                  setIsSandboxOpen(false);
                }}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 1. Theme Color Selector */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                <span className="flex items-center space-x-1.5">
                  <Palette className="w-3.5 h-3.5 text-cyan-400" />
                  <span>CHROMATIC THEME:</span>
                </span>
                <span className="font-bold uppercase" style={{ color: theme.primary }}>
                  {theme.name}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {Object.entries(allThemes).map(([key, t]) => {
                  const isSelected = currentThemeKey === key;
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        sound.playQuantumBeep();
                        setTheme(key);
                      }}
                      onMouseEnter={() => sound.playHover()}
                      className={`p-3 rounded-2xl border text-left transition-all duration-300 flex items-center justify-between cursor-pointer ${
                        isSelected 
                          ? 'bg-white/10 border-white/40 shadow-lg' 
                          : 'bg-white/[0.02] border-white/5 hover:border-white/20 hover:bg-white/[0.05]'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <div 
                          className="w-4 h-4 rounded-full shadow-md"
                          style={{ backgroundColor: t.primary, boxShadow: `0 0 10px ${t.glow}` }}
                        />
                        <span className="text-xs font-medium text-slate-200">
                          {t.name}
                        </span>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5" style={{ color: t.primary }} />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Particle Density Slider */}
            <div className="space-y-2 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                <span>PARTICLE DENSITY:</span>
                <span className="text-white font-bold">{particleDensity} pts</span>
              </div>
              <input 
                type="range"
                min="800"
                max="4000"
                step="200"
                value={particleDensity}
                onChange={(e) => {
                  sound.playHover();
                  setParticleDensity(Number(e.target.value));
                }}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>800 (Light)</span>
                <span>2400 (Optimal)</span>
                <span>4000 (Dense)</span>
              </div>
            </div>

            {/* 3. Rotation Speed Slider */}
            <div className="space-y-2 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                <span>ROTATION VELOCITY:</span>
                <span className="text-white font-bold">{rotationSpeed.toFixed(1)}x</span>
              </div>
              <input 
                type="range"
                min="0.2"
                max="2.5"
                step="0.1"
                value={rotationSpeed}
                onChange={(e) => {
                  sound.playHover();
                  setRotationSpeed(Number(e.target.value));
                }}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>0.2x (Chill)</span>
                <span>1.0x (Standard)</span>
                <span>2.5x (Hyper)</span>
              </div>
            </div>

            {/* 4. Toggles (Turbulence, Neural Connections, Audio) */}
            <div className="space-y-2.5">
              
              {/* Turbulence */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-xs font-mono text-slate-300">Waveform Turbulence</span>
                <button
                  onClick={() => {
                    sound.playClick();
                    setTurbulence(!turbulence);
                  }}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                    turbulence ? 'bg-cyan-500' : 'bg-slate-700'
                  }`}
                >
                  <span 
                    className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                      turbulence ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Connections */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-xs font-mono text-slate-300">Synaptic Plexus Lines</span>
                <button
                  onClick={() => {
                    sound.playClick();
                    setShowConnections(!showConnections);
                  }}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                    showConnections ? 'bg-cyan-500' : 'bg-slate-700'
                  }`}
                >
                  <span 
                    className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                      showConnections ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Audio */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-xs font-mono text-slate-300">Web Audio Synth Chimes</span>
                <button
                  onClick={() => {
                    const next = !audioEnabled;
                    setAudioEnabled(next);
                    sound.enabled = next;
                    if (next) sound.playQuantumBeep();
                  }}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                    audioEnabled ? 'bg-cyan-500' : 'bg-slate-700'
                  }`}
                >
                  <span 
                    className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                      audioEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

            </div>

            {/* Footer Actions */}
            <div className="pt-2 flex items-center justify-between border-t border-white/10">
              <button
                onClick={handleReset}
                className="text-xs font-mono text-slate-400 hover:text-white flex items-center space-x-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Defaults</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  setIsSandboxOpen(false);
                }}
                className="px-5 py-2 rounded-xl text-xs font-bold text-slate-950 bg-white hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}

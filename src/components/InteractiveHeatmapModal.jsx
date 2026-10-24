import React, { useState, useRef } from 'react';
import { 
  X, 
  Eye, 
  RotateCcw, 
  Flame, 
  Compass, 
  Sparkles, 
  Sliders, 
  Activity, 
  Crosshair 
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { sound } from '../utils/sound';

export default function InteractiveHeatmapModal() {
  const { theme, isHeatmapOpen, setIsHeatmapOpen } = useTheme();

  const [fixations, setFixations] = useState([
    { x: 35, y: 40, weight: 1.0, duration: 4.2 },
    { x: 65, y: 35, weight: 0.85, duration: 3.1 },
    { x: 50, y: 65, weight: 0.95, duration: 3.8 }
  ]);

  const [viewMode, setViewMode] = useState('heat'); // 'heat' | 'scanpath' | 'zones'
  const [pupilIndex, setPupilIndex] = useState(4.2);

  if (!isHeatmapOpen) return null;

  const addFixationAt = (clientX, clientY, currentTarget) => {
    sound.playHover();
    const rect = currentTarget.getBoundingClientRect();
    const x = Math.max(5, Math.min(95, Math.round(((clientX - rect.left) / rect.width) * 100)));
    const y = Math.max(5, Math.min(95, Math.round(((clientY - rect.top) / rect.height) * 100)));
    const duration = Number((2.0 + Math.random() * 3.5).toFixed(1));

    setFixations(prev => [...prev.slice(-7), { x, y, weight: 1.0, duration }]);
    setPupilIndex(Number((3.8 + Math.random() * 1.2).toFixed(1)));
  };

  const handleCanvasClick = (e) => {
    addFixationAt(e.clientX, e.clientY, e.currentTarget);
  };

  const handleCanvasTouch = (e) => {
    if (e.touches && e.touches[0]) {
      addFixationAt(e.touches[0].clientX, e.touches[0].clientY, e.currentTarget);
    }
  };

  const clearHeatmap = () => {
    sound.playClick();
    setFixations([]);
  };

  const avgPropensity = fixations.length > 0 
    ? Math.min(99.4, (82 + fixations.length * 2.5)).toFixed(1)
    : '0.0';

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
              <Eye className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                  Foveated Gaze & Spatial Intent Heatmap
                </h3>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${theme.badge}`}>
                  EYE-TRACKING SIMULATOR
                </span>
              </div>
              <p className="text-xs font-mono text-slate-400">
                Tap or click on the viewport below to simulate XR headset gaze fixations and observe neural intent synthesis
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              setIsHeatmapOpen(false);
            }}
            className="w-11 h-11 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center justify-center active:scale-95 touch-manipulation"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* View Controls & HUD Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center space-x-2 p-1 rounded-xl bg-slate-950/80 border border-white/10">
            {['heat', 'scanpath', 'zones'].map((mode) => (
              <button
                key={mode}
                onClick={() => {
                  sound.playClick();
                  setViewMode(mode);
                }}
                className={`px-3 py-1.5 rounded-lg uppercase transition-all cursor-pointer ${
                  viewMode === mode 
                    ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-400/50' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {mode === 'heat' ? 'Foveated Heat' : mode === 'scanpath' ? 'Gaze Scanpath' : 'Interest Zones'}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={clearHeatmap}
              className="flex items-center space-x-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear Fixations</span>
            </button>
          </div>
        </div>

        {/* Interactive Heatmap Canvas Viewport */}
        <div 
          onClick={handleCanvasClick}
          onTouchStart={handleCanvasTouch}
          className="relative w-full aspect-[16/9] min-h-[220px] max-h-[420px] rounded-2xl bg-slate-950 border border-white/15 p-4 overflow-hidden cursor-crosshair group shadow-inner touch-none"
        >
          {/* Background Grid & 3D Environment Wireframe */}
          <div className="absolute inset-0 bg-grid-cyber opacity-30 pointer-events-none" />

          {/* Central Target UI Elements representing a spatial storefront */}
          <div className="absolute inset-10 rounded-2xl border border-dashed border-white/10 flex items-center justify-around p-6 pointer-events-none">
            <div className="w-32 h-40 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col items-center justify-center p-3 text-center">
              <span className="text-[10px] font-mono text-slate-500">ZONE A</span>
              <span className="text-xs font-bold text-white mt-1">3D Hologram Showcase</span>
            </div>

            <div className="w-40 h-48 rounded-xl bg-cyan-500/[0.03] border border-cyan-500/20 flex flex-col items-center justify-center p-3 text-center">
              <span className="text-[10px] font-mono text-cyan-400">ZONE B (CORE)</span>
              <span className="text-sm font-bold text-cyan-200 mt-1">Autonomous Spatial Checkout</span>
            </div>

            <div className="w-32 h-40 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col items-center justify-center p-3 text-center">
              <span className="text-[10px] font-mono text-slate-500">ZONE C</span>
              <span className="text-xs font-bold text-white mt-1">Spatial Audio Waypoint</span>
            </div>
          </div>

          {/* SVG Scanpath Lines */}
          {viewMode === 'scanpath' && fixations.length > 1 && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
              {fixations.slice(1).map((pt, idx) => {
                const prev = fixations[idx];
                return (
                  <line
                    key={idx}
                    x1={`${prev.x}%`}
                    y1={`${prev.y}%`}
                    x2={`${pt.x}%`}
                    y2={`${pt.y}%`}
                    stroke={theme.primary}
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    opacity="0.8"
                  />
                );
              })}
            </svg>
          )}

          {/* Render Heatmap Blobs / Fixations */}
          {fixations.map((pt, i) => (
            <div
              key={i}
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-300 z-10"
              style={{
                left: `${pt.x}%`,
                top: `${pt.y}%`
              }}
            >
              {viewMode === 'heat' && (
                <div 
                  className="rounded-full animate-pulse-slow"
                  style={{
                    width: `${pt.duration * 32}px`,
                    height: `${pt.duration * 32}px`,
                    background: `radial-gradient(circle, rgba(239, 68, 68, 0.7) 0%, rgba(245, 158, 11, 0.45) 45%, rgba(0, 242, 254, 0.2) 70%, transparent 100%)`,
                    filter: 'blur(10px)'
                  }}
                />
              )}

              {/* Point Reticle Badge */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full border border-white bg-red-500/80 flex items-center justify-center text-[9px] font-mono text-white font-bold">
                  {i + 1}
                </div>
              </div>
            </div>
          ))}

          {/* Bottom HUD */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-slate-400 bg-slate-900/90 border border-white/10 px-3 py-1.5 rounded-xl backdrop-blur-md pointer-events-none z-20">
            <span>Click to add eye fixation vector</span>
            <span className="text-cyan-300">Total Fixations: {fixations.length}</span>
          </div>
        </div>

        {/* Real-time Computed Analytics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-white/10">
            <div className="text-[10px] font-mono text-slate-400">INTENT PROPENSITY</div>
            <div className="text-2xl font-bold font-display text-emerald-400 mt-1">{avgPropensity}%</div>
            <span className="text-[10px] font-mono text-emerald-400">High Conversion Zone</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-white/10">
            <div className="text-[10px] font-mono text-slate-400">PUPIL DILATION</div>
            <div className="text-2xl font-bold font-display text-cyan-300 mt-1">{pupilIndex} mm</div>
            <span className="text-[10px] font-mono text-slate-400">Cognitive Engagement</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-white/10">
            <div className="text-[10px] font-mono text-slate-400">AVG GAZE DWELL</div>
            <div className="text-2xl font-bold font-display text-purple-300 mt-1">3.7s</div>
            <span className="text-[10px] font-mono text-purple-400">+240% vs 2D standard</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-white/10">
            <div className="text-[10px] font-mono text-slate-400">FOVEATED SAMPLING</div>
            <div className="text-2xl font-bold font-display text-amber-300 mt-1">90 FPS</div>
            <span className="text-[10px] font-mono text-amber-400">Sub-Frame Latency</span>
          </div>
        </div>

      </div>
    </div>
  );
}

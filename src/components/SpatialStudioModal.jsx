import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  Layers, 
  Sparkles, 
  Maximize2, 
  Plus, 
  Trash2, 
  Compass, 
  CheckCircle, 
  Eye, 
  Radio, 
  Box,
  Monitor,
  Flame,
  ArrowRight
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { sound } from '../utils/sound';

export default function SpatialStudioModal() {
  const { 
    theme, 
    isStudioOpen, 
    setIsStudioOpen, 
    customCampaigns, 
    addCampaign, 
    removeCampaign 
  } = useTheme();

  // Studio Form State
  const [campaignTitle, setCampaignTitle] = useState('Cyberpunk XR Sneaker Drop');
  const [selectedCohort, setSelectedCohort] = useState('VisionOS Spatial Shoppers');
  const [hologramType, setHologramType] = useState('3D Floating Asset');
  const [depthZ, setDepthZ] = useState(3.4);
  const [dwellRadius, setDwellRadius] = useState(2.8);
  const [budgetTier, setBudgetTier] = useState('$20,000');
  const [allocatedNodes, setAllocatedNodes] = useState(520);
  const [previewActive, setPreviewActive] = useState(true);

  if (!isStudioOpen) return null;

  const handleCreateAndDeploy = (e) => {
    e.preventDefault();
    sound.playLaunchChord();

    const newCamp = {
      id: `c-${Date.now().toString().slice(-4)}`,
      name: campaignTitle || 'Untitled Spatial Campaign',
      targetCohort: selectedCohort,
      budget: budgetTier,
      nodes: allocatedNodes,
      status: 'Active Streaming',
      impressions: '1.2K',
      roi: (7.5 + Math.random() * 2.5).toFixed(1) + 'x',
      createdAt: new Date().toISOString().split('T')[0]
    };

    addCampaign(newCamp);

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.65 },
      colors: [theme.primary, theme.secondary, '#10b981', '#f59e0b']
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-2xl animate-fade-in">
      <div 
        className="relative w-full max-w-5xl rounded-3xl glass-panel-elevated border border-white/20 p-5 sm:p-8 shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto touch-momentum overscroll-contain"
        style={{ boxShadow: `0 0 80px ${theme.glow}` }}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div 
              className="p-3 rounded-2xl bg-white/5 border border-white/10"
              style={{ color: theme.primary }}
            >
              <Box className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                  Spatial Campaign Studio & Sandbox
                </h3>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${theme.badge}`}>
                  DYNAMIC STUDIO
                </span>
              </div>
              <p className="text-xs font-mono text-slate-400">
                Design, test, and deploy interactive 3D spatial campaigns directly into live telemetry
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              setIsStudioOpen(false);
            }}
            className="w-11 h-11 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center justify-center active:scale-95 touch-manipulation"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2-Column Studio Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Interactive Campaign Builder Form */}
          <form onSubmit={handleCreateAndDeploy} className="lg:col-span-7 space-y-4">
            
            {/* 1. Campaign Title */}
            <div>
              <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block mb-1.5">
                Campaign Name:
              </label>
              <input
                type="text"
                value={campaignTitle}
                onChange={(e) => setCampaignTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-white/15 text-white text-sm focus:border-cyan-400 focus:outline-none transition-all"
                placeholder="e.g. Holographic Cyber Monday Drop"
                required
              />
            </div>

            {/* 2. Target Cohort & Hologram Style */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block mb-1.5">
                  Spatial Audience Cohort:
                </label>
                <select
                  value={selectedCohort}
                  onChange={(e) => {
                    sound.playClick();
                    setSelectedCohort(e.target.value);
                  }}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950/80 border border-white/15 text-slate-200 text-xs focus:border-cyan-400 focus:outline-none transition-all"
                >
                  <option value="VisionOS Spatial Shoppers">VisionOS Spatial Shoppers</option>
                  <option value="Metaverse High-Net-Worth Luxury">Metaverse Luxury Collectors</option>
                  <option value="Autonomous EV Drivers">Autonomous EV Commuters</option>
                  <option value="XR Interactive Gaming Enthusiasts">XR Interactive Gamers</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block mb-1.5">
                  Spatial Creative Format:
                </label>
                <select
                  value={hologramType}
                  onChange={(e) => {
                    sound.playClick();
                    setHologramType(e.target.value);
                  }}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950/80 border border-white/15 text-slate-200 text-xs focus:border-cyan-400 focus:outline-none transition-all"
                >
                  <option value="3D Floating Asset">3D Floating Asset (Interactive)</option>
                  <option value="Volumetric Portal">Volumetric Portal (XR Gateway)</option>
                  <option value="Spatial Audio Waypoint">Spatial Audio Waypoint</option>
                  <option value="Holographic Product Twin">Holographic Product Twin</option>
                </select>
              </div>
            </div>

            {/* 3. Spatial Depth & Dwell Radius Sliders */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-300">SPATIAL ANCHOR DEPTH (Z):</span>
                <span className="text-cyan-400 font-bold">{depthZ} meters</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="8.0"
                step="0.1"
                value={depthZ}
                onChange={(e) => {
                  sound.playHover();
                  setDepthZ(Number(e.target.value));
                }}
                className="w-full accent-cyan-400 cursor-pointer"
              />

              <div className="flex items-center justify-between text-xs font-mono pt-1">
                <span className="text-slate-300">CONVERSION DWELL RADIUS:</span>
                <span className="text-purple-400 font-bold">{dwellRadius} meters</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="5.0"
                step="0.2"
                value={dwellRadius}
                onChange={(e) => {
                  sound.playHover();
                  setDwellRadius(Number(e.target.value));
                }}
                className="w-full accent-purple-400 cursor-pointer"
              />
            </div>

            {/* 4. Budget & Nodes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              <div className="p-3 rounded-xl bg-slate-950/80 border border-white/10">
                <div className="text-[10px] font-mono text-slate-400">MONTHLY BUDGET</div>
                <div className="text-lg font-bold font-display text-emerald-400 mt-0.5">{budgetTier}</div>
                <div className="text-[10px] font-mono text-slate-500 mt-1">Autonomous micro-bidding</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-white/10">
                <div className="text-[10px] font-mono text-slate-400">SYNCHRONIZED NODES</div>
                <div className="text-lg font-bold font-display text-cyan-300 mt-0.5">{allocatedNodes} Edge Points</div>
                <div className="text-[10px] font-mono text-slate-500 mt-1">0.42ms average latency</div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl font-bold text-sm text-slate-950 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-xl flex items-center justify-center space-x-2 cursor-pointer"
              style={{
                background: `linear-gradient(135deg, #ffffff 0%, ${theme.primary} 70%, ${theme.secondary} 100%)`
              }}
            >
              <Plus className="w-4 h-4 text-slate-950" />
              <span>Deploy Campaign to Live Mesh</span>
            </button>
          </form>

          {/* Right Column: Simulated Spatial Headset Viewport */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            <div className="relative aspect-square rounded-2xl bg-slate-950 border border-white/15 p-4 flex flex-col items-center justify-between overflow-hidden shadow-inner">
              
              {/* Spatial Viewport HUD */}
              <div className="absolute inset-0 bg-grid-cyber opacity-30 pointer-events-none" />
              
              {/* Top Viewport Header */}
              <div className="w-full flex items-center justify-between text-[10px] font-mono text-slate-400 z-10">
                <span className="flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  <span>VISIONOS VIEWPORT 90FPS</span>
                </span>
                <span>Z: {depthZ}m • R: {dwellRadius}m</span>
              </div>

              {/* Center Holographic Asset Preview */}
              <div className="relative my-auto flex flex-col items-center justify-center z-10">
                <div 
                  className="w-32 h-32 rounded-3xl border border-dashed flex items-center justify-center animate-float-slow transition-all duration-500"
                  style={{
                    borderColor: theme.primary,
                    boxShadow: `0 0 35px ${theme.glow}`,
                    transform: `scale(${Math.max(0.7, 1.4 - depthZ * 0.1)})`
                  }}
                >
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-white"
                    style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.accent})` }}
                  >
                    <Box className="w-8 h-8 animate-spin" style={{ animationDuration: '14s' }} />
                  </div>
                </div>

                <div className="mt-3 text-center">
                  <span className="text-xs font-bold text-white block">{campaignTitle || 'Custom Asset'}</span>
                  <span className="text-[10px] font-mono text-slate-400">{hologramType}</span>
                </div>
              </div>

              {/* Bottom Telemetry HUD */}
              <div className="w-full text-center text-[10px] font-mono text-emerald-400 py-1 px-2 rounded-lg bg-white/[0.04] border border-white/5 z-10">
                FOV LOCKED • SUB-FRAME VOLUMETRIC INJECTION READY
              </div>
            </div>

            {/* Currently Deployed Campaigns List */}
            <div className="space-y-2">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center justify-between">
                <span>Active Live Campaigns ({customCampaigns.length})</span>
                <span className="text-emerald-400">Real-Time Sync</span>
              </div>

              <div className="max-h-40 overflow-y-auto touch-momentum space-y-2 pr-1">
                {customCampaigns.map((camp) => (
                  <div 
                    key={camp.id}
                    className="p-3 rounded-xl bg-slate-950/70 border border-white/10 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-white flex items-center space-x-1.5">
                        <span>{camp.name}</span>
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                          {camp.roi}
                        </span>
                      </div>
                      <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                        {camp.targetCohort} • {camp.nodes} Nodes
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        sound.playClick();
                        removeCampaign(camp.id);
                      }}
                      className="w-10 h-10 rounded-lg text-slate-500 hover:text-red-400 hover:bg-white/5 active:scale-95 transition-all cursor-pointer flex items-center justify-center touch-manipulation"
                      title="Decommission Campaign"
                      aria-label="Decommission Campaign"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import Footer from '../components/Footer';
import SpatialModuleExplorer from '../components/SpatialModuleExplorer';
import { 
  Sparkles, 
  Layers, 
  Eye, 
  TrendingUp, 
  Bot, 
  ShieldCheck, 
  Box, 
  ArrowRight, 
  Zap, 
  CheckCircle2,
  Maximize2
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { sound } from '../utils/sound';

export default function FeaturesPage() {
  const { 
    theme, 
    setIsSimulatorOpen, 
    setIsStudioOpen, 
    setIsHeatmapOpen, 
    setIsAgentSwarmOpen, 
    setIsRoiModalOpen 
  } = useTheme();

  const [filter, setFilter] = useState('all');

  const featuresList = [
    {
      id: 'f1',
      category: 'intent',
      title: 'Volumetric Gaze Retargeting',
      tag: '01 // ADTECH ENGINE',
      desc: 'Predictive eye-tracking vector extraction that recalculates 3D ad placement 120 times every second without impeding immersion.',
      metric: '+430% Conversion Velocity',
      action: () => setIsHeatmapOpen(true),
      actionLabel: 'Launch Heatmap Analyzer'
    },
    {
      id: 'f2',
      category: 'telemetry',
      title: 'Sub-Millisecond Spatial Telemetry',
      tag: '02 // INFRASTRUCTURE',
      desc: 'Real-time telemetry stream analyzing head movement, spatial coordinates, hand gestures, and dwell time with ultra-low latency.',
      metric: '0.8ms Packet Transmission',
      action: () => setIsSimulatorOpen(true),
      actionLabel: 'Open Telemetry Sandbox'
    },
    {
      id: 'f3',
      category: 'agents',
      title: 'Autonomous Swarm Orchestrator',
      tag: '03 // AGENT DECK',
      desc: 'Self-tuning AI agents that allocate spatial campaign budgets across VisionOS and Horizon OS in real time.',
      metric: '9.4x Dynamic ROI Lift',
      action: () => setIsAgentSwarmOpen(true),
      actionLabel: 'Inspect Agent Swarm Deck'
    },
    {
      id: 'f4',
      category: 'studio',
      title: 'Spatial Studio & Campaign Builder',
      tag: '04 // CREATIVE SUITE',
      desc: 'Visual drag-and-drop 3D ad configurator with procedural shader customization and live 3D mesh morphing.',
      metric: '60FPS WebGL2 Live Preview',
      action: () => setIsStudioOpen(true),
      actionLabel: 'Launch Spatial Studio'
    },
    {
      id: 'f5',
      category: 'intent',
      title: 'Real-Time Dynamic ROI Calculator',
      tag: '05 // FINANCIAL ENGINE',
      desc: 'Algorithmic forecasting modeling conversion lift, spatial impressions, and cost-per-intent across volumetric cohorts.',
      metric: 'Instant Yield Forecasting',
      action: () => setIsRoiModalOpen(true),
      actionLabel: 'Calculate Projected ROI'
    },
    {
      id: 'f6',
      category: 'telemetry',
      title: 'Multi-Room Cross-Anchor Sync',
      tag: '06 // RECOGNITION',
      desc: 'Persistent spatial anchors that survive user relocations and headset reboot cycles with millimeter accuracy.',
      metric: '0.04mm Anchor Drift',
      action: () => setIsSimulatorOpen(true),
      actionLabel: 'Test Anchor Persistence'
    }
  ];

  const filteredFeatures = filter === 'all' 
    ? featuresList 
    : featuresList.filter(f => f.category === filter);

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col selection:bg-cyan-500/30">
      <PageHeader section="Architecture" title="Bento Showcase" />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12 relative">
        
        {/* Ambient Glow Halos */}
        <div className="absolute top-8 left-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-purple-500/15 rounded-full blur-[140px] pointer-events-none" />

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FULL BENTO FEATURE ECOSYSTEM</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight">
            Comprehensive Spatial Feature Catalog
          </h1>
          <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-normal">
            Explore the complete suite of modular spatial growth tools built for next-generation volumetric applications.
          </p>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {[
              { id: 'all', label: 'All Capabilities' },
              { id: 'intent', label: 'Intent & Conversion' },
              { id: 'telemetry', label: 'Telemetry & Sync' },
              { id: 'agents', label: 'Autonomous Agents' },
              { id: 'studio', label: 'Creative Studio' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => { sound.playClick(); setFilter(tab.id); }}
                className={`px-4 py-2.5 rounded-xl text-xs font-mono transition-all cursor-pointer min-h-[40px] active:scale-95 touch-manipulation ${
                  filter === tab.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.25)] font-bold'
                    : 'bg-slate-900/90 text-slate-300 border border-white/15 hover:text-white hover:bg-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFeatures.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-3xl border border-white/15 bg-slate-900/90 hover:bg-slate-900/95 p-6 sm:p-8 transition-all duration-300 hover:border-cyan-500/50 flex flex-col justify-between shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[11px] font-mono text-cyan-400 font-bold tracking-wider">
                    {item.tag}
                  </span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white border border-white/15">
                    {item.metric}
                  </span>
                </div>

                <h3 className="text-xl font-bold font-display text-white group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>

              <div className="pt-6 sm:pt-8">
                <button
                  onClick={() => { sound.playClick(); item.action(); }}
                  className="w-full py-3 px-4 rounded-xl text-xs font-semibold text-white bg-white/10 hover:bg-cyan-500/20 border border-white/15 hover:border-cyan-500/40 transition-all flex items-center justify-center space-x-2 cursor-pointer min-h-[44px] active:scale-95 touch-manipulation group-hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                >
                  <span>{item.actionLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cross-Protocol Matrix Navigation Deck */}
        <SpatialModuleExplorer currentPath="/architecture/features" />

      </main>

      <Footer />
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import Footer from '../components/Footer';
import SpatialModuleExplorer from '../components/SpatialModuleExplorer';
import { Activity, Radio, Cpu, Server, Wifi, Play, Pause, RefreshCw, Terminal, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { sound } from '../utils/sound';

export default function TelemetryPage() {
  const { theme } = useTheme();
  const [isLive, setIsLive] = useState(true);
  const [logs, setLogs] = useState([]);
  const [fps, setFps] = useState(59.9);
  const [activeNodes, setActiveNodes] = useState(1482);

  // Simulated live telemetry packets
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      const types = ['GAZE_HIT', 'SPATIAL_ANCHOR_SYNC', 'HEADSET_PASSTHROUGH', 'CONVERSION_INFERRED', 'TENSOR_STREAM'];
      const headsets = ['VisionOS-v2.1', 'MetaQuest3-HMD', 'WebXR-Safari', 'Pico-4-Ultra'];
      const randomType = types[Math.floor(Math.random() * types.length)];
      const randomHeadset = headsets[Math.floor(Math.random() * headsets.length)];
      const latency = (0.6 + Math.random() * 1.2).toFixed(2);

      const newLog = {
        id: Math.random().toString(36).substring(7),
        time: new Date().toLocaleTimeString(),
        type: randomType,
        device: randomHeadset,
        latency: `${latency}ms`,
        status: 'RESOLVED_200'
      };

      setLogs(prev => [newLog, ...prev.slice(0, 14)]);
      setFps((59.8 + Math.random() * 0.4).toFixed(1));
      setActiveNodes(prev => prev + (Math.random() > 0.5 ? 1 : -1));
    }, 1200);

    return () => clearInterval(interval);
  }, [isLive]);

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col selection:bg-cyan-500/30">
      <PageHeader section="Architecture" title="Live Telemetry" />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12 relative">
        
        {/* Ambient Glow Halos */}
        <div className="absolute top-8 left-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-[140px] pointer-events-none" />
        
        {/* Title & Live Status */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-mono text-cyan-400 font-bold mb-2">
              <Radio className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
              <span>LIVE OPERATIONS DASHBOARD</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black font-display text-white">
              Global Spatial Telemetry Network
            </h1>
            <p className="text-slate-200 text-sm mt-1 font-normal">
              Real-time monitoring of decentralized volumetric render nodes and eye-intent pipelines.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => { sound.playClick(); setIsLive(!isLive); }}
              className={`px-4 py-2 rounded-xl text-xs font-mono flex items-center space-x-2 border transition-all cursor-pointer shadow-lg ${
                isLive
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300 font-bold'
                  : 'bg-amber-500/20 border-amber-500/40 text-amber-300 font-bold'
              }`}
            >
              {isLive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isLive ? 'STREAMING ACTIVE' : 'STREAM PAUSED'}</span>
            </button>
          </div>
        </div>

        {/* Real-time Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          <div className="p-4 sm:p-6 rounded-2xl bg-slate-900/90 border border-white/15 shadow-xl">
            <div className="text-xs font-mono text-slate-300 mb-1">Average Render Rate</div>
            <div className="text-2xl sm:text-3xl font-black font-display text-cyan-300">{fps} FPS</div>
            <div className="text-[11px] font-mono text-emerald-400 mt-2 flex items-center space-x-1 font-bold">
              <CheckCircle2 className="w-3 h-3" />
              <span>Zero Drop Frames</span>
            </div>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl bg-slate-900/90 border border-white/15 shadow-xl">
            <div className="text-xs font-mono text-slate-300 mb-1">Active Headset Anchors</div>
            <div className="text-2xl sm:text-3xl font-black font-display text-white">{activeNodes}</div>
            <div className="text-[11px] font-mono text-cyan-300 mt-2 font-bold">Across 18 Global Clusters</div>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl bg-slate-900/90 border border-white/15 shadow-xl">
            <div className="text-xs font-mono text-slate-300 mb-1">Global Round-Trip Latency</div>
            <div className="text-2xl sm:text-3xl font-black font-display text-white">0.94 ms</div>
            <div className="text-[11px] font-mono text-purple-300 mt-2 font-bold">Edge Point-to-Point</div>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl bg-slate-900/90 border border-white/15 shadow-xl">
            <div className="text-xs font-mono text-slate-300 mb-1">Volumetric Intent Score</div>
            <div className="text-2xl sm:text-3xl font-black font-display text-white">99.4%</div>
            <div className="text-[11px] font-mono text-emerald-400 mt-2 font-bold">Verified Cryptographic Hash</div>
          </div>
        </div>

        {/* Real-time Packet Terminal */}
        <div className="rounded-3xl border border-white/15 bg-[#080d1a] shadow-2xl overflow-hidden">
          <div className="px-4 sm:px-6 py-4 bg-slate-900/90 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-mono text-white font-semibold">
                live_spatial_packet_stream.log
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-300">
              BUFFER: {logs.length} / 15 EVENT ENTRIES
            </span>
          </div>

          <div className="p-4 sm:p-6 divide-y divide-white/[0.08] font-mono text-xs overflow-x-auto touch-momentum">
            {logs.map((log) => (
              <div key={log.id} className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between text-slate-200 hover:text-white transition-colors gap-1 sm:gap-4">
                <div className="flex flex-wrap items-center gap-2 sm:space-x-4">
                  <span className="text-slate-400 text-[11px]">{log.time}</span>
                  <span className="text-cyan-300 font-bold">{log.type}</span>
                  <span className="text-slate-300 text-[11px]">[{log.device}]</span>
                </div>
                <div className="flex items-center space-x-3 text-[11px] self-end sm:self-auto">
                  <span className="text-slate-300">{log.latency}</span>
                  <span className="text-emerald-400 font-bold">{log.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cross-Protocol Matrix Navigation Deck */}
        <SpatialModuleExplorer currentPath="/architecture/telemetry" />

      </main>

      <Footer />
    </div>
  );
}

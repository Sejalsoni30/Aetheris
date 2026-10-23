import React, { useState, useEffect } from 'react';
import { Activity, Globe, Zap, TrendingUp, ShieldAlert, Radio, Server, ArrowUpRight, Filter } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { sound } from '../utils/sound';

export default function TelemetryDashboard() {
  const { theme } = useTheme();
  const [timeframe, setTimeframe] = useState('24h');

  // Animated counters based on timeframe
  const timeframeData = {
    '24h': { reach: '48.6M', signals: '99.4%', roi: '8.4x', nodes: '14,892', ops: '4.8B' },
    '7d': { reach: '298.2M', signals: '99.7%', roi: '9.1x', nodes: '15,240', ops: '32.4B' },
    '30d': { reach: '1.24B', signals: '99.8%', roi: '9.6x', nodes: '16,800', ops: '142.0B' },
    'all': { reach: '4.80B', signals: '99.9%', roi: '10.2x', nodes: '18,500', ops: '580.0B' },
  };

  const current = timeframeData[timeframe];

  // Live streaming events
  const [liveEvents, setLiveEvents] = useState([
    { id: 1, city: 'Tokyo, JP', node: 'Edge-NRT-04', type: 'Spatial Checkout', val: '$840.00', latency: '0.42ms', time: 'Just now' },
    { id: 2, city: 'San Francisco, US', node: 'Edge-SFO-09', type: 'XR Gaze Synthesizer', val: 'High-Intent', latency: '0.38ms', time: '1s ago' },
    { id: 3, city: 'London, UK', node: 'Edge-LHR-02', type: 'Dynamic 3D Asset Spawn', val: 'Conversion 94%', latency: '0.51ms', time: '3s ago' },
    { id: 4, city: 'Zurich, CH', node: 'Edge-ZRH-01', type: 'Spatial Audio Trigger', val: 'Retargeting +48%', latency: '0.29ms', time: '5s ago' },
  ]);

  useEffect(() => {
    const cities = [
      { city: 'Tokyo, JP', node: 'Edge-NRT-04' },
      { city: 'San Francisco, US', node: 'Edge-SFO-09' },
      { city: 'London, UK', node: 'Edge-LHR-02' },
      { city: 'Berlin, DE', node: 'Edge-BER-07' },
      { city: 'Singapore, SG', node: 'Edge-SIN-03' },
      { city: 'Seoul, KR', node: 'Edge-ICN-05' },
      { city: 'New York, US', node: 'Edge-JFK-11' },
    ];
    const types = [
      { type: 'Spatial Checkout', val: '$1,240.00' },
      { type: 'XR Gaze Synthesizer', val: 'Intent 98%' },
      { type: 'Dynamic 3D Asset Spawn', val: 'Conversion 96%' },
      { type: 'Spatial Audio Trigger', val: 'Retargeting +54%' },
      { type: 'Neural Attribution Sync', val: 'Verified Proof' },
    ];

    const timer = setInterval(() => {
      const randomCity = cities[Math.floor(Math.random() * cities.length)];
      const randomType = types[Math.floor(Math.random() * types.length)];
      const randomLat = (0.25 + Math.random() * 0.35).toFixed(2) + 'ms';

      setLiveEvents(prev => [
        {
          id: Date.now(),
          city: randomCity.city,
          node: randomCity.node,
          type: randomType.type,
          val: randomType.val,
          latency: randomLat,
          time: 'Just now'
        },
        ...prev.slice(0, 3)
      ]);
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="telemetry" className="relative py-28 px-4 sm:px-6 lg:px-8 z-10 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full glass-pill mb-4 border border-white/10">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-xs font-mono uppercase tracking-wider text-slate-300">
              Global Telemetry Stream
            </span>
          </div>
          
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
            Live Spatial Metrics & <br />
            <span 
              className="bg-gradient-to-r text-transparent bg-clip-text"
              style={{ backgroundImage: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }}
            >
              Conversion Velocity.
            </span>
          </h2>
        </div>

        {/* Timeframe Switcher */}
        <div className="flex items-center space-x-1 p-1 rounded-2xl bg-slate-950/80 border border-white/10 backdrop-blur-xl">
          {['24h', '7d', '30d', 'all'].map((tf) => {
            const isActive = timeframe === tf;
            return (
              <button
                key={tf}
                onClick={() => {
                  sound.playClick();
                  setTimeframe(tf);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer ${
                  isActive 
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/50 text-cyan-200 shadow-md' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tf.toUpperCase()}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4 Big Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        
        {/* Metric 1 */}
        <div className="glass-panel-elevated rounded-3xl p-6 border border-white/10 relative overflow-hidden group hover:border-cyan-500/30 transition-all duration-300">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-3">
            <span className="flex items-center space-x-1.5">
              <Globe className="w-4 h-4 text-cyan-400" />
              <span>GLOBAL REACH</span>
            </span>
            <span className="text-emerald-400 font-semibold">+24.8%</span>
          </div>
          <div className="text-4xl font-display font-black text-white tracking-tight">
            {current.reach}
          </div>
          <div className="mt-2 text-xs text-slate-400 font-light">
            Verified spatial XR & 3D WebGL impressions
          </div>
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
            <span className="text-slate-500">Global Cluster:</span>
            <span className="text-cyan-300">Active</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="glass-panel-elevated rounded-3xl p-6 border border-white/10 relative overflow-hidden group hover:border-purple-500/30 transition-all duration-300">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-3">
            <span className="flex items-center space-x-1.5">
              <Radio className="w-4 h-4 text-purple-400 animate-pulse" />
              <span>INTENT SIGNALS</span>
            </span>
            <span className="text-emerald-400 font-semibold">Peak</span>
          </div>
          <div className="text-4xl font-display font-black text-white tracking-tight">
            {current.signals}
          </div>
          <div className="mt-2 text-xs text-slate-400 font-light">
            Precision score on neural intent classification
          </div>
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
            <span className="text-slate-500">False-Positive:</span>
            <span className="text-emerald-400">&lt; 0.02%</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="glass-panel-elevated rounded-3xl p-6 border border-white/10 relative overflow-hidden group hover:border-amber-500/30 transition-all duration-300">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-3">
            <span className="flex items-center space-x-1.5">
              <TrendingUp className="w-4 h-4 text-amber-400" />
              <span>ROI MULTIPLIER</span>
            </span>
            <span className="text-amber-400 font-semibold">Verified</span>
          </div>
          <div className="text-4xl font-display font-black text-white tracking-tight">
            {current.roi}
          </div>
          <div className="mt-2 text-xs text-slate-400 font-light">
            Average incremental lift vs 2D standard media
          </div>
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
            <span className="text-slate-500">Attribution Model:</span>
            <span className="text-amber-300">Cryptographic</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="glass-panel-elevated rounded-3xl p-6 border border-white/10 relative overflow-hidden group hover:border-emerald-500/30 transition-all duration-300">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-3">
            <span className="flex items-center space-x-1.5">
              <Server className="w-4 h-4 text-emerald-400" />
              <span>ACTIVE AI NODES</span>
            </span>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>
          <div className="text-4xl font-display font-black text-white tracking-tight">
            {current.nodes}
          </div>
          <div className="mt-2 text-xs text-slate-400 font-light">
            Edge-distributed neural inference clusters
          </div>
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
            <span className="text-slate-500">Throughput:</span>
            <span className="text-cyan-300">{current.ops} ops</span>
          </div>
        </div>

      </div>

      {/* Live Stream World Event Terminal */}
      <div className="glass-panel rounded-3xl border border-white/10 p-6 sm:p-8 backdrop-blur-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-white/10 gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-cyan-400">
              <Activity className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-display">
                Real-Time Spatial Event Bus (WebSockets / WebTransport)
              </h3>
              <p className="text-xs font-mono text-slate-400">
                Streaming encrypted telemetry packets from global edge servers
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-xs font-mono">
            <span className="text-slate-500">STREAM STATUS:</span>
            <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold">
              CONNECTED 60FPS
            </span>
          </div>
        </div>

        {/* Event rows */}
        <div className="divide-y divide-white/5 mt-2">
          {liveEvents.map((evt) => (
            <div 
              key={evt.id}
              className="py-4 flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono gap-3 hover:bg-white/[0.02] px-2 rounded-xl transition-colors"
            >
              <div className="flex items-center space-x-3">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
                <span className="font-bold text-white">{evt.city}</span>
                <span className="text-slate-500">{evt.node}</span>
              </div>

              <div className="text-slate-300">
                {evt.type}
              </div>

              <div className="flex items-center space-x-4">
                <span className="font-semibold text-emerald-400">{evt.val}</span>
                <span className="text-slate-500">Latency: <span className="text-cyan-300">{evt.latency}</span></span>
                <span className="text-slate-600 hidden md:inline">{evt.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}

import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import Footer from '../components/Footer';
import { 
  Globe, 
  ShieldCheck, 
  Terminal, 
  Copy, 
  Check, 
  Sparkles, 
  Layers, 
  Cpu, 
  Activity, 
  CheckCircle2, 
  Gauge, 
  Sliders, 
  Zap,
  Play
} from 'lucide-react';
import { sound } from '../utils/sound';

export default function WebXrPage() {
  const [copied, setCopied] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState('vision-pro');
  const [polyCount, setPolyCount] = useState(85000);
  const [dynamicLights, setDynamicLights] = useState(3);
  const [isRunningBenchmark, setIsRunningBenchmark] = useState(false);

  const DEVICES = {
    'vision-pro': {
      name: 'Apple Vision Pro (Safari)',
      refreshRate: '90Hz',
      budget: 11.1,
      resolution: '3660 × 3200 per eye',
      features: ['Immersive AR', 'Unbounded Anchors', 'Eye Gaze (Blinded)', 'Spatial Audio'],
      baseLatency: 3.8
    },
    'quest-3': {
      name: 'Meta Quest 3 (Horizon Browser)',
      refreshRate: '90Hz',
      budget: 11.1,
      resolution: '2064 × 2208 per eye',
      features: ['Immersive AR', 'Optical Hand Tracking', 'Hit-Test Anchors', 'RGB Passthrough'],
      baseLatency: 4.4
    },
    'magic-leap': {
      name: 'Magic Leap 2 (WebXR)',
      refreshRate: '120Hz',
      budget: 8.3,
      resolution: '1440 × 1760 per eye',
      features: ['Immersive AR', 'Segmented Dimming', 'Global Anchors', 'Eye Tracking'],
      baseLatency: 3.2
    },
    'mobile-ar': {
      name: 'Mobile WebXR (Chrome Android)',
      refreshRate: '60Hz',
      budget: 16.6,
      resolution: '1080 × 2400 screen',
      features: ['Surface Hit-Test', 'Camera Stream', 'Local Floor', 'Touch Raycast'],
      baseLatency: 6.8
    }
  };

  const dev = DEVICES[selectedDevice];
  // Calculate dynamic frame time
  const calculatedFrameTime = Number((dev.baseLatency + (polyCount / 50000) * 1.8 + dynamicLights * 0.9).toFixed(1));
  const isWithinBudget = calculatedFrameTime < dev.budget;

  const runBenchmark = () => {
    sound.playLaunchChord();
    setIsRunningBenchmark(true);
    setTimeout(() => setIsRunningBenchmark(false), 1200);
  };

  const xrCode = `import { AetherisWebXRClient } from '@aetheris/webxr';

// Check if immersive-ar is supported in browser
if (navigator.xr) {
  const isSupported = await navigator.xr.isSessionSupported('immersive-ar');
  if (isSupported) {
    const session = await navigator.xr.requestSession('immersive-ar', {
      requiredFeatures: ['local-floor', 'hit-test', 'anchors']
    });

    // Initialize Aetheris Spatial Ad Engine (${selectedDevice})
    const aetherisXR = new AetherisWebXRClient({
      session,
      targetDevice: '${selectedDevice}',
      maxFrameBudgetMs: ${dev.budget},
      enableZeroKnowledgeGaze: true
    });

    session.requestAnimationFrame(function onXRFrame(time, frame) {
      session.requestAnimationFrame(onXRFrame);
      aetherisXR.updateVolumetricTracking(frame);
    });
  }
}`;

  const copyCode = () => {
    sound.playClick();
    navigator.clipboard.writeText(xrCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col selection:bg-cyan-500/30">
      <PageHeader section="Platforms" title="WebXR Standards" />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-emerald-950/40 backdrop-blur-2xl p-8 sm:p-12 lg:p-16 shadow-2xl">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold">
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>W3C OPEN IMMERSIVE WEB SPECIFICATION</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white leading-tight">
              Aetheris for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300">
                WebXR Open Standards
              </span>
            </h1>

            <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-normal">
              Hardware-agnostic 4D spatial computing. Standardized under the W3C Immersive Web Working Group, enabling seamless volumetric spatial ad delivery across every WebXR-compatible browser without app store gatekeepers.
            </p>
          </div>
        </div>

        {/* ================= INTERACTIVE SECTION: WebXR Cross-Device Profiler ================= */}
        <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-slate-900/90 to-[#080d1a] backdrop-blur-2xl p-6 sm:p-10 shadow-2xl space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <div className="inline-flex items-center space-x-2 text-xs font-mono text-emerald-400 font-bold tracking-widest uppercase mb-1">
                <Gauge className="w-3.5 h-3.5" />
                <span>Cross-Device Hardware Benchmark</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
                WebXR Frame Budget & Latency Profiler
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Select target spatial hardware to stress-test polygon counts and compute thermal budget.
              </p>
            </div>

            {/* Benchmark Action */}
            <button
              onClick={runBenchmark}
              className="px-4 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold transition-all flex items-center space-x-2 cursor-pointer shadow-lg shrink-0"
            >
              <Zap className={`w-3.5 h-3.5 ${isRunningBenchmark ? 'animate-spin' : ''}`} />
              <span>{isRunningBenchmark ? 'Profiling GPU...' : 'Run Frame Profiler'}</span>
            </button>
          </div>

          {/* Device Tabs Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {Object.entries(DEVICES).map(([key, d]) => (
              <button
                key={key}
                onClick={() => { sound.playClick(); setSelectedDevice(key); }}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  selectedDevice === key
                    ? 'bg-emerald-500/20 border-emerald-400/50 shadow-[0_0_20px_rgba(16,185,129,0.25)]'
                    : 'bg-white/[0.03] border-white/10 hover:border-white/20'
                }`}
              >
                <div className="text-xs font-mono font-bold text-white truncate">{d.name}</div>
                <div className="text-[10px] font-mono text-emerald-400 mt-1">
                  Budget: {d.budget}ms ({d.refreshRate})
                </div>
              </button>
            ))}
          </div>

          {/* Interactive Sliders & Frame Budget Output */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2">
            
            <div className="lg:col-span-7 space-y-6">
              {/* Slider 1: Poly count */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-300">Volumetric Mesh Polygon Count:</span>
                  <span className="text-emerald-300 font-bold text-sm">{(polyCount / 1000).toFixed(0)}K Triangles</span>
                </div>
                <input
                  type="range"
                  min="20000"
                  max="250000"
                  step="5000"
                  value={polyCount}
                  onChange={(e) => setPolyCount(Number(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>20K Poly (Mobile)</span>
                  <span>125K Poly</span>
                  <span>250K Poly (Desktop)</span>
                </div>
              </div>

              {/* Slider 2: Dynamic Lights */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-300">Dynamic Volumetric Point Lights:</span>
                  <span className="text-cyan-300 font-bold text-sm">{dynamicLights} Lights</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="8"
                  value={dynamicLights}
                  onChange={(e) => setDynamicLights(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              {/* Hardware Features Badges */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <div className="text-[11px] font-mono text-slate-400 uppercase">Hardware Feature Support:</div>
                <div className="flex flex-wrap gap-2">
                  {dev.features.map((feat, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-slate-200 flex items-center space-x-1.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>{feat}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Result Gauges */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4 rounded-2xl border border-white/10 bg-slate-900/80 p-5 font-mono">
              <div className="space-y-3">
                <div className="text-xs text-slate-400 uppercase tracking-wider border-b border-white/10 pb-2">
                  Frame Performance Verdict
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-300">Calculated Frame Render Time:</span>
                  <span className={`text-xl font-bold ${isWithinBudget ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {calculatedFrameTime} ms
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-300">Target Refresh Budget ({dev.refreshRate}):</span>
                  <span className="text-xs text-white font-bold">{dev.budget} ms</span>
                </div>

                {/* Frame Budget Bar */}
                <div className="space-y-1">
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-150 ${isWithinBudget ? 'bg-emerald-400' : 'bg-rose-500'}`}
                      style={{ width: `${Math.min(100, (calculatedFrameTime / dev.budget) * 100)}%` }}
                    />
                  </div>
                  <div className="text-[10px] text-right text-slate-400">
                    {Math.round((calculatedFrameTime / dev.budget) * 100)}% of target frame budget
                  </div>
                </div>

                <div className={`p-3 rounded-xl border text-xs ${
                  isWithinBudget 
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' 
                    : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                }`}>
                  {isWithinBudget 
                    ? '✓ PASS: Sustained 60/90Hz with zero thermal throttling or frame stutter.' 
                    : '⚠ WARNING: Frame budget exceeded. Consider reducing polygon count or dynamic lights.'}
                </div>
              </div>

              <div className="text-[11px] text-slate-400">
                Resolution: <strong className="text-white">{dev.resolution}</strong>
              </div>
            </div>

          </div>

        </div>

        {/* W3C Standard Code Box */}
        <div className="rounded-3xl border border-white/15 bg-[#080d1a] shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 bg-slate-900/90 border-b border-white/10">
            <div className="flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-mono text-white font-semibold">
                WebXRStandardSession.js (W3C Immersive AR)
              </span>
            </div>
            <button
              onClick={copyCode}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono text-white transition-all cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy WebXR Code'}</span>
            </button>
          </div>
          <div className="p-6 font-mono text-xs sm:text-sm text-emerald-300/90 overflow-x-auto leading-relaxed">
            <pre className="text-slate-200">{xrCode}</pre>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}

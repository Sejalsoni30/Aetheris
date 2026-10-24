import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import Footer from '../components/Footer';
import SpatialModuleExplorer from '../components/SpatialModuleExplorer';
import { 
  Box, 
  ShieldCheck, 
  Terminal, 
  Copy, 
  Check, 
  Sparkles, 
  Layers, 
  Cpu, 
  Hand, 
  Activity, 
  RotateCw, 
  Radio,
  Zap,
  ArrowRight
} from 'lucide-react';
import { sound } from '../utils/sound';

export default function HorizonOsPage() {
  const [copied, setCopied] = useState(false);
  const [activeEngineTab, setActiveEngineTab] = useState('unity');
  const [activeGesture, setActiveGesture] = useState('pinch');
  const [handConfidence, setHandConfidence] = useState(99.4);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const CODE_SNIPPETS = {
    unity: `using UnityEngine;
using Aetheris.HorizonOS;

public class HorizonSpatialManager : MonoBehaviour
{
    [SerializeField] private AetherisHorizonConfig config;

    private async void Start()
    {
        // Initialize OpenXR Passthrough Intent Pipeline
        var session = await AetherisEngine.InitializeOpenXRSessionAsync(new SessionOptions
        {
            EnableColorPassthrough = true,
            TrackOpticalHands = true,
            SpatialAnchorPersistence = true
        });

        // Spawn dynamic volumetric spatial ad anchor
        session.OnSpatialIntentTriggered += (intent) =>
        {
            Debug.Log($"[Aetheris Horizon] Conversion Forecast: {intent.Probability:P1}");
        };
    }
}`,
    unreal: `// Unreal Engine 5.4 - OpenXR Enhanced Input & Passthrough Layer
#include "AetherisHorizonSubsystem.h"
#include "OpenXRARTrackedGeometry.h"

void UAetherisHorizonSubsystem::Initialize(FSubsystemCollectionBase& Collection)
{
    Super::Initialize(Collection);
    
    // Bind high-frequency Meta Quest passthrough volumetric mesh
    FAetherisPassthroughConfig Config;
    Config.bEnableOpticalHandTracking = true;
    Config.bPredictiveTrajectory = true;
    
    SpawnVolumetricPlacementAnchor(Config);
}`,
    webxr: `// WebXR Standards on Meta Quest Browser
const session = await navigator.xr.requestSession('immersive-ar', {
  requiredFeatures: ['hit-test', 'hand-tracking', 'anchors']
});

const aetherisTracker = new AetherisWebXRSession(session, {
  colorPassthrough: true,
  handPinchSensitivity: 0.95
});

aetherisTracker.onIntentDetected((intent) => {
  console.log("Spatial Gesture Intent Verified:", intent.token);
});`
  };

  const handlePointer = (clientX, clientY, currentTarget) => {
    const rect = currentTarget.getBoundingClientRect();
    const x = Math.round(((clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((clientY - rect.top) / rect.height) * 100);
    setMousePos({ x, y });
    setHandConfidence(Number((97 + Math.random() * 2.8).toFixed(1)));
  };

  const handleMouseMove = (e) => {
    handlePointer(e.clientX, e.clientY, e.currentTarget);
  };

  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      handlePointer(e.touches[0].clientX, e.touches[0].clientY, e.currentTarget);
    }
  };

  const copyCode = () => {
    sound.playClick();
    navigator.clipboard.writeText(CODE_SNIPPETS[activeEngineTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col selection:bg-cyan-500/30">
      <PageHeader section="Platforms" title="Meta Horizon OS" />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        
        {/* ================= HERO SECTION with Glowing Ambient Backdrop ================= */}
        <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-slate-900/95 via-slate-900/80 to-blue-950/40 backdrop-blur-2xl p-8 sm:p-12 lg:p-16 shadow-2xl">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 max-w-4xl space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-blue-500/40 text-blue-300 text-xs font-mono font-bold shadow-[0_0_15px_rgba(59,130,246,0.25)]">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
              <span>HORIZON OS RUNTIME • OPENXR 1.1 COMPATIBLE</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black font-display tracking-tight text-white leading-tight">
              Aetheris for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300">
                Meta Horizon OS & Quest
              </span>
            </h1>

            <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-normal max-w-2xl">
              Built for Meta Quest 3 and Horizon OS spatial ecosystems. Deploy zero-latency volumetric conversion nodes with native OpenXR hand-tracking, stereoscopic RGB passthrough, and Unity/Unreal Engine SDKs.
            </p>

            {/* Live High-Tech HUD Metrics Ticker */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Passthrough Mode</div>
                <div className="text-sm font-mono font-bold text-blue-300">RGB Stereoscopic</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Hand Tracking</div>
                <div className="text-sm font-mono font-bold text-cyan-300">26-Joint Skeletal</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Anchor Precision</div>
                <div className="text-sm font-mono font-bold text-purple-300">&lt; 0.6ms Jitter</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                <div className="text-[10px] font-mono text-slate-400 uppercase">GPU Optimization</div>
                <div className="text-sm font-mono font-bold text-emerald-300">Snapdragon XR2 Gen 2</div>
              </div>
            </div>

            {/* Quick Hero Actions */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => {
                  sound.playClick();
                  document.getElementById('quest-sandbox')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white font-mono text-xs font-bold shadow-lg transition-all cursor-pointer flex items-center space-x-2"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Test Optical Hand Tracking</span>
              </button>
              
              <button
                onClick={copyCode}
                className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-slate-200 hover:text-white font-mono text-xs transition-all cursor-pointer flex items-center space-x-2"
              >
                <Terminal className="w-3.5 h-3.5 text-blue-400" />
                <span>Copy OpenXR Unity SDK</span>
              </button>
            </div>
          </div>
        </div>

        {/* ================= INTERACTIVE SECTION: Quest 3 Passthrough & Hand-Tracking Simulator ================= */}
        <div id="quest-sandbox" className="rounded-3xl border border-blue-500/30 bg-gradient-to-b from-slate-900/90 to-[#080d1a] backdrop-blur-2xl p-6 sm:p-10 shadow-2xl space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <div className="inline-flex items-center space-x-2 text-xs font-mono text-blue-400 font-bold tracking-widest uppercase mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>OpenXR Hand-Tracking Sandbox</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
                Quest 3 Optical Gesture & Passthrough Testbed
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Test 26-joint skeletal hand tracking and optical raycast intent triggers in real-time.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white/5 border border-white/10 rounded-xl shrink-0">
              {[
                { id: 'pinch', label: 'Index Pinch' },
                { id: 'raycast', label: 'Palm Raycast' },
                { id: 'skeletal', label: '26-Joint Skeletal' },
              ].map(g => (
                <button
                  key={g.id}
                  onClick={() => { sound.playClick(); setActiveGesture(g.id); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    activeGesture === g.id
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 font-bold shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Quest Viewport */}
          <div 
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onTouchStart={handleTouchMove}
            className="relative h-72 sm:h-96 rounded-2xl border-2 border-blue-500/30 bg-gradient-to-b from-slate-950 via-slate-900 to-black overflow-hidden select-none cursor-crosshair flex items-center justify-center group shadow-2xl"
          >
            <div className="absolute inset-0 bg-grid-cyber opacity-30" />

            {/* Hand Skeleton Wireframe Target */}
            <div 
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-75 flex flex-col items-center"
              style={{ left: `${mousePos.x}%`, top: `${mousePos.y}%` }}
            >
              <div className="relative p-4 rounded-full bg-blue-500/20 border-2 border-blue-400/80 shadow-[0_0_35px_rgba(59,130,246,0.5)]">
                <Hand className={`w-8 h-8 text-blue-300 ${activeGesture === 'pinch' ? 'scale-90' : 'scale-110'} transition-transform`} />
              </div>
              <div className="mt-2 text-[10px] font-mono px-2 py-0.5 rounded bg-black/80 border border-blue-400/40 text-blue-300">
                {activeGesture === 'pinch' ? 'PINCH ACTIVE (99.8%)' : activeGesture === 'raycast' ? 'RAYCAST BEAM FIRED' : '26 JOINTS LOCKED'}
              </div>
            </div>

            {/* Spatial Ad Anchor Target in Space */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-white/20 backdrop-blur-md flex flex-col items-center text-center max-w-xs shadow-xl pointer-events-none">
              <Box className="w-10 h-10 text-cyan-400 mb-2 animate-spin" style={{ animationDuration: '12s' }} />
              <div className="text-sm font-bold font-display text-white">Meta Quest Spatial Anchor</div>
              <div className="text-[11px] font-mono text-cyan-300 mt-1">OpenXR Persistent Coordinate</div>
              <div className="text-[10px] text-slate-400 mt-2">RGB Color Passthrough • 90Hz</div>
            </div>

            {/* Top Right Live Telemetry */}
            <div className="absolute top-4 right-4 p-2.5 rounded-xl bg-black/70 border border-white/10 text-[10px] font-mono space-y-0.5 text-slate-300 text-right">
              <div>OPTICAL CONFIDENCE: <span className="text-emerald-400 font-bold">{handConfidence}%</span></div>
              <div>POSE LATENCY: <span className="text-blue-300 font-bold">0.6ms</span></div>
              <div>FRAME TIMING: <span className="text-cyan-400 font-bold">90.0 FPS</span></div>
            </div>
          </div>

        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-3xl bg-slate-900/90 border border-white/15 hover:border-blue-500/50 transition-all space-y-4 shadow-xl group hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-300 group-hover:scale-110 transition-transform">
              <Box className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-display text-white">OpenXR Standards</h3>
            <p className="text-slate-300 text-sm leading-relaxed font-normal">
              Fully compliant with Khronos OpenXR specs. Universal cross-platform compatibility across Meta Quest 2, Quest 3, and Quest Pro headsets.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/90 border border-white/15 hover:border-cyan-500/50 transition-all space-y-4 shadow-xl group hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300 group-hover:scale-110 transition-transform">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-display text-white">Stereoscopic Passthrough</h3>
            <p className="text-slate-300 text-sm leading-relaxed font-normal">
              High-definition full-color passthrough layer rendering blends volumetric 3D campaigns with physical living rooms at sub-1ms anchor jitter.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/90 border border-white/15 hover:border-indigo-500/50 transition-all space-y-4 shadow-xl group hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300 group-hover:scale-110 transition-transform">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-display text-white">Snapdragon XR2 Gen 2</h3>
            <p className="text-slate-300 text-sm leading-relaxed font-normal">
              Custom compute shaders optimized for Qualcomm Snapdragon XR2 Gen 2 GPU architecture deliver 4K per-eye resolution without thermal throttling.
            </p>
          </div>
        </div>

        {/* Multi-Engine Code Integration Suite */}
        <div className="rounded-3xl border border-white/15 bg-[#080d1a] shadow-2xl overflow-hidden">
          <div className="flex flex-wrap items-center justify-between px-6 py-4 bg-slate-900/90 border-b border-white/10 gap-3">
            <div className="flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-blue-400" />
              <div className="flex items-center space-x-2 text-xs font-mono">
                {['unity', 'unreal', 'webxr'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => { sound.playClick(); setActiveEngineTab(tab); }}
                    className={`px-3 py-1 rounded-lg uppercase tracking-wider transition-all cursor-pointer ${
                      activeEngineTab === tab 
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-400/40 font-bold' 
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {tab === 'unity' ? 'Unity C#' : tab === 'unreal' ? 'Unreal Engine 5' : 'WebXR JS'}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={copyCode}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono text-white transition-all cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Code'}</span>
            </button>
          </div>

          <div className="p-6 font-mono text-xs sm:text-sm text-blue-300/90 overflow-x-auto leading-relaxed">
            <pre className="text-slate-200">{CODE_SNIPPETS[activeEngineTab]}</pre>
          </div>
        </div>

        {/* Cross-Protocol Matrix Navigation Deck */}
        <SpatialModuleExplorer currentPath="/platforms/horizon-os" />

      </main>

      <Footer />
    </div>
  );
}

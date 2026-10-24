import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import Footer from '../components/Footer';
import SpatialModuleExplorer from '../components/SpatialModuleExplorer';
import { 
  Eye, 
  ShieldCheck, 
  Cpu, 
  Terminal, 
  Copy, 
  Check, 
  Sparkles, 
  Layers, 
  Maximize2, 
  Compass, 
  Activity, 
  Zap,
  RotateCw,
  ArrowRight
} from 'lucide-react';
import { sound } from '../utils/sound';

export default function VisionOsPage() {
  const [copied, setCopied] = useState(false);
  const [activeCodeTab, setActiveCodeTab] = useState('swift');
  const [visionMode, setVisionMode] = useState('volumetric');
  const [mouseCoord, setMouseCoord] = useState({ x: 50, y: 50 });
  const [gazeConfidence, setGazeConfidence] = useState(98.6);

  const CODE_SNIPPETS = {
    swift: `import SwiftUI
import RealityKit
import AetherisVisionOS

struct SpatialProductExperience: View {
    @StateObject private var spatialEngine = AetherisEngine(
        licenseKey: "aeth_live_spatial_visionos",
        privacyStandard: .zeroKnowledgeGaze
    )
    
    var body: some View {
        RealityView { content in
            // Synthesize dynamic holographic spatial ad
            let anchor = await spatialEngine.createVolumetricAnchor(
                targetCohort: "luxury_spatial_shopper",
                renderLayer: .unboundedPassThrough
            )
            content.add(anchor)
        }
        .onSpatialIntentDetected { intent in
            print("Conversion Trajectory: \\(intent.confidence * 100)%")
        }
    }
}`,
    realitykit: `// RealityKit Custom System & Component Binding
#include <RealityKit/RealityKit.h>
#include <Aetheris/SpatialAttribution.hpp>

void InitializeAetherisEntity(rk::Entity& targetEntity) {
    auto intentComp = rk::AetherisIntentComponent::Create(
        "anchor_volumetric_01",
        rk::PrivacyMode::ClientEnclaveBlinded
    );
    targetEntity.AddComponent(intentComp);
    
    rk::SpatialRaycastSystem::RegisterListener([](const rk::GazeVector& gaze) {
        aeth_eval_trajectory_90hz(&gaze);
    });
}`,
    metal: `// Metal Shading Language (MSL) - 90Hz Volumetric Particle Shading
#include <metal_stdlib>
using namespace metal;

kernel void aetherisVolumetricHologram(
    texture3d<float, access::write> outTexture [[texture(0)]],
    constant float &uTime [[buffer(0)]],
    uint3 gid [[thread_position_in_grid]])
{
    float3 uvw = float3(gid) / float3(outTexture.get_width(), outTexture.get_height(), outTexture.get_depth());
    float noiseVal = sin(uvw.x * 12.0 + uTime) * cos(uvw.y * 12.0 - uTime) * sin(uvw.z * 12.0);
    float alpha = smoothstep(0.15, 0.85, noiseVal);
    outTexture.write(float4(0.0, 0.95, 0.99, alpha), gid);
}`
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    setMouseCoord({ x, y });
    setGazeConfidence(Number((95 + Math.random() * 4.9).toFixed(1)));
  };

  const copyCode = () => {
    sound.playClick();
    navigator.clipboard.writeText(CODE_SNIPPETS[activeCodeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col selection:bg-cyan-500/30">
      <PageHeader section="Platforms" title="Apple VisionOS" />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        
        {/* ================= HERO SECTION with Glowing Ambient Backdrop ================= */}
        <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-slate-900/95 via-slate-900/80 to-purple-950/40 backdrop-blur-2xl p-8 sm:p-12 lg:p-16 shadow-2xl">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 max-w-4xl space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold shadow-[0_0_15px_rgba(6,182,212,0.25)]">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>APPLE VISION PRO NATIVE RUNTIME • REALITYKIT 2.0</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black font-display tracking-tight text-white leading-tight">
              Aetheris for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-indigo-400">
                Apple VisionOS Ecosystem
              </span>
            </h1>

            <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-normal max-w-2xl">
              Natively engineered for Apple Vision Pro. Seamlessly bind 3D ad trajectories to RealityKit scenes with zero raw eye-tracking leakage, full SwiftUI integration, and 90Hz Metal shader compute.
            </p>

            {/* Live High-Tech HUD Metrics Ticker */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Optical Display</div>
                <div className="text-sm font-mono font-bold text-cyan-300">Dual 4K Micro-OLED</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Frame Budget</div>
                <div className="text-sm font-mono font-bold text-purple-300">11.1ms (90Hz Solid)</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Privacy Standard</div>
                <div className="text-sm font-mono font-bold text-emerald-300">Blinded Foveation</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Framework Hook</div>
                <div className="text-sm font-mono font-bold text-amber-300">SwiftUI RealityView</div>
              </div>
            </div>

            {/* Quick Hero Actions */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => {
                  sound.playClick();
                  document.getElementById('vision-viewport')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-mono text-xs font-bold shadow-lg transition-all cursor-pointer flex items-center space-x-2"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Test 4K Headset Viewport</span>
              </button>
              
              <button
                onClick={copyCode}
                className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-slate-200 hover:text-white font-mono text-xs transition-all cursor-pointer flex items-center space-x-2"
              >
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>Copy RealityKit SDK</span>
              </button>
            </div>
          </div>
        </div>

        {/* ================= INTERACTIVE SECTION: Vision Pro Spatial Viewport Simulator ================= */}
        <div id="vision-viewport" className="rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-slate-900/90 to-[#080d1a] backdrop-blur-2xl p-6 sm:p-10 shadow-2xl space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <div className="inline-flex items-center space-x-2 text-xs font-mono text-cyan-400 font-bold tracking-widest uppercase mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Dual 4K Micro-OLED Passthrough Preview</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
                Interactive Vision Pro Spatial Viewport
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Move your cursor to test RealityKit volumetric anchor depth and foveated rendering focus.
              </p>
            </div>

            <div className="flex items-center space-x-2 p-1 bg-white/5 border border-white/10 rounded-xl shrink-0">
              {[
                { id: 'windowed', label: 'Windowed 2D' },
                { id: 'volumetric', label: 'Volumetric 3D' },
                { id: 'foveated', label: 'Foveated 90Hz' },
              ].map(mode => (
                <button
                  key={mode.id}
                  onClick={() => { sound.playClick(); setVisionMode(mode.id); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    visionMode === mode.id
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold shadow-[0_0_15px_rgba(0,242,254,0.3)]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {mode.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Viewport Canvas Box */}
          <div 
            onMouseMove={handleMouseMove}
            className="relative h-80 sm:h-96 rounded-2xl border-2 border-white/20 bg-gradient-to-b from-slate-950 via-slate-900 to-black overflow-hidden select-none cursor-crosshair flex items-center justify-center group shadow-2xl"
          >
            <div className="absolute inset-0 bg-grid-cyber opacity-25" />

            {/* Apple Vision Pro Headset Curved Glass Vignette */}
            <div className="absolute inset-0 border-[14px] border-slate-950/80 rounded-2xl pointer-events-none shadow-[inset_0_0_80px_rgba(0,0,0,0.9)]" />

            {/* Volumetric Hologram Element that reacts to gaze position */}
            <div 
              className={`relative z-10 transition-transform duration-100 ease-out flex flex-col items-center justify-center p-6 rounded-3xl backdrop-blur-xl border ${
                visionMode === 'volumetric'
                  ? 'border-cyan-400/50 bg-cyan-950/40 shadow-[0_0_50px_rgba(0,242,254,0.35)] scale-110'
                  : visionMode === 'foveated'
                  ? 'border-purple-400/50 bg-purple-950/40 shadow-[0_0_50px_rgba(168,85,247,0.35)]'
                  : 'border-white/20 bg-slate-900/60 shadow-lg'
              }`}
              style={{
                transform: `perspective(600px) rotateX(${(mouseCoord.y - 50) * -0.3}deg) rotateY(${(mouseCoord.x - 50) * 0.3}deg)`
              }}
            >
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center mb-3">
                <Layers className="w-7 h-7 text-cyan-300 animate-bounce" style={{ animationDuration: '3s' }} />
              </div>
              <div className="text-sm font-bold font-display text-white">
                Spatial Conversion Anchor
              </div>
              <div className="text-xs font-mono text-cyan-300 mt-1">
                RealityKit Volumetric Transform
              </div>
              <div className="mt-3 flex items-center space-x-2 text-[10px] font-mono px-2 py-0.5 rounded bg-black/60 border border-white/10 text-slate-300">
                <span>Depth Z: 1.42m</span>
                <span>•</span>
                <span className="text-emerald-400">FPS: 90.0</span>
              </div>
            </div>

            {/* Foveated Gaze Target Ring */}
            <div 
              className="absolute w-20 h-20 rounded-full border border-dashed border-cyan-400/60 pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-all duration-75 flex items-center justify-center"
              style={{ left: `${mouseCoord.x}%`, top: `${mouseCoord.y}%` }}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            </div>

            {/* Top Left Live Telemetry */}
            <div className="absolute top-4 left-4 p-2.5 rounded-xl bg-black/70 border border-white/10 text-[10px] font-mono space-y-0.5 text-slate-300">
              <div>OPTICAL FOV: <span className="text-white font-bold">110° Dual 4K</span></div>
              <div>GAZE CONFIDENCE: <span className="text-emerald-400 font-bold">{gazeConfidence}%</span></div>
              <div>METAL RENDER: <span className="text-cyan-400 font-bold">11.1ms Budget (90Hz)</span></div>
            </div>

          </div>

        </div>

        {/* VisionOS Capabilities Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-3xl bg-slate-900/90 border border-white/15 hover:border-cyan-500/50 transition-all space-y-4 shadow-xl group hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300 group-hover:scale-110 transition-transform">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-display text-white">Apple Privacy Compliant</h3>
            <p className="text-slate-300 text-sm leading-relaxed font-normal">
              Complies 100% with Apple's strict privacy framework. Raw eye gaze never exits device sandboxes; only cryptographically blinded intent hashes are processed.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/90 border border-white/15 hover:border-purple-500/50 transition-all space-y-4 shadow-xl group hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300 group-hover:scale-110 transition-transform">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-display text-white">RealityKit & SwiftUI</h3>
            <p className="text-slate-300 text-sm leading-relaxed font-normal">
              Drop-in RealityView hooks and volumetric window anchors. Native Swift async/await APIs with dynamic memory management.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/90 border border-white/15 hover:border-indigo-500/50 transition-all space-y-4 shadow-xl group hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300 group-hover:scale-110 transition-transform">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-display text-white">Metal Acceleration</h3>
            <p className="text-slate-300 text-sm leading-relaxed font-normal">
              Direct Metal Shading Language (MSL) pipelines render volumetric holographic effects at solid 90Hz/100Hz with zero thermal throttling.
            </p>
          </div>
        </div>

        {/* Multi-Language Code Integration Suite */}
        <div className="rounded-3xl border border-white/15 bg-[#080d1a] shadow-2xl overflow-hidden">
          <div className="flex flex-wrap items-center justify-between px-6 py-4 bg-slate-900/90 border-b border-white/10 gap-3">
            <div className="flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <div className="flex items-center space-x-2 text-xs font-mono">
                {['swift', 'realitykit', 'metal'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => { sound.playClick(); setActiveCodeTab(tab); }}
                    className={`px-3 py-1 rounded-lg uppercase tracking-wider transition-all cursor-pointer ${
                      activeCodeTab === tab 
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-bold' 
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {tab === 'swift' ? 'SwiftUI' : tab === 'realitykit' ? 'RealityKit C++' : 'Metal MSL'}
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

          <div className="p-6 font-mono text-xs sm:text-sm text-cyan-300/90 overflow-x-auto leading-relaxed">
            <pre className="text-slate-200">{CODE_SNIPPETS[activeCodeTab]}</pre>
          </div>
        </div>

        {/* Cross-Protocol Matrix Navigation Deck */}
        <SpatialModuleExplorer currentPath="/platforms/visionos" />

      </main>

      <Footer />
    </div>
  );
}

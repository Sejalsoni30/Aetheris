import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import Footer from '../components/Footer';
import { Eye, ShieldCheck, Cpu, Terminal, ArrowRight, CheckCircle2, Copy, Check, Sparkles, Layers } from 'lucide-react';
import { sound } from '../utils/sound';

export default function VisionOsPage() {
  const [copied, setCopied] = useState(false);

  const swiftCode = `import SwiftUI
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
}`;

  const copyCode = () => {
    sound.playClick();
    navigator.clipboard.writeText(swiftCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col selection:bg-cyan-500/30">
      <PageHeader section="Platforms" title="Apple VisionOS" />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-purple-950/40 backdrop-blur-2xl p-8 sm:p-12 lg:p-16 shadow-2xl">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold">
              <Eye className="w-3.5 h-3.5 text-cyan-400" />
              <span>VISIONOS SPATIAL SDK 2.0</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white leading-tight">
              Aetheris for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-indigo-400">
                Apple VisionOS Ecosystem
              </span>
            </h1>

            <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-normal">
              Natively engineered for Apple Vision Pro. Seamlessly bind 3D ad trajectories to RealityKit scenes with zero raw eye-tracking leakage, full SwiftUI integration, and 90Hz Metal shader compute.
            </p>
          </div>
        </div>

        {/* VisionOS Capabilities */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-3xl bg-slate-900/90 border border-white/15 hover:border-cyan-500/50 transition-all space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-display text-white">Apple Privacy Compliant</h3>
            <p className="text-slate-300 text-sm leading-relaxed font-normal">
              Complies 100% with Apple's strict privacy framework. Raw eye gaze never exits device sandboxes; only cryptographically blinded intent hashes are processed.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/90 border border-white/15 hover:border-purple-500/50 transition-all space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-display text-white">RealityKit & SwiftUI</h3>
            <p className="text-slate-300 text-sm leading-relaxed font-normal">
              Drop-in RealityView hooks and volumetric window anchors. Native Swift async/await APIs with dynamic memory management.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/90 border border-white/15 hover:border-indigo-500/50 transition-all space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-display text-white">Metal Acceleration</h3>
            <p className="text-slate-300 text-sm leading-relaxed font-normal">
              Direct Metal Shading Language (MSL) pipelines render volumetric holographic effects at solid 90Hz/100Hz with zero thermal throttling.
            </p>
          </div>
        </div>

        {/* Swift Integration Code */}
        <div className="rounded-3xl border border-white/15 bg-[#080d1a] shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 bg-slate-900/90 border-b border-white/10">
            <div className="flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-mono text-white font-semibold">
                SpatialProductExperience.swift
              </span>
            </div>
            <button
              onClick={copyCode}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono text-white transition-all cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Swift'}</span>
            </button>
          </div>
          <div className="p-6 font-mono text-xs sm:text-sm text-cyan-300/90 overflow-x-auto leading-relaxed">
            <pre className="text-slate-200">{swiftCode}</pre>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}

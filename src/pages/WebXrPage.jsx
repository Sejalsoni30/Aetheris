import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import Footer from '../components/Footer';
import { Globe, ShieldCheck, Terminal, Copy, Check, Sparkles, Layers, Cpu } from 'lucide-react';
import { sound } from '../utils/sound';

export default function WebXrPage() {
  const [copied, setCopied] = useState(false);

  const xrCode = `import { AetherisWebXRClient } from '@aetheris/webxr';

// Check if immersive-ar is supported in browser
if (navigator.xr) {
  const isSupported = await navigator.xr.isSessionSupported('immersive-ar');
  if (isSupported) {
    const session = await navigator.xr.requestSession('immersive-ar', {
      requiredFeatures: ['local-floor', 'hit-test', 'anchors']
    });

    // Initialize Aetheris Spatial Ad Engine inside the WebXR session
    const aetherisXR = new AetherisWebXRClient({
      session,
      cohortTargeting: 'webxr-immersive-user',
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
              Build once, run across every XR headset on the planet through the open web. Fully compliant with W3C WebXR Device APIs, providing instantaneous AR/VR monetization without requiring App Store downloads.
            </p>
          </div>
        </div>

        {/* Feature Grid with High Contrast Solid Glassmorphic Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-3xl bg-slate-900/90 border border-white/15 hover:border-emerald-500/50 transition-all space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-300">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-display text-white">Universal Browser Support</h3>
            <p className="text-slate-300 text-sm leading-relaxed font-normal">
              Runs seamlessly on Safari for VisionOS, Meta Quest Browser, Chrome for Android XR, and Wolvic VR without plugins.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/90 border border-white/15 hover:border-teal-500/50 transition-all space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-300">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-display text-white">Spatial Reference Spaces</h3>
            <p className="text-slate-300 text-sm leading-relaxed font-normal">
              Full support for local-floor, bounded-floor, and unbounded reference spaces with sub-centimeter hit-testing precision.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/90 border border-white/15 hover:border-cyan-500/50 transition-all space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-display text-white">WebGPU Readiness</h3>
            <p className="text-slate-300 text-sm leading-relaxed font-normal">
              Architected for the next leap in web graphics. WebGPU compute shaders accelerate volumetric ray casting by up to 4.2x.
            </p>
          </div>
        </div>

        {/* Code Snippet with Crystal Clear High Contrast Syntax */}
        <div className="rounded-3xl border border-white/15 bg-[#080d1a] shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 bg-slate-900/90 border-b border-white/10">
            <div className="flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-mono text-white font-semibold">
                webxr-immersive-session.ts
              </span>
            </div>
            <button
              onClick={copyCode}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono text-white transition-all cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy WebXR'}</span>
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

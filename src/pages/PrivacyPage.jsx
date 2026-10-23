import React from 'react';
import PageHeader from '../components/PageHeader';
import Footer from '../components/Footer';
import { ShieldCheck, Lock, EyeOff, Key, CheckCircle2, FileText, ArrowRight } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col selection:bg-cyan-500/30">
      <PageHeader section="Protocol" title="Privacy Protocol" />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-emerald-950/40 backdrop-blur-2xl p-8 sm:p-12 lg:p-16 shadow-2xl">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>ZERO-KNOWLEDGE SPATIAL GAZE PROTOCOL</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white leading-tight">
              Cryptographic Privacy <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300">
                In Volumetric Computing
              </span>
            </h1>

            <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-normal">
              Aetheris enforces the world’s strictest spatial privacy architecture. Raw eye-tracking coordinates, biometric iris scans, and physical room geometries never leave the local device boundary.
            </p>
          </div>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-3xl bg-slate-900/90 border border-white/15 hover:border-emerald-500/50 transition-all space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-300">
              <EyeOff className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-display text-white">Zero Raw Eye-Tracking Storage</h3>
            <p className="text-slate-300 text-sm leading-relaxed font-normal">
              Eye gaze coordinates are instantaneously converted to irreversible mathematical hashes on the client GPU. We do not store, log, or transmit raw pupil or corneal vectors.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/90 border border-white/15 hover:border-teal-500/50 transition-all space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-300">
              <Key className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-display text-white">Ephemeral Intent Tokens</h3>
            <p className="text-slate-300 text-sm leading-relaxed font-normal">
              Intent predictions expire automatically within 300 milliseconds. No historical biometric fingerprinting is ever constructed or retained.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/90 border border-white/15 hover:border-cyan-500/50 transition-all space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-display text-white">GDPR & Apple VisionOS Ready</h3>
            <p className="text-slate-300 text-sm leading-relaxed font-normal">
              Exceeds all statutory privacy requirements of GDPR Art. 9, CCPA biometric mandates, and Apple VisionOS Spatial Computing Guidelines.
            </p>
          </div>
        </div>

        {/* Detailed Protocol Specifications */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/90 border border-white/15 space-y-6 shadow-2xl">
          <h2 className="text-2xl font-bold font-display text-white">Privacy Protocol Implementation Guarantee</h2>
          <div className="space-y-4 text-slate-200 text-sm leading-relaxed">
            <p>
              1. <strong className="text-white font-semibold">Client-Side Enclave Processing:</strong> All inference occurs inside the secure hardware enclave of the host headset. Neural weights are executed locally without cloud round-trips for sensitive telemetry.
            </p>
            <p>
              2. <strong className="text-white font-semibold">Differential Privacy Noise:</strong> Before any aggregate spatial metrics are compiled for ad conversion verification, Laplacian mathematical noise is injected to mathematically prevent user re-identification.
            </p>
            <p>
              3. <strong className="text-white font-semibold">User Opt-Out at Headset Level:</strong> End-users retain granular control over volumetric monetization via system settings or physical spatial dismiss gestures at any time.
            </p>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}

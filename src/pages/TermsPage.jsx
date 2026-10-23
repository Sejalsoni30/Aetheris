import React from 'react';
import PageHeader from '../components/PageHeader';
import Footer from '../components/Footer';
import { FileText, CheckCircle2, ShieldCheck, Scale, AlertCircle } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col selection:bg-cyan-500/30">
      <PageHeader section="Protocol" title="Terms of Compute" />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-amber-950/40 backdrop-blur-2xl p-8 sm:p-12 lg:p-16 shadow-2xl">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold">
              <Scale className="w-3.5 h-3.5 text-amber-400" />
              <span>SPATIAL COMPUTE SERVICE LEVEL AGREEMENT</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white leading-tight">
              Terms of Compute & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-300 to-yellow-200">
                Attribution Protocol
              </span>
            </h1>

            <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-normal">
              Governing decentralized volumetric ray-casting, tensor inference capacity, compute credit allocations, and developer royalty distribution across the global Aetheris spatial network.
            </p>
          </div>
        </div>

        {/* SLA & Terms Points */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-3xl bg-slate-900/90 border border-white/15 hover:border-amber-500/50 transition-all space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-300">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-display text-white">99.99% Uptime SLA</h3>
            <p className="text-slate-300 text-sm leading-relaxed font-normal">
              Our distributed edge cluster guarantees 99.99% availability for spatial ad rendering and telemetry ingestion with automatic multi-region failover.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/90 border border-white/15 hover:border-yellow-500/50 transition-all space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center text-yellow-300">
              <Scale className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-display text-white">Fair Compute Allocation</h3>
            <p className="text-slate-300 text-sm leading-relaxed font-normal">
              Compute credits are metered purely on actual GPU tensor cycles executed. Transparent pricing with zero hidden egress or licensing penalties.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/90 border border-white/15 hover:border-orange-500/50 transition-all space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-300">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-display text-white">Ethical Spatial UX Policy</h3>
            <p className="text-slate-300 text-sm leading-relaxed font-normal">
              Strict rules against disruptive visual spam: no involuntary field-of-view blocking, flashing strobe shaders, or deceptive spatial anchors.
            </p>
          </div>
        </div>

        {/* Legal Text Document Container */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/90 border border-white/15 space-y-6 shadow-2xl">
          <h2 className="text-2xl font-bold font-display text-white">Compute Agreement Clauses</h2>
          <div className="space-y-4 text-slate-200 text-sm leading-relaxed">
            <p>
              1. <strong className="text-white font-semibold">Spatial Anchor Royalty Distribution:</strong> Developers integrating the Aetheris SDK into their VR/AR applications receive 85% of volumetric ad conversion proceeds distributed continuously via cryptographic escrow.
            </p>
            <p>
              2. <strong className="text-white font-semibold">Rate Limits and Volumetric Throttling:</strong> Free-tier developers are allocated up to 100,000 monthly volumetric sessions. Enterprise developers enjoy unlimited burst compute with dedicated node provisioning.
            </p>
            <p>
              3. <strong className="text-white font-semibold">Dispute Resolution and Jurisdiction:</strong> All algorithmic attribution discrepancies are resolved via verifiable deterministic cryptographic audit trails logged at timestamp of intent generation.
            </p>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}

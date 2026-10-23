import React from 'react';
import PageHeader from '../components/PageHeader';
import Footer from '../components/Footer';
import { ShieldCheck, Lock, Terminal, Cpu, CheckCircle2, AlertTriangle, Key } from 'lucide-react';

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col selection:bg-cyan-500/30">
      <PageHeader section="Protocol" title="Spatial Security" />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-purple-950/40 backdrop-blur-2xl p-8 sm:p-12 lg:p-16 shadow-2xl">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-mono font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
              <span>ENTERPRISE GRADE SPATIAL SECURITY</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white leading-tight">
              Spatial Security & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-300">
                Quantum-Resistant Telemetry
              </span>
            </h1>

            <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-normal">
              Securing next-generation spatial computing ecosystems. Multi-tenant GPU enclave isolation, post-quantum cryptography, and round-the-clock automated penetration monitoring.
            </p>
          </div>
        </div>

        {/* Security Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-3xl bg-slate-900/90 border border-white/15 hover:border-purple-500/50 transition-all space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-display text-white">SOC 2 Type II Certified</h3>
            <p className="text-slate-300 text-sm leading-relaxed font-normal">
              Independently audited by top-tier cybersecurity firms. Continuous compliance across availability, confidentiality, and processing integrity.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/90 border border-white/15 hover:border-indigo-500/50 transition-all space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300">
              <Key className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-display text-white">Post-Quantum Encryption</h3>
            <p className="text-slate-300 text-sm leading-relaxed font-normal">
              All volumetric data streams use Kyber and Dilithium quantum-resistant cryptographic algorithms to future-proof spatial communications.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/90 border border-white/15 hover:border-cyan-500/50 transition-all space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-display text-white">Multi-Tenant GPU Enclaves</h3>
            <p className="text-slate-300 text-sm leading-relaxed font-normal">
              Complete hardware-level virtualization keeps client shaders and intent models isolated with zero cross-tenant memory bleed.
            </p>
          </div>
        </div>

        {/* Security Standards Table */}
        <div className="rounded-3xl border border-white/15 bg-slate-900/90 overflow-hidden shadow-2xl">
          <div className="px-8 py-6 border-b border-white/10 font-bold font-display text-lg text-white">
            Spatial Security Verification Matrix
          </div>
          <div className="divide-y divide-white/[0.08] text-sm">
            {[
              { std: 'SOC 2 Type II Certification', status: 'Passed / Annually Audited', icon: CheckCircle2 },
              { std: 'ISO/IEC 27001 Information Security', status: 'Certified Active', icon: CheckCircle2 },
              { std: 'Zero-Knowledge Gaze Proofs', status: 'Cryptographically Enforced', icon: CheckCircle2 },
              { std: 'Continuous Automated Pentesting', status: 'Real-time Bug Bounty Active', icon: CheckCircle2 },
            ].map((row, i) => (
              <div key={i} className="px-8 py-4 flex items-center justify-between">
                <span className="text-slate-200 font-medium">{row.std}</span>
                <span className="text-emerald-400 font-mono text-xs flex items-center space-x-1.5 font-bold">
                  <row.icon className="w-4 h-4 text-emerald-400" />
                  <span>{row.status}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}

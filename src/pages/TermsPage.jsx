import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import Footer from '../components/Footer';
import SpatialModuleExplorer from '../components/SpatialModuleExplorer';
import { 
  CheckCircle2, 
  ShieldCheck, 
  Scale, 
  Calculator, 
  Zap 
} from 'lucide-react';
import { sound } from '../utils/sound';

export default function TermsPage() {
  const [impressions, setImpressions] = useState(2500000);
  const [nodes, setNodes] = useState(850);
  const [slaTier, setSlaTier] = useState('enterprise');
  const [simulatedBreach, setSimulatedBreach] = useState(false);

  const slaPercentages = { standard: '99.90%', enterprise: '99.99%', sovereign: '99.999%' };
  const creditMultiplier = { standard: 0.00018, enterprise: 0.00024, sovereign: 0.00032 };
  
  const estimatedCredits = Math.round((impressions / 1000) * creditMultiplier[slaTier] * 1000);
  const developerRoyalty = (estimatedCredits * 0.42).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  const latencyGuarantee = slaTier === 'sovereign' ? '< 0.32ms' : slaTier === 'enterprise' ? '< 0.65ms' : '< 1.10ms';
  const refundGuarantee = (estimatedCredits * 0.15).toLocaleString('en-US', { style: 'currency', currency: 'USD' });

  const triggerBreachSimulation = () => {
    sound.playLaunchChord();
    setSimulatedBreach(true);
    setTimeout(() => setSimulatedBreach(false), 4000);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col selection:bg-cyan-500/30">
      <PageHeader section="Protocol" title="Terms of Compute" />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        
        {/* ================= HERO SECTION with Glowing Ambient Backdrop ================= */}
        <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-slate-900/95 via-slate-900/80 to-amber-950/40 backdrop-blur-2xl p-6 sm:p-12 lg:p-16 shadow-2xl">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/20 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 max-w-4xl space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold shadow-[0_0_15px_rgba(245,158,11,0.25)]">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span>SPATIAL COMPUTE SERVICE LEVEL AGREEMENT • v4.2 PROD</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white leading-tight break-words">
              Terms of Compute & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-300 to-yellow-200">
                Attribution Protocol
              </span>
            </h1>

            <p className="text-slate-200 text-sm sm:text-lg leading-relaxed font-normal max-w-2xl">
              Governing decentralized volumetric ray-casting, tensor inference capacity, compute credit allocations, and developer royalty distribution across the global Aetheris spatial network.
            </p>

            {/* Live High-Tech HUD Metrics Ticker */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 pt-4">
              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Guaranteed Uptime</div>
                <div className="text-sm font-mono font-bold text-amber-300">99.99% Edge SLA</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Royalty Share</div>
                <div className="text-sm font-mono font-bold text-emerald-300">42% Protocol Pool</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Latency Ceiling</div>
                <div className="text-sm font-mono font-bold text-cyan-300">&lt; 0.65ms Max</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Dispute Resolution</div>
                <div className="text-sm font-mono font-bold text-purple-300">Automated Smart Contract</div>
              </div>
            </div>

            {/* Quick Hero Actions */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => {
                  sound.playClick();
                  document.getElementById('sla-calculator')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-mono text-xs font-bold shadow-lg transition-all cursor-pointer flex items-center space-x-2 min-h-[44px] active:scale-95 touch-manipulation"
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>Launch SLA Calculator</span>
              </button>
              
              <button
                onClick={triggerBreachSimulation}
                className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-slate-200 hover:text-white font-mono text-xs transition-all cursor-pointer flex items-center space-x-2 min-h-[44px] active:scale-95 touch-manipulation"
              >
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Simulate Automated Outage Payout</span>
              </button>
            </div>
          </div>
        </div>

        {/* ================= INTERACTIVE SECTION: SLA & Credit Calculator ================= */}
        <div id="sla-calculator" className="rounded-3xl border border-amber-500/30 bg-gradient-to-b from-slate-900/90 to-[#080d1a] backdrop-blur-2xl p-5 sm:p-10 shadow-2xl space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <div className="inline-flex items-center space-x-2 text-xs font-mono text-amber-400 font-bold tracking-widest uppercase mb-1">
                <Calculator className="w-3.5 h-3.5" />
                <span>Interactive Yield & Allocation Engine</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
                SLA Guarantee & Compute Credit Calculator
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Simulate spatial volumetric loads, developer royalties, and automated contractual uptime penalties.
              </p>
            </div>

            {/* SLA Guarantee Tier Selector */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white/5 border border-white/10 rounded-xl shrink-0">
              {[
                { id: 'standard', label: '99.9% Std' },
                { id: 'enterprise', label: '99.99% Ent' },
                { id: 'sovereign', label: '99.999% Sov' },
              ].map(tier => (
                <button
                  key={tier.id}
                  onClick={() => { sound.playClick(); setSlaTier(tier.id); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer min-h-[36px] touch-manipulation ${
                    slaTier === tier.id
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tier.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Sliders Input Area */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Slider 1: Impressions */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-300">Monthly Volumetric Impressions:</span>
                  <span className="text-amber-300 font-bold text-sm">{(impressions / 1000000).toFixed(1)}M Impressions</span>
                </div>
                <input
                  type="range"
                  min="200000"
                  max="20000000"
                  step="200000"
                  value={impressions}
                  onChange={(e) => {
                    sound.playClick();
                    setImpressions(Number(e.target.value));
                  }}
                  className="w-full accent-amber-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>200K / mo</span>
                  <span>10M / mo</span>
                  <span>20M / mo</span>
                </div>
              </div>

              {/* Slider 2: Concurrent Raycast Nodes */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-300">Concurrent Distributed GPU Nodes:</span>
                  <span className="text-cyan-300 font-bold text-sm">{nodes} Nodes</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="3000"
                  step="50"
                  value={nodes}
                  onChange={(e) => {
                    sound.playClick();
                    setNodes(Number(e.target.value));
                  }}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>50 Edge Nodes</span>
                  <span>1,500 Nodes</span>
                  <span>3,000 Nodes</span>
                </div>
              </div>

              {/* SLA Outage Simulation Trigger */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-mono font-bold text-slate-200">
                    Smart Contract Breach Test
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Verify automated zero-delay SLA downtime refund payout.
                  </div>
                </div>

                <button
                  onClick={triggerBreachSimulation}
                  className="px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-lg shrink-0"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Simulate 0.02% Outage</span>
                </button>
              </div>

              {simulatedBreach && (
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/40 text-xs font-mono space-y-1 animate-in fade-in duration-200">
                  <div className="text-amber-300 font-bold flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>CONTRACTUAL REFUND ISSUED: {refundGuarantee}</span>
                  </div>
                  <div className="text-slate-300 text-[11px]">
                    Automatic smart contract payout credited to wallet 0x4a9...89f. No support tickets or manual dispute required.
                  </div>
                </div>
              )}

            </div>

            {/* Live Calculation Cards Output */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                <div className="text-[10px] font-mono text-slate-400 uppercase">SLA Uptime</div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-amber-300">
                  {slaPercentages[slaTier]}
                </div>
                <div className="text-[10px] text-slate-400">Multi-region failover</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Max Latency</div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-cyan-300">
                  {latencyGuarantee}
                </div>
                <div className="text-[10px] text-slate-400">Guaranteed edge ceiling</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Developer Royalty</div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">
                  {developerRoyalty}
                </div>
                <div className="text-[10px] text-slate-400">42% Protocol Pool Share</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Compute Credits</div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-purple-300">
                  {estimatedCredits.toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-400">Tokens allocated/mo</div>
              </div>

            </div>

          </div>

        </div>

        {/* SLA & Terms Points */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-white/15 hover:border-amber-500/50 transition-all space-y-4 shadow-xl group hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-300 group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-display text-white">99.99% Uptime SLA</h3>
            <p className="text-slate-300 text-sm leading-relaxed font-normal">
              Our distributed edge cluster guarantees 99.99% availability for spatial ad rendering and telemetry ingestion with automatic multi-region failover.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-white/15 hover:border-orange-500/50 transition-all space-y-4 shadow-xl group hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-300 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-display text-white">Zero Chargebacks</h3>
            <p className="text-slate-300 text-sm leading-relaxed font-normal">
              Conversion events are authenticated via cryptographic zero-knowledge gaze proofs, eliminating fraudulent volumetric ad click claims.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-white/15 hover:border-yellow-500/50 transition-all space-y-4 shadow-xl group hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center text-yellow-300 group-hover:scale-110 transition-transform">
              <Scale className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-display text-white">Royalty Transparency</h3>
            <p className="text-slate-300 text-sm leading-relaxed font-normal">
              Developers receive real-time tokenized compute disbursements direct to connected wallets on every verified intent conversion.
            </p>
          </div>
        </div>

        {/* Cross-Protocol Matrix Navigation Deck */}
        <SpatialModuleExplorer currentPath="/terms" />

      </main>

      <Footer />
    </div>
  );
}

import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import Footer from '../components/Footer';
import SpatialModuleExplorer from '../components/SpatialModuleExplorer';
import { 
  ShieldCheck, 
  Lock, 
  Terminal, 
  Cpu, 
  CheckCircle2, 
  AlertTriangle, 
  Key, 
  Zap, 
  Activity, 
  Globe, 
  Radio, 
  Play, 
  RefreshCw,
  Server,
  ArrowRight
} from 'lucide-react';
import { sound } from '../utils/sound';

export default function SecurityPage() {
  const [activeThreat, setActiveThreat] = useState(null);
  const [threatStatus, setThreatStatus] = useState('Standby • All 4D Nodes Secure');
  const [defenseLogs, setDefenseLogs] = useState([
    '[INIT] Quantum-resistant Kyber-1024 cryptographic shield active.',
    '[MONITOR] 4,892 spatial edge nodes operational across 14 cloud regions.',
    '[STATUS] Zero memory boundary violations recorded in current epoch.'
  ]);
  const [selectedNode, setSelectedNode] = useState('us-east');
  const [isPinging, setIsPinging] = useState(false);

  const NODES = {
    'us-east': { name: 'US-East (Virginia Enclave)', latency: '0.42ms', ciphers: 'Kyber-1024 / Dilithium-5', tenants: 1420, status: 'Optimal' },
    'eu-central': { name: 'EU-Central (Frankfurt Enclave)', latency: '0.61ms', ciphers: 'Kyber-1024 / AES-256-GCM', tenants: 980, status: 'Optimal' },
    'apac-tokyo': { name: 'APAC-Tokyo (Shinjuku Enclave)', latency: '0.54ms', ciphers: 'Dilithium-5 / Post-Quantum', tenants: 840, status: 'Optimal' },
  };

  const simulateThreat = (threatType) => {
    sound.playClick();
    setActiveThreat(threatType);
    setThreatStatus('Mitigating Attack Vector In Real-Time...');

    if (threatType === 'mitm') {
      sound.playLaunchChord();
      setDefenseLogs(prev => [
        `[ATTACK INCOMING] Man-In-The-Middle packet interception detected on stream port 8443.`,
        `[DEFENSE ENGAGED] Kyber-1024 ephemeral key encapsulation activated.`,
        `[ATTEMPT BLOCKED] Intercepted payload is zero-knowledge blinded. Attacker read 0 bytes.`,
        `[RESOLVED] Threat neutralized in 1.4ms. Client connection unperturbed.`
      ]);
    } else if (threatType === 'bleed') {
      sound.playQuantumBeep();
      setDefenseLogs(prev => [
        `[ATTACK INCOMING] Cross-tenant WebGL shader buffer bleed exploit triggered.`,
        `[HARDWARE ISOLATION] AMD/Nvidia GPU hardware enclave barrier clamped.`,
        `[TAMPER PROOF] Memory address space partitioned with cryptographic fence.`,
        `[RESOLVED] Rogue tenant sandboxed and banned from network.`
      ]);
    } else {
      sound.playQuantumBeep();
      setDefenseLogs(prev => [
        `[ATTACK INCOMING] Biometric gaze telemetry replay attempt detected.`,
        `[NONCE VALIDATION] Timestamp mismatch: ephemeral 300ms token expired.`,
        `[CRYPTOGRAPHIC REJECTION] Signature verification failed (Invalid zero-knowledge proof).`,
        `[RESOLVED] Threat rejected with zero data disclosure.`
      ]);
    }

    setTimeout(() => {
      setThreatStatus('Threat Mitigated • 100% Defense Integrity Intact');
    }, 1200);
  };

  const pingNode = () => {
    sound.playQuantumBeep();
    setIsPinging(true);
    setTimeout(() => setIsPinging(false), 800);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col selection:bg-cyan-500/30">
      <PageHeader section="Protocol" title="Spatial Security" />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        
        {/* ================= HERO SECTION with Glowing Ambient Backdrop ================= */}
        <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-slate-900/95 via-slate-900/80 to-purple-950/40 backdrop-blur-2xl p-6 sm:p-12 lg:p-16 shadow-2xl">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 max-w-4xl space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/40 text-purple-300 text-xs font-mono font-bold shadow-[0_0_15px_rgba(168,85,247,0.25)]">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
              <span>ENTERPRISE GRADE SPATIAL SECURITY • POST-QUANTUM DEFENSE</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white leading-tight break-words">
              Spatial Security & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-300">
                Quantum-Resistant Telemetry
              </span>
            </h1>

            <p className="text-slate-200 text-sm sm:text-lg leading-relaxed font-normal max-w-2xl">
              Securing next-generation spatial computing ecosystems. Multi-tenant GPU enclave isolation, post-quantum cryptography, and round-the-clock automated penetration monitoring.
            </p>

            {/* Live High-Tech HUD Metrics Ticker */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 pt-4">
              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Cryptographic Cipher</div>
                <div className="text-sm font-mono font-bold text-purple-300">Kyber-1024 PQC</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Enclave Latency</div>
                <div className="text-sm font-mono font-bold text-cyan-300">&lt; 0.42ms Overhead</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Tenant Isolation</div>
                <div className="text-sm font-mono font-bold text-emerald-300">Hardware Level</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                <div className="text-[10px] font-mono text-slate-400 uppercase">SOC-2 Type II</div>
                <div className="text-sm font-mono font-bold text-amber-300">Audited Active</div>
              </div>
            </div>

            {/* Quick Hero Actions */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => {
                  sound.playClick();
                  document.getElementById('security-sandbox')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-mono text-xs font-bold shadow-lg transition-all cursor-pointer flex items-center space-x-2 min-h-[44px] active:scale-95 touch-manipulation"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Simulate Threat Vectors</span>
              </button>
              
              <button
                onClick={pingNode}
                className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-slate-200 hover:text-white font-mono text-xs transition-all cursor-pointer flex items-center space-x-2 min-h-[44px] active:scale-95 touch-manipulation"
              >
                <Server className="w-3.5 h-3.5 text-cyan-400" />
                <span>Inspect Active Enclave Nodes</span>
              </button>
            </div>
          </div>
        </div>

        {/* ================= INTERACTIVE SECTION: Threat Defense Simulator ================= */}
        <div id="security-sandbox" className="rounded-3xl border border-purple-500/30 bg-gradient-to-b from-slate-900/90 to-[#080d1a] backdrop-blur-2xl p-5 sm:p-10 shadow-2xl space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <div className="inline-flex items-center space-x-2 text-xs font-mono text-purple-400 font-bold tracking-widest uppercase mb-1">
                <Zap className="w-3.5 h-3.5" />
                <span>Active Threat Mitigation Engine</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
                Live Quantum Threat Defense Sandbox
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Trigger simulated zero-day spatial attack vectors to witness real-time post-quantum defensive shielding.
              </p>
            </div>

            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono shrink-0">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
              <span>{threatStatus}</span>
            </div>
          </div>

          {/* Threat Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { id: 'mitm', title: 'Simulate Stream MitM Interception', desc: 'Attempt packet eavesdropping on 4D telemetry', color: 'rose' },
              { id: 'bleed', title: 'Simulate Cross-Tenant Shader Bleed', desc: 'Attempt rogue GPU buffer memory reading', color: 'amber' },
              { id: 'replay', title: 'Simulate Biometric Gaze Replay', desc: 'Attempt reusing expired intent token hash', color: 'indigo' },
            ].map(threat => (
              <button
                key={threat.id}
                onClick={() => simulateThreat(threat.id)}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer group hover:-translate-y-0.5 ${
                  activeThreat === threat.id
                    ? 'bg-purple-500/20 border-purple-400/60 shadow-[0_0_20px_rgba(168,85,247,0.3)]'
                    : 'bg-white/[0.03] border-white/10 hover:border-purple-500/40 hover:bg-white/[0.06]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-white group-hover:text-purple-300 transition-colors">
                    {threat.title}
                  </span>
                  <Play className="w-3.5 h-3.5 text-purple-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <p className="text-[11px] text-slate-400 mt-1 font-light">
                  {threat.desc}
                </p>
              </button>
            ))}
          </div>

          {/* Live Terminal Defense Console */}
          <div className="rounded-2xl border border-white/15 bg-black/80 p-5 font-mono text-xs shadow-inner space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="flex items-center space-x-2 text-slate-400">
                <Terminal className="w-4 h-4 text-purple-400" />
                <span className="text-[11px] font-bold text-slate-200">KYBER-1024 QUANTUM DEFENSE LOGS</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-bold">● ENCRYPTED FEED</span>
            </div>

            <div className="space-y-1.5 py-1 text-slate-300 text-[11px] sm:text-xs">
              {defenseLogs.map((log, idx) => (
                <div key={idx} className="flex items-start space-x-2">
                  <span className="text-purple-400 shrink-0">❯</span>
                  <span className={log.includes('ATTACK') ? 'text-rose-400 font-bold' : log.includes('RESOLVED') || log.includes('BLOCKED') ? 'text-emerald-300 font-bold' : 'text-slate-300'}>
                    {log}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Global GPU Enclave Nodes */}
          <div className="pt-4 border-t border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs font-mono text-slate-300 font-bold uppercase tracking-wider">
                <Server className="w-4 h-4 text-cyan-400" />
                <span>Multi-Tenant Enclave Node Inspector</span>
              </div>
              <button
                onClick={pingNode}
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-cyan-300 text-xs font-mono transition-all flex items-center space-x-1.5 cursor-pointer"
              >
                <Radio className={`w-3 h-3 ${isPinging ? 'animate-ping' : ''}`} />
                <span>{isPinging ? 'Pinging Node...' : 'Ping Active Enclave'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(NODES).map(([key, node]) => (
                <div
                  key={key}
                  onClick={() => { sound.playClick(); setSelectedNode(key); }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer hover:-translate-y-0.5 ${
                    selectedNode === key
                      ? 'bg-cyan-500/10 border-cyan-400/50 shadow-[0_0_15px_rgba(0,242,254,0.2)]'
                      : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-white">{node.name}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                      {node.status}
                    </span>
                  </div>
                  <div className="mt-2 space-y-1 text-[11px] font-mono text-slate-400">
                    <div>Latency: <strong className="text-cyan-300">{node.latency}</strong></div>
                    <div>Cipher: <strong className="text-slate-200">{node.ciphers}</strong></div>
                    <div>Active Isolated Tenants: <strong className="text-purple-300">{node.tenants}</strong></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Security Matrix Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-white/15 hover:border-purple-500/50 transition-all space-y-4 shadow-xl group hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-display text-white">SOC 2 Type II Certified</h3>
            <p className="text-slate-300 text-sm leading-relaxed font-normal">
              Independently audited by top-tier cybersecurity firms. Continuous compliance across availability, confidentiality, and processing integrity.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-white/15 hover:border-indigo-500/50 transition-all space-y-4 shadow-xl group hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300 group-hover:scale-110 transition-transform">
              <Key className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-display text-white">Post-Quantum Encryption</h3>
            <p className="text-slate-300 text-sm leading-relaxed font-normal">
              All volumetric data streams use Kyber and Dilithium quantum-resistant cryptographic algorithms to future-proof spatial communications.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-white/15 hover:border-cyan-500/50 transition-all space-y-4 shadow-xl group hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300 group-hover:scale-110 transition-transform">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-display text-white">Multi-Tenant GPU Enclaves</h3>
            <p className="text-slate-300 text-sm leading-relaxed font-normal">
              Complete hardware-level virtualization keeps client shaders and intent models isolated with zero cross-tenant memory bleed.
            </p>
          </div>
        </div>

        {/* Cross-Protocol Matrix Navigation Deck */}
        <SpatialModuleExplorer currentPath="/security" />

      </main>

      <Footer />
    </div>
  );
}

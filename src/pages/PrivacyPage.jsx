import React, { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import Footer from '../components/Footer';
import SpatialModuleExplorer from '../components/SpatialModuleExplorer';
import { 
  ShieldCheck, 
  Lock, 
  EyeOff, 
  Key, 
  CheckCircle2, 
  RefreshCw, 
  Zap, 
  Sliders, 
  Activity, 
  Cpu, 
  AlertCircle,
  Eye,
  Terminal,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { sound } from '../utils/sound';

export default function PrivacyPage() {
  const [privacyMode, setPrivacyMode] = useState('zk'); // 'zk' | 'raw'
  const [differentialNoise, setDifferentialNoise] = useState(85);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [tokenCountdown, setTokenCountdown] = useState(300);
  const [ephemeralToken, setEphemeralToken] = useState('0x7f9a...3b21');
  const [complianceChecks, setComplianceChecks] = useState({
    gdpr: true,
    visionos: true,
    ccpa: true,
    enclave: true
  });
  const [auditVerified, setAuditVerified] = useState(false);

  useEffect(() => {
    const chars = '0123456789abcdef';
    let hash = '0x';
    for (let i = 0; i < 16; i++) {
      hash += chars[Math.floor(Math.random() * chars.length)];
    }
    setEphemeralToken(hash);
  }, [mousePos, privacyMode]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTokenCountdown(prev => {
        if (prev <= 10) return 300;
        return prev - 20;
      });
    }, 20);
    return () => clearInterval(interval);
  }, []);

  const handleSimPointer = (clientX, clientY, currentTarget) => {
    const rect = currentTarget.getBoundingClientRect();
    const x = Math.round(((clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((clientY - rect.top) / rect.height) * 100);
    setMousePos({ x, y });
  };

  const handleSimMouseMove = (e) => {
    handleSimPointer(e.clientX, e.clientY, e.currentTarget);
  };

  const handleSimTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      handleSimPointer(e.touches[0].clientX, e.touches[0].clientY, e.currentTarget);
    }
  };

  const toggleCompliance = (key) => {
    sound.playClick();
    setComplianceChecks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const runPrivacyAudit = () => {
    sound.playQuantumBeep();
    setAuditVerified(true);
    setTimeout(() => setAuditVerified(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col selection:bg-cyan-500/30">
      <PageHeader section="Protocol" title="Privacy Protocol" />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        
        {/* ================= HERO SECTION with Glowing Ambient Backdrop ================= */}
        <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-slate-900/95 via-slate-900/80 to-emerald-950/40 backdrop-blur-2xl p-8 sm:p-12 lg:p-16 shadow-2xl">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/20 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="relative z-10 max-w-4xl space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold shadow-[0_0_15px_rgba(16,185,129,0.25)]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>ZERO-KNOWLEDGE SPATIAL GAZE PROTOCOL • v4.2 PROD</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black font-display tracking-tight text-white leading-tight">
              Cryptographic Privacy <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300">
                In Volumetric Computing
              </span>
            </h1>

            <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-normal max-w-2xl">
              Aetheris enforces the world's strictest spatial privacy architecture. Raw eye-tracking coordinates, biometric iris scans, and physical room geometries never leave the local device boundary.
            </p>

            {/* Live High-Tech HUD Metrics Ticker */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Hardware Enclave</div>
                <div className="text-sm font-mono font-bold text-emerald-300">100% Isolated</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Token Lifespan</div>
                <div className="text-sm font-mono font-bold text-cyan-300">300ms Ephemeral</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Biometric Storage</div>
                <div className="text-sm font-mono font-bold text-purple-300">0.00 Bytes Stored</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Statutory SLA</div>
                <div className="text-sm font-mono font-bold text-amber-300">GDPR Art. 9 Verified</div>
              </div>
            </div>

            {/* Quick Hero Actions */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => {
                  sound.playClick();
                  document.getElementById('privacy-sandbox')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-mono text-xs font-bold shadow-lg transition-all cursor-pointer flex items-center space-x-2"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Test Live Gaze Sandbox</span>
              </button>
              
              <button
                onClick={runPrivacyAudit}
                className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-slate-200 hover:text-white font-mono text-xs transition-all cursor-pointer flex items-center space-x-2"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Verify Cryptographic Proofs</span>
              </button>
            </div>
          </div>
        </div>

        {/* ================= INTERACTIVE SECTION: Zero-Knowledge Gaze Sandbox ================= */}
        <div id="privacy-sandbox" className="rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-slate-900/90 to-[#080d1a] backdrop-blur-2xl p-6 sm:p-10 shadow-2xl space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <div className="inline-flex items-center space-x-2 text-xs font-mono text-emerald-400 font-bold tracking-widest uppercase mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Interactive Verification Sandbox</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
                Live Spatial Gaze Cryptography Testbed
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Move your cursor across the spatial sensor grid to test instantaneous client-side token blinding.
              </p>
            </div>

            {/* Mode Toggle */}
            <div className="flex items-center space-x-2 p-1 bg-white/5 border border-white/10 rounded-xl shrink-0">
              <button
                onClick={() => { sound.playClick(); setPrivacyMode('raw'); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  privacyMode === 'raw' 
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Legacy Raw Gaze
              </button>
              <button
                onClick={() => { sound.playClick(); setPrivacyMode('zk'); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer flex items-center space-x-1.5 ${
                  privacyMode === 'zk' 
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)]' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Aetheris ZK-Blinded</span>
              </button>
            </div>
          </div>

          {/* Interactive Grid & Telemetry Display */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left: Interactive Sensor Canvas */}
            <div 
              onMouseMove={handleSimMouseMove}
              onTouchMove={handleSimTouchMove}
              onTouchStart={handleSimTouchMove}
              className="lg:col-span-7 relative h-72 sm:h-80 rounded-2xl border border-white/15 bg-slate-950 overflow-hidden cursor-crosshair group flex items-center justify-center select-none shadow-inner"
            >
              <div className="absolute inset-0 bg-grid-cyber opacity-30" />

              {/* Dynamic Target Coordinates */}
              <div 
                className={`absolute w-16 h-16 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-75 flex items-center justify-center ${
                  privacyMode === 'zk'
                    ? 'border-2 border-emerald-400/80 bg-emerald-500/10 shadow-[0_0_30px_rgba(16,185,129,0.5)]'
                    : 'border-2 border-rose-500/80 bg-rose-500/10 shadow-[0_0_30px_rgba(244,63,94,0.5)]'
                }`}
                style={{ left: `${mousePos.x}%`, top: `${mousePos.y}%` }}
              >
                <div className={`w-2 h-2 rounded-full ${privacyMode === 'zk' ? 'bg-emerald-400' : 'bg-rose-500'}`} />
                <div className={`absolute -top-6 text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/80 border ${privacyMode === 'zk' ? 'border-emerald-500/40 text-emerald-300' : 'border-rose-500/40 text-rose-300'}`}>
                  {privacyMode === 'zk' ? 'BLINDED-HASH' : `X:${mousePos.x} Y:${mousePos.y}`}
                </div>
              </div>

              {/* Center Overlay Text */}
              <div className="text-center pointer-events-none p-4 bg-black/40 backdrop-blur-xs rounded-xl border border-white/10">
                <span className="text-xs font-mono text-slate-300">
                  Hover & Move Cursor Inside Headset Field of View
                </span>
                <div className="text-[11px] font-mono text-slate-500 mt-1">
                  Simulating 120Hz Foveated Micro-Saccade Tracking
                </div>
              </div>

              {/* Status Badge */}
              <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-black/80 border border-white/10 text-[10px] font-mono text-slate-400 flex items-center space-x-1.5">
                <span className={`w-2 h-2 rounded-full animate-ping ${privacyMode === 'zk' ? 'bg-emerald-400' : 'bg-rose-500'}`} />
                <span>{privacyMode === 'zk' ? 'HARDWARE ENCLAVE SECURED' : 'UNENCRYPTED RAW STREAM'}</span>
              </div>
            </div>

            {/* Right: Live Cryptographic Telemetry Inspector */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4 rounded-2xl border border-white/10 bg-slate-900/80 p-5 font-mono text-xs">
              
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-slate-400 uppercase tracking-wider text-[11px]">Telemetry Status</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    privacyMode === 'zk' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  }`}>
                    {privacyMode === 'zk' ? 'ZERO-KNOWLEDGE' : 'CRITICAL PRIVACY RISK'}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Ephemeral Token Hash:</span>
                    <span className="text-cyan-300 font-bold truncate max-w-[170px]">{ephemeralToken}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Token Expiry Window:</span>
                    <span className="text-amber-300 font-bold">{tokenCountdown}ms</span>
                  </div>
                  
                  {/* Progress bar of 300ms expiry */}
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 transition-all duration-75"
                      style={{ width: `${(tokenCountdown / 300) * 100}%` }}
                    />
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <span className="text-slate-400">Differential Noise (ε):</span>
                    <span className="text-emerald-400 font-bold">{privacyMode === 'zk' ? `${differentialNoise}% Laplacian` : '0% (Raw)'}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Biometric Iris Identification:</span>
                    <span className={privacyMode === 'zk' ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                      {privacyMode === 'zk' ? '0.00% (Mathematically Impossible)' : '100% Identifiable'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Cloud Exfiltration Rate:</span>
                    <span className="text-emerald-400 font-bold">0.00 KB/s (Local Enclave Only)</span>
                  </div>
                </div>
              </div>

              {/* Slider for Differential Noise */}
              <div className="pt-3 border-t border-white/10 space-y-1.5">
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Adjust Privacy Noise Weight:</span>
                  <span className="text-white font-bold">{differentialNoise}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="99"
                  value={differentialNoise}
                  disabled={privacyMode === 'raw'}
                  onChange={(e) => {
                    sound.playClick();
                    setDifferentialNoise(Number(e.target.value));
                  }}
                  className="w-full accent-emerald-400 cursor-pointer disabled:opacity-30"
                />
              </div>

            </div>

          </div>

          {/* Interactive Compliance Matrix Checklist */}
          <div className="pt-4 border-t border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-mono text-slate-300 font-bold uppercase tracking-wider">
                Hardware & Statutory Compliance Verification
              </h3>
              <button
                onClick={runPrivacyAudit}
                className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-xs font-mono transition-all flex items-center space-x-1.5 cursor-pointer"
              >
                <RefreshCw className={`w-3 h-3 ${auditVerified ? 'animate-spin' : ''}`} />
                <span>{auditVerified ? 'Proof Verified' : 'Run Proof Audit'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { id: 'gdpr', label: 'GDPR Article 9 Compliant', desc: 'No special-category biometrics stored' },
                { id: 'visionos', label: 'Apple VisionOS Enclave', desc: 'Runs in isolated sandbox process' },
                { id: 'ccpa', label: 'CCPA Biometric Exemption', desc: 'Mathematical irreversible hash only' },
                { id: 'enclave', label: 'Zero-Knowledge Attestation', desc: 'Cryptographically signed on client' },
              ].map(item => (
                <div
                  key={item.id}
                  onClick={() => toggleCompliance(item.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    complianceChecks[item.id]
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-white'
                      : 'bg-white/[0.02] border-white/10 text-slate-400'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className={`w-4 h-4 ${complianceChecks[item.id] ? 'text-emerald-400' : 'text-slate-600'}`} />
                    <span className="text-xs font-bold font-mono">{item.label}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 pl-6">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-3xl bg-slate-900/90 border border-white/15 hover:border-emerald-500/50 transition-all space-y-4 shadow-xl group hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-300 group-hover:scale-110 transition-transform">
              <EyeOff className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-display text-white">Zero Raw Eye-Tracking Storage</h3>
            <p className="text-slate-300 text-sm leading-relaxed font-normal">
              Eye gaze coordinates are instantaneously converted to irreversible mathematical hashes on the client GPU. We do not store, log, or transmit raw pupil or corneal vectors.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/90 border border-white/15 hover:border-teal-500/50 transition-all space-y-4 shadow-xl group hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-300 group-hover:scale-110 transition-transform">
              <Key className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-display text-white">Ephemeral Intent Tokens</h3>
            <p className="text-slate-300 text-sm leading-relaxed font-normal">
              Intent predictions expire automatically within 300 milliseconds. No historical biometric fingerprinting is ever constructed or retained.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/90 border border-white/15 hover:border-cyan-500/50 transition-all space-y-4 shadow-xl group hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300 group-hover:scale-110 transition-transform">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-display text-white">GDPR & Apple VisionOS Ready</h3>
            <p className="text-slate-300 text-sm leading-relaxed font-normal">
              Exceeds all statutory privacy requirements of GDPR Art. 9, CCPA biometric mandates, and Apple VisionOS Spatial Computing Guidelines.
            </p>
          </div>
        </div>

        {/* Cross-Protocol Matrix Navigation Deck */}
        <SpatialModuleExplorer currentPath="/privacy" />

      </main>

      <Footer />
    </div>
  );
}

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  Cpu, 
  Layers, 
  Shield, 
  Globe, 
  Box, 
  Eye, 
  Terminal, 
  Activity, 
  Scale, 
  Compass 
} from 'lucide-react';
import { sound } from '../utils/sound';

const ALL_MODULES = [
  {
    path: '/architecture/neural-core',
    title: 'Neural Core Engine',
    category: 'Architecture',
    badge: '120Hz Raycast',
    color: 'purple',
    border: 'hover:border-purple-500/60 hover:shadow-[0_0_30px_rgba(168,85,247,0.25)]',
    badgeClass: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    icon: Cpu,
    desc: '4D gaze prediction & latent intent transformer network'
  },
  {
    path: '/platforms/visionos',
    title: 'Apple VisionOS SDK',
    category: 'Platforms',
    badge: 'Dual 4K Micro-OLED',
    color: 'cyan',
    border: 'hover:border-cyan-500/60 hover:shadow-[0_0_30px_rgba(6,182,212,0.25)]',
    badgeClass: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    icon: Layers,
    desc: 'Native RealityKit volumetric anchors & SwiftUI Metal shaders'
  },
  {
    path: '/platforms/horizon-os',
    title: 'Meta Horizon OS',
    category: 'Platforms',
    badge: 'OpenXR Hand Tracking',
    color: 'blue',
    border: 'hover:border-blue-500/60 hover:shadow-[0_0_30px_rgba(59,130,246,0.25)]',
    badgeClass: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    icon: Box,
    desc: 'Quest 3 RGB color passthrough & 26-joint skeletal raycasts'
  },
  {
    path: '/platforms/webgl',
    title: 'WebGL & Three.js',
    category: 'Platforms',
    badge: '60FPS Hardware GPU',
    color: 'cyan',
    border: 'hover:border-cyan-500/60 hover:shadow-[0_0_30px_rgba(0,242,254,0.25)]',
    badgeClass: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    icon: Sparkles,
    desc: 'Browser-native volumetric shader instancing without plugins'
  },
  {
    path: '/privacy',
    title: 'Zero-Knowledge Privacy',
    category: 'Protocol',
    badge: '300ms Ephemeral Hash',
    color: 'emerald',
    border: 'hover:border-emerald-500/60 hover:shadow-[0_0_30px_rgba(16,185,129,0.25)]',
    badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    icon: Shield,
    desc: 'Hardware enclave token blinding; zero raw biometric storage'
  },
  {
    path: '/security',
    title: 'Spatial Security',
    category: 'Protocol',
    badge: 'Kyber-1024 PQC',
    color: 'purple',
    border: 'hover:border-purple-500/60 hover:shadow-[0_0_30px_rgba(168,85,247,0.25)]',
    badgeClass: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    icon: Shield,
    desc: 'Post-quantum cryptographic telemetry & multi-tenant GPU enclaves'
  },
  {
    path: '/terms',
    title: 'Terms of Compute',
    category: 'Protocol',
    badge: '99.99% Uptime SLA',
    color: 'amber',
    border: 'hover:border-amber-500/60 hover:shadow-[0_0_30px_rgba(245,158,11,0.25)]',
    badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    icon: Scale,
    desc: 'Contractual compute allocations & automated breach refund guarantees'
  },
  {
    path: '/community/discord',
    title: 'Developer Guild Hub',
    category: 'Connect',
    badge: '$45,000 Grants Pool',
    color: 'purple',
    border: 'hover:border-purple-500/60 hover:shadow-[0_0_30px_rgba(168,85,247,0.25)]',
    badgeClass: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    icon: Terminal,
    desc: 'Interactive CLI terminal, bounty claiming, & volumetric discord'
  }
];

export default function SpatialModuleExplorer({ currentPath }) {
  const location = useLocation();
  const path = currentPath || location.pathname;

  // Filter out current active page so we show 3 sister modules
  const sisterModules = ALL_MODULES.filter(m => m.path !== path).slice(0, 3);

  return (
    <section className="relative rounded-3xl border border-white/15 bg-gradient-to-b from-slate-900/90 via-slate-950 to-black p-8 sm:p-12 overflow-hidden shadow-2xl space-y-8">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-cyan-400 font-bold uppercase tracking-widest mb-1">
            <Compass className="w-3.5 h-3.5" />
            <span>Cross-Protocol Matrix Navigation</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
            Continue Exploring Spatial Architecture
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            Seamlessly navigate across interconnected Aetheris runtimes, security enclaves, and platform SDKs.
          </p>
        </div>

        <Link
          to="/"
          onClick={() => sound.playClick()}
          onMouseEnter={() => sound.playHover()}
          className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 text-xs font-mono text-slate-300 hover:text-white transition-all flex items-center space-x-2 shrink-0 cursor-pointer"
        >
          <span>Main Engine</span>
          <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
        </Link>
      </div>

      {/* 3 Sister Module Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        {sisterModules.map(mod => {
          const ModIcon = mod.icon;
          return (
            <Link
              key={mod.path}
              to={mod.path}
              onClick={() => sound.playClick()}
              onMouseEnter={() => sound.playHover()}
              className={`p-6 rounded-3xl bg-slate-900/80 border border-white/10 transition-all duration-300 flex flex-col justify-between space-y-4 group cursor-pointer hover:-translate-y-1 ${mod.border}`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white group-hover:scale-110 group-hover:bg-cyan-500/20 group-hover:border-cyan-400/50 transition-all">
                    <ModIcon className="w-5 h-5 text-cyan-300" />
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${mod.badgeClass}`}>
                    {mod.badge}
                  </span>
                </div>

                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  {mod.category}
                </div>
                
                <h4 className="text-lg font-bold font-display text-white group-hover:text-cyan-300 transition-colors">
                  {mod.title}
                </h4>

                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  {mod.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-cyan-400 group-hover:text-cyan-300">
                <span>Launch Specification</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

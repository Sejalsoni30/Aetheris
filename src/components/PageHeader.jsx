import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ArrowLeft, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Orbit, 
  ChevronDown, 
  ChevronRight, 
  Cpu, 
  Layers, 
  Shield, 
  Globe, 
  Users, 
  Menu, 
  X, 
  Box, 
  Eye, 
  Bot, 
  TrendingUp, 
  Terminal, 
  Share2, 
  MessageSquare, 
  Compass, 
  Activity, 
  Scale
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { sound } from '../utils/sound';

const NAVIGATION_SECTIONS = [
  {
    id: 'architecture',
    name: 'Architecture',
    tag: '4D COMPUTE',
    icon: Cpu,
    color: 'purple',
    accentBorder: 'hover:border-purple-500/50 hover:bg-purple-500/5',
    badgeClass: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
    pages: [
      { name: 'Neural Core', path: '/architecture/neural-core', desc: 'Predictive 4D gaze intent engine', icon: Cpu },
      { name: 'Bento Showcase', path: '/architecture/features', desc: 'Spatial widgets & conversion mechanics', icon: Sparkles },
      { name: 'Live Telemetry', path: '/architecture/telemetry', desc: 'Edge node raycasting & latency metrics', icon: Activity },
      { name: 'Spatial Simulator', path: '/architecture/simulator', desc: 'Volumetric testbed & cohort predictor', icon: Orbit },
    ]
  },
  {
    id: 'platforms',
    name: 'Platforms',
    tag: 'CROSS-DEVICE',
    icon: Layers,
    color: 'cyan',
    accentBorder: 'hover:border-cyan-500/50 hover:bg-cyan-500/5',
    badgeClass: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
    pages: [
      { name: 'Apple VisionOS', path: '/platforms/visionos', desc: 'Micro-OLED foveated raycast SDK', icon: Layers },
      { name: 'Meta Horizon OS', path: '/platforms/horizon-os', desc: 'Passthrough headset attribution pipeline', icon: Box },
      { name: 'WebGL / Three.js', path: '/platforms/webgl', desc: 'High-speed browser shader acceleration', icon: Sparkles },
      { name: 'WebXR Standards', path: '/platforms/webxr', desc: 'Hardware-agnostic spatial web specs', icon: Globe },
    ]
  },
  {
    id: 'connect',
    name: 'Connect',
    tag: 'ECOSYSTEM',
    icon: Users,
    color: 'emerald',
    accentBorder: 'hover:border-emerald-500/50 hover:bg-emerald-500/5',
    badgeClass: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    pages: [
      { name: 'GitHub Protocol', path: '/community/github', desc: 'Open source SDKs, shaders & repo tools', icon: Terminal },
      { name: 'Spatial X Network', path: '/community/network', desc: 'Global community dispatch & broadcasts', icon: Share2 },
      { name: 'Developer Discord', path: '/community/discord', desc: 'Real-time engineer guild & support', icon: MessageSquare },
    ]
  },
  {
    id: 'protocol',
    name: 'Protocol',
    tag: 'GOVERNANCE',
    icon: Shield,
    color: 'amber',
    accentBorder: 'hover:border-amber-500/50 hover:bg-amber-500/5',
    badgeClass: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    pages: [
      { name: 'Privacy Protocol', path: '/privacy', desc: 'Zero-knowledge gaze & cryptographic privacy', icon: Shield },
      { name: 'Spatial Security', path: '/security', desc: 'Tensor tamper-proofing & edge encryption', icon: Shield },
      { name: 'Terms of Compute', path: '/terms', desc: '99.99% edge uptime SLA & token compute', icon: Scale },
    ]
  }
];

export default function PageHeader({ section = 'Architecture', title = 'Page' }) {
  const location = useLocation();
  const { 
    theme, 
    audioEnabled, 
    setAudioEnabled, 
    setIsSimulatorOpen, 
    setIsStudioOpen,
    setIsHeatmapOpen,
    setIsAgentSwarmOpen,
    setIsRoiModalOpen
  } = useTheme();

  const [scrolled, setScrolled] = useState(false);
  const [isDirectoryOpen, setIsDirectoryOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route navigation
  useEffect(() => {
    setIsDirectoryOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle ESC key to dismiss dropdowns
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsDirectoryOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleAudio = () => {
    const nextState = !audioEnabled;
    setAudioEnabled(nextState);
    sound.enabled = nextState;
    if (nextState) {
      sound.playQuantumBeep();
    }
  };

  // Determine section icon & badge styling based on active section prop
  const getSectionMetadata = () => {
    const s = section.toLowerCase();
    if (s.includes('arch')) {
      return {
        icon: Cpu,
        badge: 'bg-purple-500/15 text-purple-300 border-purple-500/30 shadow-[0_0_12px_rgba(168,85,247,0.2)]',
        accentText: 'text-purple-300'
      };
    }
    if (s.includes('plat')) {
      return {
        icon: Layers,
        badge: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30 shadow-[0_0_12px_rgba(6,182,212,0.2)]',
        accentText: 'text-cyan-300'
      };
    }
    if (s.includes('conn')) {
      return {
        icon: Users,
        badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.2)]',
        accentText: 'text-emerald-300'
      };
    }
    return {
      icon: Shield,
      badge: 'bg-amber-500/15 text-amber-300 border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.2)]',
      accentText: 'text-amber-300'
    };
  };

  const sectionMeta = getSectionMetadata();
  const SectionIcon = sectionMeta.icon;

  return (
    <header className={`sticky top-0 z-40 w-full transition-all duration-300 border-b border-white/[0.08] backdrop-blur-2xl ${
      scrolled 
        ? 'bg-[#030712]/95 py-2.5 shadow-[0_12px_40px_rgba(0,0,0,0.8)]' 
        : 'bg-[#030712]/90 py-3.5 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* ================= LEFT ZONE: Brand & Navigation Origin ================= */}
          <div className="flex items-center space-x-3 sm:space-x-4 shrink-0">
            
            {/* Brand Logo */}
            <Link
              to="/"
              onClick={() => sound.playClick()}
              onMouseEnter={() => sound.playHover()}
              className="flex items-center space-x-2.5 sm:space-x-3 group cursor-pointer shrink-0"
              title="Aetheris Spatial Engine - Home"
            >
              <div className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/15 backdrop-blur-md group-hover:border-cyan-400/50 transition-all duration-300 shadow-md">
                <div 
                  className="w-3.5 h-3.5 rounded-sm rotate-45 transition-transform duration-500 group-hover:rotate-90 group-hover:scale-110"
                  style={{ backgroundColor: theme.primary, boxShadow: `0 0 14px ${theme.glow}` }}
                />
                <div className="absolute inset-0 rounded-xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="flex flex-col">
                <div className="flex items-center space-x-1.5 sm:space-x-2">
                  <span className="font-display font-black tracking-wider text-base sm:text-lg text-white group-hover:text-cyan-300 transition-colors">
                    AETHERIS
                  </span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded border ${theme.badge}`}>
                    v4.2
                  </span>
                </div>
                <span className="hidden sm:block text-[9px] font-mono text-slate-400 tracking-widest uppercase">
                  Spatial Intent Engine
                </span>
              </div>
            </Link>

            {/* Vertical Divider */}
            <div className="h-5 w-px bg-white/10 hidden sm:block shrink-0" />

            {/* Return to Main Engine Button */}
            <Link
              to="/"
              onClick={() => sound.playClick()}
              onMouseEnter={() => sound.playHover()}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-mono text-slate-300 hover:text-white bg-white/[0.04] border border-white/10 hover:border-cyan-400/40 hover:bg-white/[0.08] transition-all group shrink-0 shadow-sm"
              title="Return to Main Engine Overview"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-cyan-400 group-hover:-translate-x-1 transition-transform" />
              <span className="hidden sm:inline">Main Engine</span>
            </Link>

            {/* Clean Breadcrumb Badge on large screens */}
            <div className="hidden xl:flex items-center space-x-2 text-xs font-mono shrink-0 pl-1">
              <span className="text-slate-600">/</span>
              <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full border text-[11px] font-semibold uppercase tracking-wider ${sectionMeta.badge}`}>
                <SectionIcon className="w-3 h-3" />
                <span>{section}</span>
              </span>
              <span className="text-slate-600">/</span>
              <span className="text-slate-200 font-medium text-xs truncate max-w-[150px]">
                {title}
              </span>
            </div>

          </div>

          {/* ================= CENTER ZONE: System Directory Quick Switcher ================= */}
          <div className="hidden md:flex items-center justify-center">
            <button
              onClick={() => {
                sound.playClick();
                setIsDirectoryOpen(!isDirectoryOpen);
              }}
              onMouseEnter={() => sound.playHover()}
              className={`whitespace-nowrap flex items-center space-x-2.5 px-4 py-2 rounded-full text-xs font-mono transition-all duration-300 border cursor-pointer select-none group ${
                isDirectoryOpen
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/60 shadow-[0_0_20px_rgba(0,242,254,0.35)] scale-105'
                  : 'bg-white/[0.04] text-slate-200 border-white/15 hover:text-white hover:border-cyan-400/40 hover:bg-white/[0.08] hover:shadow-[0_0_15px_rgba(0,242,254,0.15)]'
              }`}
              title="Open System Directory (12 Pages & Specifications)"
            >
              <div className={`p-1 rounded-full ${isDirectoryOpen ? 'bg-cyan-500/20' : 'bg-white/5 group-hover:bg-cyan-500/10'} transition-colors`}>
                <Compass className={`w-3.5 h-3.5 text-cyan-400 ${isDirectoryOpen ? 'rotate-90 text-cyan-300' : 'group-hover:rotate-45'} transition-transform duration-500`} />
              </div>
              
              <span className="font-semibold tracking-wider uppercase text-[11px]">
                System Directory
              </span>

              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border transition-colors ${
                isDirectoryOpen
                  ? 'bg-cyan-400/20 text-cyan-300 border-cyan-400/40 font-bold'
                  : 'bg-white/5 text-slate-400 border-white/10 group-hover:border-cyan-400/30 group-hover:text-cyan-300'
              }`}>
                12
              </span>

              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isDirectoryOpen ? 'rotate-180 text-cyan-300' : 'text-slate-400 group-hover:text-slate-200'}`} />
            </button>
          </div>

          {/* ================= RIGHT ZONE: Audio, Simulator & Mobile Toggle ================= */}
          <div className="flex items-center space-x-2.5 sm:space-x-3 shrink-0">

            {/* Live Telemetry Pill - only on 2xl screens so it never competes for space */}
            <div className="hidden 2xl:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-[11px] font-mono text-slate-400 shrink-0">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>60 FPS</span>
              <span className="text-white/20">|</span>
              <span className="text-cyan-400">0.8ms</span>
            </div>

            {/* Audio Toggle */}
            <button
              onClick={toggleAudio}
              className={`p-2 rounded-xl border transition-all duration-200 cursor-pointer shrink-0 ${
                audioEnabled 
                  ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300 shadow-[0_0_12px_rgba(0,242,254,0.3)]' 
                  : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.06]'
              }`}
              title={audioEnabled ? 'Mute Spatial Audio Synth' : 'Enable Spatial Audio Synth'}
            >
              {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Simulator Console CTA */}
            <button
              onClick={() => {
                sound.playLaunchChord();
                setIsSimulatorOpen(true);
              }}
              onMouseEnter={() => sound.playHover()}
              className="relative group overflow-hidden rounded-xl p-[1px] font-medium text-xs transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg cursor-pointer shrink-0 hidden sm:block"
            >
              <span 
                className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-violet-500 to-cyan-400 rounded-xl animate-shimmer"
                style={{ backgroundSize: '200% 100%' }}
              />
              <span className="relative block px-3.5 py-2 rounded-xl bg-slate-950/90 text-white font-semibold backdrop-blur-md transition-colors group-hover:bg-slate-950/70 flex items-center space-x-1.5">
                <Orbit className="w-3.5 h-3.5 text-cyan-300 animate-spin" style={{ animationDuration: '8s' }} />
                <span>Simulator Sandbox</span>
              </span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => {
                sound.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="p-2 rounded-xl bg-white/[0.05] border border-white/10 text-white md:hidden cursor-pointer hover:bg-white/10 transition-colors shrink-0"
              title="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* Cyber Laser Bottom Glow Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 via-purple-400/40 to-transparent pointer-events-none" />

      {/* ================= SYSTEM DIRECTORY MEGA DROPDOWN ================= */}
      {isDirectoryOpen && (
        <>
          {/* Backdrop overlay */}
          <div 
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs transition-opacity" 
            onClick={() => setIsDirectoryOpen(false)} 
          />

          <div className="absolute top-full left-0 right-0 mx-auto mt-3 max-w-7xl px-4 sm:px-6 lg:px-8 z-50 animate-in fade-in slide-in-from-top-3 duration-200">
            <div 
              ref={dropdownRef}
              className="rounded-3xl bg-[#090e1c]/95 border border-white/15 backdrop-blur-3xl shadow-[0_25px_70px_rgba(0,0,0,0.9)] p-6 sm:p-8 space-y-6"
            >
              {/* Directory Header */}
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold font-display text-white tracking-wide">
                      AETHERIS SYSTEM DIRECTORY & PROTOCOLS
                    </h3>
                    <p className="text-xs text-slate-400">
                      Instantly navigate between spatial architecture, platform runtimes, developer guilds, and governance.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsDirectoryOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* 4-Column Categorized Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {NAVIGATION_SECTIONS.map(sec => {
                  const SecIcon = sec.icon;
                  return (
                    <div key={sec.id} className="space-y-3">
                      {/* Section Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <SecIcon className="w-4 h-4 text-slate-300" />
                          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                            {sec.name}
                          </span>
                        </div>
                        <span className={`text-[9px] font-mono px-2 py-0.5 rounded border ${sec.badgeClass}`}>
                          {sec.tag}
                        </span>
                      </div>

                      {/* Section Links */}
                      <div className="space-y-1.5">
                        {sec.pages.map(page => {
                          const isActive = location.pathname === page.path;
                          const PageIcon = page.icon;

                          return (
                            <Link
                              key={page.path}
                              to={page.path}
                              onClick={() => {
                                sound.playClick();
                                setIsDirectoryOpen(false);
                              }}
                              onMouseEnter={() => sound.playHover()}
                              className={`block p-2.5 rounded-xl border transition-all duration-200 group ${
                                isActive 
                                  ? 'bg-white/10 border-cyan-400/50 shadow-[0_0_15px_rgba(0,242,254,0.2)]'
                                  : `bg-white/[0.02] border-white/[0.06] ${sec.accentBorder}`
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <PageIcon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-white'}`} />
                                  <span className={`text-xs font-medium ${isActive ? 'text-cyan-300 font-bold' : 'text-slate-200 group-hover:text-white'}`}>
                                    {page.name}
                                  </span>
                                </div>
                                {isActive && (
                                  <span className="flex items-center space-x-1 text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                                    <span className="w-1 h-1 rounded-full bg-cyan-400 animate-ping" />
                                    <span>ACTIVE</span>
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-400 line-clamp-1 mt-1 font-light group-hover:text-slate-300">
                                {page.desc}
                              </p>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Quick Tools Footer */}
              <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center space-x-2 text-slate-400 font-mono">
                  <span>Interactive Engine Modals:</span>
                  <button
                    onClick={() => { sound.playClick(); setIsDirectoryOpen(false); setIsStudioOpen(true); }}
                    className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-cyan-300 border border-white/10 transition-all cursor-pointer"
                  >
                    Campaign Studio
                  </button>
                  <button
                    onClick={() => { sound.playClick(); setIsDirectoryOpen(false); setIsHeatmapOpen(true); }}
                    className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-amber-300 border border-white/10 transition-all cursor-pointer"
                  >
                    Gaze Heatmap
                  </button>
                  <button
                    onClick={() => { sound.playClick(); setIsDirectoryOpen(false); setIsAgentSwarmOpen(true); }}
                    className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-purple-300 border border-white/10 transition-all cursor-pointer"
                  >
                    AI Agent Swarm
                  </button>
                  <button
                    onClick={() => { sound.playClick(); setIsDirectoryOpen(false); setIsRoiModalOpen(true); }}
                    className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-emerald-300 border border-white/10 transition-all cursor-pointer"
                  >
                    ROI Model
                  </button>
                </div>

                <Link
                  to="/"
                  onClick={() => {
                    sound.playClick();
                    setIsDirectoryOpen(false);
                  }}
                  className="flex items-center space-x-1.5 text-slate-300 hover:text-cyan-300 font-mono transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Return to Main Landing Engine</span>
                </Link>
              </div>

            </div>
          </div>
        </>
      )}

      {/* ================= MOBILE SLIDE-DOWN DRAWER ================= */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-3 pb-6 border-t border-white/10 bg-slate-950/98 backdrop-blur-2xl shadow-2xl space-y-4 animate-in slide-in-from-top-2 duration-200">
          
          {/* Breadcrumb Info on Mobile */}
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">Current Module:</span>
            <span className="text-cyan-300 font-bold uppercase">{section} / {title}</span>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-2">
            <Link
              to="/"
              onClick={() => {
                sound.playClick();
                setMobileMenuOpen(false);
              }}
              className="py-2.5 px-3 rounded-xl bg-white/5 border border-white/10 text-center text-xs font-mono text-slate-200 hover:bg-white/10 flex items-center justify-center space-x-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-cyan-400" />
              <span>Main Engine</span>
            </Link>

            <button
              onClick={() => {
                sound.playLaunchChord();
                setMobileMenuOpen(false);
                setIsSimulatorOpen(true);
              }}
              className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-center text-xs shadow-md flex items-center justify-center space-x-1.5"
            >
              <Orbit className="w-3.5 h-3.5 animate-spin" />
              <span>Simulator</span>
            </button>
          </div>

          {/* Tool Triggers on Mobile */}
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <button
              onClick={() => { sound.playClick(); setMobileMenuOpen(false); setIsStudioOpen(true); }}
              className="p-2 rounded-lg bg-white/[0.03] border border-white/10 text-left flex items-center space-x-2 text-slate-300"
            >
              <Box className="w-3.5 h-3.5 text-cyan-400" />
              <span>Spatial Studio</span>
            </button>

            <button
              onClick={() => { sound.playClick(); setMobileMenuOpen(false); setIsHeatmapOpen(true); }}
              className="p-2 rounded-lg bg-white/[0.03] border border-white/10 text-left flex items-center space-x-2 text-slate-300"
            >
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              <span>Gaze Heatmap</span>
            </button>

            <button
              onClick={() => { sound.playClick(); setMobileMenuOpen(false); setIsAgentSwarmOpen(true); }}
              className="p-2 rounded-lg bg-white/[0.03] border border-white/10 text-left flex items-center space-x-2 text-slate-300"
            >
              <Bot className="w-3.5 h-3.5 text-purple-400" />
              <span>Agent Swarm</span>
            </button>

            <button
              onClick={() => { sound.playClick(); setMobileMenuOpen(false); setIsRoiModalOpen(true); }}
              className="p-2 rounded-lg bg-white/[0.03] border border-white/10 text-left flex items-center space-x-2 text-slate-300"
            >
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span>ROI Model</span>
            </button>
          </div>

          {/* Directory Sections on Mobile */}
          <div className="space-y-3 pt-2 border-t border-white/10 max-h-[50vh] overflow-y-auto pr-1">
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-widest">
              Directory Navigation
            </div>
            
            {NAVIGATION_SECTIONS.map(sec => (
              <div key={sec.id} className="space-y-1.5">
                <div className="text-xs font-mono font-bold text-slate-300 px-1 flex items-center space-x-1.5">
                  <sec.icon className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{sec.name}</span>
                </div>
                <div className="grid grid-cols-1 gap-1">
                  {sec.pages.map(page => {
                    const isActive = location.pathname === page.path;
                    return (
                      <Link
                        key={page.path}
                        to={page.path}
                        onClick={() => {
                          sound.playClick();
                          setMobileMenuOpen(false);
                        }}
                        className={`px-3 py-2 rounded-lg text-xs font-mono flex items-center justify-between ${
                          isActive 
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold' 
                            : 'bg-white/[0.02] text-slate-300 hover:bg-white/5 border border-white/5'
                        }`}
                      >
                        <span className="flex items-center space-x-2">
                          <page.icon className="w-3.5 h-3.5" />
                          <span>{page.name}</span>
                        </span>
                        {isActive && <span className="text-[10px] text-cyan-400 font-bold">● HERE</span>}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

    </header>
  );
}

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Layers, 
  Activity, 
  Cpu, 
  Menu, 
  X, 
  Box, 
  Eye, 
  Bot, 
  TrendingUp, 
  ArrowUpRight 
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { sound } from '../utils/sound';

export default function Navbar() {
  const { 
    theme, 
    audioEnabled, 
    setAudioEnabled, 
    setIsSimulatorOpen, 
    setIsSandboxOpen,
    setIsStudioOpen,
    setIsHeatmapOpen,
    setIsAgentSwarmOpen,
    setIsRoiModalOpen,
    customCampaigns 
  } = useTheme();

  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleAudio = () => {
    const nextState = !audioEnabled;
    setAudioEnabled(nextState);
    sound.enabled = nextState;
    if (nextState) {
      sound.playQuantumBeep();
    }
  };

  const handleNavClick = (anchor) => {
    sound.playClick();
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/' + anchor);
    } else {
      const el = document.querySelector(anchor);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const openLaunchModal = () => {
    sound.playLaunchChord();
    setIsSimulatorOpen(true);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'py-2.5 bg-[#030712]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl' 
        : 'py-4 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link 
            to="/" 
            onClick={() => {
              sound.playClick();
              if (location.pathname === '/') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            onMouseEnter={() => sound.playHover()}
            className="flex items-center space-x-3 group cursor-pointer"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/15 backdrop-blur-md group-hover:border-cyan-400/50 transition-all duration-300">
              <div 
                className="w-4 h-4 rounded-sm rotate-45 transition-transform duration-500 group-hover:rotate-90 group-hover:scale-110"
                style={{ backgroundColor: theme.primary, boxShadow: `0 0 15px ${theme.glow}` }}
              />
              <div className="absolute inset-0 rounded-xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <span className="font-display font-black tracking-wider text-lg text-white group-hover:text-cyan-300 transition-colors">
                  AETHERIS
                </span>
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${theme.badge}`}>
                  v4.2
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 tracking-widest uppercase">
                Spatial Intent Engine
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links & Exploration Hub */}
          <nav className="hidden lg:flex items-center space-x-1 bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl rounded-full px-3 py-1 shadow-inner">
            <button
              onClick={() => { sound.playClick(); setIsStudioOpen(true); }}
              onMouseEnter={() => sound.playHover()}
              className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white rounded-full hover:bg-white/[0.06] transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <Box className="w-3.5 h-3.5 text-cyan-400" />
              <span>Studio</span>
              {customCampaigns.length > 0 && (
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                  {customCampaigns.length}
                </span>
              )}
            </button>

            <button
              onClick={() => { sound.playClick(); setIsHeatmapOpen(true); }}
              onMouseEnter={() => sound.playHover()}
              className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white rounded-full hover:bg-white/[0.06] transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              <span>Heatmap</span>
            </button>

            <button
              onClick={() => { sound.playClick(); setIsAgentSwarmOpen(true); }}
              onMouseEnter={() => sound.playHover()}
              className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white rounded-full hover:bg-white/[0.06] transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <Bot className="w-3.5 h-3.5 text-purple-400" />
              <span>Swarm</span>
            </button>

            <button
              onClick={() => { sound.playClick(); setIsRoiModalOpen(true); }}
              onMouseEnter={() => sound.playHover()}
              className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white rounded-full hover:bg-white/[0.06] transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span>ROI Model</span>
            </button>

            <button
              onClick={() => handleNavClick('#telemetry')}
              onMouseEnter={() => sound.playHover()}
              className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white rounded-full hover:bg-white/[0.06] transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <Activity className="w-3.5 h-3.5 text-blue-400" />
              <span>Telemetry</span>
            </button>
          </nav>

          {/* Right Action Hub */}
          <div className="hidden sm:flex items-center space-x-3">
            
            {/* FPS Pill */}
            <div className="hidden xl:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-[11px] font-mono text-slate-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>60 FPS</span>
              <span className="text-white/20">|</span>
              <span className="text-cyan-400">0.8ms Raycast</span>
            </div>

            {/* Social Links (LinkedIn, GitHub, X) */}
            <div className="hidden md:flex items-center space-x-1 bg-white/[0.03] border border-white/[0.08] rounded-xl p-1">
              <a
                href="https://www.linkedin.com/in/sejal-soni-361897303/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                onMouseEnter={() => sound.playHover()}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Connect with Sejal Soni on LinkedIn"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a
                href="https://github.com/Sejalsoni30"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                onMouseEnter={() => sound.playHover()}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                title="View Sejal Soni on GitHub"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://x.com/Sejalsoni02"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                onMouseEnter={() => sound.playHover()}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Follow Sejal Soni on X"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>

            {/* Audio Toggle */}
            <button
              onClick={toggleAudio}
              className={`p-2 rounded-xl border transition-all duration-200 cursor-pointer ${
                audioEnabled 
                  ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300 shadow-[0_0_12px_rgba(0,242,254,0.3)]' 
                  : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white'
              }`}
              title={audioEnabled ? 'Mute spatial audio synth' : 'Enable spatial audio synth'}
            >
              {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Launch Experience Button */}
            <button
              onClick={openLaunchModal}
              onMouseEnter={() => sound.playHover()}
              className="relative group overflow-hidden rounded-xl p-[1px] font-medium text-xs transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg cursor-pointer"
            >
              <span 
                className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-violet-500 to-cyan-400 rounded-xl animate-shimmer"
                style={{ backgroundSize: '200% 100%' }}
              />
              <span className="relative block px-4 py-2 rounded-xl bg-slate-950/90 text-white font-semibold backdrop-blur-md transition-colors group-hover:bg-slate-950/70 flex items-center space-x-1.5">
                <span>Launch Console</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-cyan-300" />
              </span>
            </button>
          </div>

          {/* Mobile Menu Button with 44px min touch target */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={toggleAudio}
              aria-label={audioEnabled ? 'Mute spatial audio synth' : 'Enable spatial audio synth'}
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-slate-300 flex items-center justify-center active:scale-95 transition-all"
            >
              {audioEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={() => { sound.playClick(); setMobileMenuOpen(!mobileMenuOpen); }}
              aria-label="Toggle navigation menu"
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-white flex items-center justify-center active:scale-95 transition-all"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu with Complete Engine Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 p-4 sm:p-5 rounded-2xl bg-slate-950/98 border border-white/15 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] space-y-4 max-h-[85vh] overflow-y-auto touch-momentum animate-in fade-in slide-in-from-top-2 duration-200">
            
            {/* Quick Engine Modals Suite */}
            <div className="space-y-1">
              <div className="text-[10px] font-mono uppercase text-slate-400 tracking-wider px-1 mb-1 font-semibold">
                Autonomous Engine Modals
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => { sound.playClick(); setIsStudioOpen(true); setMobileMenuOpen(false); }}
                  className="p-2.5 text-left text-xs text-slate-200 bg-white/[0.03] hover:bg-white/10 border border-white/5 rounded-xl flex items-center space-x-2"
                >
                  <Box className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="font-medium truncate">Campaign Studio</span>
                </button>

                <button
                  onClick={() => { sound.playClick(); setIsHeatmapOpen(true); setMobileMenuOpen(false); }}
                  className="p-2.5 text-left text-xs text-slate-200 bg-white/[0.03] hover:bg-white/10 border border-white/5 rounded-xl flex items-center space-x-2"
                >
                  <Eye className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="font-medium truncate">Gaze Heatmap</span>
                </button>

                <button
                  onClick={() => { sound.playClick(); setIsAgentSwarmOpen(true); setMobileMenuOpen(false); }}
                  className="p-2.5 text-left text-xs text-slate-200 bg-white/[0.03] hover:bg-white/10 border border-white/5 rounded-xl flex items-center space-x-2"
                >
                  <Bot className="w-4 h-4 text-purple-400 shrink-0" />
                  <span className="font-medium truncate">AI Swarm Deck</span>
                </button>

                <button
                  onClick={() => { sound.playClick(); setIsRoiModalOpen(true); setMobileMenuOpen(false); }}
                  className="p-2.5 text-left text-xs text-slate-200 bg-white/[0.03] hover:bg-white/10 border border-white/5 rounded-xl flex items-center space-x-2"
                >
                  <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-medium truncate">ROI Predictor</span>
                </button>
              </div>

              <button
                onClick={() => { sound.playClick(); setIsSandboxOpen(true); setMobileMenuOpen(false); }}
                className="w-full mt-2 text-left p-2.5 text-xs text-amber-300 bg-amber-500/10 hover:bg-amber-500/15 border border-amber-500/20 rounded-xl flex items-center justify-between"
              >
                <span className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span className="font-semibold">3D WebGL Shader Sandbox</span>
                </span>
                <span className="text-[10px] font-mono text-amber-300 uppercase">Live GPU</span>
              </button>
            </div>

            {/* Direct Architecture & Platform Links */}
            <div className="pt-2 border-t border-white/10 space-y-2">
              <div className="text-[10px] font-mono uppercase text-slate-400 tracking-wider px-1 font-semibold">
                Architecture & Platforms
              </div>
              <div className="grid grid-cols-2 gap-1.5 text-xs font-mono">
                <Link
                  to="/architecture/neural-core"
                  onClick={() => { sound.playClick(); setMobileMenuOpen(false); }}
                  className="p-2 rounded-lg bg-white/[0.02] text-slate-300 hover:text-cyan-300 hover:bg-white/5 flex items-center space-x-1.5"
                >
                  <span className="text-cyan-400">●</span>
                  <span className="truncate">Neural Core</span>
                </Link>
                <Link
                  to="/architecture/features"
                  onClick={() => { sound.playClick(); setMobileMenuOpen(false); }}
                  className="p-2 rounded-lg bg-white/[0.02] text-slate-300 hover:text-cyan-300 hover:bg-white/5 flex items-center space-x-1.5"
                >
                  <span className="text-purple-400">●</span>
                  <span className="truncate">Bento Showcase</span>
                </Link>
                <Link
                  to="/platforms/visionos"
                  onClick={() => { sound.playClick(); setMobileMenuOpen(false); }}
                  className="p-2 rounded-lg bg-white/[0.02] text-slate-300 hover:text-cyan-300 hover:bg-white/5 flex items-center space-x-1.5"
                >
                  <span className="text-cyan-400">●</span>
                  <span className="truncate">Apple VisionOS</span>
                </Link>
                <Link
                  to="/platforms/horizon-os"
                  onClick={() => { sound.playClick(); setMobileMenuOpen(false); }}
                  className="p-2 rounded-lg bg-white/[0.02] text-slate-300 hover:text-cyan-300 hover:bg-white/5 flex items-center space-x-1.5"
                >
                  <span className="text-blue-400">●</span>
                  <span className="truncate">Meta Horizon</span>
                </Link>
                <Link
                  to="/platforms/webgl"
                  onClick={() => { sound.playClick(); setMobileMenuOpen(false); }}
                  className="p-2 rounded-lg bg-white/[0.02] text-slate-300 hover:text-cyan-300 hover:bg-white/5 flex items-center space-x-1.5"
                >
                  <span className="text-teal-400">●</span>
                  <span className="truncate">WebGL / Three.js</span>
                </Link>
                <Link
                  to="/platforms/webxr"
                  onClick={() => { sound.playClick(); setMobileMenuOpen(false); }}
                  className="p-2 rounded-lg bg-white/[0.02] text-slate-300 hover:text-cyan-300 hover:bg-white/5 flex items-center space-x-1.5"
                >
                  <span className="text-emerald-400">●</span>
                  <span className="truncate">WebXR Standards</span>
                </Link>
              </div>
            </div>

            {/* Social Links Bar */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-around text-xs font-mono text-slate-300">
              <a 
                href="https://www.linkedin.com/in/sejal-soni-361897303/" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="py-1 px-2 rounded-lg hover:text-cyan-300 transition-colors flex items-center space-x-1"
              >
                <span>LinkedIn</span>
              </a>
              <span className="text-slate-600">•</span>
              <a 
                href="https://github.com/Sejalsoni30" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="py-1 px-2 rounded-lg hover:text-cyan-300 transition-colors flex items-center space-x-1"
              >
                <span>GitHub</span>
              </a>
              <span className="text-slate-600">•</span>
              <a 
                href="https://x.com/Sejalsoni02" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="py-1 px-2 rounded-lg hover:text-cyan-300 transition-colors flex items-center space-x-1"
              >
                <span>X (Twitter)</span>
              </a>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={() => { setMobileMenuOpen(false); openLaunchModal(); }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-center text-sm shadow-lg flex items-center justify-center space-x-2 active:scale-98 transition-transform cursor-pointer"
            >
              <span>Launch Console</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </header>
  );
}

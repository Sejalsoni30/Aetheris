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

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={toggleAudio}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300"
            >
              {audioEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 p-4 rounded-2xl bg-slate-950/95 border border-white/10 backdrop-blur-2xl shadow-2xl space-y-2">
            <button
              onClick={() => { sound.playClick(); setIsStudioOpen(true); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 text-sm text-slate-200 hover:bg-white/5 rounded-lg flex items-center justify-between"
            >
              <span className="flex items-center space-x-2">
                <Box className="w-4 h-4 text-cyan-400" />
                <span>Spatial Campaign Studio</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300">
                {customCampaigns.length} Active
              </span>
            </button>

            <button
              onClick={() => { sound.playClick(); setIsHeatmapOpen(true); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 text-sm text-slate-200 hover:bg-white/5 rounded-lg flex items-center space-x-2"
            >
              <Eye className="w-4 h-4 text-amber-400" />
              <span>Gaze Intent Heatmap</span>
            </button>

            <button
              onClick={() => { sound.playClick(); setIsAgentSwarmOpen(true); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 text-sm text-slate-200 hover:bg-white/5 rounded-lg flex items-center space-x-2"
            >
              <Bot className="w-4 h-4 text-purple-400" />
              <span>AI Agent Swarm Deck</span>
            </button>

            <button
              onClick={() => { sound.playClick(); setIsRoiModalOpen(true); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 text-sm text-slate-200 hover:bg-white/5 rounded-lg flex items-center space-x-2"
            >
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>Spatial ROI Predictor</span>
            </button>

            <button
              onClick={() => { sound.playClick(); setIsSandboxOpen(true); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 text-sm text-amber-300 hover:bg-amber-500/10 rounded-lg flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>3D WebGL Shader Sandbox</span>
            </button>

            <button
              onClick={() => { setMobileMenuOpen(false); openLaunchModal(); }}
              className="w-full py-2.5 mt-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-center text-sm shadow-lg flex items-center justify-center space-x-2"
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

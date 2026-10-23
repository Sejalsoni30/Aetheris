import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Volume2, VolumeX, Sparkles, Orbit, Home, ExternalLink } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { sound } from '../utils/sound';

export default function PageHeader({ section = 'Architecture', title = 'Page' }) {
  const { theme, audioEnabled, setAudioEnabled, setIsSimulatorOpen, setIsStudioOpen } = useTheme();

  const toggleAudio = () => {
    const nextState = !audioEnabled;
    setAudioEnabled(nextState);
    sound.enabled = nextState;
    if (nextState) {
      sound.playQuantumBeep();
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#030712]/85 border-b border-white/[0.08] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Left: Brand + Breadcrumb + Back */}
        <div className="flex items-center space-x-3 sm:space-x-6">
          <Link
            to="/"
            onClick={() => sound.playClick()}
            onMouseEnter={() => sound.playHover()}
            className="flex items-center space-x-2 text-xs font-mono text-slate-400 hover:text-cyan-300 transition-colors px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-500/40"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Main Engine</span>
          </Link>

          <div className="h-5 w-px bg-white/10 hidden sm:block" />

          <Link
            to="/"
            onClick={() => sound.playClick()}
            className="flex items-center space-x-2.5 group"
          >
            <div 
              className="w-7 h-7 rounded-lg flex items-center justify-center border border-white/20 transition-transform group-hover:rotate-45"
              style={{ backgroundColor: `${theme.primary}20` }}
            >
              <div 
                className="w-2.5 h-2.5 rounded-xs rotate-45"
                style={{ backgroundColor: theme.primary }}
              />
            </div>
            <span className="font-display font-black text-base tracking-wider text-white group-hover:text-cyan-300 transition-colors">
              AETHERIS
            </span>
          </Link>

          {/* Breadcrumb Pill */}
          <div className="hidden md:flex items-center space-x-2 text-xs font-mono text-slate-400">
            <span className="text-slate-600">/</span>
            <span className="uppercase text-slate-400 tracking-wider">{section}</span>
            <span className="text-slate-600">/</span>
            <span className="text-cyan-300 font-semibold uppercase">{title}</span>
          </div>
        </div>

        {/* Right: Audio Toggle & Simulator Triggers */}
        <div className="flex items-center space-x-3">
          {/* Audio Toggle */}
          <button
            onClick={toggleAudio}
            className={`p-2 rounded-xl border transition-all duration-200 cursor-pointer ${
              audioEnabled 
                ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.3)]' 
                : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
            }`}
            title={audioEnabled ? 'Mute Spatial Audio' : 'Enable Spatial Audio'}
          >
            {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Launch Simulator Quick Action */}
          <button
            onClick={() => {
              sound.playLaunchChord();
              setIsSimulatorOpen(true);
            }}
            onMouseEnter={() => sound.playHover()}
            className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] cursor-pointer"
          >
            <Orbit className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} />
            <span>Simulator Sandbox</span>
          </button>
        </div>

      </div>
    </header>
  );
}

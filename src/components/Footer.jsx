import React from 'react';
import { ArrowUp, Terminal, Shield, Sparkles, Cpu, Globe, Share2, MessageSquare } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { sound } from '../utils/sound';

export default function Footer() {
  const { theme, setIsSimulatorOpen } = useTheme();

  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-white/[0.08] bg-[#030712]/90 backdrop-blur-2xl pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Col 1: Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/20"
                style={{ backgroundColor: `${theme.primary}20` }}
              >
                <div 
                  className="w-3.5 h-3.5 rounded-sm rotate-45"
                  style={{ backgroundColor: theme.primary }}
                />
              </div>
              <span className="font-display font-black text-xl text-white tracking-wider">
                AETHERIS
              </span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${theme.badge}`}>
                v4.2 PROD
              </span>
            </div>

            <p className="text-slate-400 text-sm font-light max-w-sm leading-relaxed">
              The world's first autonomous Spatial Growth & Intent Engine. Bridging the gap between 4D volumetric computing and zero-latency conversion trajectories.
            </p>

            {/* Operational Status Pill */}
            <div className="inline-flex items-center space-x-2.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>All Spatial Systems Operational 60FPS</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-xs font-mono text-slate-300 uppercase tracking-widest font-semibold">
              Architecture
            </div>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a href="#neural-core" className="hover:text-cyan-300 transition-colors">
                  Neural Core
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-cyan-300 transition-colors">
                  Bento Showcase
                </a>
              </li>
              <li>
                <a href="#telemetry" className="hover:text-cyan-300 transition-colors">
                  Live Telemetry
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); sound.playClick(); setIsSimulatorOpen(true); }}
                  className="hover:text-cyan-300 transition-colors"
                >
                  Spatial Simulator
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Integrations */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-xs font-mono text-slate-300 uppercase tracking-widest font-semibold">
              Platforms
            </div>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="hover:text-white transition-colors">Apple VisionOS</li>
              <li className="hover:text-white transition-colors">Meta Horizon OS</li>
              <li className="hover:text-white transition-colors">WebGL / Three.js</li>
              <li className="hover:text-white transition-colors">WebXR Standards</li>
            </ul>
          </div>

          {/* Col 4: Community & Scroll to top */}
          <div className="md:col-span-3 space-y-4">
            <div className="text-xs font-mono text-slate-300 uppercase tracking-widest font-semibold">
              Connect & Protocol
            </div>
            <div className="flex items-center space-x-3">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-cyan-400/50 transition-all"
                title="GitHub"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-cyan-400/50 transition-all"
                title="X / Twitter"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a 
                href="https://discord.com" 
                target="_blank" 
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-cyan-400/50 transition-all"
                title="Discord"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </a>
            </div>

            <div className="pt-2">
              <button
                onClick={scrollToTop}
                onMouseEnter={() => sound.playHover()}
                className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-400 hover:text-white flex items-center space-x-2 transition-all cursor-pointer"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Return to Orbit</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} AETHERIS LABS INC. QUANTUM ATTRIBUTION PROTOCOL.
          </div>
          <div className="flex items-center space-x-4">
            <span className="hover:text-slate-400 transition-colors cursor-pointer">PRIVACY PROTOCOL</span>
            <span>•</span>
            <span className="hover:text-slate-400 transition-colors cursor-pointer">SPATIAL SECURITY</span>
            <span>•</span>
            <span className="hover:text-slate-400 transition-colors cursor-pointer">TERMS OF COMPUTE</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

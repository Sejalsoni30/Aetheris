import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight, Sparkles, Play, ShieldCheck, Zap, Compass, Orbit, ChevronDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { sound } from '../utils/sound';

export default function HeroSection() {
  const { theme, setIsSimulatorOpen, setIsSandboxOpen } = useTheme();
  const heroRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const metricsBarRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: -20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, delay: 0.2 }
      )
      .fromTo(
        titleRef.current.children,
        { opacity: 0, y: 40, skewY: 2 },
        { opacity: 1, y: 0, skewY: 0, duration: 1, stagger: 0.15 },
        '-=0.4'
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.6'
      )
      .fromTo(
        ctaRef.current.children,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.1 },
        '-=0.5'
      )
      .fromTo(
        metricsBarRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9 },
        '-=0.4'
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleLaunch = () => {
    sound.playLaunchChord();
    setIsSimulatorOpen(true);
  };

  const handleScrollToNext = () => {
    sound.playClick();
    const el = document.getElementById('neural-core');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center items-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden z-10"
    >
      {/* Subtle Background Glow behind text */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] rounded-full blur-[140px] pointer-events-none opacity-25"
        style={{ background: theme.primary }}
      />

      <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
        
        {/* Top Innovation Pill */}
        <div 
          ref={badgeRef}
          className="inline-flex items-center space-x-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full glass-pill mb-6 sm:mb-8 shadow-glass group cursor-default transition-all duration-300 hover:border-white/30 max-w-full"
        >
          <div className="flex h-2 w-2 rounded-full relative shrink-0">
            <span 
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ backgroundColor: theme.primary }}
            />
            <span 
              className="relative inline-flex rounded-full h-2 w-2"
              style={{ backgroundColor: theme.primary }}
            />
          </div>
          <span className="text-[11px] sm:text-xs font-mono font-medium text-slate-300 tracking-wide uppercase truncate">
            <span className="hidden sm:inline">AETHERIS NEXUS 4.2 • SPATIAL GROWTH & INTENT ENGINE</span>
            <span className="sm:hidden">AETHERIS 4.2 • SPATIAL INTENT</span>
          </span>
          <span className="text-slate-500">|</span>
          <span 
            className="text-[11px] sm:text-xs font-semibold flex items-center space-x-1 shrink-0"
            style={{ color: theme.primary }}
          >
            <span>LIVE 60FPS</span>
            <Sparkles className="w-3 h-3 animate-spin" style={{ animationDuration: '6s' }} />
          </span>
        </div>

        {/* Master Staggered Headline */}
        <h1 
          ref={titleRef}
          className="font-display font-extrabold text-3xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[1.1] text-white max-w-5xl px-2 break-words"
        >
          <span className="block drop-shadow-sm">Shape the Future of</span>
          <span 
            className="block bg-gradient-to-r text-transparent bg-clip-text text-glow pb-2"
            style={{
              backgroundImage: `linear-gradient(135deg, #ffffff 10%, ${theme.primary} 60%, ${theme.secondary} 100%)`
            }}
          >
            Spatial Marketing.
          </span>
        </h1>

        {/* Subtitle */}
        <p 
          ref={subtitleRef}
          className="mt-5 sm:mt-6 text-sm sm:text-lg md:text-xl text-slate-300/90 max-w-3xl font-light leading-relaxed tracking-wide px-3"
        >
          Transform multi-dimensional consumer intent into autonomous, high-velocity conversion trajectories. Powered by sub-millisecond neural raycasting and spatial touchpoint synthesis.
        </p>

        {/* Call to Actions */}
        <div 
          ref={ctaRef}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-5 w-full max-w-md sm:max-w-none px-4"
        >
          {/* Primary Action Button */}
          <button
            onClick={handleLaunch}
            onMouseEnter={() => sound.playHover()}
            className="w-full sm:w-auto relative group px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl font-semibold text-sm sm:text-base text-slate-950 transition-all duration-300 shadow-[0_0_35px_rgba(0,242,254,0.35)] hover:shadow-[0_0_50px_rgba(0,242,254,0.6)] active:scale-95 flex items-center justify-center space-x-2.5 sm:space-x-3 overflow-hidden cursor-pointer"
            style={{
              background: `linear-gradient(135deg, #ffffff 0%, ${theme.primary} 70%, ${theme.secondary} 100%)`
            }}
          >
            <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <Orbit className="w-4 sm:w-5 h-4 sm:h-5 text-slate-950 animate-spin" style={{ animationDuration: '8s' }} />
            <span className="relative z-10 tracking-wide font-bold">Launch Spatial Simulator</span>
            <ArrowRight className="w-4 h-4 text-slate-950 transition-transform group-hover:translate-x-1" />
          </button>

          {/* Secondary Action Button */}
          <button
            onClick={() => { sound.playClick(); setIsSandboxOpen(true); }}
            onMouseEnter={() => sound.playHover()}
            className="w-full sm:w-auto px-6 sm:px-7 py-3.5 sm:py-4 rounded-2xl font-medium text-sm sm:text-base text-slate-200 glass-panel hover:bg-white/[0.08] hover:text-white hover:border-white/20 transition-all duration-300 active:scale-95 flex items-center justify-center space-x-2.5 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Customize 3D Shaders</span>
          </button>
        </div>

        {/* Live Metrics Telemetry Strip */}
        <div 
          ref={metricsBarRef}
          className="mt-10 sm:mt-14 w-full max-w-4xl glass-panel-elevated rounded-2xl p-4 sm:p-5 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 border border-white/10"
        >
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left p-2">
            <div className="flex items-center space-x-1.5 text-xs font-mono text-slate-400">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>SPATIAL NODES</span>
            </div>
            <div className="mt-1 text-lg sm:text-2xl font-bold font-display text-white tracking-tight">
              124,850+
            </div>
            <span className="text-[10px] sm:text-[11px] font-mono text-emerald-400 mt-0.5">
              ▲ 99.98% Synced
            </span>
          </div>

          <div className="flex flex-col items-center sm:items-start text-center sm:text-left p-2 border-l border-white/[0.06]">
            <div className="flex items-center space-x-1.5 text-xs font-mono text-slate-400">
              <Compass className="w-3.5 h-3.5 text-purple-400" />
              <span>RAYCAST LATENCY</span>
            </div>
            <div className="mt-1 text-lg sm:text-2xl font-bold font-display text-white tracking-tight">
              0.84 ms
            </div>
            <span className="text-[10px] sm:text-[11px] font-mono text-cyan-300 mt-0.5">
              Sub-frame Precision
            </span>
          </div>

          <div className="flex flex-col items-center sm:items-start text-center sm:text-left p-2 border-t sm:border-t-0 sm:border-l border-white/[0.06] pt-3 sm:pt-2">
            <div className="flex items-center space-x-1.5 text-xs font-mono text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>ATTRIBUTION LIFT</span>
            </div>
            <div className="mt-1 text-lg sm:text-2xl font-bold font-display text-white tracking-tight">
              8.4x Avg
            </div>
            <span className="text-[10px] sm:text-[11px] font-mono text-emerald-400 mt-0.5">
              Across XR & Spatial
            </span>
          </div>

          <div className="flex flex-col items-center sm:items-start text-center sm:text-left p-2 border-t sm:border-t-0 sm:border-l border-white/[0.06] pt-3 sm:pt-2">
            <div className="flex items-center space-x-1.5 text-xs font-mono text-slate-400">
              <Play className="w-3.5 h-3.5 text-amber-400" />
              <span>DAILY INTENT OPS</span>
            </div>
            <div className="mt-1 text-lg sm:text-2xl font-bold font-display text-white tracking-tight">
              4.92 B
            </div>
            <span className="text-[10px] sm:text-[11px] font-mono text-amber-300 mt-0.5">
              Autonomous Conversions
            </span>
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={handleScrollToNext}
          onMouseEnter={() => sound.playHover()}
          className="mt-10 group flex flex-col items-center space-y-2 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
        >
          <span className="text-[11px] font-mono tracking-widest uppercase">Explore Neural Architecture</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-slate-400 group-hover:text-cyan-400 transition-colors" />
        </button>

      </div>
    </section>
  );
}

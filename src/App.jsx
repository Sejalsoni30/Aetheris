import React, { useEffect, useState } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import ThreeHeroScene from './components/ThreeHeroScene';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import NeuralCoreSection from './components/NeuralCoreSection';
import BentoFeatures from './components/BentoFeatures';
import TelemetryDashboard from './components/TelemetryDashboard';
import ExperiencePlayground from './components/ExperiencePlayground';
import SpatialSimulatorModal from './components/SpatialSimulatorModal';
import Footer from './components/Footer';

function SpatialCursor() {
  const { theme } = useTheme();
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let animId;
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;

    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setPos({ x: targetX, y: targetY });

      // Check if hovering over clickable element
      const target = e.target;
      if (target && (target.closest('button') || target.closest('a') || target.closest('input'))) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const loop = () => {
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;
      setTrailingPos({ x: currentX, y: currentY });
      animId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Dot */}
      <div 
        className="fixed w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          backgroundColor: theme.primary,
          boxShadow: `0 0 10px ${theme.glow}`
        }}
      />
      {/* Trailing Ring */}
      <div 
        className={`fixed rounded-full -translate-x-1/2 -translate-y-1/2 border transition-all duration-150 ${
          isHovering ? 'w-10 h-10 border-white/60 scale-125 bg-white/5' : 'w-7 h-7 border-cyan-400/30'
        }`}
        style={{
          left: `${trailingPos.x}px`,
          top: `${trailingPos.y}px`,
          borderColor: isHovering ? '#ffffff' : theme.primary
        }}
      />
    </div>
  );
}

function MainContent() {
  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 overflow-x-hidden">
      
      {/* Interactive Custom Cursor */}
      <SpatialCursor />

      {/* WebGL 3D Interactive Hero Canvas */}
      <ThreeHeroScene />

      {/* Subtle Noise / Grid Overlay */}
      <div className="fixed inset-0 bg-grid-cyber opacity-15 pointer-events-none z-0" />

      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col">
        <HeroSection />
        <NeuralCoreSection />
        <BentoFeatures />
        <TelemetryDashboard />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating 3D Experience Playground / Shader Switcher */}
      <ExperiencePlayground />

      {/* Launch Experience Interactive Simulator Modal */}
      <SpatialSimulatorModal />

    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainContent />
    </ThemeProvider>
  );
}

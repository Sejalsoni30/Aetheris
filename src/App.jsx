import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import SpatialSimulatorModal from './components/SpatialSimulatorModal';
import SpatialStudioModal from './components/SpatialStudioModal';
import InteractiveHeatmapModal from './components/InteractiveHeatmapModal';
import AgentSwarmModal from './components/AgentSwarmModal';
import RoiCalculatorModal from './components/RoiCalculatorModal';
import ThreeHeroScene from './components/ThreeHeroScene';

// Pages
import HomePage from './pages/HomePage';
import NeuralCorePage from './pages/NeuralCorePage';
import FeaturesPage from './pages/FeaturesPage';
import TelemetryPage from './pages/TelemetryPage';
import SimulatorPage from './pages/SimulatorPage';
import VisionOsPage from './pages/VisionOsPage';
import HorizonOsPage from './pages/HorizonOsPage';
import WebGlPage from './pages/WebGlPage';
import WebXrPage from './pages/WebXrPage';
import PrivacyPage from './pages/PrivacyPage';
import SecurityPage from './pages/SecurityPage';
import TermsPage from './pages/TermsPage';
import CommunityPage from './pages/CommunityPage';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, hash]);

  return null;
}

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
      if (target && (target.closest('button') || target.closest('a') || target.closest('input') || target.closest('select'))) {
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
    <div className="relative min-h-screen bg-[#030712] text-slate-100 overflow-x-hidden selection:bg-cyan-500/30">
      
      {/* Automatically Scroll To Top on Route Changes */}
      <ScrollToTop />

      {/* Interactive Custom Cursor */}
      <SpatialCursor />

      {/* Persistent 3D Interactive Spatial Particle Scene across ALL pages */}
      <ThreeHeroScene />

      {/* Ambient Neon Atmosphere Orbs */}
      <div className="fixed top-[-10%] left-[20%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none z-0" />
      <div className="fixed top-[40%] right-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] left-[10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none z-0" />

      {/* Subtle Noise / Grid Overlay */}
      <div className="fixed inset-0 bg-grid-cyber opacity-15 pointer-events-none z-0" />

      {/* Application Routes */}
      <div className="relative z-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
          
          {/* Architecture Routes */}
          <Route path="/architecture/neural-core" element={<NeuralCorePage />} />
          <Route path="/architecture/features" element={<FeaturesPage />} />
          <Route path="/architecture/telemetry" element={<TelemetryPage />} />
          <Route path="/architecture/simulator" element={<SimulatorPage />} />

          {/* Platform Routes */}
          <Route path="/platforms/visionos" element={<VisionOsPage />} />
          <Route path="/platforms/horizon-os" element={<HorizonOsPage />} />
          <Route path="/platforms/webgl" element={<WebGlPage />} />
          <Route path="/platforms/webxr" element={<WebXrPage />} />

          {/* Legal & Protocol Routes */}
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/terms" element={<TermsPage />} />

          {/* Community & Ecosystem Routes */}
          <Route path="/community/github" element={<CommunityPage initialChannel="github" />} />
          <Route path="/community/network" element={<CommunityPage initialChannel="network" />} />
          <Route path="/community/discord" element={<CommunityPage initialChannel="discord" />} />

          {/* Catch-all Fallback */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>

      {/* Modals Suite for Real-Time Dynamic Exploration */}
      <SpatialSimulatorModal />
      <SpatialStudioModal />
      <InteractiveHeatmapModal />
      <AgentSwarmModal />
      <RoiCalculatorModal />

    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <MainContent />
      </HashRouter>
    </ThemeProvider>
  );
}

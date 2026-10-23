import React, { createContext, useContext, useState, useEffect } from 'react';

export const THEMES = {
  cyan: {
    id: 'cyan',
    name: 'Cyber Cyan',
    primary: '#00f2fe',
    secondary: '#4facfe',
    accent: '#38bdf8',
    glow: 'rgba(0, 242, 254, 0.45)',
    hexPrimary: 0x00f2fe,
    hexSecondary: 0x4facfe,
    bgGlow: 'from-cyan-500/20 via-blue-500/10 to-transparent',
    borderGlow: 'border-cyan-500/30',
    badge: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
    buttonGradient: 'from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500',
    textGradient: 'from-cyan-300 via-teal-200 to-blue-400',
    tag: 'CYBER-CYAN-400'
  },
  violet: {
    id: 'violet',
    name: 'Deep Space Violet',
    primary: '#a855f7',
    secondary: '#8b5cf6',
    accent: '#d946ef',
    glow: 'rgba(168, 85, 247, 0.45)',
    hexPrimary: 0xa855f7,
    hexSecondary: 0x8b5cf6,
    bgGlow: 'from-purple-500/20 via-violet-500/10 to-transparent',
    borderGlow: 'border-purple-500/30',
    badge: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
    buttonGradient: 'from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500',
    textGradient: 'from-purple-300 via-fuchsia-200 to-violet-400',
    tag: 'DEEP-SPACE-VIOLET'
  },
  gold: {
    id: 'gold',
    name: 'Solar Gold',
    primary: '#f59e0b',
    secondary: '#f97316',
    accent: '#fbbf24',
    glow: 'rgba(245, 158, 11, 0.45)',
    hexPrimary: 0xf59e0b,
    hexSecondary: 0xf97316,
    bgGlow: 'from-amber-500/20 via-orange-500/10 to-transparent',
    borderGlow: 'border-amber-500/30',
    badge: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    buttonGradient: 'from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500',
    textGradient: 'from-amber-200 via-yellow-100 to-orange-400',
    tag: 'SOLAR-GOLD-800'
  },
  emerald: {
    id: 'emerald',
    name: 'Emerald Matrix',
    primary: '#10b981',
    secondary: '#06b6d4',
    accent: '#34d399',
    glow: 'rgba(16, 185, 129, 0.45)',
    hexPrimary: 0x10b981,
    hexSecondary: 0x06b6d4,
    bgGlow: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    borderGlow: 'border-emerald-500/30',
    badge: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    buttonGradient: 'from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500',
    textGradient: 'from-emerald-300 via-mint-200 to-teal-400',
    tag: 'EMERALD-MATRIX-9'
  }
};

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Theme state
  const [currentThemeKey, setCurrentThemeKey] = useState(() => {
    return localStorage.getItem('aetheris_theme') || 'cyan';
  });

  // 3D Particle parameters
  const [particleDensity, setParticleDensity] = useState(2400);
  const [rotationSpeed, setRotationSpeed] = useState(1);
  const [showConnections, setShowConnections] = useState(true);
  const [turbulence, setTurbulence] = useState(true);
  const [geometryShape, setGeometryShape] = useState('sphere'); // 'sphere' | 'torus' | 'helix' | 'crystal'
  const [clickShockwave, setClickShockwave] = useState(0);

  // Audio state
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [ambientDrone, setAmbientDrone] = useState(false);

  // Modals & Panels state
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [isSandboxOpen, setIsSandboxOpen] = useState(false);
  const [isStudioOpen, setIsStudioOpen] = useState(false);
  const [isHeatmapOpen, setIsHeatmapOpen] = useState(false);
  const [isRoiModalOpen, setIsRoiModalOpen] = useState(false);
  const [isAgentSwarmOpen, setIsAgentSwarmOpen] = useState(false);

  // Dynamic user campaigns saved to localStorage
  const [customCampaigns, setCustomCampaigns] = useState(() => {
    const saved = localStorage.getItem('aetheris_campaigns');
    if (saved) {
      try { return JSON.parse(saved); } catch { /* fallback */ }
    }
    return [
      {
        id: 'c-101',
        name: 'VisionOS Spatial Luxury Drop',
        targetCohort: 'VisionOS Spatial Shoppers',
        budget: '$25,000',
        nodes: 650,
        status: 'Active Streaming',
        impressions: '184.2K',
        roi: '9.4x',
        createdAt: '2026-10-23'
      },
      {
        id: 'c-102',
        name: 'Metaverse Automotive Configurator',
        targetCohort: 'Autonomous EV Drivers',
        budget: '$15,000',
        nodes: 380,
        status: 'Active Streaming',
        impressions: '98.5K',
        roi: '8.2x',
        createdAt: '2026-10-22'
      }
    ];
  });

  // Dynamic AI Agent configurations
  const [agentsConfig, setAgentsConfig] = useState(() => {
    const saved = localStorage.getItem('aetheris_agents');
    if (saved) {
      try { return JSON.parse(saved); } catch { /* fallback */ }
    }
    return [
      { id: 'alpha', name: 'Agent Alpha-7', role: 'Foveated Gaze Resolver', active: true, aggressiveness: 85, latency: '0.42ms', ops: '4,200/s' },
      { id: 'nexus', name: 'Agent Nexus-X', role: 'Dynamic 3D Asset Synthesizer', active: true, aggressiveness: 92, latency: '0.61ms', ops: '5,800/s' },
      { id: 'mirage', name: 'Agent Mirage-04', role: 'Autonomous Spatial Bidder', active: true, aggressiveness: 78, latency: '0.33ms', ops: '3,900/s' },
      { id: 'cipher', name: 'Agent Cipher-9', role: 'Cryptographic Attribution Proof', active: true, aggressiveness: 95, latency: '0.29ms', ops: '4,500/s' }
    ];
  });

  const theme = THEMES[currentThemeKey] || THEMES.cyan;

  // Persist theme
  useEffect(() => {
    localStorage.setItem('aetheris_theme', currentThemeKey);
    document.documentElement.style.setProperty('--theme-primary', theme.primary);
    document.documentElement.style.setProperty('--theme-secondary', theme.secondary);
    document.documentElement.style.setProperty('--theme-glow', theme.glow);
    document.documentElement.style.setProperty('--theme-accent', theme.accent);
  }, [currentThemeKey, theme]);

  // Persist campaigns
  useEffect(() => {
    localStorage.setItem('aetheris_campaigns', JSON.stringify(customCampaigns));
  }, [customCampaigns]);

  // Persist agent configuration
  useEffect(() => {
    localStorage.setItem('aetheris_agents', JSON.stringify(agentsConfig));
  }, [agentsConfig]);

  const addCampaign = (newCamp) => {
    setCustomCampaigns(prev => [newCamp, ...prev]);
  };

  const removeCampaign = (id) => {
    setCustomCampaigns(prev => prev.filter(c => c.id !== id));
  };

  const updateAgent = (id, updates) => {
    setAgentsConfig(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
  };

  const triggerShockwave = () => {
    setClickShockwave(Date.now());
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        currentThemeKey,
        setTheme: setCurrentThemeKey,
        particleDensity,
        setParticleDensity,
        rotationSpeed,
        setRotationSpeed,
        showConnections,
        setShowConnections,
        turbulence,
        setTurbulence,
        geometryShape,
        setGeometryShape,
        clickShockwave,
        triggerShockwave,
        audioEnabled,
        setAudioEnabled,
        ambientDrone,
        setAmbientDrone,
        isSimulatorOpen,
        setIsSimulatorOpen,
        isSandboxOpen,
        setIsSandboxOpen,
        isStudioOpen,
        setIsStudioOpen,
        isHeatmapOpen,
        setIsHeatmapOpen,
        isRoiModalOpen,
        setIsRoiModalOpen,
        isAgentSwarmOpen,
        setIsAgentSwarmOpen,
        customCampaigns,
        addCampaign,
        removeCampaign,
        agentsConfig,
        updateAgent,
        allThemes: THEMES
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

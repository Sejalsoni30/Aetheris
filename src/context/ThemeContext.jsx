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
  const [currentThemeKey, setCurrentThemeKey] = useState('cyan');
  const [particleDensity, setParticleDensity] = useState(2400);
  const [rotationSpeed, setRotationSpeed] = useState(1);
  const [showConnections, setShowConnections] = useState(true);
  const [turbulence, setTurbulence] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [isSandboxOpen, setIsSandboxOpen] = useState(false);

  const theme = THEMES[currentThemeKey];

  useEffect(() => {
    // Update CSS custom properties for instant styling updates
    document.documentElement.style.setProperty('--theme-primary', theme.primary);
    document.documentElement.style.setProperty('--theme-secondary', theme.secondary);
    document.documentElement.style.setProperty('--theme-glow', theme.glow);
    document.documentElement.style.setProperty('--theme-accent', theme.accent);
  }, [theme]);

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
        audioEnabled,
        setAudioEnabled,
        isSimulatorOpen,
        setIsSimulatorOpen,
        isSandboxOpen,
        setIsSandboxOpen,
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

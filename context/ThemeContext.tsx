import React, { createContext, useContext, useState, useEffect } from 'react';
import { SUPERHERO_THEMES } from '../constants';
import { SuperheroThemeConfig } from '../types';

export type Theme = 'spiderman' | 'green-lantern' | 'black-panther' | 'batman' | string;

interface ThemeContextType {
  theme: Theme;
  activeThemeConfig: SuperheroThemeConfig;
  availableThemes: SuperheroThemeConfig[];
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  playThemeSound: (type?: 'click' | 'switch') => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'portfolio_theme';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(THEME_STORAGE_KEY);
        if (saved && SUPERHERO_THEMES.some(t => t.id === saved && t.status === 'active')) {
          return saved;
        }
      } catch (e) {}
    }
    return 'spiderman';
  });

  const playThemeSound = (type: 'click' | 'switch' = 'click') => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const audioCtx = new AudioCtx();

      if (theme === 'batman') {
        // Gotham Tactical Wayne Enterprises sonar ping & grapple deployment sound
        const osc = audioCtx.createOscillator();
        const osc2 = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        osc.type = 'sine';
        osc2.type = 'sawtooth';

        const now = audioCtx.currentTime;
        const duration = type === 'switch' ? 0.35 : 0.18;

        // Tactical sonar high-tech click & drop
        osc.frequency.setValueAtTime(type === 'switch' ? 950 : 800, now);
        osc.frequency.exponentialRampToValueAtTime(type === 'switch' ? 240 : 180, now + duration);

        osc2.frequency.setValueAtTime(type === 'switch' ? 320 : 220, now);
        osc2.frequency.exponentialRampToValueAtTime(80, now + duration);

        gainNode.gain.setValueAtTime(0.18, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);

        osc.connect(gainNode);
        osc2.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        osc.start();
        osc2.start();
        osc.stop(now + duration);
        osc2.stop(now + duration);

        setTimeout(() => audioCtx.close(), (duration + 0.1) * 1000);
      } else if (theme === 'black-panther') {
        // Vibranium kinetic resonance / energy pulse sound
        const osc = audioCtx.createOscillator();
        const osc2 = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        osc.type = 'sine';
        osc2.type = 'triangle';

        const now = audioCtx.currentTime;
        const duration = type === 'switch' ? 0.38 : 0.2;

        // Low kinetic resonance sweep
        osc.frequency.setValueAtTime(type === 'switch' ? 180 : 220, now);
        osc.frequency.exponentialRampToValueAtTime(type === 'switch' ? 520 : 440, now + duration * 0.7);
        osc.frequency.exponentialRampToValueAtTime(110, now + duration);

        osc2.frequency.setValueAtTime(type === 'switch' ? 360 : 440, now);
        osc2.frequency.exponentialRampToValueAtTime(880, now + duration * 0.5);
        osc2.frequency.exponentialRampToValueAtTime(220, now + duration);

        gainNode.gain.setValueAtTime(0.2, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);

        osc.connect(gainNode);
        osc2.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        osc.start();
        osc2.start();
        osc.stop(now + duration);
        osc2.stop(now + duration);

        setTimeout(() => audioCtx.close(), (duration + 0.1) * 1000);
      } else if (theme === 'green-lantern') {
        // Futuristic Green Lantern Power Ring / Emerald Energy construct sound
        const osc = audioCtx.createOscillator();
        const osc2 = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        // Shimmering harmonic frequency with gentle resonance
        osc.type = 'triangle';
        osc2.type = 'sine';

        const now = audioCtx.currentTime;
        const duration = type === 'switch' ? 0.35 : 0.18;

        osc.frequency.setValueAtTime(type === 'switch' ? 440 : 580, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + duration);

        osc2.frequency.setValueAtTime(type === 'switch' ? 880 : 1160, now);
        osc2.frequency.exponentialRampToValueAtTime(1760, now + duration);

        gainNode.gain.setValueAtTime(0.15, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);

        osc.connect(gainNode);
        osc2.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        osc.start();
        osc2.start();
        osc.stop(now + duration);
        osc2.stop(now + duration);

        setTimeout(() => audioCtx.close(), (duration + 0.1) * 1000);
      } else {
        // Classic Spider-Man Thwip web sound
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        osc.type = 'sine';
        const now = audioCtx.currentTime;
        const duration = 0.15;

        osc.frequency.setValueAtTime(1200, now);
        osc.frequency.exponentialRampToValueAtTime(100, now + duration);

        gainNode.gain.setValueAtTime(0.25, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration);

        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        osc.start();
        osc.stop(now + duration);

        setTimeout(() => audioCtx.close(), 250);
      }
    } catch (e) {
      // Audio context blocked or unavailable
    }
  };

  const activeThemeConfig = SUPERHERO_THEMES.find(t => t.id === theme) || SUPERHERO_THEMES[0];
  const availableThemes = SUPERHERO_THEMES.filter(t => t.status === 'active');

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch (e) {}
    applyThemeToDOM(newTheme);
    playThemeSound('switch');
  };

  const toggleTheme = () => {
    const activeThemes = SUPERHERO_THEMES.filter(t => t.status === 'active');
    const currentIndex = activeThemes.findIndex(t => t.id === theme);
    const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % activeThemes.length : 0;
    setTheme(activeThemes[nextIndex].id);
  };

  const applyThemeToDOM = (t: Theme) => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    root.setAttribute('data-theme', t);
    
    // Remove existing theme classes
    SUPERHERO_THEMES.forEach(item => {
      root.classList.remove(`theme-${item.id}`);
    });
    root.classList.add(`theme-${t}`);

    if (t === 'spiderman') {
      document.body.classList.add('scanlines');
    } else {
      document.body.classList.remove('scanlines');
    }
  };

  useEffect(() => {
    applyThemeToDOM(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, activeThemeConfig, availableThemes, setTheme, toggleTheme, playThemeSound }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

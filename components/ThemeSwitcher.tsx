import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { SUPERHERO_THEMES } from '../constants';
import { SuperheroThemeConfig } from '../types';

export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme, playThemeSound } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<number | null>(null);

  const isLantern = theme === 'green-lantern';
  const activeThemes = SUPERHERO_THEMES.filter(t => t.status === 'active');
  const upcomingThemes = SUPERHERO_THEMES.filter(t => t.status === 'upcoming');
  const currentThemeConfig = SUPERHERO_THEMES.find(t => t.id === theme) || SUPERHERO_THEMES[0];

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      if (hoverTimeoutRef.current) {
        window.clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, [isOpen]);

  // Hover handlers with debounce delay so user can comfortably move cursor to the dropdown
  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      window.clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      window.clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = window.setTimeout(() => {
      setIsOpen(false);
    }, 280);
  };

  const handleToggleClick = () => {
    if (hoverTimeoutRef.current) {
      window.clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsOpen(prev => !prev);
  };

  const handleSelectTheme = (newThemeId: string) => {
    if (newThemeId !== theme) {
      setTheme(newThemeId);
    } else {
      playThemeSound('click');
    }
    setIsOpen(false);
  };

  // Helper icons for superhero emblems
  const renderHeroIcon = (id: string, className: string = 'w-5 h-5') => {
    switch (id) {
      case 'spiderman':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2C6.48 2 2 6.48 2 12c0 3.84 2.16 7.18 5.33 8.87-.04-.55-.07-1.16-.07-1.87 0-3.1 1.45-5.91 3.74-7.69C10.4 10.87 10 10.02 10 9c0-1.66 1.34-3 3-3s3 1.34 3 3c0 1.02-.4 1.87-1 2.31 2.29 1.78 3.74 4.59 3.74 7.69 0 .71-.03 1.32-.07 1.87C21.84 19.18 24 15.84 24 12c0-5.52-4.48-10-12-10zM7.5 12.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
          </svg>
        );
      case 'green-lantern':
        return (
          <svg
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.3"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="5" y1="4" x2="19" y2="4" strokeWidth="2.5" />
            <line x1="5" y1="20" x2="19" y2="20" strokeWidth="2.5" />
            <circle cx="12" cy="12" r="7" />
            <circle cx="12" cy="12" r="3" fill="currentColor" />
          </svg>
        );
      case 'batman':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 4.5c-1.8 1.5-3.3 2.8-5 2.8-2.2 0-4.5 1.8-4.5 4.8 0 4.2 4.2 7.4 9.5 7.4s9.5-3.2 9.5-7.4c0-3-2.3-4.8-4.5-4.8-1.7 0-3.2-1.3-5-2.8l-.5 2h-1l-.5-2z" />
          </svg>
        );
      case 'ironman':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <polygon points="12 5 18 17 6 17" fill="currentColor" strokeWidth="1" />
            <circle cx="12" cy="12" r="2.5" fill="#38BDF8" stroke="#38BDF8" />
          </svg>
        );
      case 'flash':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M13 2L3 14h7l-2 8 10-12h-7l2-8z" />
          </svg>
        );
      default:
        return (
          <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <circle cx="12" cy="12" r="8" />
          </svg>
        );
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative inline-block text-left"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Theme Icon Trigger Button */}
      <button
        type="button"
        id="theme-menu-button"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={`Superhero Theme Selector. Current theme: ${currentThemeConfig.name}`}
        onClick={handleToggleClick}
        className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 ${
          isLantern
            ? 'bg-[#05140d]/90 border-2 border-[#00FF66]/70 text-[#F5FFF8] shadow-[0_0_15px_rgba(0,255,102,0.3)] hover:shadow-[0_0_25px_rgba(0,255,102,0.6)] hover:border-[#00FF66] focus-visible:ring-[#00FF66]'
            : 'bg-[#151735] border-2 border-black text-white shadow-[3px_3px_0px_0px_#FF375F] hover:shadow-[4px_4px_0px_0px_#FFDE00] hover:translate-x-[-1px] hover:translate-y-[-1px] focus-visible:ring-[#FFDE00]'
        } ${isOpen ? (isLantern ? 'ring-2 ring-[#00FF66] shadow-[0_0_20px_rgba(0,255,102,0.7)]' : 'translate-x-[1px] translate-y-[1px] shadow-[1px_1px_0px_0px_#FF375F]') : ''}`}
      >
        {/* Dynamic Superhero Icon with background halo */}
        <span
          className={`relative flex items-center justify-center w-7 h-7 rounded-full transition-transform duration-300 group-hover:scale-110 ${
            isLantern
              ? 'bg-[#00FF66]/20 text-[#00FF66] shadow-[0_0_10px_rgba(0,255,102,0.5)]'
              : 'bg-[#FF375F] text-black shadow-[1px_1px_0px_#000]'
          }`}
        >
          {renderHeroIcon(theme, 'w-4 h-4')}
        </span>

        {/* Hero Label & Universe Tag */}
        <div className="flex flex-col text-left leading-tight hidden sm:flex">
          <span
            className={`text-xs font-bold uppercase tracking-wider ${
              isLantern
                ? 'font-orbitron text-[#00FF66]'
                : 'font-comic text-[#FFDE00] text-sm tracking-wide'
            }`}
          >
            {currentThemeConfig.name}
          </span>
          <span
            className={`text-[9px] uppercase tracking-widest ${
              isLantern ? 'font-rajdhani text-[#7CFFB2]/80' : 'font-mono text-gray-300'
            }`}
          >
            {currentThemeConfig.universe} Universe
          </span>
        </div>

        {/* Dropdown Indicator Chevron */}
        <svg
          className={`w-3.5 h-3.5 ml-0.5 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          } ${isLantern ? 'text-[#00FF66]' : 'text-[#FFDE00]'}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>

        {/* Glowing live construct ripple for Lantern / Comic dot for Spidey */}
        {isLantern && (
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF66] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00FF66]"></span>
          </span>
        )}
      </button>

      {/* Available Themes Dropdown Panel */}
      <div
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="theme-menu-button"
        className={`absolute right-0 top-full mt-3 w-80 sm:w-96 rounded-2xl z-50 transition-all duration-300 origin-top-right overflow-hidden ${
          isOpen
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
        } ${
          isLantern
            ? 'bg-[#050D0A]/95 backdrop-blur-xl border-2 border-[#00FF66]/70 shadow-[0_10px_35px_rgba(0,255,102,0.25)] text-[#F5FFF8]'
            : 'bg-[#101228]/95 backdrop-blur-xl border-4 border-black shadow-[6px_6px_0px_0px_#FF375F] text-white'
        }`}
      >
        {/* Dropdown Header */}
        <div
          className={`px-4 py-3 border-b flex items-center justify-between ${
            isLantern
              ? 'border-[#00FF66]/30 bg-[#05140d]/70'
              : 'border-white/10 bg-black/40'
          }`}
        >
          <div className="flex items-center gap-2">
            <span
              className={`p-1.5 rounded-lg ${
                isLantern
                  ? 'bg-[#00FF66]/20 text-[#00FF66]'
                  : 'bg-[#FF375F]/20 text-[#FF375F]'
              }`}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            </span>
            <div>
              <h3
                className={`text-xs font-black uppercase tracking-wider ${
                  isLantern ? 'font-orbitron text-[#00FF66]' : 'font-comic text-lg text-white'
                }`}
              >
                Superhero Multiverse
              </h3>
              <p
                className={`text-[10px] ${
                  isLantern ? 'font-rajdhani text-[#7CFFB2]/70' : 'font-mono text-gray-400'
                }`}
              >
                Hover or click to switch dimension
              </p>
            </div>
          </div>

          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
              isLantern
                ? 'bg-[#00FF66]/20 text-[#00FF66] border border-[#00FF66]/40'
                : 'bg-[#FFDE00] text-black font-comic'
            }`}
          >
            {activeThemes.length} Active
          </span>
        </div>

        {/* Section: Available Superhero Themes */}
        <div className="p-3 space-y-2">
          <div
            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 ${
              isLantern ? 'font-rajdhani text-[#7CFFB2]/80' : 'font-mono text-gray-400'
            }`}
          >
            Equippable Themes
          </div>

          {activeThemes.map((themeOption: SuperheroThemeConfig) => {
            const isSelected = theme === themeOption.id;
            return (
              <button
                key={themeOption.id}
                type="button"
                role="menuitemradio"
                aria-checked={isSelected}
                onClick={() => handleSelectTheme(themeOption.id)}
                className={`w-full group/card flex items-start gap-3 p-3 rounded-xl transition-all duration-200 cursor-pointer text-left border relative overflow-hidden ${
                  isSelected
                    ? isLantern
                      ? 'bg-[#00FF66]/15 border-[#00FF66] shadow-[0_0_15px_rgba(0,255,102,0.3)]'
                      : 'bg-[#FF375F]/20 border-[#FF375F] shadow-[3px_3px_0px_#000]'
                    : isLantern
                    ? 'bg-[#05140d]/40 border-[#00FF66]/20 hover:border-[#00FF66]/60 hover:bg-[#00FF66]/10'
                    : 'bg-black/20 border-white/10 hover:border-white/30 hover:bg-white/5'
                }`}
              >
                {/* Active Indicator Bar */}
                {isSelected && (
                  <span
                    className={`absolute top-0 left-0 bottom-0 w-1 ${
                      isLantern ? 'bg-[#00FF66]' : 'bg-[#FF375F]'
                    }`}
                  />
                )}

                {/* Theme Hero Badge Icon */}
                <div
                  className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover/card:scale-110 ${
                    themeOption.id === 'spiderman'
                      ? 'bg-[#FF375F] text-black shadow-[2px_2px_0px_#000]'
                      : 'bg-[#00FF66]/20 text-[#00FF66] border border-[#00FF66]/60 shadow-[0_0_10px_rgba(0,255,102,0.4)]'
                  }`}
                >
                  {renderHeroIcon(themeOption.id, 'w-5 h-5')}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span
                      className={`text-sm font-bold tracking-wide ${
                        isLantern ? 'font-orbitron' : 'font-comic text-base tracking-wider'
                      } ${
                        isSelected
                          ? isLantern
                            ? 'text-[#00FF66]'
                            : 'text-[#FFDE00]'
                          : 'text-white'
                      }`}
                    >
                      {themeOption.name}
                    </span>

                    {/* Universe & Active Badge */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span
                        className={`text-[9px] font-semibold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                          themeOption.universe === 'Marvel'
                            ? 'bg-red-900/60 text-red-200 border border-red-500/40'
                            : 'bg-blue-900/60 text-blue-200 border border-blue-500/40'
                        }`}
                      >
                        {themeOption.universe}
                      </span>
                      {isSelected && (
                        <span
                          className={`flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${
                            isLantern
                              ? 'bg-[#00FF66] text-[#050D0A]'
                              : 'bg-[#FF375F] text-white shadow-[1px_1px_0px_#000]'
                          }`}
                        >
                          <svg className="w-2.5 h-2.5" viewBox="0 0 20 20" fill="currentColor">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Active
                        </span>
                      )}
                    </div>
                  </div>

                  <p
                    className={`text-[11px] mt-0.5 line-clamp-1 italic ${
                      isLantern ? 'font-rajdhani text-[#7CFFB2]/70' : 'font-mono text-gray-300'
                    }`}
                  >
                    "{themeOption.tagline}"
                  </p>

                  {/* Color Swatch Dots */}
                  <div className="flex items-center gap-1.5 mt-2">
                    <span className="text-[9px] uppercase tracking-wider text-gray-400 font-mono">
                      Colors:
                    </span>
                    <span
                      className="w-3 h-3 rounded-full border border-black/40"
                      style={{ backgroundColor: themeOption.primaryColor }}
                      title={`Primary: ${themeOption.primaryColor}`}
                    />
                    <span
                      className="w-3 h-3 rounded-full border border-black/40"
                      style={{ backgroundColor: themeOption.accentColor }}
                      title={`Accent: ${themeOption.accentColor}`}
                    />
                    <span
                      className="w-3 h-3 rounded-full border border-black/40"
                      style={{ backgroundColor: themeOption.glowColor }}
                      title={`Glow: ${themeOption.glowColor}`}
                    />
                    <span
                      className={`ml-auto text-[10px] font-mono ${
                        isSelected
                          ? isLantern
                            ? 'text-[#00FF66]'
                            : 'text-[#FFDE00]'
                          : 'text-gray-400 group-hover/card:text-white'
                      }`}
                    >
                      {isSelected ? '● Equipped' : 'Click to equip →'}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Section: Future Superhero Themes (Extensible Multiverse) */}
        <div
          className={`p-3 border-t ${
            isLantern
              ? 'border-[#00FF66]/20 bg-[#05140d]/40'
              : 'border-white/10 bg-black/30'
          }`}
        >
          <div className="flex items-center justify-between mb-2 px-1">
            <span
              className={`text-[10px] font-bold uppercase tracking-wider ${
                isLantern ? 'font-rajdhani text-[#7CFFB2]/80' : 'font-mono text-gray-400'
              }`}
            >
              Multiverse Incoming
            </span>
            <span className="text-[9px] font-mono text-gray-400">
              Future Theme Slots
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {upcomingThemes.map((upcoming: SuperheroThemeConfig) => (
              <div
                key={upcoming.id}
                title={`${upcoming.name} theme coming soon! Extensible theme slot.`}
                className={`p-2 rounded-xl border flex flex-col items-center text-center transition-all opacity-70 hover:opacity-100 ${
                  isLantern
                    ? 'bg-[#050D0A]/70 border-[#00FF66]/20 hover:border-[#00FF66]/50 hover:shadow-[0_0_10px_rgba(0,255,102,0.2)]'
                    : 'bg-black/30 border-white/10 hover:border-white/30'
                }`}
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center mb-1 text-gray-300"
                  style={{
                    backgroundColor: `${upcoming.primaryColor}22`,
                    color: upcoming.primaryColor,
                  }}
                >
                  {renderHeroIcon(upcoming.id, 'w-4 h-4')}
                </div>
                <span
                  className={`text-[11px] font-bold leading-tight ${
                    isLantern ? 'font-orbitron' : 'font-comic text-xs'
                  }`}
                >
                  {upcoming.name}
                </span>
                <span className="text-[8px] font-mono uppercase text-gray-400 mt-0.5">
                  Soon
                </span>
              </div>
            ))}
          </div>

          {/* Quick info footer */}
          <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-gray-400 font-mono">
            <span>✨ Superhero Theme Registry</span>
            <span className="text-[9px] text-gray-500">Persists in storage</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSwitcher;

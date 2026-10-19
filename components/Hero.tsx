import React, { useState, useEffect, useRef } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import { useTheme } from '../context/ThemeContext';

interface HeroProps {
  scroll: LocomotiveScroll | null;
}

const Hero: React.FC<HeroProps> = ({ scroll }) => {
  const { theme } = useTheme();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const { left, top, width, height } = sectionRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      setMousePos({ x, y });
    };

    const handleScroll = () => {
      const scrolled = window.scrollY;
      const windowHeight = window.innerHeight;
      setScrollProgress(Math.min(scrolled / windowHeight, 1));
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    if (scroll && typeof (scroll as any).on === 'function') {
      try {
        (scroll as any).on('scroll', (args: any) => {
          const scrolled = args?.scroll?.y ?? window.scrollY;
          const windowHeight = window.innerHeight;
          setScrollProgress(Math.min(scrolled / windowHeight, 1));
        });
      } catch (e) {
        window.addEventListener('scroll', handleScroll);
      }
    } else {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scroll]);

  const isLantern = theme === 'green-lantern';

  // Spider-Man Cobweb Generator
  const radialLines = 24;
  const layers = 10;
  const center = 50;

  const renderCobweb = () => {
    const lines = Array.from({ length: radialLines });
    const layerArray = Array.from({ length: layers });

    return (
      <svg 
        className="w-full h-full text-[#FF375F]/20 animate-[spin_180s_linear_infinite]" 
        viewBox="0 0 100 100"
        style={{
          transform: `scale(${1 + Math.abs(mousePos.x * 0.1)}) rotate(${scrollProgress * 15}deg)`,
        }}
      >
        {lines.map((_, i) => {
          const angle = (i * 2 * Math.PI) / radialLines;
          const x2 = center + 60 * Math.cos(angle);
          const y2 = center + 60 * Math.sin(angle);
          return (
            <line
              key={`radial-${i}`}
              x1={center}
              y1={center}
              x2={x2}
              y2={y2}
              stroke="currentColor"
              strokeWidth="0.15"
              className="opacity-50"
            />
          );
        })}

        {layerArray.map((_, layerIdx) => {
          const r = (layerIdx + 1) * (50 / (layers + 0.5));
          return lines.map((_, i) => {
            const angle1 = (i * 2 * Math.PI) / radialLines;
            const angle2 = ((i + 1) * 2 * Math.PI) / radialLines;
            const midAngle = (angle1 + angle2) / 2;

            const x1 = center + r * Math.cos(angle1);
            const y1 = center + r * Math.sin(angle1);
            const x2 = center + r * Math.cos(angle2);
            const y2 = center + r * Math.sin(angle2);

            const cpR = r * 0.92;
            const cx = center + cpR * Math.cos(midAngle);
            const cy = center + cpR * Math.sin(midAngle);

            return (
              <path
                key={`layer-${layerIdx}-segment-${i}`}
                d={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="0.15"
                className="opacity-40"
              />
            );
          });
        })}
      </svg>
    );
  };

  // Green Lantern Power Ring Construct Generator
  const renderLanternConstruct = () => {
    return (
      <div className="relative w-full h-full flex items-center justify-center animate-ring-pulse">
        <svg
          className="w-full h-full text-[#00FF66] opacity-75"
          viewBox="0 0 500 500"
          fill="none"
          stroke="currentColor"
        >
          <defs>
            <radialGradient id="ringGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00FF66" stopOpacity="0.4" />
              <stop offset="40%" stopColor="#008F4C" stopOpacity="0.15" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
            <filter id="emeraldBlur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Core Ambient Glow */}
          <circle cx="250" cy="250" r="220" fill="url(#ringGlow)" />

          {/* Outer Rotating Energy Construct Ring */}
          <circle cx="250" cy="250" r="210" strokeWidth="1.5" strokeDasharray="8 12" className="opacity-50" />
          <circle cx="250" cy="250" r="185" strokeWidth="2" strokeDasharray="30 15 10 15" className="opacity-70 animate-[spin_60s_linear_infinite]" />
          
          {/* Hexagonal Construct Shield */}
          {[0, 60, 120, 180, 240, 300].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const x1 = 250 + 170 * Math.cos(rad);
            const y1 = 250 + 170 * Math.sin(rad);
            const radNext = ((deg + 60) * Math.PI) / 180;
            const x2 = 250 + 170 * Math.cos(radNext);
            const y2 = 250 + 170 * Math.sin(radNext);
            return (
              <line key={`hex-${deg}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#7CFFB2" strokeWidth="1.8" className="opacity-80" />
            );
          })}

          {/* Interstellar Coordinate Crosshairs */}
          <line x1="250" y1="20" x2="250" y2="480" strokeWidth="0.8" strokeDasharray="4 6" className="opacity-40" />
          <line x1="20" y1="250" x2="480" y2="250" strokeWidth="0.8" strokeDasharray="4 6" className="opacity-40" />

          {/* Concentric Energy Geometry */}
          <circle cx="250" cy="250" r="130" strokeWidth="2.5" className="opacity-90" filter="url(#emeraldBlur)" />
          <circle cx="250" cy="250" r="95" strokeWidth="1.5" strokeDasharray="6 8" className="opacity-60" />

          {/* Iconic Green Lantern Central Power Battery Emblem */}
          <g transform="translate(175, 175) scale(1.25)" filter="url(#emeraldBlur)">
            {/* Top Battery Bar */}
            <rect x="25" y="15" width="70" height="8" rx="3" fill="#00FF66" />
            {/* Bottom Battery Bar */}
            <rect x="25" y="97" width="70" height="8" rx="3" fill="#00FF66" />
            {/* Outer Circle */}
            <circle cx="60" cy="60" r="34" stroke="#00FF66" strokeWidth="8" fill="none" />
            {/* Inner Core Solid Light */}
            <circle cx="60" cy="60" r="15" fill="#7CFFB2" />
          </g>
        </svg>
      </div>
    );
  };

  const handleCtaClick = () => {
    if (scroll) {
      try {
        scroll.scrollTo('#experience');
        return;
      } catch (e) {}
    }
    const target = document.querySelector('#experience');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={sectionRef}
      className={`relative min-h-screen flex flex-col justify-center items-start px-6 md:px-20 pt-24 overflow-hidden transition-colors duration-400 ${
        isLantern ? 'construct-grid' : 'honeycomb'
      }`}
    >
      {/* Background Visual Pattern (Spidey Cobweb vs Green Lantern Power Ring Construct) */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110vw] h-[110vw] max-w-[1000px] max-h-[1000px] z-0 pointer-events-none transition-transform duration-300 ease-out"
        style={{
          transform: `translate(calc(-50% + ${mousePos.x * (isLantern ? 25 : 40)}px), calc(-50% + ${mousePos.y * (isLantern ? 25 : 40)}px))`,
          opacity: isLantern ? 0.85 : 0.6,
        }}
      >
        <div className="w-full h-full">
          {isLantern ? renderLanternConstruct() : (
            <div className="w-full h-full animate-float-slow">
              {renderCobweb()}
            </div>
          )}
        </div>
      </div>

      {/* Atmospheric Ambient Glow Overlay */}
      <div 
        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
          isLantern
            ? 'bg-[radial-gradient(circle_at_45%_50%,_rgba(0,255,102,0.12)_0%,_transparent_75%)]'
            : 'bg-[radial-gradient(circle_at_50%_50%,_rgba(255,55,95,0.08)_0%,_transparent_70%)]'
        }`}
        style={{ opacity: 0.6 + Math.abs(mousePos.x) * 0.4 }}
      ></div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl">
        {isLantern ? (
          /* ================= GREEN LANTERN HERO ================= */
          <div>
            {/* Subtitle Oath */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-lg bg-[#05140d]/90 border border-[#00FF66]/50 shadow-[0_0_15px_rgba(0,255,102,0.25)] mb-4">
              <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-ping"></span>
              <h2 className="font-orbitron text-[#00FF66] text-sm md:text-base font-bold tracking-[0.25em] uppercase">
                In brightest day, in blackest night
              </h2>
            </div>

            {/* Akash Pratap Singh Illuminated Name */}
            <div className="my-2">
              <h1 className="font-orbitron text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-[#F5FFF8] uppercase tracking-tight emerald-text-glow leading-none">
                Akash
              </h1>
              <h1 className="font-orbitron text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-[#00FF66] uppercase tracking-tight emerald-text-glow leading-none mt-2">
                Pratap Singh
              </h1>
            </div>

            {/* Cosmic Headline */}
            <p className="mt-6 font-rajdhani text-2xl md:text-3xl font-bold text-[#F5FFF8] flex flex-wrap gap-x-3 items-center">
              Channeling 
              <span className="bg-[#00FF66] text-[#050D0A] px-3 py-0.5 rounded font-bold shadow-[0_0_15px_rgba(0,255,102,0.6)]">
                Willpower
              </span> 
              into Scalable Microservices & AI Constructs
            </p>

            {/* Action Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
              <button 
                onClick={handleCtaClick}
                className="group relative px-8 py-3.5 bg-[#00FF66] text-[#050D0A] font-orbitron font-bold text-lg rounded-xl shadow-[0_0_20px_rgba(0,255,102,0.5)] hover:shadow-[0_0_35px_rgba(124,255,178,0.85)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer flex items-center gap-3"
              >
                <span>Activate Ring Construct</span>
                <span className="group-hover:translate-x-1 transition-transform">⚡</span>
              </button>

              <div className="flex items-center text-lg md:text-xl font-rajdhani text-[#7CFFB2] italic tracking-wide">
                "No evil shall escape my sight."
              </div>
            </div>
          </div>
        ) : (
          /* ================= SPIDER-MAN HERO ================= */
          <div>
            <h2 className="font-marker text-[#FF375F] text-2xl mb-2 ml-1">Friendly neighbourhood developer</h2>
            
            <div className="space-y-[-1rem]">
              <h1 
                className="glitch font-comic text-7xl md:text-9xl leading-tight tracking-tighter text-[#F5F5F5] uppercase drop-shadow-[8px_8px_0px_#2A7FFF] cursor-default"
                data-text="Akash"
                style={{ '--glitch-intensity': '1.8', '--glitch-duration': '1.5s' } as React.CSSProperties}
              >
                Akash
              </h1>
              <h1 
                className="glitch font-comic text-7xl md:text-9xl leading-tight tracking-tighter text-[#F5F5F5] uppercase transform translate-x-4 drop-shadow-[8px_8px_0px_#FF375F] cursor-default"
                data-text="Pratap Singh"
                style={{ '--glitch-intensity': '1.2', '--glitch-duration': '2.5s' } as React.CSSProperties}
              >
                Pratap Singh
              </h1>
            </div>

            <p className="mt-8 font-comic text-2xl md:text-4xl text-[#FFDE00] flex flex-wrap gap-x-4 items-center">
              Weaving 
              <span className="bg-[#2A7FFF] text-[#0A0B1E] px-3 py-1 -rotate-2 transform">Backend Webs</span> 
              & 
              <span 
                className="glitch border-b-4 border-[#FF375F] glitch-active" 
                data-text="Async"
                style={{ '--glitch-intensity': '0.6', '--glitch-duration': '4s' } as React.CSSProperties}
              >
                Async
              </span> 
              Microservices
            </p>

            <div className="mt-12 flex flex-col md:flex-row gap-6">
              <button 
                onClick={handleCtaClick}
                className="thwip-active bg-[#FF375F] border-4 border-black font-comic text-2xl text-black px-8 py-3 rounded-none shadow-[6px_6px_0px_0px_rgba(255,222,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all outline-none cursor-pointer"
              >
                View My Web
              </button>
              <div className="flex items-center text-xl font-marker text-[#2A7FFF]/80 italic">
                "With great code comes great responsibility."
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;

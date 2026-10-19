import React, { useEffect, useState, useMemo } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import { useTheme } from '../context/ThemeContext';

interface BackgroundWebProps {
  scroll?: LocomotiveScroll | null;
}

const BackgroundWeb: React.FC<BackgroundWebProps> = ({ scroll }) => {
  const { theme } = useTheme();
  const isLantern = theme === 'green-lantern';

  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      setOffset({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40,
      });
    };

    const handleWindowScroll = () => {
      setScrollY(window.scrollY);
    };

    // Spider-Man random glitch effect
    const glitchInterval = setInterval(() => {
      if (!isLantern && Math.random() > 0.97) {
        setGlitch(true);
        setTimeout(() => setGlitch(false), 150);
      }
    }, 2000);

    window.addEventListener('mousemove', handleMouseMove);
    
    if (scroll && typeof (scroll as any).on === 'function') {
      try {
        (scroll as any).on('scroll', (args: any) => {
          setScrollY(args?.scroll?.y ?? window.scrollY);
        });
      } catch (e) {
        window.addEventListener('scroll', handleWindowScroll);
      }
    } else {
      window.addEventListener('scroll', handleWindowScroll);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleWindowScroll);
      clearInterval(glitchInterval);
    };
  }, [scroll, isLantern]);

  // Spider-Man Multiverse Shards
  const spiderShards = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      width: Math.random() * 300 + 100,
      height: Math.random() * 200 + 50,
      top: Math.random() * 100,
      left: Math.random() * 100,
      rotate: Math.random() * 360,
      speed: Math.random() * 0.1 + 0.05,
      color: i % 3 === 0 ? 'rgba(255, 55, 95, 0.05)' : i % 3 === 1 ? 'rgba(42, 127, 255, 0.05)' : 'rgba(255, 222, 0, 0.03)',
      clipPath: `polygon(${Math.random()*20}% ${Math.random()*20}%, ${80+Math.random()*20}% ${Math.random()*20}%, ${80+Math.random()*20}% ${80+Math.random()*20}%, ${Math.random()*20}% ${80+Math.random()*20}%)`
    }));
  }, []);

  // Green Lantern Hard-Light Construct Shards & Star Polygons
  const lanternShards = useMemo(() => {
    return Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      width: Math.random() * 220 + 80,
      height: Math.random() * 220 + 80,
      top: Math.random() * 100,
      left: Math.random() * 100,
      rotate: Math.random() * 360,
      speed: Math.random() * 0.08 + 0.03,
      // Emerald constructs with hard-light facets
      color: i % 3 === 0 ? 'rgba(0, 255, 102, 0.07)' : i % 3 === 1 ? 'rgba(0, 143, 76, 0.08)' : 'rgba(124, 255, 178, 0.05)',
      clipPath: i % 2 === 0
        ? 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' // Hexagon
        : 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' // Diamond
    }));
  }, []);

  if (isLantern) {
    /* ================= GREEN LANTERN COSMIC BACKGROUND ================= */
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#050D0A] transition-colors duration-400">
        {/* 1. LAYER: Deep Cosmic Energy Aurora Gradient */}
        <div 
          className="absolute inset-0 opacity-60"
          style={{
            background: `radial-gradient(1200px circle at 50% ${30 + (scrollY * 0.02)}%, rgba(0, 143, 76, 0.18), transparent 70%)`,
          }}
        ></div>

        {/* 2. LAYER: Coordinate Interstellar Grid */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 102, 0.07) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 102, 0.07) 1px, transparent 1px)
            `,
            backgroundSize: '64px 64px',
            transform: `translate(${offset.x * 0.15}px, ${offset.y * 0.15}px)`,
          }}
        ></div>

        {/* 3. LAYER: Hard-Light Emerald Construct Polygons */}
        {lanternShards.map((shard) => (
          <div
            key={shard.id}
            className="absolute transition-transform duration-300"
            style={{
              width: `${shard.width}px`,
              height: `${shard.height}px`,
              top: `${shard.top}%`,
              left: `${shard.left}%`,
              backgroundColor: shard.color,
              clipPath: shard.clipPath,
              transform: `translate(${offset.x * shard.speed}px, ${offset.y * shard.speed + (scrollY * shard.speed * -0.4)}px) rotate(${shard.rotate + (scrollY * 0.01)}deg)`,
              border: '1px solid rgba(0, 255, 102, 0.18)',
              boxShadow: '0 0 15px rgba(0, 255, 102, 0.05)',
              backdropFilter: 'blur(1px)',
            }}
          />
        ))}

        {/* 4. LAYER: Cosmic Emerald Dust / Quanta Particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${(i % 3) + 2}px`,
                height: `${(i % 3) + 2}px`,
                top: `${(i * 19) % 100}%`,
                left: `${(i * 29) % 100}%`,
                backgroundColor: i % 2 === 0 ? '#00FF66' : '#7CFFB2',
                opacity: 0.3 + (i % 5) * 0.1,
                boxShadow: i % 2 === 0 ? '0 0 8px #00FF66' : '0 0 10px #7CFFB2',
                transform: `translateY(${Math.sin((scrollY + i * 80) * 0.01) * 15}px)`,
              }}
            />
          ))}
        </div>

        {/* 5. LAYER: Interactive Emerald Power-Ring Energy Glow at Cursor */}
        <div 
          className="absolute inset-0 z-10"
          style={{
            background: `
              radial-gradient(800px circle at ${cursorPos.x}px ${cursorPos.y}px, rgba(0, 255, 102, 0.09), transparent 75%),
              radial-gradient(400px circle at ${cursorPos.x}px ${cursorPos.y}px, rgba(124, 255, 178, 0.14), transparent 60%)
            `,
            mixBlendMode: 'plus-lighter'
          }}
        ></div>

        {/* 6. LAYER: Vignette border */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_transparent_20%,_rgba(5,13,10,0.85)_100%)]"></div>
      </div>
    );
  }

  /* ================= SPIDER-MAN COMIC BACKGROUND ================= */
  return (
    <div className={`fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#0A0B1E] transition-all duration-75 ${glitch ? 'invert-[0.05] brightness-125' : ''}`}>
      
      {/* 1. LAYER: Chromatic Aberration Web Background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          transform: `translate(${offset.x * 0.2}px, ${offset.y * 0.2}px) scale(1.1)`,
        }}
      >
        <svg className="w-full h-full" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="webPattern" x="0" y="0" width="500" height="500" patternUnits="userSpaceOnUse">
               <path d="M0 250 Q125 240 250 250 T500 250 M250 0 Q240 125 250 250 T250 500" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="2 4"/>
               <circle cx="250" cy="250" r="100" fill="none" stroke="white" strokeWidth="0.2" opacity="0.5"/>
               <circle cx="250" cy="250" r="200" fill="none" stroke="white" strokeWidth="0.2" opacity="0.3"/>
            </pattern>
          </defs>
          
          {/* Cyan Layer */}
          <rect width="100%" height="100%" fill="url(#webPattern)" className="text-[#00FFFF]" style={{ transform: `translate(2px, 0)` }} />
          {/* Magenta Layer */}
          <rect width="100%" height="100%" fill="url(#webPattern)" className="text-[#FF375F]" style={{ transform: `translate(-2px, 0)` }} />
          {/* Main Layer */}
          <rect width="100%" height="100%" fill="url(#webPattern)" className="text-white opacity-40" />
        </svg>
      </div>

      {/* 2. LAYER: Multiverse Shards (Medium Depth) */}
      {spiderShards.map((shard) => (
        <div
          key={shard.id}
          className="absolute"
          style={{
            width: `${shard.width}px`,
            height: `${shard.height}px`,
            top: `${shard.top}%`,
            left: `${shard.left}%`,
            backgroundColor: shard.color,
            clipPath: shard.clipPath,
            transform: `translate(${offset.x * shard.speed}px, ${offset.y * shard.speed + (scrollY * shard.speed * -0.5)}px) rotate(${shard.rotate + (scrollY * 0.02)}deg)`,
            border: '1px solid rgba(255,255,255,0.05)',
            backdropFilter: 'blur(2px)',
          }}
        />
      ))}

      {/* 3. LAYER: Floating Digital Artifacts (K-Units) */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white opacity-20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `translateY(${Math.sin((scrollY + i * 100) * 0.01) * 20}px)`,
              boxShadow: i % 2 === 0 ? '0 0 8px #FF375F' : '0 0 8px #2A7FFF'
            }}
          />
        ))}
      </div>

      {/* 4. LAYER: Interactive Lighting & Ben-Day Pulse */}
      <div 
        className="absolute inset-0 z-10"
        style={{
          background: `
            radial-gradient(1000px circle at ${cursorPos.x}px ${cursorPos.y}px, rgba(42, 127, 255, 0.08), transparent 80%),
            radial-gradient(600px circle at ${cursorPos.x}px ${cursorPos.y}px, rgba(255, 55, 95, 0.12), transparent 70%)
          `,
          mixBlendMode: 'plus-lighter'
        }}
      ></div>

      {/* 5. LAYER: Animated Halftone (Ben-Day Dots) */}
      <div 
        className="absolute inset-0 opacity-[0.25] mix-blend-overlay"
        style={{
          backgroundImage: `radial-gradient(circle, #fff 0.5px, transparent 0.5px)`,
          backgroundSize: `16px 16px`,
          maskImage: `radial-gradient(circle at ${cursorPos.x}px ${cursorPos.y}px, black, transparent 60%)`,
          WebkitMaskImage: `radial-gradient(circle at ${cursorPos.x}px ${cursorPos.y}px, black, transparent 60%)`,
        }}
      ></div>

      {/* 6. LAYER: Screen Edge "Comic Frame" Scratches */}
      <div className="absolute inset-0 border-[20px] border-black opacity-10 pointer-events-none">
        <div className="absolute inset-0 border-t-2 border-white/5 top-0 animate-pulse"></div>
        <div className="absolute inset-0 border-b-2 border-white/5 bottom-0"></div>
      </div>

      {/* 7. Vignette / Depth Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_transparent_0%,_rgba(10,11,30,0.9)_100%)]"></div>
    </div>
  );
};

export default BackgroundWeb;

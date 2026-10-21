import React, { useEffect, useState, useMemo } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import { useTheme } from '../context/ThemeContext';

interface BackgroundWebProps {
  scroll?: LocomotiveScroll | null;
}

const BackgroundWeb: React.FC<BackgroundWebProps> = ({ scroll }) => {
  const { theme } = useTheme();
  const isLantern = theme === 'green-lantern';
  const isPanther = theme === 'black-panther';
  const isBatman = theme === 'batman';

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
      if (!isLantern && !isPanther && !isBatman && Math.random() > 0.97) {
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
  }, [scroll, isLantern, isPanther]);

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

  // Black Panther / Wakanda Vibranium Shards & Kimoyo Beads
  const pantherShards = useMemo(() => {
    return Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      width: Math.random() * 220 + 70,
      height: Math.random() * 220 + 70,
      top: Math.random() * 100,
      left: Math.random() * 100,
      rotate: Math.random() * 360,
      speed: Math.random() * 0.08 + 0.03,
      color: i % 3 === 0 ? 'rgba(123, 44, 255, 0.08)' : i % 3 === 1 ? 'rgba(0, 229, 255, 0.06)' : 'rgba(169, 179, 193, 0.04)',
      clipPath: i % 3 === 0
        ? 'polygon(50% 0%, 100% 100%, 0% 100%)' // Triangle / Claw tooth
        : i % 3 === 1
        ? 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' // Diamond / Vibranium lattice
        : 'polygon(50% 0%, 100% 75%, 50% 100%, 0% 75%)' // Chevron shield
    }));
  }, []);

  // Gotham Noir Rain Particles
  const gothamRain = useMemo(() => {
    return Array.from({ length: 32 }).map((_, i) => ({
      id: i,
      left: ((i * 3.1) % 100),
      top: ((i * 7.9) % 100),
      height: 18 + (i % 4) * 8,
      speed: 0.12 + (i % 3) * 0.05,
      opacity: 0.12 + (i % 4) * 0.08,
    }));
  }, []);

  if (isBatman) {
    /* ================= BATMAN / GOTHAM NOIR BACKGROUND ================= */
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#080A0F] transition-colors duration-400">
        {/* 1. LAYER: Deep Atmospheric Horizon & Cloud Glow */}
        <div 
          className="absolute inset-0 opacity-70"
          style={{
            background: `
              radial-gradient(1100px circle at 50% ${15 + (scrollY * 0.02)}%, rgba(245, 197, 66, 0.06), transparent 70%),
              radial-gradient(900px circle at 20% ${65 + (scrollY * 0.01)}%, rgba(101, 117, 139, 0.08), transparent 60%),
              radial-gradient(800px circle at 85% ${75 + (scrollY * 0.01)}%, rgba(23, 28, 38, 0.8), transparent 70%)
            `,
          }}
        ></div>

        {/* 2. LAYER: Gotham Noir Tactical Radar Grid */}
        <div 
          className="absolute inset-0 opacity-40 gotham-grid"
          style={{
            transform: `translate(${offset.x * 0.1}px, ${offset.y * 0.1}px)`,
          }}
        ></div>

        {/* 3. LAYER: Ambient Bat-Signal Searchlight Beam in Upper Sky */}
        <div 
          className="absolute top-[-10%] right-[12%] w-[420px] h-[750px] opacity-60 animate-bat-signal pointer-events-none origin-bottom-right"
          style={{
            transform: `rotate(${offset.x * 0.05}deg)`,
          }}
        >
          {/* Conical Searchlight Beam */}
          <div 
            className="w-full h-full"
            style={{
              background: 'linear-gradient(135deg, rgba(245, 197, 66, 0.18) 0%, rgba(245, 197, 66, 0.05) 50%, transparent 80%)',
              clipPath: 'polygon(75% 100%, 85% 100%, 100% 0%, 20% 0%)',
              filter: 'blur(10px)',
            }}
          ></div>

          {/* Bat-Signal Cloud Projection Halo */}
          <div className="absolute top-[8%] left-[28%] w-32 h-20 rounded-[50%] bg-[#F5C542]/20 blur-md flex items-center justify-center shadow-[0_0_40px_rgba(245,197,66,0.35)]">
            {/* Subtle Bat silhouette inside the spotlight */}
            <svg className="w-16 h-10 text-[#080A0F] opacity-75 drop-shadow-[0_0_4px_#080A0F]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 5.5l1.3 2.2c1.7-.2 3.4.4 4.7 1.5-1.1 1.3-1.1 3.1-.3 4.5 2.1-.2 4.1.8 5.3 2.5-3.3 1.5-6.9.5-9-2.2-.4 1.2-1.3 2.1-2 2.2-.7-.1-1.6-1-2-2.2-2.1 2.7-5.7 3.7-9 2.2 1.2-1.7 3.2-2.7 5.3-2.5.8-1.4.8-3.2-.3-4.5 1.3-1.1 3-1.7 4.7-1.5L12 5.5z" />
            </svg>
          </div>
        </div>

        {/* 4. LAYER: Gotham Atmospheric Drifting Fog */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
          <div 
            className="absolute -bottom-10 left-[-20%] w-[140%] h-64 animate-gotham-fog"
            style={{
              background: 'radial-gradient(ellipse at 50% 80%, rgba(101, 117, 139, 0.2), transparent 70%)',
              filter: 'blur(20px)',
            }}
          ></div>
        </div>

        {/* 5. LAYER: Gotham Skyline Silhouette Layer at Horizon */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-44 opacity-25 pointer-events-none"
          style={{
            transform: `translateY(${Math.min(scrollY * 0.05, 30)}px)`,
          }}
        >
          <svg className="w-full h-full text-[#11151D]" preserveAspectRatio="none" viewBox="0 0 1200 300" fill="currentColor">
            {/* Distant Gotham Skyscrapers, Towers & Radio Spire silhouette */}
            <path d="M0,300 L0,220 L30,220 L30,240 L50,240 L50,180 L60,180 L60,150 L65,150 L65,100 L68,100 L68,150 L75,150 L75,180 L90,180 L90,260 L140,260 L140,190 L170,190 L170,160 L185,160 L185,140 L195,140 L195,80 L198,80 L198,140 L210,140 L210,210 L240,210 L240,250 L280,250 L280,170 L310,170 L310,140 L330,140 L330,200 L370,200 L370,230 L400,230 L400,160 L430,160 L430,120 L445,120 L445,60 L448,60 L448,120 L460,120 L460,190 L500,190 L500,240 L560,240 L560,180 L590,180 L590,150 L620,150 L620,220 L670,220 L670,140 L700,140 L700,100 L710,100 L710,50 L713,50 L713,100 L725,100 L725,170 L760,170 L760,240 L810,240 L810,180 L840,180 L840,130 L870,130 L870,200 L910,200 L910,160 L940,160 L940,90 L945,90 L945,40 L948,40 L948,90 L960,90 L960,170 L990,170 L990,230 L1040,230 L1040,170 L1080,170 L1080,130 L1110,130 L1110,210 L1150,210 L1150,250 L1200,250 L1200,300 Z" />
            {/* Blinking radio beacon lights atop towers */}
            <circle cx="66" cy="98" r="3" fill="#F5C542" className="animate-pulse" />
            <circle cx="196" cy="78" r="3" fill="#EF4444" className="animate-pulse" />
            <circle cx="446" cy="58" r="3" fill="#F5C542" className="animate-pulse" />
            <circle cx="711" cy="48" r="3" fill="#EF4444" className="animate-pulse" />
            <circle cx="946" cy="38" r="3" fill="#F5C542" className="animate-pulse" />
          </svg>
        </div>

        {/* 6. LAYER: Sparse Gotham Rain Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {gothamRain.map((drop) => (
            <div
              key={drop.id}
              className="absolute bg-gradient-to-b from-transparent via-[#65758B] to-[#F4F5F7]"
              style={{
                left: `${drop.left}%`,
                top: `${(drop.top + (scrollY * drop.speed)) % 100}%`,
                width: '1px',
                height: `${drop.height}px`,
                opacity: drop.opacity,
                transform: 'rotate(-8deg)',
              }}
            />
          ))}
        </div>

        {/* 7. LAYER: Interactive Tactical Flashlight / Sonar Glow at Cursor */}
        <div 
          className="absolute inset-0 z-10"
          style={{
            background: `
              radial-gradient(750px circle at ${cursorPos.x}px ${cursorPos.y}px, rgba(245, 197, 66, 0.05), transparent 75%),
              radial-gradient(350px circle at ${cursorPos.x}px ${cursorPos.y}px, rgba(101, 117, 139, 0.09), transparent 60%)
            `,
            mixBlendMode: 'plus-lighter'
          }}
        ></div>

        {/* 8. LAYER: Dark Cinematic Gotham Noir Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_transparent_20%,_rgba(8,10,15,0.9)_100%)]"></div>
      </div>
    );
  }

  if (isPanther) {
    /* ================= BLACK PANTHER / WAKANDA VIBRANIUM BACKGROUND ================= */
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#08090D] transition-colors duration-400">
        {/* 1. LAYER: Vibranium Kinetic Energy Aurora Gradient */}
        <div 
          className="absolute inset-0 opacity-60"
          style={{
            background: `
              radial-gradient(1000px circle at 50% ${25 + (scrollY * 0.02)}%, rgba(123, 44, 255, 0.18), transparent 70%),
              radial-gradient(700px circle at 80% ${60 + (scrollY * 0.01)}%, rgba(0, 229, 255, 0.08), transparent 60%)
            `,
          }}
        ></div>

        {/* 2. LAYER: Wakandan Geometric Weave & Triangular Lattice Grid */}
        <div 
          className="absolute inset-0 opacity-35 wakanda-grid"
          style={{
            transform: `translate(${offset.x * 0.12}px, ${offset.y * 0.12}px)`,
          }}
        ></div>

        {/* 3. LAYER: Floating Vibranium Shards & Kinetic Teeth */}
        {pantherShards.map((shard) => (
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
              transform: `translate(${offset.x * shard.speed}px, ${offset.y * shard.speed + (scrollY * shard.speed * -0.4)}px) rotate(${shard.rotate + (scrollY * 0.015)}deg)`,
              border: '1px solid rgba(123, 44, 255, 0.22)',
              boxShadow: '0 0 15px rgba(123, 44, 255, 0.08)',
              backdropFilter: 'blur(1px)',
            }}
          />
        ))}

        {/* 4. LAYER: Kinetic Nano-Quanta & Kimoyo Energy Beads */}
        <div className="absolute inset-0">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${(i % 3) + 2}px`,
                height: `${(i % 3) + 2}px`,
                top: `${(i * 17) % 100}%`,
                left: `${(i * 31) % 100}%`,
                backgroundColor: i % 2 === 0 ? '#7B2CFF' : '#00E5FF',
                opacity: 0.35 + (i % 5) * 0.1,
                boxShadow: i % 2 === 0 ? '0 0 8px #7B2CFF' : '0 0 10px #00E5FF',
                transform: `translateY(${Math.sin((scrollY + i * 85) * 0.01) * 16}px)`,
              }}
            />
          ))}
        </div>

        {/* 5. LAYER: Interactive Kinetic Pulse Glow at Cursor */}
        <div 
          className="absolute inset-0 z-10"
          style={{
            background: `
              radial-gradient(750px circle at ${cursorPos.x}px ${cursorPos.y}px, rgba(123, 44, 255, 0.12), transparent 75%),
              radial-gradient(350px circle at ${cursorPos.x}px ${cursorPos.y}px, rgba(0, 229, 255, 0.15), transparent 60%)
            `,
            mixBlendMode: 'plus-lighter'
          }}
        ></div>

        {/* 6. LAYER: Metallic Vignette Border */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_transparent_25%,_rgba(8,9,13,0.9)_100%)]"></div>
      </div>
    );
  }

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

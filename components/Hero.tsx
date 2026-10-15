
import React, { useState, useEffect, useRef } from 'react';
import LocomotiveScroll from 'locomotive-scroll';

interface HeroProps {
  scroll: LocomotiveScroll | null;
}

const Hero: React.FC<HeroProps> = ({ scroll }) => {
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
        {/* Radial Lines */}
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

        {/* Curved Concentric Webbing Layers */}
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

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center items-start px-10 md:px-20 pt-20 overflow-hidden honeycomb"
    >
      {/* Background Web Pattern - Interactive */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] z-0 pointer-events-none opacity-60 transition-transform duration-300 ease-out"
        style={{
          transform: `translate(calc(-50% + ${mousePos.x * 40}px), calc(-50% + ${mousePos.y * 40}px)) skew(${scrollProgress * 5}deg, ${scrollProgress * 2}deg)`,
          filter: `blur(${scrollProgress * 4}px)`,
        }}
      >
        <div className="w-full h-full animate-float-slow">
          {renderCobweb()}
        </div>
      </div>

      {/* Red Glow Overlay */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,55,95,0.08)_0%,_transparent_70%)] pointer-events-none transition-opacity duration-500"
        style={{ opacity: 0.5 + Math.abs(mousePos.x) * 0.5 }}
      ></div>

      <div className="relative z-10 max-w-4xl">
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
            onClick={() => {
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
            }}
            className="thwip-active bg-[#FF375F] border-4 border-black font-comic text-2xl text-black px-8 py-3 rounded-none shadow-[6px_6px_0px_0px_rgba(255,222,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all outline-none cursor-pointer"
          >
            View My Web
          </button>
          <div className="flex items-center text-xl font-marker text-[#2A7FFF]/80 italic">
            "With great code comes great responsibility."
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

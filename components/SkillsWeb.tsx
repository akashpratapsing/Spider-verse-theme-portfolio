import React from 'react';
import { skillCategories } from '../constants';
import { useTheme } from '../context/ThemeContext';

const SkillsWeb: React.FC = () => {
  const { theme } = useTheme();
  const isLantern = theme === 'green-lantern';

  return (
    <section 
      id="skills" 
      className={`relative py-24 px-6 md:px-12 transition-colors duration-400 ${
        isLantern ? 'bg-[#050D0A] construct-grid' : 'bg-[#0A0B1E]'
      }`}
    >
      {/* Background Overlays */}
      {isLantern ? (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_rgba(0,255,102,0.06)_0%,_transparent_75%)] pointer-events-none"></div>
      ) : (
        <div className="absolute inset-0 halftone opacity-[0.03] pointer-events-none"></div>
      )}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="mb-16">
          {isLantern ? (
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-[#05140d] border border-[#00FF66]/50 shadow-[0_0_12px_rgba(0,255,102,0.2)] mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-pulse"></span>
                <span className="font-orbitron text-xs text-[#00FF66] uppercase tracking-[0.25em]">
                  Sector 2814 Capabilities
                </span>
              </div>
              <h3 className="font-orbitron text-4xl sm:text-5xl md:text-6xl text-[#F5FFF8] uppercase tracking-wider font-extrabold emerald-text-glow">
                Technical Arsenal
              </h3>
              <p className="font-rajdhani text-[#7CFFB2] text-xl md:text-2xl font-bold mt-2 tracking-wide">
                Hard-Light Architecture & Ring Execution Layers
              </p>
            </div>
          ) : (
            <div>
              <h3 className="font-comic text-5xl md:text-6xl text-[#F5F5F5] uppercase tracking-tighter inline-block relative">
                Technical Arsenal
                <div className="absolute -bottom-2 left-0 w-full h-2 bg-[#FF375F] transform -skew-x-12"></div>
              </h3>
              <p className="font-marker text-[#2A7FFF] text-xl mt-4 opacity-80">
                Architecture & Implementation Layers
              </p>
            </div>
          )}
        </div>

        {/* Skill Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((cat, idx) => {
            if (isLantern) {
              return (
                <div
                  key={idx}
                  className="group relative bg-[#071912]/90 border border-[#00FF66]/40 p-7 rounded-xl transition-all duration-300 hover:-translate-y-2 hover:border-[#00FF66] shadow-[0_0_20px_rgba(0,255,102,0.1)] hover:shadow-[0_0_30px_rgba(0,255,102,0.35)] backdrop-blur-sm"
                >
                  {/* Holographic Construct Corner Accents */}
                  <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none">
                    <div className="absolute top-0 right-0 w-full h-0.5 bg-[#00FF66] shadow-[0_0_8px_#00FF66]"></div>
                    <div className="absolute top-0 right-0 h-full w-0.5 bg-[#00FF66] shadow-[0_0_8px_#00FF66]"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 pointer-events-none">
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#00FF66]/50"></div>
                    <div className="absolute bottom-0 left-0 h-full w-0.5 bg-[#00FF66]/50"></div>
                  </div>

                  {/* Header with Power Ring Battery Motif */}
                  <div className="flex items-center gap-3.5 mb-5">
                    <div className="w-8 h-8 rounded-lg bg-[#00FF66]/15 border border-[#00FF66] flex items-center justify-center text-[#00FF66] shadow-[0_0_10px_rgba(0,255,102,0.4)] group-hover:scale-110 transition-transform">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="5" y1="4" x2="19" y2="4" />
                        <line x1="5" y1="20" x2="19" y2="20" />
                        <circle cx="12" cy="12" r="6" />
                        <circle cx="12" cy="12" r="2.5" fill="#00FF66" />
                      </svg>
                    </div>
                    <h4 className="font-orbitron text-xl md:text-2xl text-[#F5FFF8] uppercase font-bold tracking-wider">
                      {cat.title}
                    </h4>
                  </div>

                  {/* Glowing Emerald Energy Divider */}
                  <div className="w-full h-0.5 bg-gradient-to-r from-[#00FF66] via-[#7CFFB2]/60 to-transparent mb-5 rounded-full"></div>

                  {/* Skills List */}
                  <ul className="space-y-3.5">
                    {cat.skills.map((skill, sIdx) => (
                      <li key={sIdx} className="flex items-center gap-3 font-rajdhani text-lg font-semibold text-[#F5FFF8]/90 tracking-wide group-hover:text-[#F5FFF8] transition-colors">
                        <span className="text-[#00FF66] text-xs font-bold drop-shadow-[0_0_6px_#00FF66]">
                          ◈
                        </span>
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Subtle Construct Watermark */}
                  <div className="mt-6 pt-4 border-t border-[#00FF66]/15 flex items-center justify-between text-xs font-mono text-[#7CFFB2]/50 uppercase tracking-widest">
                    <span>Power Conduit</span>
                    <span className="text-[#00FF66]">Active // 100%</span>
                  </div>
                </div>
              );
            }

            // Spider-Man Original Card
            return (
              <div
                key={idx}
                className="group relative bg-[#151735] border-4 border-black p-8 rounded-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_#000]"
              >
                {/* Layered Accent (Spider-sense border glow) */}
                <div 
                  className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity blur-md -z-10"
                  style={{ backgroundColor: cat.color }}
                ></div>

                <div className="flex items-center gap-4 mb-6">
                  <div 
                    className="w-3 h-8 transform -skew-x-12"
                    style={{ backgroundColor: cat.color }}
                  ></div>
                  <h4 className="font-comic text-3xl text-[#F5F5F5] uppercase tracking-wider">
                    {cat.title}
                  </h4>
                </div>

                {/* Yellow Divider */}
                <div className="w-full h-1 bg-[#FFDE00]/30 mb-6 rounded-full"></div>

                <ul className="space-y-4">
                  {cat.skills.map((skill, sIdx) => (
                    <li key={sIdx} className="flex items-center gap-3 text-lg text-[#F5F5F5]/90 font-sans tracking-wide">
                      <span className="text-[#FF375F] text-xl font-bold">›</span>
                      {skill}
                    </li>
                  ))}
                </ul>

                {/* Ben-Day dots shading */}
                <div className="absolute bottom-0 right-0 w-24 h-24 ben-day opacity-10 pointer-events-none rounded-br-lg"></div>
              </div>
            );
          })}
        </div>

        {/* Footer info bar */}
        <div className={`mt-16 pt-8 border-t flex justify-between items-center text-sm ${
          isLantern 
            ? 'border-[#00FF66]/20 font-rajdhani text-[#7CFFB2]/70 font-semibold uppercase tracking-wider' 
            : 'border-white/5 font-marker text-[#2A7FFF]/60 italic'
        }`}>
          <span>{isLantern ? '// Oa Mainframe Synchronized' : '// Layered Service Architecture'}</span>
          <span>{isLantern ? '// Sector 2814 Ready' : '// Multiverse Ready'}</span>
        </div>
      </div>
    </section>
  );
};

export default SkillsWeb;

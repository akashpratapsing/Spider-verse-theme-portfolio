import React from 'react';
import { skillCategories } from '../constants';
import { useTheme } from '../context/ThemeContext';

const SkillsWeb: React.FC = () => {
  const { theme } = useTheme();
  const isLantern = theme === 'green-lantern';
  const isPanther = theme === 'black-panther';
  const isBatman = theme === 'batman';

  return (
    <section 
      id="skills" 
      className={`relative py-24 px-6 md:px-12 transition-colors duration-400 ${
        isBatman ? 'bg-[#080A0F] gotham-grid' : isPanther ? 'bg-[#08090D] wakanda-grid' : isLantern ? 'bg-[#050D0A] construct-grid' : 'bg-[#0A0B1E]'
      }`}
    >
      {/* Background Overlays */}
      {isBatman ? (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_rgba(245,197,66,0.06)_0%,_rgba(101,117,139,0.03)_50%,_transparent_75%)] pointer-events-none"></div>
      ) : isPanther ? (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_rgba(123,44,255,0.08)_0%,_rgba(0,229,255,0.04)_50%,_transparent_75%)] pointer-events-none"></div>
      ) : isLantern ? (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_rgba(0,255,102,0.06)_0%,_transparent_75%)] pointer-events-none"></div>
      ) : (
        <div className="absolute inset-0 halftone opacity-[0.03] pointer-events-none"></div>
      )}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="mb-16">
          {isBatman ? (
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-[#11151D] border border-[#343B48] shadow-[0_0_12px_rgba(0,0,0,0.5)] mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F5C542] animate-pulse"></span>
                <span className="font-orbitron text-xs text-[#F5C542] uppercase tracking-[0.25em]">
                  Wayne Enterprises R&D // Tactical Capabilities
                </span>
              </div>
              <h3 className="font-orbitron text-4xl sm:text-5xl md:text-6xl text-[#F4F5F7] uppercase tracking-wider font-extrabold batman-gold-glow">
                Tactical Arsenal
              </h3>
              <p className="font-rajdhani text-[#A7AFBC] text-xl md:text-2xl font-bold mt-2 tracking-wide">
                Distributed Architecture, Forensic Systems & Cloud Infrastructure
              </p>
            </div>
          ) : isPanther ? (
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-[#0e0f18] border border-[#7B2CFF]/50 shadow-[0_0_12px_rgba(123,44,255,0.25)] mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse"></span>
                <span className="font-orbitron text-xs text-[#00E5FF] uppercase tracking-[0.25em]">
                  Wakanda Design Group · Nanotech
                </span>
              </div>
              <h3 className="font-orbitron text-4xl sm:text-5xl md:text-6xl text-[#F5F5F5] uppercase tracking-wider font-extrabold vibranium-text-glow">
                Technical Arsenal
              </h3>
              <p className="font-rajdhani text-[#A9B3C1] text-xl md:text-2xl font-bold mt-2 tracking-wide">
                Vibranium Protocols & Advanced Holographic Systems
              </p>
            </div>
          ) : isLantern ? (
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
            const comicTags = ['THWIP!', 'BAM!', 'POW!', 'ZAP!', 'KAPOW!', 'WHAM!'];
            const comicTag = comicTags[idx % comicTags.length];

            if (isBatman) {
              return (
                <div
                  key={idx}
                  className="group relative bg-[#171C26]/90 border border-[#343B48] p-7 rounded-xl transition-all duration-300 hover:-translate-y-2 hover:border-[#F5C542] shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(245,197,66,0.25)] backdrop-blur-sm overflow-hidden"
                >
                  {/* Tactical Corner Bracket Accents */}
                  <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none">
                    <div className="absolute top-0 right-0 w-full h-0.5 bg-[#F5C542] shadow-[0_0_8px_#F5C542]"></div>
                    <div className="absolute top-0 right-0 h-full w-0.5 bg-[#F5C542] shadow-[0_0_8px_#F5C542]"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 pointer-events-none">
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#65758B]/60"></div>
                    <div className="absolute bottom-0 left-0 h-full w-0.5 bg-[#65758B]/60"></div>
                  </div>

                  {/* Header with Bat-Insignia Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3.5">
                      <div className="w-8 h-8 rounded-lg bg-[#11151D] border border-[#343B48] flex items-center justify-center text-[#F5C542] shadow-[0_0_10px_rgba(245,197,66,0.3)] group-hover:scale-110 group-hover:border-[#F5C542] transition-all">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 5.5l1.3 2.2c1.7-.2 3.4.4 4.7 1.5-1.1 1.3-1.1 3.1-.3 4.5 2.1-.2 4.1.8 5.3 2.5-3.3 1.5-6.9.5-9-2.2-.4 1.2-1.3 2.1-2 2.2-.7-.1-1.6-1-2-2.2-2.1 2.7-5.7 3.7-9 2.2 1.2-1.7 3.2-2.7 5.3-2.5.8-1.4.8-3.2-.3-4.5 1.3-1.1 3-1.7 4.7-1.5L12 5.5z" />
                        </svg>
                      </div>
                      <h4 className="font-orbitron text-xl md:text-2xl text-[#F4F5F7] uppercase font-bold tracking-wider group-hover:text-[#F5C542] transition-colors">
                        {cat.title}
                      </h4>
                    </div>
                    <span className="text-[10px] font-mono text-[#F5C542] border border-[#343B48] px-2 py-0.5 rounded bg-[#11151D] hidden sm:inline">
                      DIV-0{idx + 1}
                    </span>
                  </div>

                  {/* Tactical Divider */}
                  <div className="w-full h-0.5 bg-gradient-to-r from-[#F5C542] via-[#65758B]/60 to-transparent mb-5 rounded-full"></div>

                  {/* Skills List */}
                  <ul className="space-y-3.5">
                    {cat.skills.map((skill, sIdx) => (
                      <li key={sIdx} className="flex items-center gap-3 font-rajdhani text-lg font-semibold text-[#F4F5F7]/90 tracking-wide group-hover:text-[#F4F5F7] transition-colors">
                        <span className="text-[#F5C542] text-xs font-bold drop-shadow-[0_0_6px_#F5C542]">
                          ◈
                        </span>
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Card Footer Telemetry */}
                  <div className="mt-6 pt-4 border-t border-[#343B48]/60 flex items-center justify-between text-xs font-mono text-[#A7AFBC]/60 uppercase tracking-widest">
                    <span>WAYNE ARCHIVE // SEC-0{idx + 1}</span>
                    <span className="text-[#F5C542]">STATUS: SECURE</span>
                  </div>
                </div>
              );
            }

            if (isPanther) {
              return (
                <div
                  key={idx}
                  className="group relative bg-[#0e0f18]/90 border border-[#7B2CFF]/40 p-7 rounded-xl transition-all duration-300 hover:-translate-y-2 hover:border-[#00E5FF] shadow-[0_0_20px_rgba(123,44,255,0.12)] hover:shadow-[0_0_35px_rgba(123,44,255,0.4)] backdrop-blur-sm overflow-hidden"
                >
                  {/* Wakandan Top Chevron Trim */}
                  <div className="absolute top-0 left-0 w-full h-1 wakanda-chevron-strip opacity-70"></div>

                  {/* Wakandan Geometric Corner Teeth Accents */}
                  <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none">
                    <div className="absolute top-0 right-0 w-full h-0.5 bg-[#7B2CFF] shadow-[0_0_8px_#7B2CFF]"></div>
                    <div className="absolute top-0 right-0 h-full w-0.5 bg-[#00E5FF] shadow-[0_0_8px_#00E5FF]"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 pointer-events-none">
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#00E5FF]/60"></div>
                    <div className="absolute bottom-0 left-0 h-full w-0.5 bg-[#7B2CFF]/60"></div>
                  </div>

                  {/* Header with Panther Motif & Kimoyo Bead */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3.5">
                      <div className="w-8 h-8 rounded-lg bg-[#7B2CFF]/20 border border-[#7B2CFF] flex items-center justify-center text-[#00E5FF] shadow-[0_0_10px_rgba(123,44,255,0.5)] group-hover:scale-110 transition-transform">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 5L7 8V12L4 15L8 20L12 21L16 20L20 15L17 12V8L20 5L16 6L12 4L8 6L4 5Z" fill="#7B2CFF" fillOpacity="0.3" />
                          <path d="M8 11L10 12L8 13Z" fill="#00E5FF" />
                          <path d="M16 11L14 12L16 13Z" fill="#00E5FF" />
                        </svg>
                      </div>
                      <h4 className="font-orbitron text-xl md:text-2xl text-[#F5F5F5] uppercase font-bold tracking-wider group-hover:text-[#00E5FF] transition-colors">
                        {cat.title}
                      </h4>
                    </div>
                    {/* Kimoyo Status Indicator */}
                    <div className="flex items-center gap-1.5" title="Kimoyo Bead Online">
                      <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse"></span>
                      <span className="text-[10px] font-mono text-[#00E5FF] tracking-widest hidden sm:inline">KIMOYO</span>
                    </div>
                  </div>

                  {/* Glowing Vibranium Energy Divider */}
                  <div className="w-full h-0.5 bg-gradient-to-r from-[#7B2CFF] via-[#00E5FF]/70 to-transparent mb-5 rounded-full"></div>

                  {/* Skills List */}
                  <ul className="space-y-3.5">
                    {cat.skills.map((skill, sIdx) => (
                      <li key={sIdx} className="flex items-center gap-3 font-rajdhani text-lg font-semibold text-[#F5F5F5]/90 tracking-wide group-hover:text-[#F5F5F5] transition-colors">
                        <span className="text-[#00E5FF] text-xs font-bold drop-shadow-[0_0_6px_#00E5FF]">
                          ◆
                        </span>
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Card Footer Telemetry */}
                  <div className="mt-6 pt-4 border-t border-[#7B2CFF]/15 flex items-center justify-between text-xs font-mono text-[#A9B3C1]/60 uppercase tracking-widest">
                    <span>WDG // VIBRANIUM 99.8%</span>
                    <span className="text-[#00E5FF]">ACTIVE // 100%</span>
                  </div>
                </div>
              );
            }

            if (isLantern) {
              return (
                <div
                  key={idx}
                  className="group relative bg-[#071912]/90 border border-[#00FF66]/40 p-7 rounded-xl transition-all duration-300 hover:-translate-y-2 hover:border-[#00FF66] shadow-[0_0_20px_rgba(0,255,102,0.1)] hover:shadow-[0_0_30px_rgba(0,255,102,0.35)] backdrop-blur-sm overflow-hidden"
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

                  {/* Header with Power Ring Battery Motif & Hard-Light Frequency */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3.5">
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
                    {/* Construct Frequency */}
                    <span className="text-[10px] font-mono text-[#00FF66] border border-[#00FF66]/30 px-2 py-0.5 rounded bg-[#00FF66]/10 hidden sm:inline">
                      520 THz
                    </span>
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
                    <span>CONSTRUCT MATRIX // SEC-2814</span>
                    <span className="text-[#00FF66]">ACTIVE // 100%</span>
                  </div>
                </div>
              );
            }

            // Spider-Man Original Card with Enhanced Comic Details
            return (
              <div
                key={idx}
                className="group relative bg-[#151735] border-4 border-black p-8 rounded-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_#000] overflow-hidden"
              >
                {/* Comic Action Sound Sticker (THWIP!, BAM!, POW!) */}
                <div className="absolute top-3 right-3 bg-[#FFDE00] border-2 border-black text-black font-comic text-xs px-2 py-0.5 rotate-6 uppercase tracking-wider shadow-[2px_2px_0px_0px_#FF375F] group-hover:scale-110 transition-transform">
                  {comicTag}
                </div>

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

                {/* Corner Web SVG Overlay */}
                <div className="absolute -bottom-4 -right-4 w-20 h-20 opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity">
                  <svg viewBox="0 0 100 100" fill="none" stroke="#FFDE00" strokeWidth="1">
                    <line x1="100" y1="0" x2="100" y2="100" />
                    <line x1="0" y1="100" x2="100" y2="100" />
                    <line x1="30" y1="100" x2="100" y2="30" />
                    <line x1="60" y1="100" x2="100" y2="60" />
                    <path d="M 50 100 Q 75 75 100 50" />
                    <path d="M 25 100 Q 60 60 100 25" />
                  </svg>
                </div>

                {/* Ben-Day dots shading */}
                <div className="absolute bottom-0 right-0 w-24 h-24 comic-dots opacity-25 pointer-events-none rounded-br-lg"></div>
              </div>
            );
          })}
        </div>

        {/* Footer info bar */}
        <div className={`mt-16 pt-8 border-t flex justify-between items-center text-sm ${
          isBatman
            ? 'border-[#343B48] font-rajdhani text-[#A7AFBC] font-semibold uppercase tracking-wider'
            : isPanther
            ? 'border-[#7B2CFF]/20 font-rajdhani text-[#A9B3C1] font-semibold uppercase tracking-wider'
            : isLantern 
            ? 'border-[#00FF66]/20 font-rajdhani text-[#7CFFB2]/70 font-semibold uppercase tracking-wider' 
            : 'border-white/5 font-marker text-[#2A7FFF]/60 italic'
        }`}>
          <span>{isBatman ? '// Batcomputer Tactical Grid Synchronized' : isPanther ? '// Shuri Lab Mainframe Synchronized' : isLantern ? '// Oa Mainframe Synchronized' : '// Layered Service Architecture'}</span>
          <span>{isBatman ? '// Wayne Tech Defensive Grid Ready' : isPanther ? '// Wakanda Prime Ready' : isLantern ? '// Sector 2814 Ready' : '// Multiverse Ready'}</span>
        </div>
      </div>
    </section>
  );
};

export default SkillsWeb;

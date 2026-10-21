import React from 'react';
import { EXPERIENCE_DATA } from '../constants';
import { useTheme } from '../context/ThemeContext';

const ExperienceWeb: React.FC = () => {
  const { theme } = useTheme();
  const isLantern = theme === 'green-lantern';
  const isPanther = theme === 'black-panther';
  const isBatman = theme === 'batman';

  return (
    <section 
      id="experience" 
      className={`py-24 px-6 md:px-12 relative overflow-hidden transition-colors duration-400 ${
        isBatman ? 'bg-[#080A0F] gotham-grid' : isPanther ? 'bg-[#08090D] wakanda-grid' : isLantern ? 'bg-[#050D0A] construct-grid' : 'bg-[#0A0B1E]'
      }`}
    >
      {/* Background radial glow */}
      {isBatman ? (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(245,197,66,0.06)_0%,_rgba(101,117,139,0.03)_50%,_transparent_75%)] pointer-events-none"></div>
      ) : isPanther ? (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(123,44,255,0.08)_0%,_rgba(0,229,255,0.04)_50%,_transparent_75%)] pointer-events-none"></div>
      ) : isLantern ? (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(0,255,102,0.06)_0%,_transparent_75%)] pointer-events-none"></div>
      ) : (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(255,55,95,0.06)_0%,_transparent_75%)] pointer-events-none"></div>
      )}

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center mb-20 text-center">
          {isBatman ? (
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-[#11151D] border border-[#343B48] shadow-[0_0_12px_rgba(0,0,0,0.5)] mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F5C542] animate-pulse"></span>
                <span className="font-orbitron text-xs text-[#F5C542] uppercase tracking-[0.25em]">
                  Gotham Operations Log // Tactical Deployments
                </span>
              </div>
              <h3 className="font-orbitron text-4xl sm:text-5xl md:text-6xl text-[#F4F5F7] uppercase tracking-wider font-extrabold batman-gold-glow">
                Operational Timeline
              </h3>
              <p className="font-rajdhani text-[#A7AFBC] text-xl md:text-2xl font-bold mt-2 tracking-wide">
                Field Engineering Deployments & High-Impact Software Assignments
              </p>
            </div>
          ) : isPanther ? (
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-[#0e0f18] border border-[#7B2CFF]/50 shadow-[0_0_12px_rgba(123,44,255,0.25)] mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse"></span>
                <span className="font-orbitron text-xs text-[#00E5FF] uppercase tracking-[0.25em]">
                  Wakandan Royal Service Record
                </span>
              </div>
              <h3 className="font-orbitron text-4xl sm:text-5xl md:text-6xl text-[#F5F5F5] uppercase tracking-wider font-extrabold vibranium-text-glow">
                Mission Timeline
              </h3>
              <p className="font-rajdhani text-[#A9B3C1] text-xl md:text-2xl font-bold mt-2 tracking-wide">
                Strategic Deployments & Engineering Assignments
              </p>
            </div>
          ) : isLantern ? (
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-[#05140d] border border-[#00FF66]/50 shadow-[0_0_12px_rgba(0,255,102,0.2)] mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-pulse"></span>
                <span className="font-orbitron text-xs text-[#00FF66] uppercase tracking-[0.25em]">
                  Corps Service Record
                </span>
              </div>
              <h3 className="font-orbitron text-4xl sm:text-5xl md:text-6xl text-[#F5FFF8] uppercase tracking-wider font-extrabold emerald-text-glow">
                Mission Timeline
              </h3>
              <p className="font-rajdhani text-[#7CFFB2] text-xl md:text-2xl font-bold mt-2 tracking-wide">
                Professional Deployments & Engineering Assignments
              </p>
            </div>
          ) : (
            <div>
              <div className="bg-[#FFDE00] text-black border-4 border-black px-4 py-1.5 -rotate-2 font-comic text-xl uppercase tracking-wider shadow-[4px_4px_0px_0px_#FF375F] mb-4 inline-block">
                Mission Timeline
              </div>
              <h3 className="font-comic text-5xl md:text-6xl text-[#F5F5F5] uppercase tracking-tighter drop-shadow-[4px_4px_0px_#2A7FFF]">
                Work Experience
              </h3>
              <p className="font-marker text-[#2A7FFF] text-xl mt-3 opacity-90">
                Professional Roles & Deployments Across the Tech-Verse
              </p>
            </div>
          )}
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Central Timeline Spine for Desktop */}
          <div 
            className={`absolute left-1/2 transform -translate-x-1/2 w-1.5 h-full hidden md:block rounded-full ${
              isBatman
                ? 'bg-gradient-to-b from-[#F5C542] via-[#65758B] to-[#343B48] opacity-60 shadow-[0_0_12px_rgba(245,197,66,0.5)]'
                : isPanther
                ? 'bg-gradient-to-b from-[#7B2CFF] via-[#00E5FF] to-[#A9B3C1] opacity-60 shadow-[0_0_12px_rgba(123,44,255,0.6)]'
                : isLantern
                ? 'bg-gradient-to-b from-[#00FF66] via-[#7CFFB2] to-[#008F4C] opacity-50 shadow-[0_0_12px_rgba(0,255,102,0.5)]'
                : 'bg-gradient-to-b from-[#FF375F] via-[#2A7FFF] to-[#FFDE00] opacity-40'
            }`}
          ></div>

          {/* Left Timeline Spine for Mobile */}
          <div 
            className={`absolute left-6 top-0 w-1 h-full md:hidden rounded-full ${
              isBatman
                ? 'bg-gradient-to-b from-[#F5C542] via-[#65758B] to-[#343B48] opacity-50'
                : isPanther
                ? 'bg-gradient-to-b from-[#7B2CFF] via-[#00E5FF] to-[#A9B3C1] opacity-50'
                : isLantern
                ? 'bg-gradient-to-b from-[#00FF66] via-[#7CFFB2] to-[#008F4C] opacity-50'
                : 'bg-gradient-to-b from-[#FF375F] via-[#2A7FFF] to-[#FFDE00] opacity-30'
            }`}
          ></div>

          <div className="space-y-12 md:space-y-16">
            {EXPERIENCE_DATA.map((exp, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={exp.id}
                  className="relative flex flex-col md:flex-row items-center"
                >
                  {/* Left Column (Desktop) */}
                  <div
                    className={`w-full md:w-1/2 pl-14 md:pl-0 ${
                      isEven ? 'md:pr-14 md:text-right' : 'md:order-2 md:pl-14 md:text-left'
                    }`}
                  >
                    {isBatman ? (
                      /* Batman / Wayne Enterprises Dossier Card */
                      <div
                        className="group relative bg-[#171C26]/90 border border-[#343B48] p-6 md:p-8 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:border-[#F5C542] shadow-[0_0_20px_rgba(0,0,0,0.6)] hover:shadow-[0_0_35px_rgba(245,197,66,0.25)] backdrop-blur-sm cursor-default overflow-hidden"
                      >
                        {/* Corner Brackets */}
                        <div className="absolute top-0 right-0 w-6 h-6 pointer-events-none">
                          <div className="absolute top-0 right-0 w-full h-0.5 bg-[#F5C542]"></div>
                          <div className="absolute top-0 right-0 h-full w-0.5 bg-[#F5C542]"></div>
                        </div>
                        <div className="absolute bottom-0 left-0 w-6 h-6 pointer-events-none">
                          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#65758B]/50"></div>
                          <div className="absolute bottom-0 left-0 h-full w-0.5 bg-[#65758B]/50"></div>
                        </div>

                        {/* Operation File Code */}
                        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-[#11151D] border border-[#343B48] text-[#F5C542] text-[10px] font-mono uppercase tracking-widest mb-3">
                          <span>WAYNE DEFENSE // OP-0{idx + 1}</span>
                        </div>

                        {/* Role */}
                        <h4 className="font-orbitron text-2xl md:text-3xl font-bold text-[#F5C542] mb-1 group-hover:text-[#FCD34D] transition-colors duration-300">
                          {exp.role}
                        </h4>

                        {/* Company & Location */}
                        <div className="flex flex-wrap items-center gap-2 mb-4 text-[#A7AFBC] font-rajdhani text-lg font-bold">
                          <span className="text-[#F4F5F7]">{exp.company}</span>
                          {exp.location && (
                            <>
                              <span className="text-[#65758B]">·</span>
                              <span className="text-[#65758B] text-base">{exp.location}</span>
                            </>
                          )}
                        </div>

                        {/* Timeline & Tag */}
                        <div className="flex flex-wrap gap-2.5 items-center mb-4">
                          <div className="inline-flex items-center gap-2 bg-[#11151D] border border-[#343B48] px-3.5 py-1 rounded-lg text-xs font-mono text-[#F4F5F7]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#F5C542] animate-pulse"></span>
                            <span>{exp.timeline}</span>
                          </div>
                          {exp.employmentType && (
                            <span className="text-[11px] font-mono uppercase bg-[#11151D] border border-[#343B48] text-[#A7AFBC] px-2.5 py-1 rounded">
                              {exp.employmentType}
                            </span>
                          )}
                        </div>

                        {exp.description && (
                          <p className="font-rajdhani text-base md:text-lg font-medium text-[#A7AFBC] mb-4 leading-relaxed">
                            {exp.description}
                          </p>
                        )}

                        {exp.bulletPoints && exp.bulletPoints.length > 0 && (
                          <ul className="space-y-2 font-rajdhani text-base md:text-lg text-[#F4F5F7]/85 text-left mb-4">
                            {exp.bulletPoints.map((point, pIdx) => (
                              <li key={pIdx} className="flex items-start gap-2.5">
                                <span className="text-[#F5C542] text-xs mt-1.5 drop-shadow-[0_0_6px_#F5C542]">◈</span>
                                <span className="leading-snug">{point}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {/* Mission Dossier Stamp */}
                        <div className="mt-4 pt-3 border-t border-[#343B48]/60 flex items-center justify-between text-[10px] font-mono text-[#A7AFBC]/60 uppercase tracking-widest">
                          <span>GOTHAM SURVEILLANCE // LOGGED</span>
                          <span className="text-[#F5C542]">VERIFIED RECORD</span>
                        </div>
                      </div>
                    ) : isPanther ? (
                      /* Black Panther Card */
                      <div
                        className="group relative bg-[#0e0f18]/90 border border-[#7B2CFF]/40 p-6 md:p-8 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:border-[#00E5FF] shadow-[0_0_20px_rgba(123,44,255,0.12)] hover:shadow-[0_0_35px_rgba(123,44,255,0.4)] backdrop-blur-sm cursor-default overflow-hidden"
                      >
                        {/* Top Chevron Pattern Trim */}
                        <div className="absolute top-0 left-0 w-full h-1 wakanda-chevron-strip opacity-70"></div>

                        {/* Corner Accents */}
                        <div className="absolute top-0 right-0 w-6 h-6 pointer-events-none">
                          <div className="absolute top-0 right-0 w-full h-0.5 bg-[#7B2CFF]"></div>
                          <div className="absolute top-0 right-0 h-full w-0.5 bg-[#00E5FF]"></div>
                        </div>
                        <div className="absolute bottom-0 left-0 w-6 h-6 pointer-events-none">
                          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#00E5FF]/60"></div>
                          <div className="absolute bottom-0 left-0 h-full w-0.5 bg-[#7B2CFF]/60"></div>
                        </div>

                        {/* Wakanda Mission Header Tag */}
                        <div className={`flex items-center gap-2 mb-3 text-xs font-mono text-[#00E5FF] ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse"></span>
                          <span>ROYAL MISSION PROTOCOL // #{idx + 1}</span>
                        </div>

                        {/* Role */}
                        <h4 className="font-orbitron text-2xl md:text-3xl font-bold text-[#7B2CFF] tracking-wide mb-2 group-hover:text-[#00E5FF] transition-colors leading-tight drop-shadow-[0_0_10px_rgba(123,44,255,0.4)]">
                          {exp.role}
                        </h4>

                        {/* Company */}
                        <p className="font-rajdhani text-2xl md:text-3xl font-bold text-[#F5F5F5] mb-4">
                          {exp.company}
                        </p>

                        {/* Timeline */}
                        <div className={`flex flex-wrap gap-2 items-center mb-3 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                          <div className="inline-block bg-[#08090D] border border-[#7B2CFF]/60 px-3.5 py-1 rounded-lg shadow-[0_0_8px_rgba(123,44,255,0.25)]">
                            <span className="font-orbitron text-sm md:text-base text-[#00E5FF] tracking-wider uppercase font-semibold">
                              {exp.timeline}
                            </span>
                          </div>
                          {exp.employmentType && (
                            <span className="text-xs font-rajdhani font-bold uppercase bg-[#7B2CFF]/15 border border-[#7B2CFF]/40 text-[#A9B3C1] px-2.5 py-1 rounded tracking-wider">
                              {exp.employmentType}
                            </span>
                          )}
                        </div>

                        {exp.description && (
                          <p className="text-base font-rajdhani text-[#F5F5F5]/80 mb-3 leading-relaxed">
                            {exp.description}
                          </p>
                        )}

                        {exp.bulletPoints && exp.bulletPoints.length > 0 && (
                          <ul className="space-y-2 text-sm md:text-base font-rajdhani text-[#F5F5F5]/75 text-left">
                            {exp.bulletPoints.map((point, pIdx) => (
                              <li key={pIdx} className="flex items-start gap-2">
                                <span className="text-[#00E5FF] font-bold text-base">◆</span>
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        <div className="mt-4 pt-3 border-t border-[#7B2CFF]/15 flex items-center justify-between text-[10px] font-mono text-[#A9B3C1]/60 uppercase tracking-widest">
                          <span>CLEARANCE: LEVEL 5</span>
                          <span className="text-[#00E5FF]">VIBRANIUM STATUS: NOMINAL</span>
                        </div>
                      </div>
                    ) : isLantern ? (
                      /* Green Lantern Card */
                      <div
                        className="group relative bg-[#071912]/90 border border-[#00FF66]/40 p-6 md:p-8 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:border-[#00FF66] shadow-[0_0_20px_rgba(0,255,102,0.12)] hover:shadow-[0_0_35px_rgba(0,255,102,0.35)] backdrop-blur-sm cursor-default overflow-hidden"
                      >
                        {/* Corner Accents */}
                        <div className="absolute top-0 right-0 w-6 h-6 pointer-events-none">
                          <div className="absolute top-0 right-0 w-full h-0.5 bg-[#00FF66]"></div>
                          <div className="absolute top-0 right-0 h-full w-0.5 bg-[#00FF66]"></div>
                        </div>

                        {/* Oa Dispatch Header Tag */}
                        <div className={`flex items-center gap-2 mb-3 text-xs font-mono text-[#00FF66] ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-ping"></span>
                          <span>OA DISPATCH // LOG #{idx + 1}</span>
                        </div>

                        {/* Role */}
                        <h4 className="font-orbitron text-2xl md:text-3xl font-bold text-[#00FF66] tracking-wide mb-2 group-hover:text-[#7CFFB2] transition-colors leading-tight drop-shadow-[0_0_10px_rgba(0,255,102,0.4)]">
                          {exp.role}
                        </h4>

                        {/* Company */}
                        <p className="font-rajdhani text-2xl md:text-3xl font-bold text-[#F5FFF8] mb-4">
                          {exp.company}
                        </p>

                        {/* Timeline */}
                        <div className={`flex flex-wrap gap-2 items-center mb-3 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                          <div className="inline-block bg-[#05140d] border border-[#00FF66]/60 px-3.5 py-1 rounded-lg shadow-[0_0_8px_rgba(0,255,102,0.2)]">
                            <span className="font-orbitron text-sm md:text-base text-[#7CFFB2] tracking-wider uppercase font-semibold">
                              {exp.timeline}
                            </span>
                          </div>
                          {exp.employmentType && (
                            <span className="text-xs font-rajdhani font-bold uppercase bg-[#00FF66]/15 border border-[#00FF66]/40 text-[#00FF66] px-2.5 py-1 rounded tracking-wider">
                              {exp.employmentType}
                            </span>
                          )}
                        </div>

                        {exp.description && (
                          <p className="text-base font-rajdhani text-[#F5FFF8]/80 mb-3 leading-relaxed">
                            {exp.description}
                          </p>
                        )}

                        {exp.bulletPoints && exp.bulletPoints.length > 0 && (
                          <ul className="space-y-2 text-sm md:text-base font-rajdhani text-[#F5FFF8]/75 text-left">
                            {exp.bulletPoints.map((point, pIdx) => (
                              <li key={pIdx} className="flex items-start gap-2">
                                <span className="text-[#00FF66] font-bold text-base">◈</span>
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        <div className="mt-4 pt-3 border-t border-[#00FF66]/15 flex items-center justify-between text-[10px] font-mono text-[#7CFFB2]/60 uppercase tracking-widest">
                          <span>SECTOR: 2814</span>
                          <span className="text-[#00FF66]">WILLPOWER COHESION: 100%</span>
                        </div>
                      </div>
                    ) : (
                      /* Spider-Man Card with Comic Details */
                      <div
                        className={`group relative bg-[#151735] border-4 border-black p-6 md:p-8 rounded-2xl transition-all duration-300 hover:-translate-y-2 cursor-default ${
                          isEven
                            ? 'shadow-[8px_8px_0px_0px_#2A7FFF] hover:shadow-[12px_12px_0px_0px_#FF375F]'
                            : 'shadow-[8px_8px_0px_0px_#FF375F] hover:shadow-[12px_12px_0px_0px_#2A7FFF]'
                        }`}
                      >
                        {/* Comic Action Sound Badge */}
                        <div className="absolute top-3 right-3 bg-[#FFDE00] border-2 border-black font-comic text-black text-xs px-2 py-0.5 rotate-3 uppercase tracking-wider shadow-[2px_2px_0px_0px_#000]">
                          PAGE #{idx + 1}
                        </div>

                        {/* Spider-sense aura hover effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#FF375F]/20 to-[#2A7FFF]/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-lg transition-opacity -z-10"></div>

                        {/* Comic Halftone Corner Detail */}
                        <div className="absolute bottom-0 right-0 w-20 h-20 comic-dots opacity-20 pointer-events-none rounded-br-xl"></div>

                        {/* Role */}
                        <h4 className="font-comic text-2xl md:text-4xl text-[#FF375F] tracking-wide mb-2 group-hover:text-[#FFDE00] transition-colors leading-tight">
                          {exp.role}
                        </h4>

                        {/* Company */}
                        <p className="font-marker text-xl md:text-2xl text-[#F5F5F5] mb-4">
                          {exp.company}
                        </p>

                        {/* Timeline */}
                        <div className="flex flex-wrap gap-2 items-center mb-3">
                          <div className="inline-block bg-black/50 border-2 border-[#FFDE00]/40 px-3.5 py-1 rounded-lg">
                            <span className="font-comic text-base md:text-lg text-[#FFDE00] tracking-wider uppercase">
                              {exp.timeline}
                            </span>
                          </div>
                          {exp.employmentType && (
                            <span className="text-xs font-mono uppercase bg-[#2A7FFF]/20 border border-[#2A7FFF]/40 text-[#2A7FFF] px-2.5 py-1 rounded">
                              {exp.employmentType}
                            </span>
                          )}
                        </div>

                        {exp.description && (
                          <p className="text-sm font-sans text-[#F5F5F5]/80 mb-3 leading-relaxed">
                            {exp.description}
                          </p>
                        )}

                        {exp.bulletPoints && exp.bulletPoints.length > 0 && (
                          <ul className="space-y-1.5 text-xs md:text-sm font-sans text-[#F5F5F5]/70 text-left">
                            {exp.bulletPoints.map((point, pIdx) => (
                              <li key={pIdx} className="flex items-start gap-2">
                                <span className="text-[#FF375F] font-bold text-sm">›</span>
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-comic text-[#2A7FFF] uppercase tracking-wider">
                          <span>DAILY BUGLE FIELD NOTEBOOK</span>
                          <span className="text-[#FFDE00]">VERIFIED</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Center Node / Dot (Desktop) */}
                  <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full hidden md:flex items-center justify-center z-20 group-hover:scale-125 transition-transform ${
                    isBatman
                      ? 'bg-[#080A0F] border-2 border-[#F5C542] shadow-[0_0_15px_rgba(245,197,66,0.7)]'
                      : isPanther
                      ? 'bg-[#08090D] border-2 border-[#7B2CFF] shadow-[0_0_14px_rgba(123,44,255,0.8)]'
                      : isLantern
                      ? 'bg-[#050D0A] border-2 border-[#00FF66] shadow-[0_0_12px_rgba(0,255,102,0.8)]'
                      : 'bg-[#0A0B1E] border-4 border-black'
                  }`}>
                    <div
                      className={`w-3.5 h-3.5 rounded-full ${
                        isBatman
                          ? 'bg-[#F5C542] shadow-[0_0_8px_#F5C542]'
                          : isPanther
                          ? 'bg-[#00E5FF] shadow-[0_0_8px_#00E5FF] animate-kimoyo'
                          : isLantern
                          ? 'bg-[#00FF66] shadow-[0_0_8px_#7CFFB2]'
                          : isEven ? 'bg-[#FF375F]' : 'bg-[#2A7FFF]'
                      } animate-pulse`}
                    ></div>
                  </div>

                  {/* Mobile Node Dot */}
                  <div className={`absolute left-6 top-8 -translate-x-1/2 w-6 h-6 rounded-full md:hidden flex items-center justify-center z-20 ${
                    isBatman
                      ? 'bg-[#080A0F] border-2 border-[#F5C542] shadow-[0_0_10px_rgba(245,197,66,0.7)]'
                      : isPanther
                      ? 'bg-[#08090D] border-2 border-[#7B2CFF] shadow-[0_0_10px_rgba(123,44,255,0.8)]'
                      : isLantern
                      ? 'bg-[#050D0A] border-2 border-[#00FF66] shadow-[0_0_10px_rgba(0,255,102,0.8)]'
                      : 'bg-[#0A0B1E] border-4 border-black'
                  }`}>
                    <div className={`w-2.5 h-2.5 rounded-full ${
                      isBatman ? 'bg-[#F5C542]' : isPanther ? 'bg-[#00E5FF]' : isLantern ? 'bg-[#00FF66]' : 'bg-[#FF375F]'
                    } animate-pulse`}></div>
                  </div>

                  {/* Empty Spacer Column for Desktop */}
                  <div
                    className={`hidden md:block md:w-1/2 ${
                      isEven ? 'md:order-2' : 'md:order-1'
                    }`}
                  ></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer badge */}
        <div className="mt-16 text-center">
          <div className={`inline-flex items-center gap-3 px-5 py-2 rounded-xl backdrop-blur-sm ${
            isBatman
              ? 'bg-[#171C26]/90 border border-[#343B48] shadow-[0_0_15px_rgba(245,197,66,0.2)] text-[#A7AFBC]'
              : isPanther
              ? 'bg-[#0e0f18]/80 border border-[#7B2CFF]/40 shadow-[0_0_15px_rgba(123,44,255,0.2)] text-[#A9B3C1]'
              : isLantern
              ? 'bg-[#050D0A]/80 border border-[#00FF66]/40 shadow-[0_0_15px_rgba(0,255,102,0.15)] text-[#7CFFB2]'
              : 'bg-black/40 border-2 border-white/10 text-[#F5F5F5]/70'
          }`}>
            <span className={isBatman ? 'text-[#F5C542] font-bold' : isPanther ? 'text-[#00E5FF] font-bold' : isLantern ? 'text-[#00FF66] font-bold' : 'text-[#FF375F] font-bold'}>
              {isBatman ? '◈' : isPanther ? '◆' : isLantern ? '◈' : '›'}
            </span>
            <span className={isBatman ? 'font-mono text-xs uppercase tracking-wider text-[#F4F5F7]' : isPanther ? 'font-orbitron text-xs uppercase tracking-wider text-[#F5F5F5]' : isLantern ? 'font-orbitron text-xs uppercase tracking-wider text-[#F5FFF8]' : 'font-comic text-base tracking-wide'}>
              {isBatman ? 'Wayne Enterprises // Verified Operational Record • Gotham Dept of Defense' : isPanther ? 'Wakanda Design Group // Vibranium Verified Service Record' : isLantern ? 'Sector 2814 Guardian // Verified Interstellar Record' : 'Dimension-hopping across production codebases'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceWeb;

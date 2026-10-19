import React from 'react';
import { EXPERIENCE_DATA } from '../constants';
import { useTheme } from '../context/ThemeContext';

const ExperienceWeb: React.FC = () => {
  const { theme } = useTheme();
  const isLantern = theme === 'green-lantern';

  return (
    <section 
      id="experience" 
      className={`py-24 px-6 md:px-12 relative overflow-hidden transition-colors duration-400 ${
        isLantern ? 'bg-[#050D0A] construct-grid' : 'bg-[#0A0B1E]'
      }`}
    >
      {/* Background radial glow */}
      {isLantern ? (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(0,255,102,0.06)_0%,_transparent_75%)] pointer-events-none"></div>
      ) : (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(255,55,95,0.06)_0%,_transparent_75%)] pointer-events-none"></div>
      )}

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center mb-20 text-center">
          {isLantern ? (
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
              isLantern
                ? 'bg-gradient-to-b from-[#00FF66] via-[#7CFFB2] to-[#008F4C] opacity-50 shadow-[0_0_12px_rgba(0,255,102,0.5)]'
                : 'bg-gradient-to-b from-[#FF375F] via-[#2A7FFF] to-[#FFDE00] opacity-40'
            }`}
          ></div>

          {/* Left Timeline Spine for Mobile */}
          <div 
            className={`absolute left-6 top-0 w-1 h-full md:hidden rounded-full ${
              isLantern
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
                    {isLantern ? (
                      /* Green Lantern Card */
                      <div
                        className="group relative bg-[#071912]/90 border border-[#00FF66]/40 p-6 md:p-8 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:border-[#00FF66] shadow-[0_0_20px_rgba(0,255,102,0.12)] hover:shadow-[0_0_35px_rgba(0,255,102,0.35)] backdrop-blur-sm cursor-default"
                      >
                        {/* Corner Accents */}
                        <div className="absolute top-0 right-0 w-6 h-6 pointer-events-none">
                          <div className="absolute top-0 right-0 w-full h-0.5 bg-[#00FF66]"></div>
                          <div className="absolute top-0 right-0 h-full w-0.5 bg-[#00FF66]"></div>
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
                      </div>
                    ) : (
                      /* Spider-Man Card */
                      <div
                        className={`group relative bg-[#151735] border-4 border-black p-6 md:p-8 rounded-2xl transition-all duration-300 hover:-translate-y-2 cursor-default ${
                          isEven
                            ? 'shadow-[8px_8px_0px_0px_#2A7FFF] hover:shadow-[12px_12px_0px_0px_#FF375F]'
                            : 'shadow-[8px_8px_0px_0px_#FF375F] hover:shadow-[12px_12px_0px_0px_#2A7FFF]'
                        }`}
                      >
                        {/* Spider-sense aura hover effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#FF375F]/20 to-[#2A7FFF]/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-lg transition-opacity -z-10"></div>

                        {/* Comic Halftone Corner Detail */}
                        <div className="absolute top-0 right-0 w-20 h-20 bg-[radial-gradient(circle,rgba(255,222,0,0.15)_1.5px,transparent_1.5px)] bg-[length:6px_6px] pointer-events-none rounded-tr-xl"></div>

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
                      </div>
                    )}
                  </div>

                  {/* Center Node / Dot (Desktop) */}
                  <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full hidden md:flex items-center justify-center z-20 group-hover:scale-125 transition-transform ${
                    isLantern
                      ? 'bg-[#050D0A] border-2 border-[#00FF66] shadow-[0_0_12px_rgba(0,255,102,0.8)]'
                      : 'bg-[#0A0B1E] border-4 border-black'
                  }`}>
                    <div
                      className={`w-3.5 h-3.5 rounded-full ${
                        isLantern
                          ? 'bg-[#00FF66] shadow-[0_0_8px_#7CFFB2]'
                          : isEven ? 'bg-[#FF375F]' : 'bg-[#2A7FFF]'
                      } animate-pulse`}
                    ></div>
                  </div>

                  {/* Mobile Node Dot */}
                  <div className={`absolute left-6 top-8 -translate-x-1/2 w-6 h-6 rounded-full md:hidden flex items-center justify-center z-20 ${
                    isLantern
                      ? 'bg-[#050D0A] border-2 border-[#00FF66] shadow-[0_0_10px_rgba(0,255,102,0.8)]'
                      : 'bg-[#0A0B1E] border-4 border-black'
                  }`}>
                    <div className={`w-2.5 h-2.5 rounded-full ${
                      isLantern ? 'bg-[#00FF66]' : 'bg-[#FF375F]'
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
            isLantern
              ? 'bg-[#05140d]/80 border border-[#00FF66]/40 shadow-[0_0_15px_rgba(0,255,102,0.15)] text-[#7CFFB2]'
              : 'bg-black/40 border-2 border-white/10 text-[#F5F5F5]/70'
          }`}>
            <span className={isLantern ? 'text-[#00FF66] font-bold' : 'text-[#FF375F] font-bold'}>
              {isLantern ? '◈' : '›'}
            </span>
            <span className={isLantern ? 'font-rajdhani text-lg font-bold tracking-wider uppercase' : 'font-comic text-lg tracking-wider'}>
              {isLantern ? 'Sector 2814 Guardian // Verified Interstellar Record' : 'Dimension-hopping across production codebases'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceWeb;

import React from 'react';
import { EDUCATION_DATA } from '../constants';
import { useTheme } from '../context/ThemeContext';

const EducationWeb: React.FC = () => {
  const { theme } = useTheme();
  const isLantern = theme === 'green-lantern';

  return (
    <section 
      id="education" 
      className={`py-24 px-6 md:px-12 relative overflow-hidden transition-colors duration-400 ${
        isLantern ? 'bg-[#050D0A] construct-grid' : 'bg-[#0A0B1E]'
      }`}
    >
      {/* Background radial glow */}
      {isLantern ? (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(0,255,102,0.06)_0%,_transparent_70%)] pointer-events-none"></div>
      ) : (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(42,127,255,0.05)_0%,_transparent_70%)] pointer-events-none"></div>
      )}

      <div className="max-w-5xl mx-auto relative z-10">
        {isLantern ? (
          <div className="mb-20 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-[#05140d] border border-[#00FF66]/50 shadow-[0_0_12px_rgba(0,255,102,0.2)] mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-pulse"></span>
              <span className="font-orbitron text-xs text-[#00FF66] uppercase tracking-[0.25em]">
                Oa Academy Archives
              </span>
            </div>
            <h3 className="font-orbitron text-4xl sm:text-5xl md:text-6xl text-[#F5FFF8] uppercase tracking-wider font-extrabold emerald-text-glow">
              Academic Timeline
            </h3>
            <p className="font-rajdhani text-[#7CFFB2] text-xl font-bold mt-2 tracking-wide">
              Foundations of Computer Science & Algorithmic Willpower
            </p>
          </div>
        ) : (
          <h3 className="font-comic text-5xl mb-20 text-center text-[#FFDE00] uppercase tracking-[0.2em] drop-shadow-[4px_4px_0px_#000]">
            Academic Timeline
          </h3>
        )}

        <div className="relative">
          {/* Central Strand */}
          <div 
            className={`absolute left-1/2 transform -translate-x-1/2 w-1 h-full hidden md:block ${
              isLantern
                ? 'bg-gradient-to-b from-[#00FF66] via-[#7CFFB2] to-transparent opacity-30 shadow-[0_0_8px_#00FF66]'
                : 'bg-gradient-to-b from-[#FF375F] via-[#2A7FFF] to-transparent opacity-20'
            }`}
          ></div>
          
          {EDUCATION_DATA.map((edu, idx) => (
            <div key={idx} className="relative mb-20">
              <div className="flex flex-col md:flex-row items-center gap-12">
                
                <div className="w-full md:w-1/2 md:order-1 text-center md:text-right group">
                  {isLantern ? (
                    /* Green Lantern Education Card */
                    <div className="relative bg-[#071912]/90 border border-[#00FF66]/40 p-8 rounded-2xl shadow-[0_0_20px_rgba(0,255,102,0.12)] group-hover:border-[#00FF66] group-hover:shadow-[0_0_35px_rgba(0,255,102,0.35)] transition-all duration-300 hover:-translate-y-2 backdrop-blur-sm cursor-default">
                      {/* Geometric Corner Accents */}
                      <div className="absolute top-0 right-0 w-6 h-6 pointer-events-none">
                        <div className="absolute top-0 right-0 w-full h-0.5 bg-[#00FF66]"></div>
                        <div className="absolute top-0 right-0 h-full w-0.5 bg-[#00FF66]"></div>
                      </div>

                      <h4 className="font-orbitron text-2xl md:text-3xl font-bold text-[#00FF66] mb-2 group-hover:text-[#7CFFB2] transition-colors duration-300">
                        {edu.degree}
                      </h4>
                      <p className="font-rajdhani text-2xl font-bold text-[#F5FFF8] mb-3">
                        {edu.institution}
                      </p>
                      <p className="text-[#050D0A] font-orbitron font-bold tracking-wider uppercase text-xs bg-[#00FF66] inline-block px-3 py-1 rounded-md shadow-[0_0_10px_rgba(0,255,102,0.4)]">
                        {edu.period}
                      </p>
                      
                      <div className="mt-4 text-[#7CFFB2] font-rajdhani text-base font-semibold">
                        Cumulative Performance: <span className="text-[#00FF66] font-bold">GPA {edu.gpa}</span>
                      </div>

                      {/* Visual Connector Dot */}
                      <div className="absolute top-1/2 -right-[3.75rem] w-6 h-6 bg-[#050D0A] border-2 border-[#00FF66] rounded-full hidden md:flex items-center justify-center z-10 transition-transform duration-300 group-hover:scale-125 shadow-[0_0_10px_#00FF66]">
                        <div className="w-2 h-2 bg-[#00FF66] rounded-full animate-ping"></div>
                      </div>
                    </div>
                  ) : (
                    /* Spider-Man Education Card */
                    <div className="relative bg-[#151735] border-4 border-black p-8 rounded-2xl shadow-[8px_8px_0px_0px_#2A7FFF] transition-all duration-300 hover:-translate-y-3 hover:rotate-1 hover:shadow-[15px_15px_0px_0px_#FF375F] cursor-default">
                      {/* Spider-sense pulse effect */}
                      <div className="absolute -inset-2 bg-[#FF375F] rounded-3xl opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500 -z-10 animate-pulse"></div>
                      
                      {/* Comic-style corner dots */}
                      <div className="absolute top-0 right-0 w-24 h-24 bg-[radial-gradient(circle,rgba(255,55,95,0.1)_1px,transparent_1px)] bg-[length:6px_6px] opacity-20 pointer-events-none rounded-tr-xl"></div>
                      
                      <h4 className="font-comic text-3xl text-[#FF375F] mb-2 group-hover:text-[#FFDE00] transition-colors duration-300">{edu.degree}</h4>
                      <p className="font-marker text-xl text-[#F5F5F5] mb-3">{edu.institution}</p>
                      <p className="text-[#2A7FFF] font-bold tracking-widest uppercase text-sm bg-black/30 inline-block px-3 py-1 rounded-md border border-[#2A7FFF]/20">
                        {edu.period}
                      </p>
                      
                      <div className="mt-4 text-[#F5F5F5]/60 font-sans text-sm italic">
                        GPA: {edu.gpa}
                      </div>

                      {/* Visual Connector Dot */}
                      <div className="absolute top-1/2 -right-[3.75rem] w-6 h-6 bg-[#FF375F] border-4 border-black rounded-full hidden md:flex items-center justify-center z-10 transition-transform duration-300 group-hover:scale-125 group-hover:bg-[#FFDE00]">
                         <div className="w-1.5 h-1.5 bg-black rounded-full animate-ping"></div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="md:w-1/2 md:order-2">
                  <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    {edu.coursework.map((course, i) => (
                      <div
                        key={i}
                        className={`px-4 py-2 rounded-lg font-rajdhani text-sm font-semibold transition-all duration-300 transform hover:scale-105 cursor-default ${
                          isLantern
                            ? 'bg-[#05140d] border border-[#00FF66]/30 text-[#F5FFF8]/80 hover:border-[#00FF66] hover:text-[#00FF66] hover:shadow-[0_0_12px_rgba(0,255,102,0.25)]'
                            : 'bg-black/40 border-2 border-[#F5F5F5]/10 text-[#F5F5F5]/70 hover:border-[#FF375F] hover:text-[#FF375F] hover:bg-[#FF375F]/5'
                        }`}
                      >
                        {course}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationWeb;

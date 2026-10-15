import React from 'react';
import { EXPERIENCE_DATA } from '../constants';

const ExperienceWeb: React.FC = () => {
  return (
    <section id="experience" className="py-24 px-6 md:px-12 bg-[#0A0B1E] relative overflow-hidden">
      {/* Spider-verse subtle radial background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(255,55,95,0.06)_0%,_transparent_75%)] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center mb-20 text-center">
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

        {/* Timeline Container */}
        <div className="relative">
          {/* Central Timeline Spine for Desktop */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1.5 h-full bg-gradient-to-b from-[#FF375F] via-[#2A7FFF] to-[#FFDE00] opacity-40 hidden md:block rounded-full"></div>

          {/* Left Timeline Spine for Mobile */}
          <div className="absolute left-6 top-0 w-1 h-full bg-gradient-to-b from-[#FF375F] via-[#2A7FFF] to-[#FFDE00] opacity-30 md:hidden rounded-full"></div>

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
                      <div className="inline-block bg-black/50 border-2 border-[#FFDE00]/40 px-4 py-1.5 rounded-lg">
                        <span className="font-comic text-base md:text-lg text-[#FFDE00] tracking-wider uppercase">
                          {exp.timeline}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Center Node / Spider Icon Dot (Desktop) */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#0A0B1E] border-4 border-black hidden md:flex items-center justify-center z-20 group-hover:scale-125 transition-transform">
                    <div
                      className={`w-3.5 h-3.5 rounded-full ${
                        isEven ? 'bg-[#FF375F]' : 'bg-[#2A7FFF]'
                      } animate-pulse`}
                    ></div>
                  </div>

                  {/* Mobile Node Dot */}
                  <div className="absolute left-6 top-8 -translate-x-1/2 w-6 h-6 rounded-full bg-[#0A0B1E] border-4 border-black md:hidden flex items-center justify-center z-20">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF375F] animate-pulse"></div>
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

        {/* Multiverse Comic Badge Footer */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 bg-black/40 border-2 border-white/10 px-5 py-2 rounded-xl backdrop-blur-sm">
            <span className="text-[#FF375F] font-bold text-lg">›</span>
            <span className="font-comic text-lg text-[#F5F5F5]/70 tracking-wider">
              Dimension-hopping across production codebases
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceWeb;

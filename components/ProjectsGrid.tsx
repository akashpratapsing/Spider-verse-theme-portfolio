import React from "react";
import { PROJECTS } from "../constants";
import { useTheme } from "../context/ThemeContext";

const ProjectsGrid: React.FC = () => {
  const { theme } = useTheme();
  const isLantern = theme === "green-lantern";
  const isPanther = theme === "black-panther";
  const isBatman = theme === "batman";

  return (
    <section 
      id="projects" 
      className={`py-24 px-6 md:px-12 transition-colors duration-400 ${
        isBatman ? "bg-[#080A0F] gotham-grid" : isPanther ? "bg-[#08090D] wakanda-grid" : isLantern ? "bg-[#050D0A] construct-grid" : "bg-[#0A0B1E]"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-16 gap-6">
          {isBatman ? (
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-[#11151D] border border-[#343B48] shadow-[0_0_12px_rgba(0,0,0,0.5)] mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F5C542] animate-pulse"></span>
                <span className="font-orbitron text-xs text-[#F5C542] uppercase tracking-[0.25em]">
                  Wayne Enterprises R&D // Active Investigations
                </span>
              </div>
              <h3 className="font-orbitron text-4xl sm:text-5xl md:text-6xl text-[#F4F5F7] uppercase tracking-wider font-extrabold batman-gold-glow">
                Gotham Case Files
              </h3>
            </div>
          ) : isPanther ? (
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-[#0e0f18] border border-[#7B2CFF]/50 shadow-[0_0_12px_rgba(123,44,255,0.25)] mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse"></span>
                <span className="font-orbitron text-xs text-[#00E5FF] uppercase tracking-[0.25em]">
                  Wakanda Design Group · Prototypes
                </span>
              </div>
              <h3 className="font-orbitron text-4xl sm:text-5xl md:text-6xl text-[#F5F5F5] uppercase tracking-wider font-extrabold vibranium-text-glow">
                Technological Prototypes
              </h3>
            </div>
          ) : isLantern ? (
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-[#05140d] border border-[#00FF66]/50 shadow-[0_0_12px_rgba(0,255,102,0.2)] mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-pulse"></span>
                <span className="font-orbitron text-xs text-[#00FF66] uppercase tracking-[0.25em]">
                  Sector 2814 Deployments
                </span>
              </div>
              <h3 className="font-orbitron text-4xl sm:text-5xl md:text-6xl text-[#F5FFF8] uppercase tracking-wider font-extrabold emerald-text-glow">
                Interstellar Projects
              </h3>
            </div>
          ) : (
            <h3 className="font-comic text-5xl text-[#2A7FFF] uppercase tracking-widest">
              Spider-Verse Projects
            </h3>
          )}

          {isBatman ? (
            <div className="bg-[#11151D] border-2 border-[#343B48] text-[#F5C542] px-5 py-2 rounded-xl font-orbitron text-sm font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(0,0,0,0.5)] flex items-center gap-2">
              <span>Classified Evidence Dossier</span>
              <span className="text-[#F5C542]">🦇</span>
            </div>
          ) : isPanther ? (
            <div className="bg-[#0e0f18] border-2 border-[#7B2CFF] text-[#00E5FF] px-5 py-2 rounded-xl font-orbitron text-sm font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(123,44,255,0.35)] flex items-center gap-2">
              <span>Classified Vibranium Tech</span>
              <span className="text-[#7B2CFF]">◈</span>
            </div>
          ) : isLantern ? (
            <div className="bg-[#071912] border-2 border-[#00FF66] text-[#00FF66] px-5 py-2 rounded-xl font-orbitron text-sm font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(0,255,102,0.3)]">
              Classified Ring Constructs
            </div>
          ) : (
            <div className="bg-[#FFDE00] text-black border-4 border-black px-4 py-2 rotate-1 font-comic text-2xl uppercase shadow-[4px_4px_0px_0px_#FF375F]">
              Top Secret Projects
            </div>
          )}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {PROJECTS.map((project, pIdx) => {
            if (isBatman) {
              return (
                <div
                  key={project.id}
                  className="group relative bg-[#171C26]/90 border border-[#343B48] p-5 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:border-[#F5C542] shadow-[0_0_20px_rgba(0,0,0,0.6)] hover:shadow-[0_0_35px_rgba(245,197,66,0.25)] backdrop-blur-sm flex flex-col justify-between overflow-hidden"
                >
                  {/* Corner Bracket Details */}
                  <div className="absolute top-0 right-0 w-6 h-6 pointer-events-none">
                    <div className="absolute top-0 right-0 w-full h-0.5 bg-[#F5C542]"></div>
                    <div className="absolute top-0 right-0 h-full w-0.5 bg-[#F5C542]"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-6 h-6 pointer-events-none">
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#65758B]/50"></div>
                    <div className="absolute bottom-0 left-0 h-full w-0.5 bg-[#65758B]/50"></div>
                  </div>

                  <div>
                    {/* Image Panel */}
                    <div className="relative overflow-hidden h-52 rounded-xl border border-[#343B48] group-hover:border-[#F5C542] transition-colors">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080A0F] via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity"></div>

                      {/* Case File Badge */}
                      <div className="absolute top-3 left-3 bg-[#080A0F]/90 border border-[#343B48] px-2.5 py-0.5 rounded-md text-[10px] font-orbitron font-bold text-[#F5C542] uppercase tracking-wider shadow-[0_0_8px_rgba(0,0,0,0.6)] flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F5C542] animate-pulse"></span>
                        <span>CASE FILE #00{pIdx + 1}</span>
                      </div>

                      {/* Status Stamp */}
                      <div className="absolute top-3 right-3 bg-[#11151D]/90 border border-[#343B48] px-2 py-0.5 rounded text-[9px] font-mono text-[#A7AFBC] uppercase tracking-wider">
                        CLASSIFIED
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-rajdhani text-xs font-bold uppercase bg-[#11151D] border border-[#343B48] text-[#F5C542] px-2.5 py-0.5 rounded-md tracking-wider group-hover:border-[#F5C542]/40"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h4 className="font-orbitron text-2xl font-bold mt-4 mb-2 text-[#F4F5F7] group-hover:text-[#F5C542] transition-colors">
                      {project.title}
                    </h4>
                    <p className="font-rajdhani text-base font-medium text-[#A7AFBC] leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Actions & Forensic Status */}
                  <div>
                    <div className="mt-4 pt-3 border-t border-[#343B48]/60 flex items-center justify-between text-[11px] font-mono text-[#A7AFBC]/70 uppercase tracking-widest mb-3">
                      <span>SECURITY CLEARANCE:</span>
                      <span className="text-[#F5C542] font-semibold">LEVEL 5 VERIFIED</span>
                    </div>

                    <div className="flex gap-2.5">
                      {(project.link || project.liveDemoUrl) ? (
                        <a
                          href={project.link || project.liveDemoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1"
                        >
                          <button
                            className="w-full py-2.5 bg-[#F5C542] hover:bg-[#FCD34D] text-[#080A0F] font-orbitron font-bold text-sm uppercase tracking-wider rounded-lg shadow-[0_0_12px_rgba(245,197,66,0.3)] hover:shadow-[0_0_20px_rgba(245,197,66,0.6)] transition-all cursor-pointer flex items-center justify-center gap-2 border border-[#B99532]"
                          >
                            <span>Inspect Evidence</span>
                            <span className="text-xs">⚡</span>
                          </button>
                        </a>
                      ) : null}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-2.5 bg-[#11151D] border border-[#343B48] hover:border-[#F5C542] text-[#A7AFBC] hover:text-[#F5C542] rounded-lg flex items-center justify-center transition-all cursor-pointer shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                          title="Source Archive"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            }
            if (isPanther) {
              return (
                <div
                  key={project.id}
                  className="group relative bg-[#0e0f18]/90 border border-[#7B2CFF]/40 p-5 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:border-[#00E5FF] shadow-[0_0_20px_rgba(123,44,255,0.15)] hover:shadow-[0_0_35px_rgba(123,44,255,0.4)] backdrop-blur-sm flex flex-col justify-between overflow-hidden"
                >
                  {/* Top Wakandan Chevron Trim */}
                  <div className="absolute top-0 left-0 w-full h-1 wakanda-chevron-strip opacity-70"></div>

                  {/* Wakandan Corner Claw Accents */}
                  <div className="absolute top-0 right-0 w-6 h-6 pointer-events-none">
                    <div className="absolute top-0 right-0 w-full h-0.5 bg-[#7B2CFF]"></div>
                    <div className="absolute top-0 right-0 h-full w-0.5 bg-[#00E5FF]"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-6 h-6 pointer-events-none">
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#00E5FF]/50"></div>
                    <div className="absolute bottom-0 left-0 h-full w-0.5 bg-[#7B2CFF]/50"></div>
                  </div>

                  <div>
                    {/* Image Panel */}
                    <div className="relative overflow-hidden h-52 rounded-xl border border-[#7B2CFF]/30 group-hover:border-[#00E5FF] transition-colors">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#08090D] via-transparent to-transparent opacity-75 group-hover:opacity-40 transition-opacity"></div>
                      
                      {/* Vibranium Status Badge */}
                      <div className="absolute top-3 left-3 bg-[#08090D]/90 border border-[#7B2CFF]/60 px-2.5 py-0.5 rounded-md text-[10px] font-orbitron font-bold text-[#00E5FF] uppercase tracking-wider shadow-[0_0_8px_rgba(123,44,255,0.4)] flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse"></span>
                        <span>SHURI LAB PROTO-0{pIdx + 1}</span>
                      </div>

                      {/* Kimoyo Sync Tag */}
                      <div className="absolute top-3 right-3 bg-[#7B2CFF]/80 backdrop-blur-sm px-2 py-0.5 rounded text-[9px] font-mono text-white font-bold uppercase tracking-widest border border-[#00E5FF]/40">
                        VIB-WEAVE
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-rajdhani text-xs font-bold uppercase bg-[#7B2CFF]/15 border border-[#7B2CFF]/40 text-[#00E5FF] px-2.5 py-0.5 rounded-md tracking-wider"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h4 className="font-orbitron text-2xl font-bold mt-4 mb-2 text-[#F5F5F5] group-hover:text-[#00E5FF] transition-colors">
                      {project.title}
                    </h4>
                    <p className="font-rajdhani text-base font-medium text-[#A9B3C1] leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Actions & Kinetic Status */}
                  <div>
                    <div className="mt-4 pt-3 border-t border-[#7B2CFF]/20 flex items-center justify-between text-[11px] font-mono text-[#A9B3C1]/70 uppercase tracking-widest mb-3">
                      <span>KINETIC DISPERSION:</span>
                      <span className="text-[#00E5FF] font-semibold">98.4% SHIELDED</span>
                    </div>

                    <div className="flex gap-2.5">
                      {(project.link || project.liveDemoUrl) ? (
                        <a
                          href={project.link || project.liveDemoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1"
                        >
                          <button
                            className="w-full py-2.5 bg-[#7B2CFF] hover:bg-[#8F47FF] text-[#F5F5F5] font-orbitron font-bold text-sm uppercase tracking-wider rounded-lg shadow-[0_0_12px_rgba(123,44,255,0.4)] hover:shadow-[0_0_20px_rgba(0,229,255,0.7)] transition-all cursor-pointer flex items-center justify-center gap-2 border border-[#00E5FF]/40"
                          >
                            <span>Inspect Prototype</span>
                            <span className="text-xs text-[#00E5FF]">⚡</span>
                          </button>
                        </a>
                      ) : null}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-2.5 bg-[#0e0f18] border border-[#7B2CFF]/60 hover:border-[#00E5FF] text-[#A9B3C1] hover:text-[#00E5FF] rounded-lg flex items-center justify-center transition-all cursor-pointer shadow-[0_0_10px_rgba(123,44,255,0.2)]"
                          title="GitHub Repository"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            }
            if (isLantern) {
              return (
                <div
                  key={project.id}
                  className="group relative bg-[#071912]/90 border border-[#00FF66]/40 p-5 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:border-[#00FF66] shadow-[0_0_20px_rgba(0,255,102,0.12)] hover:shadow-[0_0_35px_rgba(0,255,102,0.4)] backdrop-blur-sm flex flex-col justify-between overflow-hidden"
                >
                  {/* Holographic Geometric Corner Accents */}
                  <div className="absolute top-0 right-0 w-6 h-6 pointer-events-none">
                    <div className="absolute top-0 right-0 w-full h-0.5 bg-[#00FF66]"></div>
                    <div className="absolute top-0 right-0 h-full w-0.5 bg-[#00FF66]"></div>
                  </div>

                  <div>
                    {/* Image Panel with Hard-light Construct Overlay */}
                    <div className="relative overflow-hidden h-52 rounded-xl border border-[#00FF66]/30 group-hover:border-[#00FF66] transition-colors">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050D0A] via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity"></div>
                      
                      {/* Construct status badge */}
                      <div className="absolute top-3 left-3 bg-[#050D0A]/90 border border-[#00FF66]/60 px-2.5 py-0.5 rounded-md text-[10px] font-orbitron font-bold text-[#00FF66] uppercase tracking-wider shadow-[0_0_8px_rgba(0,255,102,0.4)] flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-ping"></span>
                        <span>OA REGISTRY #{pIdx + 1}</span>
                      </div>

                      {/* Hard-light Frequency Tag */}
                      <div className="absolute top-3 right-3 bg-[#05140d]/90 border border-[#00FF66]/40 px-2 py-0.5 rounded text-[9px] font-mono text-[#7CFFB2] uppercase tracking-wider">
                        SEC 2814
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-rajdhani text-xs font-bold uppercase bg-[#00FF66]/15 border border-[#00FF66]/40 text-[#7CFFB2] px-2.5 py-0.5 rounded-md tracking-wider"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h4 className="font-orbitron text-2xl font-bold mt-4 mb-2 text-[#F5FFF8] group-hover:text-[#00FF66] transition-colors">
                      {project.title}
                    </h4>
                    <p className="font-rajdhani text-base font-medium text-[#F5FFF8]/75 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Actions & Construct Specs */}
                  <div>
                    <div className="mt-4 pt-3 border-t border-[#00FF66]/20 flex items-center justify-between text-[11px] font-mono text-[#7CFFB2]/60 uppercase tracking-widest mb-3">
                      <span>CONSTRUCT STABILITY:</span>
                      <span className="text-[#00FF66] font-semibold">100% SOLID LIGHT</span>
                    </div>

                    <div className="flex gap-2.5">
                      {(project.link || project.liveDemoUrl) ? (
                        <a
                          href={project.link || project.liveDemoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1"
                        >
                          <button
                            className="w-full py-2.5 bg-[#00FF66] hover:bg-[#7CFFB2] text-[#050D0A] font-orbitron font-bold text-sm uppercase tracking-wider rounded-lg shadow-[0_0_12px_rgba(0,255,102,0.4)] hover:shadow-[0_0_20px_rgba(124,255,178,0.7)] transition-all cursor-pointer flex items-center justify-center gap-2"
                          >
                            <span>Inspect Construct</span>
                            <span className="text-xs">⚡</span>
                          </button>
                        </a>
                      ) : null}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-2.5 bg-[#05140d] border border-[#00FF66]/60 hover:border-[#00FF66] text-[#7CFFB2] hover:text-[#00FF66] rounded-lg flex items-center justify-center transition-all cursor-pointer shadow-[0_0_10px_rgba(0,255,102,0.15)]"
                          title="GitHub Repository"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            }

            // Spider-Man Original Card with Enhanced Comic Flair
            return (
              <div
                key={project.id}
                className="group relative bg-[#1a1c3d] border-8 border-black p-4 transition-all hover:-translate-y-2 hover:shadow-[15px_15px_0px_0px_#FF375F] flex flex-col justify-between"
              >
                <div>
                  {/* Comic Issue Header Badge */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-[#FFDE00] border-2 border-black font-comic text-xs px-2 py-0.5 text-black uppercase tracking-wider shadow-[2px_2px_0px_0px_#000]">
                      ISSUE #0{pIdx + 1}
                    </span>
                    <span className="font-comic text-xs text-[#2A7FFF] uppercase tracking-widest">
                      MARVEL ED.
                    </span>
                  </div>

                  {/* Slanted Image Panel */}
                  <div className="relative overflow-hidden h-48 border-4 border-black transform -rotate-1 group-hover:rotate-0 transition-transform">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent"></div>
                    <div className="absolute bottom-2 left-2 bg-[#FF375F] border-2 border-black font-comic text-[10px] text-white px-2 py-0.5 uppercase tracking-wider">
                      DAILY BUGLE FEATURE
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-comic text-sm bg-white text-black border-2 border-black px-2 py-0.5 rounded-full shadow-[2px_2px_0px_0px_#2A7FFF]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h4 className="font-comic text-3xl mt-4 mb-2 text-[#FF375F] group-hover:text-[#FFDE00] transition-colors">
                    {project.title}
                  </h4>
                  <p className="font-sans text-gray-400 text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="mt-6 flex gap-2">
                  {(project.link || project.liveDemoUrl) ? (
                    <a
                      href={project.link || project.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <button
                        className="w-full py-2 bg-[#2A7FFF] border-2 border-black font-comic text-xl text-white hover:bg-[#FF375F] transition-colors cursor-pointer"
                      >
                        View Intel
                      </button>
                    </a>
                  ) : null}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 bg-black/60 border-2 border-black hover:border-[#FFDE00] text-white hover:text-[#FFDE00] flex items-center justify-center transition-colors cursor-pointer"
                      title="GitHub Repository"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                    </a>
                  )}
                </div>

                {/* Spider-sense border glow */}
                <div className="absolute -inset-1 border-2 border-[#FF375F] opacity-0 group-hover:opacity-100 transition-opacity blur-sm -z-10 animate-pulse"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsGrid;

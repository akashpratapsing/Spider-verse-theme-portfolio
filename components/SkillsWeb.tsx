
import React from 'react';

const SkillsWeb: React.FC = () => {
  const skillCategories = [
    {
      title: 'Languages',
      skills: ['Java', 'Python', 'JavaScript'],
      color: '#FF375F', // Spidey Red
    },
    {
      title: 'Backend',
      skills: ['Spring Boot', 'FastAPI', 'REST APIs', 'Spring Security', 'JPA/Hibernate', 'JDBC'],
      color: '#2A7FFF', // Spidey Blue
    },
    {
      title: 'AI',
      skills: ['Gemini API', 'RAG', 'LiteLLM', 'LangChain', 'LangGraph', 'Tool Calling'],
      color: '#00FFFF', // Glitch Cyan
    },
    {
      title: 'Databases',
      skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'SQLite'],
      color: '#FFDE00', // Comic Yellow
    },
    {
      title: 'Frontend',
      skills: ['ReactJS', 'Streamlit', 'HTML', 'CSS'],
      color: '#36ff2b', // Spidey Green
    },
    {
      title: 'Tools',
      skills: ['Docker', 'Docker Compose', 'Git/GitHub', 'Maven', 'Postman', 'Netlify', 'Render'],
      color: '#F5F5F5', // Light Gray
    },
  ];

  return (
    <section id="skills" className="relative py-24 px-6 md:px-12 bg-[#0A0B1E]">
      {/* Subtle halftone overlay - very low opacity as requested */}
      <div className="absolute inset-0 halftone opacity-[0.03] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16">
          <h3 className="font-comic text-5xl md:text-6xl text-[#F5F5F5] uppercase tracking-tighter inline-block relative">
            Technical Arsenal
            <div className="absolute -bottom-2 left-0 w-full h-2 bg-[#FF375F] transform -skew-x-12"></div>
          </h3>
          <p className="font-marker text-[#2A7FFF] text-xl mt-4 opacity-80">Architecture & Implementation Layers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((cat, idx) => (
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

              {/* Yellow Divider as requested */}
              <div className="w-full h-1 bg-[#FFDE00]/30 mb-6 rounded-full"></div>

              <ul className="space-y-4">
                {cat.skills.map((skill, sIdx) => (
                  <li key={sIdx} className="flex items-center gap-3 text-lg text-[#F5F5F5]/90 font-sans tracking-wide">
                    <span className="text-[#FF375F] text-xl font-bold">›</span>
                    {skill}
                  </li>
                ))}
              </ul>

              {/* Ben-Day dots shading used subtly on the card corner */}
              <div className="absolute bottom-0 right-0 w-24 h-24 ben-day opacity-10 pointer-events-none rounded-br-lg"></div>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t-2 border-white/5 flex justify-between items-center text-sm font-marker text-[#2A7FFF]/60 italic">
          <span>// Layered Service Architecture</span>
          <span>// Multiverse Ready</span>
        </div>
      </div>
    </section>
  );
};

export default SkillsWeb;

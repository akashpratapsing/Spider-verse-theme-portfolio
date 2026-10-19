import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { SOCIAL_LINKS } from '../constants';

const Footer: React.FC = () => {
  const { theme } = useTheme();
  const isLantern = theme === 'green-lantern';

  return (
    <footer 
      className={`py-20 px-6 md:px-10 transition-colors duration-400 ${
        isLantern 
          ? 'bg-[#050D0A] border-t border-[#00FF66]/40' 
          : 'bg-[#0A0B1E] border-t-8 border-black'
      }`}
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Email Capsule / Bubble */}
        <div className="relative mb-12 animate-bounce">
          {isLantern ? (
            <div className="bg-[#071912] border-2 border-[#00FF66] px-8 py-4 rounded-2xl text-center shadow-[0_0_25px_rgba(0,255,102,0.4)] flex items-center gap-3">
              <svg className="w-5 h-5 text-[#00FF66]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <a 
                href={`mailto:${SOCIAL_LINKS.email}`} 
                className="font-orbitron text-[#F5FFF8] text-lg md:text-xl font-bold tracking-wider hover:text-[#00FF66] transition-colors"
              >
                {SOCIAL_LINKS.email}
              </a>
            </div>
          ) : (
            <div>
              <div className="bg-white border-4 border-black px-8 py-4 rounded-[2rem] text-center shadow-[4px_4px_0px_0px_#FF375F]">
                <a 
                  href={`mailto:${SOCIAL_LINKS.email}`}
                  className="font-comic text-black text-2xl lowercase hover:text-[#FF375F] transition-colors"
                >
                  {SOCIAL_LINKS.email}
                </a>
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white border-r-4 border-b-4 border-black transform rotate-45"></div>
            </div>
          )}
        </div>

        {/* Social Links (LinkedIn, X) */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 mb-8">
          {/* LinkedIn */}
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn Profile"
            className={`group relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 ${
              isLantern
                ? 'bg-[#071912] border-2 border-[#00FF66] text-[#00FF66] hover:bg-[#00FF66] hover:text-[#050D0A] shadow-[0_0_15px_rgba(0,255,102,0.3)] hover:shadow-[0_0_25px_rgba(124,255,178,0.8)]'
                : 'bg-[#2A7FFF] border-4 border-black text-black shadow-[4px_4px_0px_0px_#FFDE00]'
            }`}
          >
            <svg className="w-7 h-7 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
            {!isLantern && (
              <div className="absolute -inset-2 border-2 border-[#2A7FFF] rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-sm"></div>
            )}
          </a>
          
          {/* Twitter / X */}
          <a
            href={SOCIAL_LINKS.twitter}
            target="_blank"
            rel="noopener noreferrer"
            title="Twitter / X Profile"
            className={`group relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 ${
              isLantern
                ? 'bg-[#071912] border-2 border-[#00FF66] text-[#00FF66] hover:bg-[#00FF66] hover:text-[#050D0A] shadow-[0_0_15px_rgba(0,255,102,0.3)] hover:shadow-[0_0_25px_rgba(124,255,178,0.8)]'
                : 'bg-[#FF375F] border-4 border-black text-black shadow-[4px_4px_0px_0px_#FFDE00]'
            }`}
          >
            <svg className="w-7 h-7 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
            </svg>
            {!isLantern && (
              <div className="absolute -inset-2 border-2 border-[#FF375F] rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-sm"></div>
            )}
          </a>
        </div>

        {/* Footer Attribution Tagline */}
        {isLantern ? (
          <p className="font-rajdhani text-[#7CFFB2] text-center font-bold tracking-widest uppercase text-base opacity-90">
            © {new Date().getFullYear()} Akash Pratap Singh | Sector 2814 • Powered by Willpower & Code
          </p>
        ) : (
          <p className="font-marker text-[#2A7FFF] text-center opacity-50">
            © {new Date().getFullYear()} Akash Pratap Singh | Handcrafted in the Multiverse
          </p>
        )}
      </div>
    </footer>
  );
};

export default Footer;

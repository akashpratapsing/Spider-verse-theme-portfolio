import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ExperienceWeb from './components/ExperienceWeb';
import SkillsWeb from './components/SkillsWeb';
import ProjectsGrid from './components/ProjectsGrid';
import EducationWeb from './components/EducationWeb';
import Footer from './components/Footer';
import BackgroundWeb from './components/BackgroundWeb';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import { useTheme } from './context/ThemeContext';

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scroll, setScroll] = useState<LocomotiveScroll | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { theme, playThemeSound } = useTheme();

  useEffect(() => {
    setIsLoaded(true);
    
    // Initialize Locomotive Scroll
    let scrollInstance: LocomotiveScroll | null = null;
    try {
      scrollInstance = new LocomotiveScroll();
      setScroll(scrollInstance);
    } catch (e) {
      // Graceful fallback
    }

    // Global click listener for the theme sound effect
    const handleGlobalClick = (e: MouseEvent) => {
      // Don't double sound on interactive elements like buttons/links that have their own sounds
      const target = e.target as HTMLElement;
      if (target.closest('button') || target.closest('a')) {
        return;
      }
      playThemeSound('click');
    };

    // Handle resize to update scroll calculations
    const handleResize = () => {
      if (scrollInstance) {
        if (typeof (scrollInstance as any).resize === 'function') {
          (scrollInstance as any).resize();
        } else if (typeof (scrollInstance as any).update === 'function') {
          (scrollInstance as any).update();
        }
      }
    };

    window.addEventListener('click', handleGlobalClick);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('click', handleGlobalClick);
      window.removeEventListener('resize', handleResize);
      if (scrollInstance) scrollInstance.destroy();
      setScroll(null);
    };
  }, []);

  return (
    <div className={`min-h-screen transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <BackgroundWeb scroll={scroll} />
      
      {/* Navbar moved outside the scroll container to maintain fixed positioning */}
      <Navbar scroll={scroll} />

      <div className="relative z-10" ref={scrollRef} data-scroll-container>
        <main data-scroll-section>
          <Hero scroll={scroll} />
          <ExperienceWeb />
          <SkillsWeb />
          <ProjectsGrid />
          <EducationWeb />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;

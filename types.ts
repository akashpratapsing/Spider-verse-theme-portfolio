
export interface Skill {
  name: string;
  category: string;
  x: number;
  y: number;
}

export interface SkillCategory {
  title: string;
  skills: string[];
  color: string;
  icons?: Record<string, string>;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
  githubUrl?: string;
  liveDemoUrl?: string;
  featured?: boolean;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  timeline: string;
  employmentType?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  currentlyWorking?: boolean;
  description?: string;
  bulletPoints?: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  gpa: string;
  coursework: string[];
}

export type SuperheroUniverse = 'Marvel' | 'DC' | 'Other';

export interface SuperheroThemeConfig {
  id: string;
  name: string;
  hero: string;
  universe: SuperheroUniverse;
  universeTag: string;
  tagline: string;
  primaryColor: string;
  accentColor: string;
  glowColor: string;
  bgDark: string;
  status: 'active' | 'upcoming';
  description: string;
}

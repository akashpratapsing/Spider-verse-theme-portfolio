
import { Project, Education, Experience, SkillCategory, SuperheroThemeConfig } from './types';
import cvlab from './assets/Cvlab.png';
import blog from './assets/BlogAPIs.png';
import fitmeal from './assets/fitmeal.png';

import rawSkills from './data/skills.json';
import rawProjects from './data/projects.json';
import rawExperience from './data/experience.json';

export const COLORS = {
  bg: '#0A0B1E',
  primary: '#FF375F', // Spidey Red
  secondary: '#2A7FFF', // Spidey Blue
  accent: '#FFDE00', // Comic Yellow
  textLight: '#F5F5F5',
  textDark: '#111111',
};

export const SOCIAL_LINKS = {
  github: 'https://github.com/akashpratapsing',
  leetcode: 'https://leetcode.com/u/Akiii_473/',
  codeforces: 'https://codeforces.com/profile/akkkii',
  codechef: 'https://www.codechef.com/users/akeeee',
  linkedin: 'https://www.linkedin.com/in/akash-pratap-singh-9117a0238/',
  twitter: 'https://x.com/AkashPrata21896',
  email: 'aakashprataps@gmail.com',
};

const IMAGE_MAP: Record<string, string> = {
  fitmeal,
  blog,
  cvlab,
  '/assets/fitmeal.png': fitmeal,
  '/assets/BlogAPIs.png': blog,
  '/assets/Cvlab.png': cvlab,
};

export const resolveProjectImage = (imageKeyOrUrl: string): string => {
  if (!imageKeyOrUrl) return fitmeal;
  if (IMAGE_MAP[imageKeyOrUrl]) return IMAGE_MAP[imageKeyOrUrl];
  return imageKeyOrUrl;
};

export const skillCategories: SkillCategory[] = rawSkills as SkillCategory[];
export const SKILL_CATEGORIES = skillCategories;

export const EXPERIENCE_DATA: Experience[] = (rawExperience as Experience[]).map(exp => ({
  ...exp,
  timeline: exp.timeline || (exp.startDate ? `${exp.startDate} – ${exp.currentlyWorking ? 'Present' : (exp.endDate || '')}` : 'Present'),
}));

export const PROJECTS: Project[] = (rawProjects as Project[]).map(p => ({
  ...p,
  image: resolveProjectImage(p.image),
}));

export const EDUCATION_DATA: Education[] = [
  {
    degree: 'B.Tech in Computer Science',
    institution: 'Gyan Ganga College of Technology, Jabalpur',
    period: '2021 - 2025',
    gpa: '7.76',
    coursework: ['Data Structures and Algorithms', 'Machine Learning', 'Computer Networks', 'Operating Systems', 'Cloud Computing', 'Database Management Systems']
  }
];

export const SUPERHERO_THEMES: SuperheroThemeConfig[] = [
  {
    id: 'spiderman',
    name: 'Spider-Man',
    hero: 'Peter Parker',
    universe: 'Marvel',
    universeTag: 'Earth-616 · Spider-Verse',
    tagline: 'With great power comes great responsibility',
    primaryColor: '#FF375F',
    accentColor: '#2A7FFF',
    glowColor: '#FFDE00',
    bgDark: '#0A0B1E',
    status: 'active',
    description: 'Vintage comic halftone pop-art aesthetic with web-shooters and bold dynamic borders',
  },
  {
    id: 'green-lantern',
    name: 'Green Lantern',
    hero: 'Hal Jordan',
    universe: 'DC',
    universeTag: 'Sector 2814 · Emerald Corps',
    tagline: 'In brightest day, in blackest night',
    primaryColor: '#00FF66',
    accentColor: '#008F4C',
    glowColor: '#7CFFB2',
    bgDark: '#050D0A',
    status: 'active',
    description: 'Futuristic cosmic construct interface powered by the Green Lantern Ring and emerald willpower',
  },
  {
    id: 'batman',
    name: 'Batman',
    hero: 'Bruce Wayne',
    universe: 'DC',
    universeTag: 'Gotham City · Dark Knight',
    tagline: 'I am vengeance, I am the night',
    primaryColor: '#F59E0B',
    accentColor: '#374151',
    glowColor: '#FBBF24',
    bgDark: '#0B0D13',
    status: 'upcoming',
    description: 'Tactical Batcave terminal with Bat-Signal silhouettes and high-tech graphite UI',
  },
  {
    id: 'ironman',
    name: 'Iron Man',
    hero: 'Tony Stark',
    universe: 'Marvel',
    universeTag: 'Earth-616 · Stark Industries',
    tagline: 'I am Iron Man',
    primaryColor: '#EF4444',
    accentColor: '#F59E0B',
    glowColor: '#38BDF8',
    bgDark: '#140608',
    status: 'upcoming',
    description: 'Holographic Jarvis HUD with Arc Reactor repulsor glows and gold titanium plating',
  },
  {
    id: 'flash',
    name: 'The Flash',
    hero: 'Barry Allen',
    universe: 'DC',
    universeTag: 'Central City · Speed Force',
    tagline: 'Fastest Man Alive',
    primaryColor: '#DC2626',
    accentColor: '#FBBF24',
    glowColor: '#FDE047',
    bgDark: '#160408',
    status: 'upcoming',
    description: 'Speed Force tachyon streak interface with lightning-fast reactive micro-interactions',
  },
];

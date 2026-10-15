
import { Project, Education, Experience } from './types';
import cvlab from './assets/Cvlab.png';
import blog from './assets/BlogAPIs.png';
import fitmeal from './assets/fitmeal.png';

export const COLORS = {
  bg: '#0A0B1E',
  primary: '#FF375F', // Spidey Red
  secondary: '#2A7FFF', // Spidey Blue
  accent: '#FFDE00', // Comic Yellow
  textLight: '#F5F5F5',
  textDark: '#111111',
};

export const EXPERIENCE_DATA: Experience[] = [
  {
    id: "exp-1",
    role: "Assistant System Engineer",
    company: "TCS",
    timeline: "Feb 2026 – Present",
  },
];

export const PROJECTS: Project[] = [
  {
    "id": "neural-nourish-ai",
    "title": "Fitmeal",
    "description": "A full-stack Gen-AI meal planner integrating Gemini AI, Razorpay payments, and MongoDB persistence with internal/external API orchestration.",
    "tags": ["Spring Boot", "Generative AI", "React", "MongoDB"],
    "image": fitmeal,
    "link": "https://fitmealx.netlify.app/"
  },
  {
    "id": "sentinel-backend",
    "title": "Blog App Backend",
    "description": "Production-ready RESTful API featuring JWT-based 'Sentinel' security, RBAC, and optimized MySQL persistence layer.",
    "tags": ["Java", "Spring Security", "MySQL", "Hibernate"],
    "image": blog,
    "link": "https://github.com/akashpratapsing/Blog-APIs"
  },
   {
    "id": "resume",
    "title": "CV Lab",
    "description": "CVLab is a LaTeX-powered resume builder with AI-driven ATS score analysis using Google's Gemini API.",
    "tags": ["Python", "Flask", "React", "Gemini API"],
    "image": cvlab,
    "link": "https://github.com/akashpratapsing/CVLab-Resume-Builder-And-ATS-Score-Checker"
  },
];

export const EDUCATION_DATA: Education[] = [
  {
    degree: 'B.Tech in Computer Science',
    institution: 'Gyan Ganga College of Technology, Jabalpur',
    period: '2021 - 2025',
    gpa: '7.76',
    coursework: ['Data Structures and Algorithms', 'Machine Learning', 'Computer Networks', 'Operating Systems', 'Cloud Computing', 'Database Management Systems']
  }
];

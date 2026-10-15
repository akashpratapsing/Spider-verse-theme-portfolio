
export interface Skill {
  name: string;
  category: string;
  x: number;
  y: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  timeline: string;
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  gpa: string;
  coursework: string[];
}

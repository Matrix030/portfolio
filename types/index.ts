// Project types
export interface Project {
  id: number;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  period?: string;
  highlights?: string[];
}

// Animation presets
export interface AnimationPreset {
  initial: { opacity: number; y?: number; x?: number };
  animate: { opacity: number; y?: number; x?: number };
  transition: { duration: number; delay?: number };
}

// Contact form
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  company?: string;
}

// Technology/Skill
export type SkillCategory = 'frontend' | 'backend' | 'devops' | 'ml' | 'tools' | 'database' | 'cloud';
export type ProficiencyLevel = 'learning' | 'comfortable' | 'proficient' | 'expert';

export interface Technology {
  name: string;
  icon: string;
  category: SkillCategory;
  proficiency?: ProficiencyLevel;
}

// Navigation
export interface NavLink {
  name: string;
  href: string;
}

// Social links
export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

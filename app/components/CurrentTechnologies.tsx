"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

const technologies = [
  // Core Programming Languages
  {
    name: 'Python',
    subtitle: 'Data Science & Backend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    color: '#3776AB'
  },
  {
    name: 'TypeScript',
    subtitle: 'JavaScript but better',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    color: '#3178C6'
  },
  {
    name: 'Java',
    subtitle: 'Enterprise Development',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
    color: '#ED8B00'
  },

  // Frontend Stack
  {
    name: 'React',
    subtitle: 'JavaScript Library',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    color: '#61DAFB'
  },
  {
    name: 'Next.js',
    subtitle: 'React Framework',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
    color: '#000000'
  },
  {
    name: 'Tailwind CSS',
    subtitle: 'Utility-first CSS',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
    color: '#06B6D4'
  },

  // Backend & Database
  {
    name: 'Node.js',
    subtitle: 'JavaScript Runtime',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    color: '#339933'
  },
  {
    name: 'PostgreSQL',
    subtitle: 'Relational Database',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    color: '#336791'
  },

  // Cloud & DevOps
  {
    name: 'AWS',
    subtitle: 'Cloud Platform',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg',
    color: '#FF9900'
  },
  {
    name: 'Docker',
    subtitle: 'Containerization',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    color: '#2496ED'
  },

  // Development Tools
  {
    name: 'Git',
    subtitle: 'Version Control',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    color: '#F05032'
  },

  // AI/ML Specialization
  {
    name: 'TensorFlow',
    subtitle: 'Machine Learning',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
    color: '#FF6F00'
  }
];

const TechCard = ({ tech, index }: { tech: typeof technologies[0], index: number }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        y: -5, 
        transition: { duration: 0.2 } 
      }}
      className="flex items-center gap-3 p-4 bg-[#1F2937] rounded-lg border border-[#2A2A2A] hover:border-[#05C3A8]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#05C3A8]/10 group cursor-pointer min-w-[220px]"
    >
      <div className="flex-shrink-0 w-10 h-10 relative">
        {!imageError ? (
          <Image
            src={tech.icon}
            alt={`${tech.name} icon`}
            width={40}
            height={40}
            className="rounded-lg object-contain"
            onError={() => setImageError(true)}
            unoptimized // This helps with external CDN images
          />
        ) : (
          // Fallback div with first letter if icon fails to load
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg"
            style={{ backgroundColor: tech.color }}
          >
            {tech.name.charAt(0)}
          </div>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="text-white font-semibold text-base font-manifold group-hover:text-[#ABFFE9] transition-colors duration-300">
          {tech.name}
        </h3>
        <p className="text-[#B0B0B0] text-sm font-forma mt-1 opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-6 transition-all duration-300 overflow-hidden">
          {tech.subtitle}
        </p>
      </div>
    </motion.div>
  );
};

const CurrentTechnologies = () => {
  return (
    <section className="py-21 px-4 bg-[#010A13]" id="technologies">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-manifold">
            Current technologies
          </h2>
          <p className="text-[#B0B0B0] text-lg max-w-3xl mx-auto font-forma">
            I'm proficient in a range of modern technologies that empower me to build highly functional solutions. These are some of my main technologies.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {technologies.map((tech, index) => (
            <TechCard key={tech.name} tech={tech} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CurrentTechnologies;

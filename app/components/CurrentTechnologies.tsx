"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

const technologies = [
  {
    name: 'Figma',
    subtitle: 'Design Tool',
    icon: '/icons/figma.svg', // You'll need to add these icons to your public/icons folder
    color: '#F24E1E'
  },
  {
    name: 'TypeScript',
    subtitle: 'JavaScript but better',
    icon: './../../public/icons/typescript.svg',
    color: '#3178C6'
  },
  {
    name: 'React',
    subtitle: 'JavaScript Library',
    icon: '/icons/react.svg',
    color: '#61DAFB'
  },
  {
    name: 'NextJS',
    subtitle: 'React framework',
    icon: '/icons/nextjs.svg',
    color: '#000000'
  },
  {
    name: 'Tailwind',
    subtitle: 'CSS framework',
    icon: '/icons/tailwind.svg',
    color: '#06B6D4'
  },
  {
    name: 'Git',
    subtitle: 'Version control',
    icon: '/icons/git.svg',
    color: '#F05032'
  },
  {
    name: 'Supabase',
    subtitle: 'Backend tool',
    icon: '/icons/supabase.svg',
    color: '#3ECF8E'
  },
  {
    name: 'NodeJS',
    subtitle: 'Backend',
    icon: '/icons/nodejs.svg',
    color: '#339933'
  },
  {
    name: 'MongoDB',
    subtitle: 'NoSQL database',
    icon: '/icons/mongodb.svg',
    color: '#47A248'
  },
  {
    name: 'Prisma',
    subtitle: 'ORM',
    icon: '/icons/prisma.svg',
    color: '#2D3748'
  },
  {
    name: 'PostgreSQL',
    subtitle: 'OR database system',
    icon: '/icons/postgresql.svg',
    color: '#336791'
  }
];

const TechCard = ({ tech, index }: { tech: typeof technologies[0], index: number }) => {
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
        {/* Fallback div with first letter if icon fails to load */}
        <div 
          className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg"
          style={{ backgroundColor: tech.color }}
        >
          {tech.name.charAt(0)}
        </div>
        
        {/* Uncomment this when you add the actual icons */}
        <Image
          src={tech.icon}
          alt={`${tech.name} icon`}
          width={40}
          height={40}
          className="rounded-lg"
          onError={(e) => {
            // Hide the image if it fails to load, showing the fallback div above
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="text-white font-semibold text-base font-manifold group-hover:text-[#ABFFE9] transition-colors duration-300">
          {tech.name}
        </h3>
        <p className="text-[#B0B0B0] text-sm font-forma mt-1">
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
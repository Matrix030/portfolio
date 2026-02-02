"use client";

import { motion } from 'framer-motion';
import {
  Code2,
  Coffee,
  Atom,
  Server,
  Database,
  Cloud,
  Brain,
  Monitor,
  BarChart3,
  type LucideIcon
} from 'lucide-react';
import { fadeInUp, fadeInLeft, fadeIn, viewportOnce } from '@/lib/animations';

interface Skill {
  name: string;
  level: number;
  Icon: LucideIcon;
}

interface Service {
  title: string;
  description: string;
  Icon: LucideIcon;
}

const skills: Skill[] = [
  { name: 'Python', level: 95, Icon: Code2 },
  { name: 'JavaScript/TypeScript', level: 90, Icon: Code2 },
  { name: 'Java', level: 85, Icon: Coffee },
  { name: 'React & Next.js', level: 85, Icon: Atom },
  { name: 'Node.js', level: 80, Icon: Server },
  { name: 'SQL (PostgreSQL, MySQL)', level: 85, Icon: Database },
  { name: 'AWS Cloud', level: 80, Icon: Cloud },
  { name: 'Machine Learning', level: 75, Icon: Brain },
];

const services: Service[] = [
  {
    title: 'Full Stack Development',
    description: 'Building responsive web applications with modern frameworks like React, Next.js, and Node.js.',
    Icon: Monitor,
  },
  {
    title: 'Cloud Solutions',
    description: 'Implementing scalable cloud solutions using AWS and other cloud platforms.',
    Icon: Cloud,
  },
  {
    title: 'AI/ML Integration',
    description: 'Developing machine learning models and integrating AI solutions for business needs.',
    Icon: Brain,
  },
  {
    title: 'Data Analysis',
    description: 'Analyzing large datasets to extract valuable insights using Python and visualization tools.',
    Icon: BarChart3,
  },
];

const SkillBar = ({ skill, index }: { skill: Skill, index: number }) => {
  const { Icon } = skill;
  return (
    <motion.div
      className="mb-6"
      variants={fadeInLeft}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ delay: index * 0.1 }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <Icon className="mr-2 w-5 h-5 text-brand-teal" />
          <span className="font-medium text-white font-forma">{skill.name}</span>
        </div>
        <span className="text-sm text-brand-text-muted">{skill.level}%</span>
      </div>
      <div className="h-2 bg-brand-card rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-brand-teal to-brand-mint rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
        />
      </div>
    </motion.div>
  );
};

const ServiceCard = ({ service, index }: { service: Service, index: number }) => {
  const { Icon } = service;
  return (
    <motion.div
      className="bg-brand-card border border-brand-border hover:border-brand-teal/30 p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-brand-teal/10"
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Icon className="w-8 h-8 mb-4 text-brand-teal" />
      <h3 className="text-xl font-semibold mb-2 text-white font-manifold">{service.title}</h3>
      <p className="text-brand-text-muted font-forma">{service.description}</p>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section className="py-20 px-4 bg-brand-dark" id="skills">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-12 text-center text-white font-manifold"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          Skills
        </motion.h2>

        <div className="flex flex-col lg:flex-row gap-16">
          <div className="w-full lg:w-1/2">
            <motion.h3
              className="text-2xl font-semibold mb-6 text-brand-mint font-manifold"
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              Technical Skills
            </motion.h3>
            
            <div>
              {skills.map((skill, index) => (
                <SkillBar key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </div>
          
          <div className="w-full lg:w-1/2">
            <motion.h3
              className="text-2xl font-semibold mb-6 text-brand-mint font-manifold"
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              Services
            </motion.h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((service, index) => (
                <ServiceCard key={service.title} service={service} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;

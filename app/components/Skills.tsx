"use client";

import { motion } from 'framer-motion';
import {
  Monitor,
  Cloud,
  Brain,
  BarChart3,
  type LucideIcon
} from 'lucide-react';
import { fadeInUp, fadeIn, viewportOnce } from '@/lib/animations';

interface Service {
  title: string;
  description: string;
  Icon: LucideIcon;
}

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

const ServiceCard = ({ service, index }: { service: Service, index: number }) => {
  const { Icon } = service;
  return (
    <motion.div
      className="bg-brand-card border border-brand-border hover:border-brand-teal/30 p-6 rounded-xl transition-all duration-300 hover:bg-brand-card/80"
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ delay: index * 0.1 }}
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
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-4 text-center text-white font-manifold"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          What I Do
        </motion.h2>
        
        <motion.p
          className="text-brand-text-muted text-center mb-12 max-w-2xl mx-auto font-forma"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          Areas where I can contribute and deliver value
        </motion.p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;

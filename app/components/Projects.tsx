"use client";

import { motion } from 'framer-motion';
import React from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import Link from "next/link";

const projects = [
  {
    id: 1,
    title: 'LocalPilotAI',
    description: 'Fully offline AI code autocompletion tool integrated into VS Code for developer productivity.',
    tags: ['TypeScript', 'Python', 'FastAPI', 'OLLAMA', 'LLM'],
    imageUrl: '/images/LocalPilot_Thumbnail.png',
    period: 'Jan 2025 - Feb 2025',
    github: 'https://github.com/Matrix030/LocalPilot'
  },
  {
    id: 2,
    title: 'Personality Prediction for CV Analysis',
    description: 'ML model to predict candidates personalities through sentiment analysis using Big 5 traits.',
    tags: ['Python', 'NLP', 'Machine Learning', 'Pandas'],
    imageUrl: '/images/PersonalityPrediction.png',
    period: 'August 2022 - May 2023',
    github: 'https://github.com/Matrix030/PersonalityPrediction2',
    publication: 'https://ltce.in/assets/Final-proceeding-ICRMIR-2023.pdf'
  },
  {
    id: 3,
    title: 'Student Recommendation System',
    description: 'K-means clustering algorithm to categorize students into performance-based groups.',
    tags: ['Python', 'Numpy', 'Pandas', 'PostgreSQL'],
    imageUrl: '/images/StudentRecommendationSystem.png',
    period: 'Jan 2022 - June 2022',
    github: 'https://github.com/Matrix030/Student-Analysis'
  },
  {
    id: 4,
    title: 'User Management System',
    description: 'Scalable system streamlining access control for multiple departments at National Informatics Centre.',
    tags: ['PHP', 'Node.js', 'React.js', 'PostgreSQL'],
    imageUrl: '/images/user-management.jpg',
    period: 'April 2022 - Sept 2022'
  },
];

const ProjectCard = ({ project, index }: { project: typeof projects[0], index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="w-full"
    >
      <CardContainer className="w-full">
        <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-auto rounded-xl p-6 border">
          <CardItem
            translateZ="50"
            className="text-xl font-bold text-neutral-600 dark:text-white font-manifold"
          >
            {project.title}
          </CardItem>
          
          <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300 font-forma"
          >
            {project.description}
          </CardItem>
          
          <CardItem translateZ="100" className="w-full mt-4">
            <div className="h-60 w-full bg-gray-200 dark:bg-gray-700 rounded-xl overflow-hidden">
              {/* Display project image */}
              <img 
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          </CardItem>
          
          <CardItem translateZ="40" className="flex flex-wrap gap-2 mt-4">
            {project.tags.map((tag, i) => (
              <span 
                key={i} 
                className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded font-forma"
              >
                {tag}
              </span>
            ))}
          </CardItem>
          
          <div className="flex justify-between items-center mt-8">
            {project.github ? (
              <CardItem
                translateZ={20}
                as="a"
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white font-forma"
              >
                GitHub →
              </CardItem>
            ) : (
              <CardItem
                translateZ={20}
                as={Link}
                href="#"
                className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white font-forma"
              >
                View Details →
              </CardItem>
            )}
            
            <CardItem
              translateZ={20}
              as="button"
              className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold font-forma"
            >
              Demo
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <section className="py-20 px-4 relative" id="projects">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/20 dark:via-blue-900/10 to-transparent -z-10"></div>
      
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-manifold">
            <span className="text-gradient">My Projects</span>
          </h2>
          <p className="text-white max-w-2xl mx-auto font-forma">
            These projects showcase my skills in full-stack development, machine learning, and data analysis.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-2xl font-semibold mb-6 text-white font-manifold">Publications</h3>
          <CardContainer className="inline-block">
            <CardBody className="bg-gray-50 dark:bg-black p-8 rounded-xl shadow-md dark:hover:shadow-2xl dark:hover:shadow-purple-500/[0.1] border border-black/[0.1] dark:border-white/[0.2]">
              <CardItem translateZ={20} className="font-bold text-xl mb-3 text-neutral-600 dark:text-white font-manifold">
                Personality Prediction for CV Analysis
              </CardItem>
              <CardItem translateZ={40} className="text-neutral-500 dark:text-neutral-300 font-forma">
                International Conference on Recent Trends on Multidisciplinary Research and Innovation (ICRMIR – 2023)
              </CardItem>
              <CardItem translateZ={60} className="mt-6">
                <motion.a
                  href="https://ltce.in/assets/Final-proceeding-ICRMIR-2023.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold font-forma"
                >
                  View Publication
                </motion.a>
              </CardItem>
            </CardBody>
          </CardContainer>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects; 
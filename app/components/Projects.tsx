"use client";

import { motion } from 'framer-motion';
import React from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import Link from "next/link";

const projects = [
  {
    id: 1,
    title: 'SteamLens AI',
    description: 'GPU-accelerated NLP pipeline processing 400k+ game reviews in 3 min. Replaced Kubernetes with Dask, cutting memory 40% and achieving <1s startup. Deployed on AWS EC2 with 99% GPU utilization.',
    tags: ['Dask', 'PyTorch', 'Hugging Face', 'MongoDB', 'Docker', 'AWS EC2'],
    imageUrl: '/images/steamlens-ai.png',
    period: 'Current Project',
    highlights: ['400k+ reviews processed', '40% memory reduction', '85% hosting cost savings']
  },
  {
    id: 2,
    title: 'LocalPilotAI',
    description: 'Offline AI code-autocomplete VS Code extension with 100% data privacy. Powered by qwen3-coder LLM from Ollama with sub-50ms inference latency. Increased developer productivity by 50%.',
    tags: ['TypeScript', 'Python', 'Pydantic', 'Ollama', 'VS Code'],
    imageUrl: '/images/LocalPilot_Thumbnail.png',
    period: 'Jan 2025 - Feb 2025',
    github: 'https://github.com/Matrix030/LocalPilot',
    highlights: ['50% productivity boost', '100% offline', '<50ms latency']
  },
  {
    id: 3,
    title: 'PatchBotAI',
    description: 'Agentic AI system automating multi-step debugging workflows, reducing dev time by 60%. Features secure sandbox for file I/O with 100% filesystem isolation and Claude Code-like UX.',
    tags: ['Python', 'Gemini API', 'Pydantic', 'Subprocess'],
    imageUrl: '/images/patchbot-ai.png',
    period: '2024',
    highlights: ['60% dev time reduction', '100% filesystem isolation', 'Multi-file bug resolution']
  },
  {
    id: 4,
    title: 'NYC Transit Hub',
    description: 'Real-time transit tracking app using MTA API & Mapbox, serving 80+ active users. Alert dashboard and live map reduced transit lookup time by 70% compared to official MTA tools.',
    tags: ['TypeScript', 'RESTful API', 'Firebase', 'Mapbox'],
    imageUrl: '/images/nyc-transit.png',
    period: '2024',
    highlights: ['80+ active users', '70% faster lookups', 'Real-time updates']
  },
  {
    id: 5,
    title: 'Personality Prediction for CV Analysis',
    description: 'ML model achieving 93% accuracy predicting Big 5 personality traits from resume text. Cut recruiter decision time by 30%. Published at ICRMIR 2023.',
    tags: ['Python', 'NumPy', 'Pandas', 'NLP', 'scikit-learn'],
    imageUrl: '/images/PersonalityPrediction.png',
    period: 'August 2022 - May 2023',
    github: 'https://github.com/Matrix030/PersonalityPrediction2',
    publication: 'https://ltce.in/assets/Final-proceeding-ICRMIR-2023.pdf',
    highlights: ['93% accuracy', '30% faster decisions', 'Published research']
  },
  {
    id: 6,
    title: 'QuantumHealthShield',
    description: 'Post-quantum encryption system using AES-GCM + Kyber for medical records with 85% stronger key exchange than RSA. Dilithium-based signing eliminated 95% of IoT data tampering.',
    tags: ['Python', 'AES-GCM', 'Kyber', 'Dilithium', 'OQS-Python'],
    imageUrl: '/images/quantum-health.png',
    period: '2024',
    highlights: ['85% stronger encryption', '95% tampering prevention', 'Post-quantum ready']
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
        <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-brand-teal/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-auto rounded-xl p-6 border">
          <CardItem
            translateZ="50"
            className="text-xl font-bold text-neutral-600 dark:text-white font-manifold"
          >
            {project.title}
          </CardItem>

          <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-500 text-sm mt-2 dark:text-neutral-300 font-forma"
          >
            {project.description}
          </CardItem>

          <CardItem translateZ="100" className="w-full mt-4">
            <div className="h-60 w-full bg-gray-200 dark:bg-gray-700 rounded-xl overflow-hidden">
              <img
                src={project.imageUrl}
                alt={`Screenshot of ${project.title}: ${project.description.slice(0, 50)}...`}
                className="w-full h-full object-cover"
              />
            </div>
          </CardItem>

          {project.highlights && (
            <CardItem translateZ="30" className="flex flex-wrap gap-2 mt-4">
              {project.highlights.map((highlight, i) => (
                <span
                  key={i}
                  className="text-xs bg-brand-teal/20 text-brand-mint px-2 py-1 rounded font-forma"
                >
                  {highlight}
                </span>
              ))}
            </CardItem>
          )}

          <CardItem translateZ="40" className="flex flex-wrap gap-2 mt-3">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded font-forma"
              >
                {tag}
              </span>
            ))}
          </CardItem>

          <div className="flex justify-between items-center mt-6">
            {project.github ? (
              <CardItem
                translateZ={20}
                as="a"
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl text-sm font-normal dark:text-white hover:text-brand-teal transition-colors font-forma"
              >
                GitHub →
              </CardItem>
            ) : (
              <CardItem
                translateZ={20}
                as={Link}
                href="#"
                className="px-4 py-2 rounded-xl text-sm font-normal dark:text-white font-forma"
              >
                View Details →
              </CardItem>
            )}
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
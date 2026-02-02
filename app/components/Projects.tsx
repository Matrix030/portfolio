"use client";

import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

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
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group bg-brand-card border border-brand-border rounded-xl overflow-hidden hover:border-brand-teal/30 transition-colors"
    >
      {/* Image */}
      <div className="aspect-video w-full overflow-hidden bg-brand-dark">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="text-lg font-semibold text-white font-manifold leading-tight">
            {project.title}
          </h3>
          <span className="text-xs text-brand-text-muted whitespace-nowrap font-forma">
            {project.period}
          </span>
        </div>

        <p className="text-sm text-brand-text-muted mb-4 font-forma leading-relaxed">
          {project.description}
        </p>

        {/* Highlights */}
        {project.highlights && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.highlights.map((highlight, i) => (
              <span
                key={i}
                className="text-xs bg-brand-teal/10 text-brand-mint px-2 py-1 rounded font-forma"
              >
                {highlight}
              </span>
            ))}
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((tag, i) => (
            <span
              key={i}
              className="text-xs text-brand-text-muted bg-brand-dark px-2 py-0.5 rounded font-forma"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 pt-3 border-t border-brand-border">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-brand-text-muted hover:text-brand-teal transition-colors font-forma"
            >
              <Github className="w-4 h-4" />
              <span>Code</span>
            </a>
          )}
          {project.publication && (
            <a
              href={project.publication}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-brand-text-muted hover:text-brand-teal transition-colors font-forma"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Publication</span>
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
};

const Projects = () => {
  return (
    <section className="py-20 px-4" id="projects">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white font-manifold">
            Projects
          </h2>
          <p className="text-brand-text-muted max-w-2xl mx-auto font-forma">
            A selection of projects showcasing my work in full-stack development, machine learning, and systems engineering.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

"use client";

import { motion } from "framer-motion";
import { projects } from "@/lib/projects-data";
import { useRef } from "react";
import { VariantNav } from "../components/VariantNav";

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
      className="flex-shrink-0 w-[340px] md:w-[480px] group"
    >
      <div className="relative h-[520px] md:h-[600px] rounded-2xl overflow-hidden border border-white/[0.06] bg-[#0A1628]">
        {/* Image */}
        <div className="relative h-[55%] overflow-hidden">
          <img
            src={project.imageUrl}
            alt={`${project.title} project screenshot`}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0A1628]" />

          <div className="absolute top-4 left-4">
            <span className="text-[11px] font-forma font-medium text-white/80 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
              {project.period}
            </span>
          </div>

          <div className="absolute top-4 right-4">
            <span className="text-[11px] font-forma font-medium uppercase tracking-wider text-brand-teal bg-brand-teal/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-brand-teal/20">
              {project.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col h-[45%]">
          <h3 className="text-2xl font-bold font-manifold text-white mb-3 group-hover:text-brand-mint transition-colors duration-300">
            {project.title}
          </h3>

          <p className="text-brand-text-muted font-forma text-sm leading-relaxed mb-4 line-clamp-3">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.highlights.map((h, i) => (
              <span
                key={i}
                className="text-xs font-forma text-brand-cyan bg-brand-cyan/[0.06] px-2.5 py-1 rounded-md border border-brand-cyan/10"
              >
                {h}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-1.5 mt-auto">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="text-[10px] font-forma text-white/40 bg-white/[0.04] px-2 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-forma text-brand-teal hover:text-brand-mint transition-colors"
              aria-label={`View ${project.title} on GitHub`}
            >
              View on GitHub
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 17L17 7M17 7H7M17 7v10"
                />
              </svg>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function HorizontalScrollVariant() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -400, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 400, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#010A13] text-white">
      <VariantNav current={2} />

      <section className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <motion.div
            className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <p className="text-brand-teal font-forma text-sm tracking-widest uppercase mb-3">
                Portfolio
              </p>
              <h1 className="text-4xl md:text-6xl font-bold font-manifold text-white mb-4">
                Selected Works
              </h1>
              <p className="text-brand-text-muted font-forma max-w-xl text-lg leading-relaxed">
                Scroll to explore each project in detail.
              </p>
            </div>

            <div className="flex gap-3 mt-6 md:mt-0">
              <button
                onClick={scrollLeft}
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/[0.05] hover:border-brand-teal/30 transition-all"
                aria-label="Scroll left"
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
              <button
                onClick={scrollRight}
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/[0.05] hover:border-brand-teal/30 transition-all"
                aria-label="Scroll right"
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Horizontal scroll */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto px-4 md:px-8 pb-8 snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="flex-shrink-0 w-4 md:w-[calc((100vw-1280px)/2)]" />
          {projects.map((project, index) => (
            <div key={project.id} className="snap-start">
              <ProjectCard project={project} index={index} />
            </div>
          ))}
          <div className="flex-shrink-0 w-4 md:w-[calc((100vw-1280px)/2)]" />
        </div>

        {/* Scroll indicator */}
        <div className="max-w-7xl mx-auto px-4 mt-8">
          <div className="h-px bg-white/[0.06] relative">
            <motion.div
              className="h-px bg-brand-teal absolute top-0 left-0"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </div>
          <div className="flex justify-between mt-4">
            <span className="text-[11px] font-forma text-white/30 uppercase tracking-wider">
              01
            </span>
            <span className="text-[11px] font-forma text-white/30 uppercase tracking-wider">
              0{projects.length}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import { motion } from "motion/react";
import { projects } from "@/lib/projects-data";
import { VariantNav } from "../components/VariantNav";

export default function BentoGridVariant() {
  return (
    <div className="min-h-screen bg-[#010A13] text-white">
      <VariantNav current={1} />

      <section className="px-4 pb-20 pt-28">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-brand-teal font-forma text-sm tracking-widest uppercase mb-3">
              Portfolio
            </p>
            <h1 className="text-4xl md:text-6xl font-bold font-manifold text-white mb-4">
              Selected Works
            </h1>
            <p className="text-brand-text-muted font-forma max-w-xl text-lg leading-relaxed">
              A curated collection of projects spanning AI/ML, full-stack
              development, and systems engineering.
            </p>
          </motion.div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[280px]">
            {projects.map((project, index) => {
              const isLarge = index === 0;
              const isWide = index === 1;

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`group relative rounded-2xl overflow-hidden border border-white/[0.06] ${
                    isLarge
                      ? "md:col-span-2 md:row-span-2"
                      : isWide
                      ? "lg:col-span-2"
                      : ""
                  }`}
                >
                  {/* Background image */}
                  <div className="absolute inset-0">
                    <img
                      src={project.imageUrl}
                      alt={`${project.title} project screenshot`}
                      className="w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#010A13] via-[#010A13]/70 to-transparent" />
                  </div>

                  {/* Content overlay */}
                  <div className="relative h-full flex flex-col justify-end p-6">
                    <span className="inline-block w-fit text-[11px] font-forma font-medium uppercase tracking-wider text-brand-teal bg-brand-teal/10 border border-brand-teal/20 px-3 py-1 rounded-full mb-3">
                      {project.category}
                    </span>

                    <h3 className="text-xl md:text-2xl font-bold font-manifold text-white mb-2 group-hover:text-brand-mint transition-colors duration-300">
                      {project.title}
                    </h3>

                    {(isLarge || isWide) && (
                      <p className="text-brand-text-muted font-forma text-sm leading-relaxed mb-4 line-clamp-2">
                        {project.description}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.highlights.map((h, i) => (
                        <span
                          key={i}
                          className="text-[11px] font-forma text-brand-mint/80 bg-white/[0.04] px-2.5 py-1 rounded-md"
                        >
                          {h}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {project.tags.slice(0, isLarge ? 6 : 3).map((tag, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-forma text-white/50 bg-white/[0.06] px-2 py-0.5 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                      {project.github ? (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/10 hover:bg-brand-teal/20 transition-colors"
                          aria-label={`View ${project.title} on GitHub`}
                        >
                          <svg
                            className="w-4 h-4 text-white"
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
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/10">
                          <svg
                            className="w-4 h-4 text-white"
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
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

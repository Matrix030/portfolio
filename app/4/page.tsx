"use client";

import { motion, AnimatePresence } from "motion/react";
import { projects } from "@/lib/projects-data";
import { useState } from "react";
import { VariantNav } from "../components/VariantNav";

function ProjectAccordionItem({
  project,
  index,
  isOpen,
  onToggle,
}: {
  project: (typeof projects)[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group"
    >
      <div
        className={`border border-white/[0.06] rounded-2xl overflow-hidden transition-all duration-500 ${
          isOpen
            ? "bg-[#0A1628] border-brand-teal/20"
            : "bg-[#0A1628]/50 hover:bg-[#0A1628] hover:border-white/10"
        }`}
      >
        <button
          onClick={onToggle}
          className="w-full text-left"
          aria-expanded={isOpen}
          aria-controls={`project-panel-${project.id}`}
        >
          <div className="flex items-center gap-6 p-5 md:p-6">
            <span className="text-3xl md:text-4xl font-manifold font-bold text-white/10 group-hover:text-brand-teal/30 transition-colors flex-shrink-0 w-12 text-center">
              {String(index + 1).padStart(2, "0")}
            </span>

            <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl overflow-hidden flex-shrink-0 border border-white/[0.06]">
              <img
                src={project.imageUrl}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-lg md:text-xl font-bold font-manifold text-white group-hover:text-brand-mint transition-colors truncate">
                {project.title}
              </h3>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-[11px] font-forma text-brand-teal uppercase tracking-wider">
                  {project.category}
                </span>
                <span className="text-white/20">|</span>
                <span className="text-[11px] font-forma text-white/40">
                  {project.period}
                </span>
              </div>
            </div>

            <div className="hidden lg:flex gap-2 flex-shrink-0">
              {project.highlights.slice(0, 2).map((h, i) => (
                <span
                  key={i}
                  className="text-[11px] font-forma text-brand-mint/70 bg-brand-mint/[0.06] px-2.5 py-1 rounded-md"
                >
                  {h}
                </span>
              ))}
            </div>

            <div className="flex-shrink-0 ml-2">
              <motion.div
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.3 }}
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center"
              >
                <svg
                  className="w-4 h-4 text-white/60"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </motion.div>
            </div>
          </div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              id={`project-panel-${project.id}`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="overflow-hidden"
            >
              <div className="px-5 md:px-6 pb-6">
                <div className="border-t border-white/[0.06] pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-6">
                    <div className="relative rounded-xl overflow-hidden h-56 md:h-72">
                      <img
                        src={project.imageUrl}
                        alt={`${project.title} project screenshot`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/60 to-transparent" />
                    </div>

                    <div className="flex flex-col">
                      <p className="text-brand-text-muted font-forma text-sm leading-relaxed mb-5">
                        {project.description}
                      </p>

                      <div className="mb-5">
                        <p className="text-[10px] font-forma text-white/30 uppercase tracking-widest mb-2">
                          Key Results
                        </p>
                        <div className="grid grid-cols-3 gap-3">
                          {project.highlights.map((h, i) => (
                            <div
                              key={i}
                              className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-3 text-center"
                            >
                              <span className="text-sm font-forma font-medium text-brand-mint">
                                {h}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mb-5">
                        <p className="text-[10px] font-forma text-white/30 uppercase tracking-widest mb-2">
                          Technologies
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="text-xs font-forma text-white/60 bg-white/[0.04] px-3 py-1.5 rounded-lg border border-white/[0.06]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-3 mt-auto">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-teal/10 border border-brand-teal/20 text-brand-teal text-sm font-forma hover:bg-brand-teal/20 transition-colors"
                          >
                            GitHub
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
                        {project.publication && (
                          <a
                            href={project.publication}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] text-white/70 text-sm font-forma hover:bg-white/[0.08] transition-colors"
                          >
                            Publication
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
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function AccordionVariant() {
  const [openId, setOpenId] = useState<number | null>(1);

  return (
    <div className="min-h-screen bg-[#010A13] text-white">
      <VariantNav current={4} />

      <section className="px-4 pb-20 pt-28">
        <div className="max-w-4xl mx-auto">
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
              Click any project to expand its full details, results, and
              technology stack.
            </p>
          </motion.div>

          <div className="space-y-3">
            {projects.map((project, index) => (
              <ProjectAccordionItem
                key={project.id}
                project={project}
                index={index}
                isOpen={openId === project.id}
                onToggle={() =>
                  setOpenId(openId === project.id ? null : project.id)
                }
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

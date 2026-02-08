"use client";

import { motion } from "motion/react";
import { projects } from "@/lib/projects-data";
import { VariantNav } from "../components/VariantNav";

function TimelineItem({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const isLeft = index % 2 === 0;

  return (
    <div className="relative">
      {/* Desktop layout */}
      <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] gap-8 items-start">
        {/* Left side content */}
        <div className={isLeft ? "" : "order-3"}>
          <motion.div
            initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`${isLeft ? "text-right" : "text-left"}`}
          >
            <div
              className={`group relative rounded-2xl overflow-hidden border border-white/[0.06] bg-[#0A1628] hover:border-brand-teal/20 transition-all duration-500 ${
                isLeft ? "ml-auto" : "mr-auto"
              } max-w-lg`}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.imageUrl}
                  alt={`${project.title} project screenshot`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-transparent to-transparent" />
              </div>

              <div className="p-6">
                <span className="inline-block text-[11px] font-forma font-medium uppercase tracking-wider text-brand-teal bg-brand-teal/10 px-3 py-1 rounded-full mb-3 border border-brand-teal/20">
                  {project.category}
                </span>

                <h3 className="text-xl font-bold font-manifold text-white mb-2 group-hover:text-brand-mint transition-colors text-left">
                  {project.title}
                </h3>

                <p className="text-brand-text-muted font-forma text-sm leading-relaxed mb-4 text-left">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-3">
                  {project.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-forma text-brand-mint/80 bg-brand-mint/[0.06] px-2.5 py-1 rounded-md"
                    >
                      {h}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1.5">
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
                    className="inline-flex items-center gap-1.5 mt-4 text-sm font-forma text-brand-teal hover:text-brand-mint transition-colors"
                  >
                    GitHub
                    <svg
                      className="w-3 h-3"
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
        </div>

        {/* Center timeline node */}
        <div className="flex flex-col items-center order-2">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.4,
              delay: 0.1,
              type: "spring",
              stiffness: 200,
            }}
            className="relative z-10"
          >
            <div className="w-4 h-4 rounded-full bg-brand-teal shadow-[0_0_20px_rgba(5,195,168,0.4)]" />
          </motion.div>

          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.3 }}
            className="mt-3 text-[11px] font-forma text-brand-teal whitespace-nowrap"
          >
            {project.period}
          </motion.span>
        </div>

        {/* Right side (empty on left layout) */}
        <div className={isLeft ? "order-3" : ""} />
      </div>

      {/* Mobile layout */}
      <div className="md:hidden flex gap-4">
        <div className="flex flex-col items-center flex-shrink-0">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
            className="relative z-10"
          >
            <div className="w-3 h-3 rounded-full bg-brand-teal shadow-[0_0_12px_rgba(5,195,168,0.4)]" />
          </motion.div>
          <div className="w-px flex-1 bg-white/[0.08] mt-2" />
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="pb-8 flex-1"
        >
          <span className="text-[11px] font-forma text-brand-teal mb-2 block">
            {project.period}
          </span>

          <div className="group rounded-2xl overflow-hidden border border-white/[0.06] bg-[#0A1628]">
            <div className="relative h-40 overflow-hidden">
              <img
                src={project.imageUrl}
                alt={`${project.title} project screenshot`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-transparent to-transparent" />
            </div>

            <div className="p-4">
              <span className="inline-block text-[10px] font-forma uppercase tracking-wider text-brand-teal bg-brand-teal/10 px-2 py-0.5 rounded-full mb-2 border border-brand-teal/20">
                {project.category}
              </span>
              <h3 className="text-lg font-bold font-manifold text-white mb-2">
                {project.title}
              </h3>
              <p className="text-brand-text-muted font-forma text-sm leading-relaxed mb-3">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.highlights.map((h, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-forma text-brand-mint/80 bg-brand-mint/[0.06] px-2 py-0.5 rounded"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function TimelineVariant() {
  return (
    <div className="min-h-screen bg-[#010A13] text-white">
      <VariantNav current={3} />

      <section className="px-4 pb-20 pt-28">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-brand-teal font-forma text-sm tracking-widest uppercase mb-3">
              Portfolio
            </p>
            <h1 className="text-4xl md:text-6xl font-bold font-manifold text-white mb-4">
              Project Journey
            </h1>
            <p className="text-brand-text-muted font-forma max-w-xl mx-auto text-lg leading-relaxed">
              A chronological look at the projects that shaped my engineering
              story.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
              <motion.div
                className="w-full h-full bg-gradient-to-b from-brand-teal/50 via-brand-teal/20 to-transparent"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                style={{ transformOrigin: "top" }}
              />
            </div>

            <div className="space-y-12 md:space-y-20">
              {projects.map((project, index) => (
                <TimelineItem
                  key={project.id}
                  project={project}
                  index={index}
                />
              ))}
            </div>

            <div className="hidden md:flex justify-center mt-12">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: "spring" }}
                className="w-6 h-6 rounded-full border-2 border-brand-teal/40 flex items-center justify-center"
              >
                <div className="w-2 h-2 rounded-full bg-brand-teal" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

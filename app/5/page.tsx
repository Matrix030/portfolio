"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { projects } from "@/lib/projects-data";
import { useRef } from "react";
import { VariantNav } from "../components/VariantNav";

function CinematicSection({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0, 1, 1, 0]
  );
  const contentY = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [60, 0, 0, -60]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Parallax background */}
      <motion.div className="absolute inset-0" style={{ y: imageY }}>
        <img
          src={project.imageUrl}
          alt=""
          className="w-full h-[120%] object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#010A13] via-[#010A13]/80 to-[#010A13]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#010A13] via-transparent to-[#010A13]" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 lg:gap-16 items-center">
          {/* Text side */}
          <div className={index % 2 === 0 ? "" : "lg:order-2"}>
            {/* Number + Category */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-6xl md:text-8xl font-manifold font-bold text-white/[0.04]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <span className="text-[11px] font-forma font-medium uppercase tracking-wider text-brand-teal bg-brand-teal/10 px-3 py-1 rounded-full border border-brand-teal/20">
                  {project.category}
                </span>
                <p className="text-[11px] font-forma text-white/30 mt-2 ml-1">
                  {project.period}
                </p>
              </div>
            </div>

            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-manifold text-white mb-6 leading-tight text-balance">
              {project.title}
            </h2>

            <p className="text-brand-text-muted font-forma text-base md:text-lg leading-relaxed mb-8 max-w-lg">
              {project.description}
            </p>

            {/* Stat highlights */}
            <div className="flex gap-6 mb-8">
              {project.highlights.map((h, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-lg md:text-xl font-manifold font-bold text-brand-mint">
                    {h.split(" ")[0]}
                  </span>
                  <span className="text-[11px] font-forma text-white/40 mt-0.5">
                    {h.split(" ").slice(1).join(" ")}
                  </span>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-xs font-forma text-white/50 bg-white/[0.04] px-3 py-1.5 rounded-lg border border-white/[0.06]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="flex gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-brand-teal text-[#010A13] text-sm font-forma font-medium hover:bg-brand-mint transition-colors"
                >
                  View on GitHub
                  <svg
                    className="w-4 h-4"
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
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl border border-white/10 text-white text-sm font-forma hover:bg-white/[0.04] transition-colors"
                >
                  Publication
                  <svg
                    className="w-4 h-4"
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

          {/* Image side */}
          <div className={index % 2 === 0 ? "" : "lg:order-1"}>
            <div className="relative rounded-2xl overflow-hidden border border-white/[0.06] aspect-[4/3]">
              <img
                src={project.imageUrl}
                alt={`${project.title} project screenshot`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#010A13]/40 to-transparent" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
    </section>
  );
}

export default function CinematicVariant() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  return (
    <div ref={containerRef} className="bg-[#010A13] text-white">
      <VariantNav current={5} />

      {/* Hero intro */}
      <section className="min-h-[60vh] flex items-center justify-center px-4 pt-20">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-brand-teal font-forma text-sm tracking-widest uppercase mb-4">
            Portfolio
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-manifold text-white mb-6 text-balance">
            Selected Works
          </h1>
          <p className="text-brand-text-muted font-forma text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Scroll down to experience each project with full context.
          </p>

          {/* Scroll indicator */}
          <motion.div
            className="mt-16"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg
              className="w-6 h-6 mx-auto text-white/30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-brand-teal z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Project sections */}
      {projects.map((project, index) => (
        <CinematicSection key={project.id} project={project} index={index} />
      ))}

      {/* End section */}
      <section className="min-h-[40vh] flex items-center justify-center px-4">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-brand-text-muted font-forma text-lg">
            More projects coming soon.
          </p>
        </motion.div>
      </section>
    </div>
  );
}

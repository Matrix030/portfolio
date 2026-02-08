"use client";

import Link from "next/link";

const variants = [
  { id: 1, label: "Bento Grid" },
  { id: 2, label: "Carousel" },
  { id: 3, label: "Timeline" },
  { id: 4, label: "Accordion" },
  { id: 5, label: "Cinematic" },
];

export function VariantNav({ current }: { current: number }) {
  const currentVariant = variants.find((v) => v.id === current);
  const prevId = current > 1 ? current - 1 : variants.length;
  const nextId = current < variants.length ? current + 1 : 1;
  const prevLabel = variants.find((v) => v.id === prevId)?.label;
  const nextLabel = variants.find((v) => v.id === nextId)?.label;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#010A13]/90 backdrop-blur-md border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Left: Prev button */}
        <Link
          href={`/${prevId}`}
          className="flex items-center gap-2 text-white/50 hover:text-white transition-colors group"
          aria-label={`Previous variant: ${prevLabel}`}
        >
          <span className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-brand-teal/40 group-hover:bg-brand-teal/10 transition-all">
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
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </span>
          <span className="hidden md:inline text-xs font-forma">{prevLabel}</span>
        </Link>

        {/* Center: current label + variant dots */}
        <div className="flex flex-col items-center gap-1">
          <span className="text-xs font-forma text-brand-teal font-medium tracking-wide">
            {currentVariant?.label}
          </span>
          <div className="flex items-center gap-1.5">
            {variants.map((v) => (
              <Link
                key={v.id}
                href={`/${v.id}`}
                aria-label={`Variant ${v.id}: ${v.label}`}
                className={`block rounded-full transition-all ${
                  current === v.id
                    ? "w-6 h-2 bg-brand-teal"
                    : "w-2 h-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right: Next button */}
        <Link
          href={`/${nextId}`}
          className="flex items-center gap-2 text-white/50 hover:text-white transition-colors group"
          aria-label={`Next variant: ${nextLabel}`}
        >
          <span className="hidden md:inline text-xs font-forma">{nextLabel}</span>
          <span className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-brand-teal/40 group-hover:bg-brand-teal/10 transition-all">
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
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </span>
        </Link>
      </div>
    </nav>
  );
}

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
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#010A13]/80 backdrop-blur-md border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-sm font-forma text-white/60 hover:text-white transition-colors"
        >
          Back to Portfolio
        </Link>

        <div className="flex items-center gap-1">
          {variants.map((v) => (
            <Link
              key={v.id}
              href={`/${v.id}`}
              className={`px-3 py-1.5 rounded-lg text-xs font-forma transition-all ${
                current === v.id
                  ? "bg-brand-teal/15 text-brand-teal border border-brand-teal/25"
                  : "text-white/40 hover:text-white/70 hover:bg-white/[0.04]"
              }`}
            >
              <span className="hidden md:inline">{v.label}</span>
              <span className="md:hidden">{v.id}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

"use client";

import { useState } from "react";

const experience = [
  {
    company: "National Informatics Centre",
    role: "Data Engineering Intern",
    period: "Apr 2023 — Sept 2023",
    color: "#3B82F6",
    bg: "#DBEAFE",
    points: [
      "85% reduction in report generation time by streamlining a PostgreSQL + Redis pipeline across 36 offices",
      "Reduced CSV proforma processing from 6 hours to 4 minutes via automated ingestion pipeline",
      "Refactored 50+ legacy SQL queries, cutting 1500 lines of code",
    ],
  },
  {
    company: "National Informatics Centre",
    role: "Software Development Intern",
    period: "Apr 2022 — Mar 2023",
    color: "#22C55E",
    bg: "#DCFCE7",
    points: [
      "Debugged audit logging module in PHP + PostgreSQL, resolving 6 critical defects",
      "Increased end-to-end test coverage to 85% across RBAC and audit logging workflows",
      "Applied OWASP 10 security controls including input validation and account lockout",
    ],
  },
];

export default function Experience() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        height: "100%",
        overflowY: "auto",
        scrollbarWidth: "none",
      }}
    >
      {experience.map((exp, i) => (
        <div
          key={`${exp.company}-${exp.role}`}
          style={{
            background: "#FFFFFF",
            border: "2px solid #1a1a2e",
            borderRadius: 6,
            padding: "10px 12px",
            transition: "all 0.1s",
            flexShrink: 0,
            boxShadow: hovered === i
              ? "4px 4px 0px #1a1a2e"
              : "2px 2px 0px #1a1a2e",
            transform: hovered === i
              ? "translate(-2px, -2px)"
              : "translate(0, 0)",
          }}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{ color: "#1a1a2e", fontSize: "0.78rem", fontWeight: 800 }}
            >
              {exp.company}
            </span>
            <span
              style={{
                color: "#6B7280",
                fontSize: "0.65rem",
                fontWeight: 600,
                background: "#F5F0E8",
                border: "2px solid #1a1a2e",
                borderRadius: 3,
                padding: "1px 6px",
              }}
            >
              {exp.period}
            </span>
          </div>

          {/* Role */}
          <div
            style={{
              color: "#FFFFFF",
              fontSize: "0.68rem",
              marginTop: 4,
              fontWeight: 700,
              background: exp.color,
              display: "inline-block",
              padding: "2px 8px",
              border: "2px solid #1a1a2e",
              borderRadius: 3,
            }}
          >
            {exp.role}
          </div>

          {/* Points */}
          <div
            style={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            {exp.points.map((point) => (
              <div
                key={point}
                style={{
                  color: "#374151",
                  fontSize: "0.67rem",
                  lineHeight: 1.5,
                  fontWeight: 500,
                  paddingLeft: 8,
                  borderLeft: `3px solid ${exp.color}`,
                }}
              >
                {point}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

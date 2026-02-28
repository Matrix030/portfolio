"use client";

import { useState } from "react";

const experience = [
  {
    company: "National Informatics Centre",
    role: "Data Engineering Intern",
    period: "Apr 2023 — Sept 2023",
    color: "#8caaee",
    points: [
      "▸ 85% reduction in report generation time by streamlining a PostgreSQL + Redis pipeline across 36 offices",
      "▸ Reduced CSV proforma processing from 6 hours to 4 minutes via automated ingestion pipeline",
      "▸ Refactored 50+ legacy SQL queries, cutting 1500 lines of code",
    ],
  },
  {
    company: "National Informatics Centre",
    role: "Software Development Intern",
    period: "Apr 2022 — Mar 2023",
    color: "#a6d189",
    points: [
      "▸ Debugged audit logging module in PHP + PostgreSQL, resolving 6 critical defects",
      "▸ Increased end-to-end test coverage to 85% across RBAC and audit logging workflows",
      "▸ Applied OWASP 10 security controls including input validation and account lockout",
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
            background: hovered === i
              ? "rgba(65,69,89,0.65)"
              : "rgba(48,52,70,0.5)",
            border: `1px solid ${hovered === i ? `${exp.color}44` : "rgba(81,87,109,0.45)"}`,
            borderRadius: 6,
            padding: "10px 12px",
            transition: "all 0.18s cubic-bezier(0.23,1,0.32,1)",
            flexShrink: 0,
            boxShadow: hovered === i ? "0 2px 12px rgba(0,0,0,0.3)" : "none",
          }}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 8,
            }}
          >
            <span
              style={{
                color: "#c6d0f5",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.01em",
              }}
            >
              {exp.company}
            </span>
            <span
              style={{
                color: "#626880",
                fontSize: "0.6rem",
                whiteSpace: "nowrap",
                flexShrink: 0,
                marginTop: 1,
              }}
            >
              {exp.period}
            </span>
          </div>

          {/* Role */}
          <div
            style={{
              color: exp.color,
              fontSize: "0.65rem",
              marginTop: 2,
              fontWeight: 500,
              letterSpacing: "0.02em",
            }}
          >
            {exp.role}
          </div>

          {/* Divider */}
          <div
            style={{
              height: 1,
              background: "rgba(81,87,109,0.3)",
              margin: "6px 0 5px",
            }}
          />

          {/* Points */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            {exp.points.map((point) => (
              <div
                key={point}
                style={{
                  color: "#737994",
                  fontSize: "0.64rem",
                  lineHeight: 1.55,
                  paddingLeft: 4,
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

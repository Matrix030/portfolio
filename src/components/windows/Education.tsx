"use client";

const education = [
  {
    school: "New York University",
    degree: "Master of Computer Science",
    period: "Sept 2024 — May 2026",
    gpa: "3.8 / 4.0",
    color: "#8caaee",
    coursework: [
      "Big Data Analytics",
      "Machine Learning",
      "Database Systems",
      "Operating Systems",
      "Software Engineering",
    ],
  },
  {
    school: "University of Mumbai",
    degree: "Bachelor of Computer Engineering",
    period: "2020 — 2024",
    gpa: null,
    color: "#a6d189",
    coursework: [],
  },
];

export default function Education() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        height: "100%",
      }}
    >
      {education.map((entry, i) => (
        <div key={entry.school}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
              paddingLeft: 12,
              position: "relative",
            }}
          >
            {/* Left accent bar */}
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: 2,
                background: entry.color,
                borderRadius: 2,
              }}
            />

            {/* School */}
            <div
              style={{
                fontSize: "0.9rem",
                fontWeight: 600,
                color: "#c6d0f5",
              }}
            >
              {entry.school}
            </div>

            {/* Degree */}
            <div style={{ fontSize: "0.75rem", color: entry.color }}>
              {entry.degree}
            </div>

            {/* Period + GPA */}
            <div style={{ display: "flex", gap: 12 }}>
              <span style={{ fontSize: "0.7rem", color: "#737994" }}>
                {entry.period}
              </span>
              {entry.gpa && (
                <span style={{ fontSize: "0.7rem", color: "#a6d189" }}>
                  GPA: {entry.gpa}
                </span>
              )}
            </div>

            {/* Coursework */}
            {entry.coursework.length > 0 && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 4,
                  marginTop: 4,
                }}
              >
                {entry.coursework.map((course) => (
                  <span
                    key={course}
                    style={{
                      background: "rgba(140,170,238,0.1)",
                      border: "1px solid rgba(140,170,238,0.25)",
                      borderRadius: 3,
                      padding: "2px 8px",
                      fontSize: "0.7rem",
                      color: "#8caaee",
                    }}
                  >
                    {course}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Divider between entries */}
          {i < education.length - 1 && (
            <div
              style={{
                height: 1,
                background: "rgba(255,255,255,0.05)",
                marginTop: 16,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

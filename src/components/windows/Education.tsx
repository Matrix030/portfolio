"use client";

const education = [
  {
    school: "New York University",
    degree: "Master of Computer Science",
    period: "Sept 2024 — May 2026",
    gpa: "3.8 / 4.0",
    color: "#3B82F6",
    bg: "#DBEAFE",
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
    color: "#22C55E",
    bg: "#DCFCE7",
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
              paddingLeft: 14,
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
                width: 4,
                background: entry.color,
                border: "1px solid #1a1a2e",
                borderRadius: 2,
              }}
            />

            {/* School */}
            <div
              style={{
                fontSize: "0.82rem",
                fontWeight: 800,
                color: "#1a1a2e",
              }}
            >
              {entry.school}
            </div>

            {/* Degree */}
            <div
              style={{
                fontSize: "0.68rem",
                color: "#FFFFFF",
                fontWeight: 700,
                background: entry.color,
                display: "inline-block",
                padding: "2px 8px",
                border: "2px solid #1a1a2e",
                borderRadius: 3,
                width: "fit-content",
              }}
            >
              {entry.degree}
            </div>

            {/* Period + GPA */}
            <div style={{ display: "flex", gap: 12 }}>
              <span style={{ fontSize: "0.65rem", color: "#6B7280", fontWeight: 600 }}>
                {entry.period}
              </span>
              {entry.gpa && (
                <span
                  style={{
                    fontSize: "0.65rem",
                    color: "#1a1a2e",
                    fontWeight: 700,
                    background: "#DCFCE7",
                    border: "2px solid #1a1a2e",
                    borderRadius: 3,
                    padding: "0 6px",
                  }}
                >
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
                      background: entry.bg,
                      border: "2px solid #1a1a2e",
                      borderRadius: 3,
                      padding: "2px 8px",
                      fontSize: "0.63rem",
                      color: "#1a1a2e",
                      fontWeight: 700,
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
                height: 3,
                background: "#1a1a2e",
                marginTop: 16,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

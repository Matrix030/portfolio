"use client";

const skills = [
  {
    category: "Languages",
    color: "#3B82F6",
    bg: "#1a2545",
    items: ["TypeScript", "JavaScript", "Python", "SQL", "Go"],
  },
  {
    category: "Backend",
    color: "#22C55E",
    bg: "#0d2518",
    items: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "Serverless",
      "Microservices",
      "Django",
    ],
  },
  {
    category: "Frontend",
    color: "#A855F7",
    bg: "#1d1430",
    items: ["React.js", "Next.js", "CSS"],
  },
  {
    category: "Databases",
    color: "#FBBF24",
    bg: "#231d0e",
    items: ["PostgreSQL", "DynamoDB", "MongoDB", "MySQL", "Redis"],
  },
  {
    category: "Cloud & Infra",
    color: "#06B6D4",
    bg: "#0c1f2e",
    items: ["AWS", "Docker", "Terraform", "CI/CD", "EC2", "S3", "Lambda"],
  },
  {
    category: "Data",
    color: "#F43F5E",
    bg: "#22101a",
    items: ["Pandas", "NumPy", "Dask", "ETL Pipelines"],
  },
];

export default function Skills() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        height: "100%",
        overflowY: "auto",
        scrollbarWidth: "none",
      }}
    >
      {skills.map((group) => (
        <div
          key={group.category}
          style={{ display: "flex", flexDirection: "column", gap: 6 }}
        >
          {/* Category label */}
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 2,
                background: group.color,
                border: "2px solid #e2e0f0",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                color: "#e8e5f5",
                fontSize: "0.65rem",
                fontWeight: 800,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              {group.category}
            </span>
          </div>

          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            {group.items.map((item) => (
              <span
                key={item}
                style={{
                  background: group.bg,
                  border: "2px solid #e2e0f0",
                  borderRadius: 3,
                  padding: "2px 8px",
                  fontSize: "0.63rem",
                  color: "#e8e5f5",
                  fontWeight: 700,
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

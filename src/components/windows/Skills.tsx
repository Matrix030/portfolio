"use client";

const skills = [
  {
    category: "Languages",
    color: "#8caaee",
    items: ["TypeScript", "JavaScript", "Python", "SQL", "Go"],
  },
  {
    category: "Backend",
    color: "#a6d189",
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
    color: "#ca9ee6",
    items: ["React.js", "Next.js", "CSS"],
  },
  {
    category: "Databases",
    color: "#e5c890",
    items: ["PostgreSQL", "DynamoDB", "MongoDB", "MySQL", "Redis"],
  },
  {
    category: "Cloud & Infra",
    color: "#99d1db",
    items: ["AWS", "Docker", "Terraform", "CI/CD", "EC2", "S3", "Lambda"],
  },
  {
    category: "Data",
    color: "#ea999c",
    items: ["Pandas", "NumPy", "Dask", "ETL Pipelines"],
  },
];

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

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
                width: 6,
                height: 6,
                borderRadius: 2,
                background: group.color,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                color: group.color,
                fontSize: "0.72rem",
                fontWeight: 600,
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
                  background: hexToRgba(group.color, 0.1),
                  border: `1px solid ${hexToRgba(group.color, 0.25)}`,
                  borderRadius: 3,
                  padding: "2px 8px",
                  fontSize: "0.7rem",
                  color: hexToRgba(group.color, 0.9),
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

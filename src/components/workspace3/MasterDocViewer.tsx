"use client";

import masterDoc from "@/../public/master.json";

const FONT = '"CaskaydiaCove Nerd Font Mono", "JetBrains Mono", monospace';

const SKILL_COLORS: Record<string, string> = {
  languages: "#3B82F6",
  frameworks: "#A855F7",
  databases: "#FBBF24",
  infra_devops: "#06B6D4",
  cloud_tools: "#22C55E",
  ai_ml: "#F43F5E",
  concepts: "#F97316",
};

const SKILL_BG: Record<string, string> = {
  languages: "#DBEAFE",
  frameworks: "#F3E8FF",
  databases: "#FEF9C3",
  infra_devops: "#CFFAFE",
  cloud_tools: "#DCFCE7",
  ai_ml: "#FFE4E6",
  concepts: "#FFEDD5",
};

const SKILL_LABELS: Record<string, string> = {
  languages: "Languages",
  frameworks: "Frameworks",
  databases: "Databases",
  infra_devops: "Infra / DevOps",
  cloud_tools: "Cloud Tools",
  ai_ml: "AI / ML",
  concepts: "Concepts",
};

const sectionLabel: React.CSSProperties = {
  fontSize: "0.62rem",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  color: "#1a1a2e",
  marginBottom: "0.4rem",
  fontFamily: FONT,
  fontWeight: 800,
};

const divider: React.CSSProperties = {
  height: 3,
  background: "#1a1a2e",
  margin: "0.25rem 0",
};

function Tag({
  children,
  bg,
}: {
  children: React.ReactNode;
  color?: string;
  bg: string;
}) {
  return (
    <span
      style={{
        background: bg,
        border: "2px solid #1a1a2e",
        borderRadius: 3,
        padding: "1px 7px",
        fontSize: "0.61rem",
        color: "#1a1a2e",
        fontFamily: FONT,
        flexShrink: 0,
        fontWeight: 700,
      }}
    >
      {children}
    </span>
  );
}

function MetricPill({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        background: "#DCFCE7",
        border: "2px solid #1a1a2e",
        borderRadius: 3,
        padding: "1px 7px",
        fontSize: "0.6rem",
        color: "#1a1a2e",
        fontFamily: FONT,
        flexShrink: 0,
        fontWeight: 700,
      }}
    >
      {children}
    </span>
  );
}

const skills = masterDoc.skills as Record<string, string[]>;

const internship = masterDoc.internship;
const projects = masterDoc.projects as Record<
  string,
  {
    name: string;
    domains?: string[];
    stack?: string[];
    summary: string;
    verifiable_metrics?: Record<string, unknown>;
  }
>;
const achievements = masterDoc.achievements as { text: string }[];

const PROJECT_METRICS: Record<string, string[]> = {
  steamlensai: ["1.2M+ reviews", "~10x speedup", "40GB dataset"],
  nyc_transit_hub: ["500MB+ GTFS", "1st place hackathon", "30s refresh"],
  campusnest: ["WebSocket messaging", ".edu auth", "full CI/CD"],
  numerai: ["2.7M rows", "Sharpe 2.42", "10.1x GPU speedup"],
  xv6_tracer: ["6 syscalls added", "36KB buffer"],
  personality_prediction: ["74% accuracy", "F1: 0.75", "published ICRMIR-2023"],
  patchbotai: ["20-step agent loop", "sandboxed execution"],
  localpilotai: ["sub-200ms", "0 external API calls", "fully offline"],
  simplifyjobsdaemon: ["30min poll", "Go + Python hybrid", "fully offline"],
};

export default function MasterDocViewer() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
        padding: "0.75rem",
        overflowY: "auto",
        height: "100%",
        scrollbarWidth: "none",
        fontFamily: FONT,
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
        <span
          style={{ fontSize: "1.1rem", fontWeight: 800, color: "#1a1a2e" }}
        >
          Rishikesh Gharat
        </span>
        <span style={{ fontSize: "0.75rem", color: "#3B82F6", fontWeight: 700 }}>
          Software Engineer · NYU CS · May 2026
        </span>
      </div>

      {/* Recruiter tip */}
      <div
        style={{
          background: "#DCFCE7",
          border: "2px solid #1a1a2e",
          borderRadius: 6,
          padding: "0.45rem 0.65rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.15rem",
          boxShadow: "2px 2px 0px #1a1a2e",
        }}
      >
        <span
          style={{ color: "#1a1a2e", fontSize: "0.65rem", fontWeight: 800 }}
        >
          For recruiters & AI tools
        </span>
        <span style={{ color: "#374151", fontSize: "0.63rem", lineHeight: 1.5, fontWeight: 500 }}>
          The panel on the right exposes a structured JSON endpoint of my full
          background. Curl it or download it and paste into your AI of choice —
          ask anything about my experience, skills, or projects.
        </span>
      </div>

      <div style={divider} />

      {/* Skills */}
      <div>
        <div style={sectionLabel}>Skills</div>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.55rem" }}
        >
          {Object.entries(SKILL_LABELS).map(([key, label]) => {
            const color = SKILL_COLORS[key] ?? "#1a1a2e";
            const bg = SKILL_BG[key] ?? "#F5F0E8";
            const items = skills[key] ?? [];
            return (
              <div key={key}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    marginBottom: "0.25rem",
                  }}
                >
                  <div
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: 2,
                      background: color,
                      border: "2px solid #1a1a2e",
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      color: "#1a1a2e",
                      fontSize: "0.6rem",
                      fontWeight: 800,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                    }}
                  >
                    {label}
                  </span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                  {items.map((item) => (
                    <Tag key={item} color={color} bg={bg}>
                      {item}
                    </Tag>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={divider} />

      {/* Experience */}
      <div>
        <div style={sectionLabel}>Experience</div>
        <div
          style={{
            background: "#FFFFFF",
            border: "2px solid #1a1a2e",
            borderRadius: 6,
            padding: "0.6rem 0.75rem",
            boxShadow: "2px 2px 0px #1a1a2e",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <div>
              <div
                style={{
                  color: "#1a1a2e",
                  fontSize: "0.78rem",
                  fontWeight: 800,
                }}
              >
                {internship.org}
              </div>
              <div style={{ color: "#6B7280", fontSize: "0.65rem", fontWeight: 600 }}>
                {internship.parent_org}
              </div>
            </div>
            <span style={{ color: "#374151", fontSize: "0.65rem", flexShrink: 0, marginLeft: 8, fontWeight: 600 }}>
              {internship.total_duration}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              marginTop: "0.4rem",
            }}
          >
            {[internship.roles.de, internship.roles.swe].map((role) => (
              <div
                key={role.title}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: "0.67rem",
                  color: "#374151",
                  fontWeight: 600,
                }}
              >
                <span style={{ color: "#3B82F6", fontWeight: 700 }}>▸</span>
                <span>{role.title}</span>
                <span style={{ color: "#1a1a2e" }}>·</span>
                <span style={{ color: "#6B7280" }}>{role.dates}</span>
              </div>
            ))}
          </div>

          <div
            style={{
              color: "#22C55E",
              fontSize: "0.68rem",
              fontWeight: 700,
              marginTop: "0.35rem",
              background: "#DCFCE7",
              display: "inline-block",
              padding: "2px 8px",
              border: "2px solid #1a1a2e",
              borderRadius: 3,
            }}
          >
            Merit-based extension after performance review
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              marginTop: "0.6rem",
            }}
          >
            {/* FADS */}
            <div
              style={{
                background: "#F5F0E8",
                border: "2px solid #1a1a2e",
                borderRadius: 5,
                padding: "0.5rem 0.75rem",
              }}
            >
              <div
                style={{
                  color: "#1a1a2e",
                  fontSize: "0.75rem",
                  fontWeight: 800,
                  marginBottom: "0.3rem",
                }}
              >
                {internship.projects.fads.name}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 3, marginBottom: "0.3rem" }}>
                {internship.projects.fads.stack.map((t) => (
                  <Tag key={t} color="#3B82F6" bg="#DBEAFE">
                    {t}
                  </Tag>
                ))}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                <MetricPill>4 security features</MetricPill>
                <MetricPill>PHP 8.1 + PostgreSQL</MetricPill>
              </div>
            </div>

            {/* Mail Tracking */}
            <div
              style={{
                background: "#F5F0E8",
                border: "2px solid #1a1a2e",
                borderRadius: 5,
                padding: "0.5rem 0.75rem",
              }}
            >
              <div
                style={{
                  color: "#1a1a2e",
                  fontSize: "0.75rem",
                  fontWeight: 800,
                  marginBottom: "0.3rem",
                }}
              >
                {internship.projects.mail_tracking.name}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 3, marginBottom: "0.3rem" }}>
                {internship.projects.mail_tracking.stack.map((t) => (
                  <Tag key={t} color="#22C55E" bg="#DCFCE7">
                    {t}
                  </Tag>
                ))}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                <MetricPill>Node.js + MongoDB</MetricPill>
                <MetricPill>Email tracking pixel</MetricPill>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={divider} />

      {/* Projects */}
      <div>
        <div style={sectionLabel}>Projects</div>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}
        >
          {Object.entries(projects).map(([key, proj]) => {
            const metrics = PROJECT_METRICS[key] ?? [];
            const stack = proj.stack ?? [];
            const domains = proj.domains ?? [];
            return (
              <div
                key={key}
                style={{
                  background: "#FFFFFF",
                  border: "2px solid #1a1a2e",
                  borderRadius: 5,
                  padding: "0.5rem 0.75rem",
                  boxShadow: "2px 2px 0px #1a1a2e",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: "0.25rem",
                  }}
                >
                  <span
                    style={{
                      color: "#1a1a2e",
                      fontSize: "0.8rem",
                      fontWeight: 800,
                    }}
                  >
                    {proj.name}
                  </span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                    {domains.map((d) => (
                      <span
                        key={d}
                        style={{
                          background: "#F3E8FF",
                          border: "2px solid #1a1a2e",
                          borderRadius: 3,
                          padding: "1px 6px",
                          fontSize: "0.58rem",
                          color: "#1a1a2e",
                          fontFamily: FONT,
                          fontWeight: 700,
                        }}
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>

                {stack.length > 0 && (
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 3,
                      marginBottom: "0.3rem",
                    }}
                  >
                    {stack.map((t) => (
                      <span
                        key={t}
                        style={{
                          background: "#F5F0E8",
                          border: "2px solid #1a1a2e",
                          borderRadius: 3,
                          padding: "1px 6px",
                          fontSize: "0.6rem",
                          color: "#1a1a2e",
                          fontFamily: FONT,
                          fontWeight: 700,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                {metrics.length > 0 && (
                  <div
                    style={{
                      background: "#DCFCE7",
                      borderLeft: "4px solid #22C55E",
                      borderRadius: "0 4px 4px 0",
                      padding: "0.35rem 0.6rem",
                      marginBottom: "0.3rem",
                    }}
                  >
                    {metrics.map((m) => (
                      <div
                        key={m}
                        style={{
                          fontSize: "0.68rem",
                          color: "#1a1a2e",
                          lineHeight: 1.6,
                          fontWeight: 700,
                        }}
                      >
                        {m}
                      </div>
                    ))}
                  </div>
                )}

                <div
                  style={{
                    color: "#374151",
                    fontSize: "0.7rem",
                    lineHeight: 1.5,
                    fontWeight: 500,
                  }}
                >
                  {proj.summary}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={divider} />

      {/* Achievements */}
      <div>
        <div style={sectionLabel}>Achievements</div>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}
        >
          {achievements.map((a, i) => (
            <div key={i} style={{
              fontSize: "0.75rem",
              color: "#1a1a2e",
              fontWeight: 700,
              background: "#FEF9C3",
              border: "2px solid #1a1a2e",
              borderRadius: 4,
              padding: "0.25rem 0.5rem",
              boxShadow: "2px 2px 0px #1a1a2e",
            }}>
              {a.text}
            </div>
          ))}
        </div>
      </div>

      <div style={{ height: "0.5rem", flexShrink: 0 }} />
    </div>
  );
}

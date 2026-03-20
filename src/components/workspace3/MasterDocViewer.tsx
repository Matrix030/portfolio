"use client";

import masterDoc from "@/../public/master.json";

const FONT = '"CaskaydiaCove Nerd Font Mono", "JetBrains Mono", monospace';

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

const SKILL_COLORS: Record<string, string> = {
  languages: "#8caaee",
  frameworks: "#ca9ee6",
  databases: "#e5c890",
  infra_devops: "#99d1db",
  cloud_tools: "#a6d189",
  ai_ml: "#ea999c",
  concepts: "#ef9f76",
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
  color: "#737994",
  marginBottom: "0.4rem",
  fontFamily: FONT,
};

const divider: React.CSSProperties = {
  height: 1,
  background: "rgba(255,255,255,0.06)",
  margin: "0.25rem 0",
};

function Tag({
  children,
  color,
}: {
  children: React.ReactNode;
  color: string;
}) {
  return (
    <span
      style={{
        background: hexToRgba(color, 0.1),
        border: `1px solid ${hexToRgba(color, 0.25)}`,
        borderRadius: 3,
        padding: "1px 7px",
        fontSize: "0.61rem",
        color: hexToRgba(color, 0.9),
        fontFamily: FONT,
        flexShrink: 0,
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
        background: "rgba(166,209,137,0.1)",
        border: "1px solid rgba(166,209,137,0.25)",
        borderRadius: 3,
        padding: "1px 7px",
        fontSize: "0.6rem",
        color: "#a6d189",
        fontFamily: FONT,
        flexShrink: 0,
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
          style={{ fontSize: "1.1rem", fontWeight: 600, color: "#c6d0f5" }}
        >
          Rishikesh Gharat
        </span>
        <span style={{ fontSize: "0.75rem", color: "#8caaee" }}>
          Software Engineer · NYU CS · May 2026
        </span>
      </div>

      {/* Recruiter tip */}
      <div
        style={{
          background: "rgba(166,209,137,0.06)",
          border: "1px solid rgba(166,209,137,0.15)",
          borderRadius: 5,
          padding: "0.45rem 0.65rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.15rem",
        }}
      >
        <span
          style={{ color: "#a6d189", fontSize: "0.65rem", fontWeight: 600 }}
        >
          For recruiters & AI tools
        </span>
        <span style={{ color: "#737994", fontSize: "0.63rem", lineHeight: 1.5 }}>
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
            const color = SKILL_COLORS[key] ?? "#c6d0f5";
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
                      width: 5,
                      height: 5,
                      borderRadius: 2,
                      background: color,
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      color,
                      fontSize: "0.6rem",
                      fontWeight: 600,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                    }}
                  >
                    {label}
                  </span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                  {items.map((item) => (
                    <Tag key={item} color={color}>
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
            background: "rgba(65,69,89,0.4)",
            border: "1px solid #51576d",
            borderRadius: 6,
            padding: "0.6rem 0.75rem",
          }}
        >
          {/* Org header */}
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
                  color: "#c6d0f5",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                }}
              >
                {internship.org}
              </div>
              <div style={{ color: "#737994", fontSize: "0.65rem" }}>
                {internship.parent_org}
              </div>
            </div>
            <span style={{ color: "#a5adce", fontSize: "0.65rem", flexShrink: 0, marginLeft: 8 }}>
              {internship.total_duration}
            </span>
          </div>

          {/* Roles */}
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
                  color: "#a5adce",
                }}
              >
                <span style={{ color: "#8caaee" }}>▸</span>
                <span>{role.title}</span>
                <span style={{ color: "#51576d" }}>·</span>
                <span style={{ color: "#737994" }}>{role.dates}</span>
              </div>
            ))}
          </div>

          {/* Merit note */}
          <div
            style={{
              color: "#a6d189",
              fontSize: "0.68rem",
              fontStyle: "italic",
              marginTop: "0.35rem",
            }}
          >
            Merit-based extension after performance review
          </div>

          {/* Project cards */}
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
                background: "rgba(65,69,89,0.5)",
                border: "1px solid #51576d",
                borderRadius: 5,
                padding: "0.5rem 0.75rem",
              }}
            >
              <div
                style={{
                  color: "#c6d0f5",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  marginBottom: "0.3rem",
                }}
              >
                {internship.projects.fads.name}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 3, marginBottom: "0.3rem" }}>
                {internship.projects.fads.stack.map((t) => (
                  <Tag key={t} color="#8caaee">
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
                background: "rgba(65,69,89,0.5)",
                border: "1px solid #51576d",
                borderRadius: 5,
                padding: "0.5rem 0.75rem",
              }}
            >
              <div
                style={{
                  color: "#c6d0f5",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  marginBottom: "0.3rem",
                }}
              >
                {internship.projects.mail_tracking.name}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 3, marginBottom: "0.3rem" }}>
                {internship.projects.mail_tracking.stack.map((t) => (
                  <Tag key={t} color="#a6d189">
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
                  background: "rgba(65,69,89,0.4)",
                  border: "1px solid #51576d",
                  borderRadius: 5,
                  padding: "0.5rem 0.75rem",
                }}
              >
                {/* Header */}
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
                      color: "#c6d0f5",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                    }}
                  >
                    {proj.name}
                  </span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                    {domains.map((d) => (
                      <span
                        key={d}
                        style={{
                          background: "rgba(202,158,230,0.1)",
                          border: "1px solid rgba(202,158,230,0.25)",
                          borderRadius: 3,
                          padding: "1px 6px",
                          fontSize: "0.58rem",
                          color: "#ca9ee6",
                          fontFamily: FONT,
                        }}
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stack */}
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
                          background: "#414559",
                          border: "1px solid #51576d",
                          borderRadius: 3,
                          padding: "1px 6px",
                          fontSize: "0.6rem",
                          color: "#b5bfe2",
                          fontFamily: FONT,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                {/* Metrics */}
                {metrics.length > 0 && (
                  <div
                    style={{
                      background: "rgba(166,209,137,0.06)",
                      borderLeft: "2px solid #a6d189",
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
                          color: "#a6d189",
                          lineHeight: 1.6,
                        }}
                      >
                        {m}
                      </div>
                    ))}
                  </div>
                )}

                {/* Summary */}
                <div
                  style={{
                    color: "#a5adce",
                    fontSize: "0.7rem",
                    lineHeight: 1.5,
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
            <div key={i} style={{ fontSize: "0.75rem", color: "#e5c890" }}>
              🏆 {a.text}
            </div>
          ))}
        </div>
      </div>

      {/* bottom padding */}
      <div style={{ height: "0.5rem", flexShrink: 0 }} />
    </div>
  );
}

"use client";

const stats = [
  "📍 New York, NY",
  "🎓 NYU Tandon — May 2026",
  "💼 Open to work",
  "🖥 Go · Python · TypeScript",
];

const socials = [
  {
    label: " github.com/Matrix030",
    href: "https://github.com/Matrix030",
  },
  {
    label: " linkedin.com/in/rishikesh-gharat",
    href: "https://www.linkedin.com/in/rishikesh-gharat",
  },
];

export default function About() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        fontFamily:
          '"CaskaydiaCove Nerd Font Mono", "JetBrains Mono", monospace',
      }}
    >
      {/* Top */}
      <div>
        <div
          style={{
            color: "#c6d0f5",
            fontSize: "1.2rem",
            fontWeight: 600,
            lineHeight: 1.2,
          }}
        >
          Rishikesh Gharat
        </div>
        <div
          style={{
            color: "#8caaee",
            fontSize: "0.78rem",
            marginTop: 4,
          }}
        >
          Full Stack Software Engineer
        </div>
        <div
          style={{
            height: 1,
            background: "#414559",
            margin: "10px 0",
          }}
        />
        <div
          style={{
            color: "#a5adce",
            fontSize: "0.73rem",
            lineHeight: 1.6,
          }}
        >
          NYU CS grad student finishing May 2026. I build full-stack systems and
          ML pipelines — currently obsessed with Go concurrency, LLM
          applications, and making things fast.
        </div>
      </div>

      {/* Middle — stat pills */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 6,
        }}
      >
        {stats.map((s) => (
          <div
            key={s}
            style={{
              background: "#414559",
              border: "1px solid #51576d",
              borderRadius: 5,
              padding: "4px 10px",
              fontSize: "0.68rem",
              color: "#c6d0f5",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {s}
          </div>
        ))}
      </div>

      {/* Bottom — social links */}
      <div style={{ display: "flex", gap: 8 }}>
        {socials.map((s) => (
          <a
            key={s.href}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              border: "1px solid #51576d",
              borderRadius: 5,
              padding: "4px 12px",
              color: "#c6d0f5",
              fontSize: "0.68rem",
              textDecoration: "none",
              transition: "all 0.2s cubic-bezier(0.23,1,0.32,1)",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              const t = e.currentTarget;
              t.style.borderColor = "#8caaee";
              t.style.color = "#8caaee";
            }}
            onMouseLeave={(e) => {
              const t = e.currentTarget;
              t.style.borderColor = "#51576d";
              t.style.color = "#c6d0f5";
            }}
          >
            {s.label}
          </a>
        ))}
      </div>
    </div>
  );
}

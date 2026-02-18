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
            fontSize: "1.4rem",
            fontWeight: 600,
            lineHeight: 1.2,
          }}
        >
          Rishikesh Gharat
        </div>
        <div
          style={{
            color: "#8caaee",
            fontSize: "0.85rem",
            marginTop: 4,
          }}
        >
          Full Stack Software Engineer
        </div>
        <div
          style={{
            height: 1,
            background: "rgba(255,255,255,0.08)",
            margin: "10px 0",
          }}
        />
        <div
          style={{
            color: "rgba(198,208,245,0.8)",
            fontSize: "0.8rem",
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
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 5,
              padding: "4px 10px",
              fontSize: "0.75rem",
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
              border: "1px solid #595959",
              borderRadius: 5,
              padding: "4px 12px",
              color: "#c6d0f5",
              fontSize: "0.75rem",
              textDecoration: "none",
              transition: "all 0.2s cubic-bezier(0.23,1,0.32,1)",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              const t = e.currentTarget;
              t.style.borderColor = "#33ccff";
              t.style.color = "#33ccff";
            }}
            onMouseLeave={(e) => {
              const t = e.currentTarget;
              t.style.borderColor = "#595959";
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

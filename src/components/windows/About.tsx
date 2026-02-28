"use client";

const FONT = '"CaskaydiaCove Nerd Font Mono", "JetBrains Mono", monospace';

const stats = [
    { icon: "", label: "New York, NY", color: "#99d1db" },
    { icon: "", label: "NYU Tandon — May 2026", color: "#a6d189" },
    { icon: "", label: "Open to work", color: "#e5c890" },
    { icon: "", label: "Go · Python · TypeScript", color: "#ca9ee6" },
];

const socials = [
    {
        label: "github",
        icon: "",
        href: "https://github.com/Matrix030",
        color: "#c6d0f5",
    },
    {
        label: "linkedin",
        icon: "",
        href: "https://www.linkedin.com/in/rishikesh-gharat",
        color: "#8caaee",
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
                fontFamily: FONT,
                gap: 8,
            }}
        >
            {/* Top */}
            <div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                    <div
                        style={{
                            color: "#c6d0f5",
                            fontSize: "1.1rem",
                            fontWeight: 700,
                            lineHeight: 1.2,
                            letterSpacing: "-0.01em",
                        }}
                    >
                        Rishikesh Gharat
                    </div>
                    <div
                        style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background: "#a6d189",
                            boxShadow: "0 0 6px rgba(166,209,137,0.6)",
                            flexShrink: 0,
                            alignSelf: "center",
                        }}
                    />
                </div>
                <div
                    style={{
                        color: "#8caaee",
                        fontSize: "0.72rem",
                        marginTop: 3,
                        letterSpacing: "0.03em",
                    }}
                >
                    Full Stack · Backend Leaning Software Engineer
                </div>
                <div
                    style={{
                        height: 1,
                        background: "linear-gradient(90deg, rgba(140,170,238,0.3), transparent)",
                        margin: "8px 0",
                    }}
                />
                <div
                    style={{
                        color: "#a5adce",
                        fontSize: "0.7rem",
                        lineHeight: 1.65,
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
                    gap: 5,
                }}
            >
                {stats.map((s) => (
                    <div
                        key={s.label}
                        style={{
                            background: "rgba(65,69,89,0.5)",
                            border: "1px solid rgba(81,87,109,0.6)",
                            borderRadius: 5,
                            padding: "5px 10px",
                            fontSize: "0.65rem",
                            color: "#a5adce",
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            overflow: "hidden",
                        }}
                    >
                        <span style={{ color: s.color, flexShrink: 0, fontSize: "0.7rem" }}>{s.icon}</span>
                        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {s.label}
                        </span>
                    </div>
                ))}
            </div>

            {/* Bottom — social links */}
            <div style={{ display: "flex", gap: 6 }}>
                {socials.map((s) => (
                    <a
                        key={s.href}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            background: "rgba(65,69,89,0.4)",
                            border: "1px solid rgba(81,87,109,0.6)",
                            borderRadius: 5,
                            padding: "5px 14px",
                            color: "#a5adce",
                            fontSize: "0.65rem",
                            textDecoration: "none",
                            transition: "all 0.2s cubic-bezier(0.23,1,0.32,1)",
                            whiteSpace: "nowrap",
                            display: "flex",
                            alignItems: "center",
                            gap: 5,
                            flex: 1,
                            justifyContent: "center",
                        }}
                        onMouseEnter={(e) => {
                            const t = e.currentTarget;
                            t.style.borderColor = s.color;
                            t.style.color = s.color;
                            t.style.background = "rgba(140,170,238,0.08)";
                        }}
                        onMouseLeave={(e) => {
                            const t = e.currentTarget;
                            t.style.borderColor = "rgba(81,87,109,0.6)";
                            t.style.color = "#a5adce";
                            t.style.background = "rgba(65,69,89,0.4)";
                        }}
                    >
                        <span style={{ fontSize: "0.75rem" }}>{s.icon}</span>
                        {s.label}
                    </a>
                ))}
            </div>
        </div>
    );
}

"use client";

const stats = [
    "New York, NY",
    "NYU Tandon — May 2026",
    "Open to work",
    "Go · Python · TypeScript",
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
                        color: "#1a1a2e",
                        fontSize: "1.2rem",
                        fontWeight: 800,
                        lineHeight: 1.2,
                    }}
                >
                    Rishikesh Gharat
                </div>
                <div
                    style={{
                        color: "#3B82F6",
                        fontSize: "0.78rem",
                        marginTop: 4,
                        fontWeight: 700,
                    }}
                >
                    Full Stack - Backend Leaning Software Engineer
                </div>
                <div
                    style={{
                        height: 3,
                        background: "#1a1a2e",
                        margin: "10px 0",
                    }}
                />
                <div
                    style={{
                        color: "#374151",
                        fontSize: "0.73rem",
                        lineHeight: 1.6,
                        fontWeight: 500,
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
                            background: "#FBBF24",
                            border: "2px solid #1a1a2e",
                            borderRadius: 4,
                            padding: "4px 10px",
                            fontSize: "0.68rem",
                            color: "#1a1a2e",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            fontWeight: 700,
                            boxShadow: "2px 2px 0px #1a1a2e",
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
                            border: "2px solid #1a1a2e",
                            borderRadius: 4,
                            padding: "4px 12px",
                            color: "#1a1a2e",
                            fontSize: "0.68rem",
                            textDecoration: "none",
                            transition: "all 0.1s",
                            whiteSpace: "nowrap",
                            fontWeight: 700,
                            background: "#FFFFFF",
                            boxShadow: "2px 2px 0px #1a1a2e",
                        }}
                        onMouseEnter={(e) => {
                            const t = e.currentTarget;
                            t.style.background = "#E0F2FE";
                            t.style.boxShadow = "3px 3px 0px #1a1a2e";
                            t.style.transform = "translate(-1px, -1px)";
                        }}
                        onMouseLeave={(e) => {
                            const t = e.currentTarget;
                            t.style.background = "#FFFFFF";
                            t.style.boxShadow = "2px 2px 0px #1a1a2e";
                            t.style.transform = "translate(0, 0)";
                        }}
                    >
                        {s.label}
                    </a>
                ))}
            </div>
        </div>
    );
}

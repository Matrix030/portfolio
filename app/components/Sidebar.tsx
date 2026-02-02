"use client";

import { useState, useEffect } from "react";
import { Github, Linkedin, Mail, FileText } from "lucide-react";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
];

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/Matrix030",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/rishikesh-gharat",
    icon: Linkedin,
  },
  {
    name: "Email",
    href: "mailto:rvg9395@nyu.edu",
    icon: Mail,
  },
];

export function Sidebar() {
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.href.slice(1));
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
      <div>
        {/* Name and tagline */}
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          <a href="/">Rishikesh Gharat</a>
        </h1>
        <h2 className="mt-3 text-lg font-medium tracking-tight text-foreground sm:text-xl">
          Software Engineer
        </h2>
        <p className="mt-4 max-w-xs leading-normal text-muted">
          I build tools I wish existed.
        </p>

        {/* Currently section */}
        <div className="mt-6 text-sm text-muted">
          <p>
            <span className="text-accent">Currently:</span> MS Computer Science @ NYU
          </p>
          <p className="mt-1">Graduating May 2026</p>
        </div>

        {/* Navigation */}
        <nav className="nav hidden lg:block" aria-label="In-page jump links">
          <ul className="mt-16 w-max">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  className="group flex items-center py-3"
                  href={item.href}
                >
                  <span
                    className={`nav-indicator mr-4 h-px transition-all group-hover:w-16 group-hover:bg-foreground group-focus-visible:w-16 group-focus-visible:bg-foreground motion-reduce:transition-none ${
                      activeSection === item.href.slice(1)
                        ? "w-16 bg-foreground"
                        : "w-8 bg-muted"
                    }`}
                  />
                  <span
                    className={`nav-text text-xs font-bold uppercase tracking-widest group-hover:text-foreground group-focus-visible:text-foreground ${
                      activeSection === item.href.slice(1)
                        ? "text-foreground"
                        : "text-muted"
                    }`}
                  >
                    {item.name}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Social links and resume */}
      <ul className="ml-1 mt-8 flex items-center gap-5" aria-label="Social media">
        {socialLinks.map((link) => (
          <li key={link.name} className="shrink-0">
            <a
              className="block text-muted hover:text-foreground transition-colors"
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${link.name} (opens in new tab)`}
            >
              <link.icon className="h-6 w-6" />
            </a>
          </li>
        ))}
        <li className="shrink-0">
          <a
            className="block text-muted hover:text-foreground transition-colors"
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Resume (opens in new tab)"
          >
            <FileText className="h-6 w-6" />
          </a>
        </li>
      </ul>
    </header>
  );
}

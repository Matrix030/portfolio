import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import Image from "next/image";

const projects = [
  {
    title: "SimplifyJobs Daemon",
    description:
      "Built because I was tired of refreshing GitHub every 10 minutes for new job posts. This daemon monitors SimplifyJobs, filters by visa sponsorship and my criteria, and sends desktop notifications instantly. It helped me reach Google's final round by notifying me the moment the position went live. Now it even agentically generates tailored resumes for each new posting.",
    image: "/images/simplifyjobs-daemon.png",
    technologies: ["Python", "Automation", "Desktop Notifications", "AI Agents"],
    github: "https://github.com/Matrix030/SimplifyJobsDaemon",
    story: "Made this for myself — now I never miss a job post",
  },
  {
    title: "LocalPilotAI",
    description:
      "Offline AI code-autocomplete VS Code extension with 100% data privacy. Powered by qwen3-coder LLM from Ollama with sub-50ms inference latency. No cloud, no telemetry — your code stays on your machine.",
    image: "/images/LocalPilot_Thumbnail.png",
    technologies: ["TypeScript", "Python", "Ollama", "VS Code Extension"],
    github: "https://github.com/Matrix030/LocalPilot",
    highlights: ["50% productivity boost", "100% offline", "<50ms latency"],
  },
  {
    title: "SteamLens AI",
    description:
      "Started as a simple EDA project, became a full-fledged game analytics tool. Processes 400k+ Steam reviews in 3 minutes using GPU-accelerated NLP. Built for developers who want real player sentiment, not waiting for opinionated outlet reviews. Replaced Kubernetes with Dask, cutting memory by 40% and hosting costs by 85%.",
    image: "/images/steamlens-ai.png",
    technologies: ["Dask", "PyTorch", "Hugging Face", "MongoDB", "AWS EC2"],
    highlights: ["400k+ reviews", "3 min processing", "85% cost savings"],
    story: "What players actually think, not what critics say",
  },
  {
    title: "PatchBotAI",
    description:
      "Agentic AI debugger that automates multi-step debugging workflows. Point it at a bug, and it traces through your codebase, identifies the issue, and proposes fixes — all in a secure sandbox with 100% filesystem isolation. Claude Code-like UX, 60% reduction in debugging time.",
    image: "/images/patchbot-ai.png",
    technologies: ["Python", "Gemini API", "Pydantic", "Sandboxing"],
    highlights: ["60% faster debugging", "Multi-file resolution", "Secure sandbox"],
  },
  {
    title: "Personality Prediction for CV Analysis",
    description:
      "ML model achieving 93% accuracy predicting Big 5 personality traits from resume text. Cut recruiter decision time by 30%. Published at ICRMIR 2023.",
    image: "/images/PersonalityPrediction.png",
    technologies: ["Python", "NLP", "scikit-learn", "Research"],
    github: "https://github.com/Matrix030/PersonalityPrediction2",
    publication: "https://ltce.in/assets/Final-proceeding-ICRMIR-2023.pdf",
    highlights: ["93% accuracy", "Published research"],
  },
];

export function Projects() {
  return (
    <section
      id="projects"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
      aria-label="Selected projects"
    >
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-background/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-foreground lg:sr-only">
          Projects
        </h2>
      </div>

      <div>
        <ul className="group/list">
          {projects.map((project, index) => (
            <li key={index} className="mb-12">
              <div className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-card lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg" />

                <div className="z-10 sm:order-2 sm:col-span-6">
                  <h3 className="font-medium leading-snug text-foreground">
                    <div className="inline-flex items-baseline font-medium leading-tight text-foreground group/link">
                      <span>{project.title}</span>
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-2 text-muted hover:text-accent transition-colors"
                          aria-label={`${project.title} GitHub repository (opens in new tab)`}
                        >
                          <Github className="h-4 w-4" />
                        </a>
                      )}
                      {project.publication && (
                        <a
                          href={project.publication}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-2 text-muted hover:text-accent transition-colors"
                          aria-label={`${project.title} publication (opens in new tab)`}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </h3>

                  {project.story && (
                    <p className="mt-1 text-xs font-medium text-accent italic">
                      {project.story}
                    </p>
                  )}

                  <p className="mt-2 text-sm leading-normal text-muted">
                    {project.description}
                  </p>

                  {project.highlights && (
                    <ul className="mt-2 flex flex-wrap gap-2" aria-label="Project highlights">
                      {project.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="text-xs text-accent font-medium"
                        >
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  )}

                  <ul
                    className="mt-2 flex flex-wrap"
                    aria-label="Technologies used"
                  >
                    {project.technologies.map((tech) => (
                      <li key={tech} className="mr-1.5 mt-2">
                        <div className="flex items-center rounded-full bg-accent/10 px-3 py-1 text-xs font-medium leading-5 text-accent">
                          {tech}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="z-10 sm:order-1 sm:col-span-2">
                  <div className="relative aspect-video overflow-hidden rounded border-2 border-border bg-card">
                    <Image
                      src={project.image}
                      alt={`Screenshot of ${project.title}`}
                      fill
                      className="object-cover transition group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 200px"
                    />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-12">
          <a
            className="inline-flex items-baseline font-medium leading-tight text-foreground hover:text-accent focus-visible:text-accent group/link"
            href="https://github.com/Matrix030"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View All Projects on GitHub (opens in new tab)"
          >
            <span>
              View All Projects on GitHub
              <ArrowUpRight className="ml-1 inline-block h-4 w-4 shrink-0 translate-y-px transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

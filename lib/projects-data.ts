export interface ProjectData {
  id: number;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  period: string;
  github?: string;
  publication?: string;
  highlights: string[];
  category: string;
}

export const projects: ProjectData[] = [
  {
    id: 1,
    title: "SteamLens AI",
    description:
      "GPU-accelerated NLP pipeline processing 400k+ game reviews in 3 min. Replaced Kubernetes with Dask, cutting memory 40% and achieving <1s startup. Deployed on AWS EC2 with 99% GPU utilization.",
    tags: ["Dask", "PyTorch", "Hugging Face", "MongoDB", "Docker", "AWS EC2"],
    imageUrl: "/images/steamlens-ai.png",
    period: "Current Project",
    highlights: [
      "400k+ reviews processed",
      "40% memory reduction",
      "85% hosting cost savings",
    ],
    category: "AI / ML",
  },
  {
    id: 2,
    title: "LocalPilotAI",
    description:
      "Offline AI code-autocomplete VS Code extension with 100% data privacy. Powered by qwen3-coder LLM from Ollama with sub-50ms inference latency. Increased developer productivity by 50%.",
    tags: ["TypeScript", "Python", "Pydantic", "Ollama", "VS Code"],
    imageUrl: "/images/LocalPilot_Thumbnail.png",
    period: "Jan 2025 - Feb 2025",
    github: "https://github.com/Matrix030/LocalPilot",
    highlights: ["50% productivity boost", "100% offline", "<50ms latency"],
    category: "Developer Tools",
  },
  {
    id: 3,
    title: "PatchBotAI",
    description:
      "Agentic AI system automating multi-step debugging workflows, reducing dev time by 60%. Features secure sandbox for file I/O with 100% filesystem isolation and Claude Code-like UX.",
    tags: ["Python", "Gemini API", "Pydantic", "Subprocess"],
    imageUrl: "/images/steamlens-ai.png",
    period: "2024",
    highlights: [
      "60% dev time reduction",
      "100% filesystem isolation",
      "Multi-file bug resolution",
    ],
    category: "AI / Automation",
  },
  {
    id: 4,
    title: "NYC Transit Hub",
    description:
      "Real-time transit tracking app using MTA API & Mapbox, serving 80+ active users. Alert dashboard and live map reduced transit lookup time by 70% compared to official MTA tools.",
    tags: ["TypeScript", "RESTful API", "Firebase", "Mapbox"],
    imageUrl: "/images/steamlens-ai.png",
    period: "2024",
    highlights: ["80+ active users", "70% faster lookups", "Real-time updates"],
    category: "Full Stack",
  },
  {
    id: 5,
    title: "Personality Prediction for CV Analysis",
    description:
      "ML model achieving 93% accuracy predicting Big 5 personality traits from resume text. Cut recruiter decision time by 30%. Published at ICRMIR 2023.",
    tags: ["Python", "NumPy", "Pandas", "NLP", "scikit-learn"],
    imageUrl: "/images/PersonalityPrediction.png",
    period: "August 2022 - May 2023",
    github: "https://github.com/Matrix030/PersonalityPrediction2",
    publication: "https://ltce.in/assets/Final-proceeding-ICRMIR-2023.pdf",
    highlights: ["93% accuracy", "30% faster decisions", "Published research"],
    category: "Research / ML",
  },
  {
    id: 6,
    title: "QuantumHealthShield",
    description:
      "Post-quantum encryption system using AES-GCM + Kyber for medical records with 85% stronger key exchange than RSA. Dilithium-based signing eliminated 95% of IoT data tampering.",
    tags: ["Python", "AES-GCM", "Kyber", "Dilithium", "OQS-Python"],
    imageUrl: "/images/steamlens-ai.png",
    period: "2024",
    highlights: [
      "85% stronger encryption",
      "95% tampering prevention",
      "Post-quantum ready",
    ],
    category: "Security",
  },
];

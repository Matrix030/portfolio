import { Sidebar } from "./components/Sidebar";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
        <div className="lg:flex lg:justify-between lg:gap-4">
          <Sidebar />
          <main id="content" className="pt-24 lg:w-1/2 lg:py-24">
            <About />
            <Experience />
            <Projects />
            
            {/* Footer */}
            <footer className="max-w-md pb-16 text-sm text-muted sm:pb-0">
              <p>
                Built with{" "}
                <a
                  href="https://nextjs.org/"
                  className="font-medium text-foreground hover:text-accent transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Next.js
                </a>{" "}
                and{" "}
                <a
                  href="https://tailwindcss.com/"
                  className="font-medium text-foreground hover:text-accent transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Tailwind CSS
                </a>
                . Deployed on{" "}
                <a
                  href="https://vercel.com/"
                  className="font-medium text-foreground hover:text-accent transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Vercel
                </a>
                .
              </p>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}

export function About() {
  return (
    <section
      id="about"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
      aria-label="About me"
    >
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-background/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-foreground lg:sr-only">
          About
        </h2>
      </div>

      <div className="space-y-4 text-muted">
        <p>
          I&apos;m a software engineer who gets excited about building tools that solve real problems — 
          especially ones I face myself. My best projects started as &quot;I wish this existed&quot; moments: 
          a{" "}
          <a href="#projects" className="font-medium text-foreground hover:text-accent transition-colors">
            job monitoring daemon
          </a>{" "}
          that helped me reach Google&apos;s final interview round, an{" "}
          <a href="#projects" className="font-medium text-foreground hover:text-accent transition-colors">
            offline AI autocomplete tool
          </a>{" "}
          for VS Code, and a{" "}
          <a href="#projects" className="font-medium text-foreground hover:text-accent transition-colors">
            game analytics platform
          </a>{" "}
          that processes 400k+ reviews in minutes.
        </p>

        <p>
          Currently pursuing my Master&apos;s in Computer Science at{" "}
          <a
            href="https://www.nyu.edu/"
            className="font-medium text-foreground hover:text-accent transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            New York University
          </a>
          , where I work as a Course Assistant for Operating Systems — helping students understand 
          everything from process scheduling to kernel development.
        </p>

        <p>
          Previously, I&apos;ve built production systems at{" "}
          <a
            href="https://www.globant.com/"
            className="font-medium text-foreground hover:text-accent transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Globant
          </a>{" "}
          and{" "}
          <a
            href="https://www.gep.com/"
            className="font-medium text-foreground hover:text-accent transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            GEP Worldwide
          </a>
          , working on everything from ETL pipelines processing 50M+ records to AI-powered 
          procurement systems. I enjoy the full stack — from diving into kernel buffers with strace 
          to crafting smooth user interfaces.
        </p>

        <p>
          Outside of coding, you&apos;ll find me climbing ranks in competitive games (Grandmaster in 
          Marvel Rivals and Overwatch) or exploring vast open worlds like Elden Ring. I believe 
          the problem-solving mindset from gaming directly translates to engineering — breaking 
          down complex challenges, iterating on strategies, and staying persistent.
        </p>
      </div>
    </section>
  );
}

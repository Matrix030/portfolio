'use client';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CurrentTechnologies from './components/CurrentTechnologies';

export default function Home() {
  return (
    <main id="main-content" className="overflow-hidden">
      <Navbar />
      <Hero />
      <CurrentTechnologies />
      <About />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}

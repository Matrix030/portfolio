"use client";
import { motion } from 'framer-motion';
import { SeveranceUIInline } from '@/components/SeveranceUI';
import React, { useState } from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export function AppleCardsCarouselDemo() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-20">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-white dark:text-white font-manifold">
        My Skills & Interests
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

const data = [
  {
    category: "Gaming Achievements",
    title: "Competitive & Story-Driven Games",
    src: "https://rivalskins.com/wp-content/uploads/marvel-assets/assets/rank-logos/5%20Diamond%20Rank.png",
    content: (
      <div className="bg-[#010A13]/80 p-8 md:p-14 rounded-3xl mb-4 border border-[#05C3A8]/30">
        <h6 className="text-white text-base md:text-xl font-forma max-w-3xl mx-auto">
          <span className="font-bold text-[#ABFFE9] block mb-4 text-2xl font-manifold">
            My Gaming Passion
          </span>
          I&apos;m an avid competitive gamer with achievements across multiple titles:
          <ul className="list-disc ml-6 mt-3 space-y-2">
            <li>Grandmaster rank in Marvel Rivals</li>
            <li>Grandmaster rank in Overwatch</li>
            <li>Ascendant rank in Valorant</li>
            <li>Love exploring the intricate worlds of games like Elden Ring</li>
          </ul>
        </h6>
      </div>
    ),
  },
  {
    category: "TV Shows & Entertainment",
    title: "Quality Storytelling",
    src: "https://resizing.flixster.com/SjOz5i_l74oCydVXE0g2_zxspTY=/ems.cHJkLWVtcy1hc3NldHMvdHZzZXJpZXMvNTVmYjhkNDgtM2MyZi00OGM2LThhYWUtMTg2ZTkzMzg2Mzc2LnBuZw==",
    content: (
      <div className="bg-[#010A13]/80 p-8 md:p-14 rounded-3xl mb-4 border border-[#05C3A8]/30">
        <p className="text-white text-base md:text-xl font-forma max-w-3xl mx-auto">
          <span className="font-bold text-[#ABFFE9] block mb-4 text-2xl font-manifold">
            Favorite TV Shows
          </span>
          I appreciate shows with complex storytelling and character development:
          <ul className="list-disc ml-6 mt-3 space-y-2">
            <li>Breaking Bad - A masterclass in character transformation</li>
            <li>Better Call Saul - The detailed prequel exploring moral complexity</li>
            <li>Severance - Fascinating exploration of work-life balance and identity</li>
          </ul>
        </p>
      </div>
    ),
  },
  {
    category: "Programming Approach",
    title: "Efficiency Through Automation",
    src: "https://miro.medium.com/v2/resize:fit:512/0*7tuHOILfjWixfD3t.jpg",
    content: (
      <div className="bg-[#010A13]/80 p-8 md:p-14 rounded-3xl mb-4 border border-[#05C3A8]/30">
        <p className="text-white text-base md:text-xl font-forma max-w-3xl mx-auto">
          <span className="font-bold text-[#ABFFE9] block mb-4 text-2xl font-manifold">
            Automation & Scripting
          </span>
          I love optimizing my workflow through automation:
          <ul className="list-disc ml-6 mt-3 space-y-2">
            <li>Created custom Python scripts to automate repetitive tasks</li>
            <li>Developed C programs that launch my daily applications in one click</li>
            <li>Reduced my morning setup routine from 5 minutes to 1 second with custom executable files</li>
          </ul>
        </p>
      </div>
    ),
  },
  {
    category: "Learning Style",
    title: "Documentation & Project-Based",
    src: "https://www.devteam.space/wp-content/uploads/2018/11/Software-Documentation-1-1.png",
    content: (
      <div className="bg-[#010A13]/80 p-8 md:p-14 rounded-3xl mb-4 border border-[#05C3A8]/30">
        <p className="text-white text-base md:text-xl font-forma max-w-3xl mx-auto">
          <span className="font-bold text-[#ABFFE9] block mb-4 text-2xl font-manifold">
            How I Learn
          </span>
          My approach to learning new technologies:
          <ul className="list-disc ml-6 mt-3 space-y-2">
            <li>Prefer reading official documentation over tutorials</li>
            <li>Learn by building real projects rather than following along with videos</li>
            <li>Deep dive into specs and implementations to understand systems thoroughly</li>
          </ul>
        </p>
      </div>
    ),
  },
  {
    category: "Problem Solving",
    title: "Methodical & Visual Approach",
    src: "https://images.unsplash.com/photo-1602081957921-9137a5d6eaee?q=80&w=2793&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: (
      <div className="bg-[#010A13]/80 p-8 md:p-14 rounded-3xl mb-4 border border-[#05C3A8]/30">
        <p className="text-white text-base md:text-xl font-forma max-w-3xl mx-auto">
          <span className="font-bold text-[#ABFFE9] block mb-4 text-2xl font-manifold">
            Problem-Solving Methodology
          </span>
          How I approach complex problems:
          <ul className="list-disc ml-6 mt-3 space-y-2">
            <li>Break down issues into as many submodules as possible</li>
            <li>Create visual representations to understand relationships</li>
            <li>Tackle one component at a time while keeping the full system in mind</li>
          </ul>
        </p>
      </div>
    ),
  }
];

const About = () => {
  const [severanceCompleted, setSeveranceCompleted] = useState(false);
  
  const handleSeveranceComplete = (time: number) => {
    console.log("SeveranceUI completed with time:", time);
    setSeveranceCompleted(true);
  };

  return (
    <section className="py-20 px-4 relative z-10" id="about">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-12 text-center text-white font-manifold"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          About Me
        </motion.h2>
        
        <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
          <motion.div 
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-2xl font-semibold mb-4 text-[#ABFFE9] font-manifold">
              Full Stack Developer & Computer Science Graduate
            </h3>
            <p className="text-white mb-4 font-forma">
              Hello! I&apos;m Rishikesh Gharat, a Computer Science graduate student at New York University with a passion for 
              full-stack development, cloud computing, and AI/ML technologies.
            </p>
            <p className="text-white mb-4 font-forma">
              With experience as a Software Engineering Intern at the National Informatics Centre, Government of India, I&apos;ve designed
              and developed scalable systems and streamlined processes using technologies like PHP, Node.js, React.js, and PostgreSQL.
            </p>
            <p className="text-white font-forma">
              I&apos;m currently pursuing my Master&apos;s in Computer Science at NYU, expanding my knowledge and skills in cutting-edge
              technologies. I&apos;m particularly interested in developing innovative solutions that solve real-world problems.
            </p>
            
            <div className="mt-6">
              <h4 className="font-semibold mb-2 text-[#1EEFFF] font-manifold">Education</h4>
              <ul className="space-y-2 text-white font-forma">
                <li>• Master of Science, Computer Science - New York University (2026)</li>
                <li>• Bachelor of Engineering, Computer Engineering - University of Mumbai</li>
              </ul>
            </div>
          </motion.div>
          
          <motion.div 
            className="w-full md:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 bg-[#05C3A8]/30 rounded-full -z-10 transform translate-x-4 translate-y-4"></div>
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#05C3A8]/50 shadow-xl">
                {/* Add profile picture */}
                <img 
                  src="/images/profile_picture.jpg" 
                  alt="Rishikesh Gharat" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Dedicated Severance UI section */}
        <motion.div 
          className="mt-16 mb-24" 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-3xl font-bold mb-8 text-center text-[#ABFFE9] font-manifold">Featured Project: Severance UI</h3>
          <p className="text-[#1EEFFF] mb-6 text-center text-lg font-forma">Fill the bins to 100% to know more about me! (hobbies and interests)</p>
          
          <div className="relative mx-auto" style={{ height: "800px", maxWidth: "1425px", overflow: "visible" }}>
            <SeveranceUIInline 
              height="100%" 
              title="Macrodata Refinement Interface" 
              description="A recreation of the interface from Apple TV+'s Severance"
              className="w-full h-full severence-ui"
              onComplete={handleSeveranceComplete}
            />
          </div>
          
          {severanceCompleted && (
            <div className="mt-10 mb-6 text-center text-[#1EEFFF] font-forma">
              <p className="text-xl">Congratulations on reaching 100%! Learn more about my skills below.</p>
              <div className="mt-4 animate-bounce">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
          )}
        </motion.div>
        
        {/* Apple Cards Carousel Demo section - only show when Severance is completed */}
        {severanceCompleted && (
          <motion.div 
            className="mt-12 border-t pt-12 border-[#05C3A8]/30"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="-mx-4">
              <AppleCardsCarouselDemo />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default About;
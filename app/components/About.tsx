"use client";
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section className="py-20 px-4 relative z-10" id="about">
      <div className="max-w-4xl mx-auto">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-12 text-center text-white font-manifold"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          About Me
        </motion.h2>
        
        <div className="flex flex-col lg:flex-row items-start gap-12">
          {/* Profile Image */}
          <motion.div 
            className="w-full lg:w-auto flex justify-center lg:justify-start shrink-0"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="relative w-48 h-48 md:w-56 md:h-56">
              <div className="absolute inset-0 bg-brand-teal/20 rounded-2xl -z-10 transform translate-x-3 translate-y-3"></div>
              <div className="w-full h-full rounded-2xl overflow-hidden border-2 border-brand-teal/40">
                <img 
                  src="/images/profile_picture.jpg" 
                  alt="Rishikesh Gharat" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div 
            className="flex-1 space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-brand-text-muted leading-relaxed font-forma">
              I&apos;m a Computer Science student who likes shipping with new tech early—but only when it&apos;s ready to be used in the real world.
            </p>

            <p className="text-brand-text-muted leading-relaxed font-forma">
              I pick things up fast because I don&apos;t just memorize APIs. I focus on understanding the underlying concepts: how the system behaves, where it breaks, and what tradeoffs I&apos;m making. A big part of how I learn is reading documentation end-to-end when I pick up a new language or framework. It keeps me current, but more importantly, it teaches me the practices that come with the ecosystem—how people structure projects, handle state, test, deploy, and avoid common pitfalls.
            </p>

            <p className="text-brand-text-muted leading-relaxed font-forma">
              That mindset matters even more now that AI tools exist—because prompting isn&apos;t the same as engineering. I use AI to move faster, but I still want to understand what I&apos;m building end-to-end, so I can debug it, maintain it, and own it.
            </p>

            <p className="text-brand-text-muted leading-relaxed font-forma">
              Right now, the main gap I&apos;m actively closing is deeper experience on large, long-lived team codebases—design reviews, maintainability, testing culture, and ownership over time. I started tackling this through a software engineering course where my team built a startup-like product in an Agile setup, and I&apos;ve included peer feedback from that project on this site. Teammates consistently called out my reliability, proactive delivery, and the way I kept work moving each sprint.
            </p>

            <p className="text-brand-text-muted leading-relaxed font-forma">
              Outside of coding, I&apos;m obsessive about developer productivity. I moved away from macOS/Windows and built a personalized Linux setup because my machine felt like the bottleneck. Tuning my environment made a noticeable difference—and it reflects how I approach engineering: remove friction, build good systems, and keep improving.
            </p>

            {/* Education */}
            <div className="pt-4 border-t border-brand-border">
              <h3 className="font-semibold mb-3 text-brand-mint font-manifold">Education</h3>
              <ul className="space-y-2 text-brand-text-muted font-forma">
                <li className="flex items-start gap-2">
                  <span className="text-brand-teal mt-1">•</span>
                  <span>Master of Science, Computer Science - New York University (2026)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-teal mt-1">•</span>
                  <span>Bachelor of Engineering, Computer Engineering - University of Mumbai</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;

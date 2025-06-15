import { motion } from 'framer-motion';
import LampDemo from '@/components/ui/lamp';

const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center py-12 px-4 relative">
      <div className="absolute inset-0 -top-60 pointer-events-none">
        <LampDemo />
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-4xl mx-auto relative z-10"
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white font-manifold whitespace-nowrap">
          Hi, I&apos;m <span className="text-[#ABFFE9]" style={{ fontFamily: "var(--font-manifold) !important" }}>Rishikesh Gharat</span>
        </h1>
        <div className="text-2xl md:text-3xl text-[#1EEFFF] mb-10 flex flex-col items-center" style={{ fontFamily: "var(--font-manifold) !important" }}>
          <div style={{ fontFamily: "var(--font-manifold) !important" }}>Full Stack Developer</div>
          <div className="my-2" style={{ fontFamily: "var(--font-manifold) !important" }}>&</div>
          <div style={{ fontFamily: "var(--font-manifold) !important" }}>Computer Science Graduate</div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
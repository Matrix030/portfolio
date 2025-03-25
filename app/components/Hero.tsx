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
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
          Hi, I&apos;m <span className="text-[#ABFFE9]">Rishikesh Gharat</span>
        </h1>
        <h2 className="text-2xl md:text-3xl text-[#1EEFFF] mb-10">
          Full Stack Developer & Computer Science Graduate
        </h2>
      </motion.div>
      
      {/* Placeholder for optional 3D element */}
      <div className="mt-8 h-40 w-full flex justify-center items-center">
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 3,
            ease: "easeInOut" 
          }}
          className="w-40 h-40 bg-[#05C3A8]/20 rounded-full opacity-50"
        >
          {/* Future 3D element container */}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
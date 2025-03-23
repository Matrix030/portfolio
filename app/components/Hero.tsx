import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-4xl mx-auto"
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Hi, I'm <span className="text-blue-600">Rishikesh Gharat</span>
        </h1>
        <h2 className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 mb-10">
          Full Stack Developer & Computer Science Graduate
        </h2>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium text-lg shadow-lg"
        >
          View My Work
        </motion.button>
      </motion.div>
      
      {/* Placeholder for optional 3D element */}
      <div className="mt-20 h-40 w-full flex justify-center items-center">
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
          className="w-40 h-40 bg-blue-100 dark:bg-blue-900/30 rounded-full opacity-50"
        >
          {/* Future 3D element container */}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero; 
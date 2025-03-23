import { motion } from 'framer-motion';

const About = () => {
  return (
    <section className="py-20 px-4" id="about">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          About Me
        </motion.h2>
        
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div 
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-2xl font-semibold mb-4">
              Full Stack Developer & Computer Science Graduate
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Hello! I'm Rishikesh Gharat, a Computer Science graduate student at New York University with a passion for 
              full-stack development, cloud computing, and AI/ML technologies.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              With experience as a Software Engineering Intern at the National Informatics Centre, Government of India, I've designed
              and developed scalable systems and streamlined processes using technologies like PHP, Node.js, React.js, and PostgreSQL.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              I'm currently pursuing my Master's in Computer Science at NYU, expanding my knowledge and skills in cutting-edge
              technologies. I'm particularly interested in developing innovative solutions that solve real-world problems.
            </p>
            
            <div className="mt-6">
              <h4 className="font-semibold mb-2">Education</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
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
              <div className="absolute inset-0 bg-blue-200 dark:bg-blue-900/30 rounded-full -z-10 transform translate-x-4 translate-y-4"></div>
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl">
                {/* Replace with your image */}
                <div className="w-full h-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
                  RG
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About; 
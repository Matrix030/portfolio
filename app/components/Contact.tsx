"use client";
import { motion } from 'framer-motion';
import { GlobeDemo } from "./GlobeDemo";

const socialLinks = [
  { name: 'GitHub', icon: 'GitHub', url: 'https://github.com/Matrix030' },
  { name: 'LinkedIn', icon: 'LinkedIn', url: 'https://www.linkedin.com/in/rishikesh-gharat' },
];

const SocialIcon = ({ link, index }: { link: typeof socialLinks[0], index: number }) => {
  return (
    <motion.a 
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="w-12 h-12 flex items-center justify-center bg-white dark:bg-gray-800 rounded-full shadow-md text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <span className="sr-only">{link.name}</span>
      {/* Replace with actual icons */}
      <div className="text-sm font-bold">{link.icon}</div>
    </motion.a>
  );
};

const Contact = () => {
  return (
    <section className="py-20 px-4" id="contact">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-12 text-center font-manifold text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Get In Touch
        </motion.h2>
        
        <div className="flex flex-col md:flex-row gap-10">
          <motion.div 
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-semibold mb-6 font-manifold text-white">Connect With Me</h3>
            <p className="text-white mb-8 font-forma">
              I&apos;m available for internships, and collaborations. Let&apos;s create something amazing together!
            </p>
            
            <div className="mb-8">
              <p className="text-white mb-2 font-forma">
                <strong>Email:</strong> rvg9395@nyu.edu
              </p>
              <p className="text-white mb-2 font-forma">
                <strong>Phone:</strong> (929) 503-5218
              </p>
              <p className="text-white font-forma">
                <strong>Location:</strong> New York, NY
              </p>
            </div>
            
            <h4 className="font-medium mb-4 font-manifold text-white">Find me on:</h4>
            <div className="flex gap-4">
              {socialLinks.map((link, index) => (
                <SocialIcon key={link.name} link={link} index={index} />
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GlobeDemo />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 
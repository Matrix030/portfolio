"use client";

import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="py-8 px-4 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-medium text-gray-600 dark:text-gray-300">
              Rishikesh Gharat
            </p>
          </motion.div>
          

        </div>
      </div>
    </footer>
  );
};

export default Footer; 

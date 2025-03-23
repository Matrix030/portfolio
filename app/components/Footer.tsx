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
          
          <motion.div 
            className="mt-4 md:mt-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">
              &copy; {new Date().getFullYear()} All Rights Reserved.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
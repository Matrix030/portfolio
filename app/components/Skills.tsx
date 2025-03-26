import { motion } from 'framer-motion';

const skills = [
  { name: 'Python', level: 95, icon: '🐍' },
  { name: 'JavaScript/TypeScript', level: 90, icon: '🟨' },
  { name: 'Java', level: 85, icon: '☕' },
  { name: 'React & Next.js', level: 85, icon: '⚛️' },
  { name: 'Node.js', level: 80, icon: '🟢' },
  { name: 'SQL (PostgreSQL, MySQL)', level: 85, icon: '🗄️' },
  { name: 'AWS Cloud', level: 80, icon: '☁️' },
  { name: 'Machine Learning', level: 75, icon: '🤖' },
];

const services = [
  {
    title: 'Full Stack Development',
    description: 'Building responsive web applications with modern frameworks like React, Next.js, and Node.js.',
    icon: '💻',
  },
  {
    title: 'Cloud Solutions',
    description: 'Implementing scalable cloud solutions using AWS and other cloud platforms.',
    icon: '☁️',
  },
  {
    title: 'AI/ML Integration',
    description: 'Developing machine learning models and integrating AI solutions for business needs.',
    icon: '🤖',
  },
  {
    title: 'Data Analysis',
    description: 'Analyzing large datasets to extract valuable insights using Python and visualization tools.',
    icon: '📊',
  },
];

const SkillBar = ({ skill, index }: { skill: typeof skills[0], index: number }) => {
  return (
    <motion.div 
      className="mb-6"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <span className="mr-2 text-xl">{skill.icon}</span>
          <span className="font-medium">{skill.name}</span>
        </div>
        <span className="text-sm text-gray-500">{skill.level}%</span>
      </div>
      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-blue-600 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
        />
      </div>
    </motion.div>
  );
};

const ServiceCard = ({ service, index }: { service: typeof services[0], index: number }) => {
  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="text-3xl mb-4">{service.icon}</div>
      <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900" id="skills">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Skills
        </motion.h2>
        
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="w-full lg:w-1/2">
            <motion.h3 
              className="text-2xl font-semibold mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Technical Skills
            </motion.h3>
            
            <div>
              {skills.map((skill, index) => (
                <SkillBar key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </div>
          
          <div className="w-full lg:w-1/2">
            <motion.h3 
              className="text-2xl font-semibold mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Services
            </motion.h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((service, index) => (
                <ServiceCard key={service.title} service={service} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills; 
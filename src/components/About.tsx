import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export const About = () => {
  return (
    <section id="about" className="section">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto px-4 py-16 text-center"
      >
        <motion.h2
          variants={itemVariants}
          className="text-4xl md:text-5xl font-bold mb-8 text-purple-200"
        >
          À propos de moi
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl mb-12 text-purple-300 max-w-3xl mx-auto"
        >
          Développeur Full Stack passionné par la création d'expériences web innovantes et immersives
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            variants={cardVariants}
            className="bg-purple-900/30 backdrop-blur-sm p-6 rounded-xl shadow-xl"
          >
            <h3 className="text-2xl font-semibold mb-4 text-purple-200">Frontend</h3>
            <p className="text-purple-300">
              React, Vue.js, TypeScript, Tailwind CSS
            </p>
          </motion.div>

          <motion.div
            variants={cardVariants}
            className="bg-purple-900/30 backdrop-blur-sm p-6 rounded-xl shadow-xl"
          >
            <h3 className="text-2xl font-semibold mb-4 text-purple-200">Backend</h3>
            <p className="text-purple-300">
              Node.js, Express, Python, Django
            </p>
          </motion.div>

          <motion.div
            variants={cardVariants}
            className="bg-purple-900/30 backdrop-blur-sm p-6 rounded-xl shadow-xl"
          >
            <h3 className="text-2xl font-semibold mb-4 text-purple-200">DevOps</h3>
            <p className="text-purple-300">
              Docker, CI/CD, AWS, Git
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
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
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-3xl mx-auto text-center"
      >
        <motion.h2 variants={itemVariants} className="title">
          À Propos
        </motion.h2>
        <motion.p variants={itemVariants} className="text-lg mb-6">
          Développeur Full Stack passionné par la création d'applications web modernes et performantes.
          J'aime relever des défis techniques et apprendre de nouvelles technologies.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
            className="card"
          >
            <h3 className="subtitle">Frontend</h3>
            <p>React, TypeScript, Tailwind CSS, Three.js</p>
          </motion.div>
          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
            className="card"
          >
            <h3 className="subtitle">Backend</h3>
            <p>PHP, Node.js, SQL, NoSQL, API REST</p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
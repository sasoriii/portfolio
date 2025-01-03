import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { MdPhone } from 'react-icons/md'; 

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
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

export const Contact = () => {
  return (
    <section id="contact" className="section">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-xl mx-auto"
      >
        <motion.h2 variants={itemVariants} className="title text-purple-200">
          Contact
        </motion.h2>
        <motion.div variants={containerVariants} className="flex justify-center gap-8">
          <motion.a
            href="https://github.com/sasoriii"
            target="_blank"
            rel="noopener noreferrer"
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="text-4xl text-white hover:text-accent transition-colors duration-300"
          >
            <FaGithub />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/jeremy-gabriel-108098185/"
            target="_blank"
            rel="noopener noreferrer"
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="text-4xl text-white hover:text-accent transition-colors duration-300"
          >
            <FaLinkedin />
          </motion.a>
          <motion.a
            href="mailto:jeremy.gabriel0150@gmail.com"
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="text-4xl text-white hover:text-accent transition-colors duration-300"
          >
            <MdEmail />
          </motion.a>
          <motion.a
            href="tel:+33651153213"
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="text-4xl text-white hover:text-accent transition-colors duration-300"
          >
            <MdPhone />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from 'framer-motion';

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
        <motion.h2 variants={itemVariants} className="title">
          Contact
        </motion.h2>
        <motion.form variants={containerVariants} className="space-y-6">
          <motion.div variants={itemVariants}>
            <Input
              placeholder="Votre nom"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60 transition-all duration-300 focus:scale-[1.02]"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Input
              type="email"
              placeholder="Votre email"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60 transition-all duration-300 focus:scale-[1.02]"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Textarea
              placeholder="Votre message"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60 min-h-[150px] transition-all duration-300 focus:scale-[1.02]"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Button
              className="w-full bg-accent hover:bg-accent/80 transition-all duration-300 transform hover:scale-[1.02]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Envoyer
            </Button>
          </motion.div>
        </motion.form>
      </motion.div>
    </section>
  );
};
import { motion, useMotionValue, useTransform, useSpring, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

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
      duration: 0.7,
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  }
};

interface FormationItemProps {
  title: string;
  period: string;
  description: string;
  skills: string[];
}

const FormationItem = ({ title, period, description, skills }: FormationItemProps) => {
  const controls = useAnimation();
  
  const y = useSpring(0, {
    stiffness: 100,
    damping: 30
  });
  
  const rotateX = useSpring(0, {
    stiffness: 100,
    damping: 30
  });
  
  const rotateY = useSpring(0, {
    stiffness: 100,
    damping: 30
  });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateXValue = ((mouseY - centerY) / centerY) * 10;
    const rotateYValue = ((mouseX - centerX) / centerX) * 10;
    
    rotateX.set(rotateXValue);
    rotateY.set(-rotateYValue);
    y.set(-5);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    y.set(0);
  };

  const style = {
    y,
    rotateX,
    rotateY
  };

  return (
    <motion.div
      variants={itemVariants}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative h-[400px] card-container"
    >
      <div className="card h-full transform-gpu z-10 p-8">
        <div className="relative z-10 h-full flex flex-col">
          <div className="h-2 w-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded mb-6"></div>
          <h3 className="text-2xl font-bold text-purple-200 mb-3">{title}</h3>
          <p className="text-purple-300 mb-4 text-base">{period}</p>
          <p className="text-purple-100/90 mb-6 text-base flex-grow">
            {description}
          </p>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-purple-500/20 text-purple-200 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const Formation = () => {
  const formations = [
    {
      title: "Classe Préparatoire Intégrée",
      period: "2018 - 2020",
      description: "Formation intensive en mathématiques, physique et informatique. Enseignement se fait en mode projet ce qui m'a toujours permis de travailler en équipe.",
      skills: ["Mathématiques", "Physique", "Java", "Html", "Css", "JS", "Réseaux", "CCNA1", "CCNA2"]
    },
    {
      title: "Cycle Ingénieur Informatique",
      period: "2020 - 2023",
      description: "Spécialisation en développement logiciel et systèmes d'information. Formation approfondie en architecture logicielle, bases de données et méthodologies agiles. Option entreprenariat qui m'a permis d'être auto entrepreneur.",
      skills: ["Vue.js", "PHP", "SQL", "NoSQL", "Git", "Gestion de projet", "Agile"]
    }
  ];

  return (
    <section id="formation" className="section overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-4xl mx-auto text-center px-4"
      >
        <motion.h2 variants={itemVariants} className="title text-purple-200">
          Formation
        </motion.h2>
        <motion.p variants={itemVariants} className="text-base md:text-lg mb-8 md:mb-16 text-purple-200">
          Mon parcours académique m'a permis d'acquérir de solides compétences techniques et une approche pratique du développement.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10">
          {formations.map((formation, index) => (
            <FormationItem key={index} {...formation} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

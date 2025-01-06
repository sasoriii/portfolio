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

interface ExperienceItemProps {
  title: string;
  company: string;
  period: string;
  description: string;
  skills: string[];
}

const ExperienceItem = ({ title, company, period, description, skills }: ExperienceItemProps) => {
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
          <p className="text-purple-300 mb-2 text-lg">{company}</p>
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

export const Experience = () => {
  const experiences = [
    {
      title: "Développeur Full Stack",
      company: "hipto",
      period: "07/2023 - Présent",
      description: "Création et développement d'un outil interne pour de la gestion de flux clients. Création et développement d'APIs pour des innovations internes",
      skills: ["PHP", "CodeIgniteur", "Laravel", "SQL", "Firebase", "GCP", "Docker", "Git"]
    },
    {
      title: "Stage Développeur Full Stack",
      company: "hipto",
      period: "02/2023 - 07/2023",
      description: "Participation au développement et d'implémentation d'APIs, des premières landings pages.",
      skills: ["PHP", "CodeIgniteur", "SQL", "React", "Git"]
    },
    {
      title: "Auto-entrepreneur",
      company: "RIDE 4 BIG AIR",
      period: "01/2023 - 06/2024",
      description: "Design, conception, impression 3D et vente de poignées de planche de kitesurf innovantes",
      skills: ["Wordpress", "Stripe", "Fusion360"]
    },
    {
      title: "Stage Développeur Full Stack",
      company: "Atipik Solutions",
      period: "09/2021 - 02/2022",
      description: "Participation au développement d'une application mobile. Collaboration étroite avec l'équipe design et implémentation de nouvelles fonctionnalités.",
      skills: ["Angular", "PHP", "Symfony"]
    }
  ];

  return (
    <section id="experience" className="section overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-4xl mx-auto text-center px-4"
      >
        <motion.h2 variants={itemVariants} className="title text-purple-200">
          Expérience
        </motion.h2>
        <motion.p variants={itemVariants} className="text-base md:text-lg mb-8 md:mb-16 text-purple-200">
          Mon parcours professionnel m'a permis de travailler sur des projets variés et d'acquérir une solide expérience technique.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10">
          {experiences.map((experience, index) => (
            <ExperienceItem key={index} {...experience} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

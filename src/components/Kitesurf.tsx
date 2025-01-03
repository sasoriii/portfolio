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

const CardComponent = ({ title, content }: { title: string; content: string }) => {
  const controls = useAnimation();
  
  // Animation values
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
      initial="hidden"
      animate="visible"
      variants={itemVariants}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative h-[280px] card-container"
    >
      <div className="card h-full transform-gpu z-10 p-8">
        <div className="relative z-10 h-full flex flex-col">
          <div className="h-2 w-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded mb-4"></div>
          <h3 className="text-2xl font-bold text-purple-200 mb-4">{title}</h3>
          <p className="text-purple-100/90 flex-grow">
            {content}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export const Kitesurf = () => {
  return (
    <section id="kitesurf" className="section overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-4xl mx-auto text-center"
      >
        <motion.h2 variants={itemVariants} className="title text-purple-200">
          Kitesurf
        </motion.h2>
        <motion.p variants={itemVariants} className="text-lg mb-16 text-purple-200">
        Au-delà du développement, le kitesurf est ma passion. Cette discipline m'a appris la persévérance,
          la gestion du risque et l'importance de l'adaptation constante - des qualités que j'applique
          également dans mon travail de développeur.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 perspective-1000">
          <CardComponent
            title="Expérience"
            content="Plus de 5 ans de pratique dans différents spots à travers le monde"
          />
          <CardComponent
            title="Spots favoris"
            content="Fromentine, Tatajuba, Dakhla"
          />
          <CardComponent
            title="The Ridery"
            content="Sponsorisé par The Ridery afin de promouvoir l'activité de kitesurf et le magasin"
          />
        </div>
      </motion.div>
    </section>
  );
};
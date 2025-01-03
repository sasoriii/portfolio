import { motion, useMotionValue, useTransform, useSpring, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const titleVariants = {
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

interface ProjectCardProps {
  title: string;
  description: string;
  url: string;
  fallbackImage?: string;
}

const ProjectCard = ({ title, description, url, fallbackImage }: ProjectCardProps) => {
  const controls = useAnimation();
  const [iframeError, setIframeError] = useState(false);
  
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

  const handleIframeError = () => {
    setIframeError(true);
  };

  const style = {
    y,
    rotateX,
    rotateY
  };

  return (
    <motion.div
      variants={titleVariants}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative h-[500px] card-container cursor-pointer"
      onClick={() => window.open(url, '_blank')}
    >
      <div className="card h-full transform-gpu z-10">
        <div className="relative z-10 h-full flex flex-col">
          <div className="relative h-72 w-full mb-4 overflow-hidden rounded-t-xl bg-gray-800">
            {!iframeError ? (
              <iframe
                src={url}
                className="w-full h-full transform scale-[0.6] origin-top-left"
                onError={handleIframeError}
                style={{
                  width: '170%',
                  height: '170%',
                  pointerEvents: 'none'
                }}
              />
            ) : fallbackImage ? (
              <img
                src={fallbackImage}
                alt={title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-purple-200">
                <span>Aperçu non disponible</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-50"></div>
          </div>
          <div className="p-8 flex flex-col flex-grow">
            <div className="h-2 w-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded mb-6"></div>
            <h3 className="text-2xl font-bold text-purple-200 mb-4">{title}</h3>
            <p className="text-purple-100/90 flex-grow text-lg">
              {description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const Projects = () => {
  const projects = [
    {
      title: "Le bureau du vent",
      description: "Site web de réservation de cours de kitesurf en ligne",
      url: "https://www.le-bureau-du-vent.com",
      fallbackImage: "/le-bureau-du-vent.png"
    },
    {
      title: "Projet interne",
      description: "Outil de redirection de flux",
      url: "#",
      fallbackImage: "/projet-interne.png"
    },
    {
      title: "Projet WIP",
      description: "etc",
      url: "#",
      fallbackImage: "/projet-wip.png"
    }
  ];

  return (
    <section id="projects" className="section overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-[95vw] mx-auto"
      >
        <motion.h2 variants={titleVariants} className="title text-purple-200 mb-16">
          Mes Projets
        </motion.h2>
        <div className="flex gap-8 overflow-x-auto pb-8 pt-12 snap-x snap-mandatory hide-scrollbar px-12">
          {projects.map((project, index) => (
            <div key={index} className={`min-w-[600px] snap-center pt-8 ${
              index === 0 ? 'pl-8' : index === projects.length - 1 ? 'pr-8' : ''
            }`}>
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

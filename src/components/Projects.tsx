import { motion } from 'framer-motion';

const projects = [
  {
    title: "Le bureau du vent",
    description: "Site web de réservation de cours de kitesurf en ligne",
    tech: ["React", "PHP", "Google Cloud Platform"],
    link: "https://www.le-bureau-du-vent.com",
    image: "/images/bureau-vent.jpg"
  },
  {
    title: "Projet interne",
    description: "Outil de redirection de flux",
    tech: ["PHP", "CodeIgniter", "Laravel"],
    link: "#",
    image: "/images/internal-project.jpg"
  },
  {
    title: "Portfolio",
    description: "Portfolio personnel avec animations 3D",
    tech: ["React", "Three.js", "Framer Motion", "Tailwind CSS"],
    link: "#",
    image: "/images/portfolio.jpg"
  }
];

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
  hidden: { opacity: 0, y: -20 },
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
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export const Projects = () => {
  return (
    <section id="projects" className="section">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-6xl mx-auto px-4 py-16"
      >
        <motion.h2 
          variants={titleVariants} 
          className="text-4xl md:text-5xl font-bold mb-12 text-center text-purple-200"
        >
          Mes Projets
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              className="bg-purple-900/30 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl"
            >
              <div className="aspect-video relative overflow-hidden">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-semibold text-purple-200">
                    {project.title}
                  </h3>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-300 hover:text-purple-200 transition-colors"
                    aria-label={`Voir le projet ${project.title}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                      />
                    </svg>
                  </a>
                </div>
                <p className="text-purple-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-purple-800/50 rounded-full text-sm text-purple-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

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
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export const Kitesurf = () => {
  return (
    <section id="kitesurf" className="section">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-3xl mx-auto text-center"
      >
        <motion.h2 variants={itemVariants} className="title">
          Kitesurf
        </motion.h2>
        <motion.p variants={itemVariants} className="text-lg mb-6 text-white/80">
          Au-delà du développement, le kitesurf est ma passion. Cette discipline m'a appris la persévérance,
          la gestion du risque et l'importance de l'adaptation constante - des qualités que j'applique
          également dans mon travail de développeur.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            variants={cardVariants}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
            className="card bg-white/10 backdrop-blur-sm"
          >
            <h3 className="subtitle text-white">Expérience</h3>
            <p className="text-white/80">
              Plus de 5 ans de pratique dans différents spots à travers le monde
            </p>
          </motion.div>
          <motion.div
            variants={cardVariants}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
            className="card bg-white/10 backdrop-blur-sm"
          >
            <h3 className="subtitle text-white">Spots Favoris</h3>
            <p className="text-white/80">
              Fromentine, Tatajuba, Dakhla
            </p>
          </motion.div>
          <motion.div
            variants={cardVariants}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
            className="card bg-white/10 backdrop-blur-sm"
          >
            <h3 className="subtitle text-white">The ridery</h3>
            <p className="text-white/80">
              Sponsorisé par The Ridery afin de promouvoir l'activité de kitesurf et le magasin
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
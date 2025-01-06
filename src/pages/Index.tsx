import { useEffect, useRef, useState } from 'react';
import { ThreeScene } from "@/components/ThreeScene";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { Kitesurf } from "@/components/Kitesurf";
import { Formation } from "@/components/Formation";
import { Experience } from "@/components/Experience";
import { motion, AnimatePresence } from "framer-motion";
import { SectionContext } from '@/context/SectionContext';

const Index = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const scrolling = useRef(false);
  const timeout = useRef<NodeJS.Timeout>();

  const sections = [
    { id: 'home', component: (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-purple-200">
          Jérémy GABRIEL
        </h1>
        <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-purple-300">
          Développeur Full Stack
        </h2>
        <p className="text-xl md:text-2xl text-purple-300">
          Créons ensemble des expériences web exceptionnelles
        </p>
      </motion.div>
    )},
    { id: 'about', component: <About /> },
    { id: 'formation', component: <Formation /> },
    { id: 'experience', component: <Experience /> },
    { id: 'kitesurf', component: <Kitesurf /> },
    { id: 'projects', component: <Projects /> },
    { id: 'contact', component: <Contact /> }
  ];

  const scrollToSection = (index: number) => {
    if (scrolling.current) return;
    if (index < 0 || index >= sections.length) return;

    scrolling.current = true;
    setCurrentSection(index);

    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    timeout.current = setTimeout(() => {
      scrolling.current = false;
    }, 1000);
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (scrolling.current) return;

      const direction = e.deltaY > 0 ? 1 : -1;
      scrollToSection(currentSection + direction);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (scrolling.current) return;

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        scrollToSection(currentSection + 1);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        scrollToSection(currentSection - 1);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentSection]);

  return (
    <SectionContext.Provider value={{ currentSection, totalSections: sections.length }}>
      <div className="relative h-screen overflow-hidden">
        <ThreeScene />
        
        {/* Navigation dots */}
        <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50">
          {sections.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToSection(index)}
              className={`block w-3 h-3 my-2 rounded-full transition-all duration-300 ${
                currentSection === index
                  ? 'bg-purple-300 scale-125'
                  : 'bg-purple-300/30 hover:bg-purple-300/50'
              }`}
              aria-label={`Aller à la section ${index + 1}`}
            />
          ))}
        </div>

        {/* Sections */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="h-screen flex items-center justify-center p-4 md:p-8"
          >
            {sections[currentSection].component}
          </motion.div>
        </AnimatePresence>
      </div>
    </SectionContext.Provider>
  );
};

export default Index;
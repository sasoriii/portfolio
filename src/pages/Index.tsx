import { useEffect, useRef, useState } from 'react';
import { ThreeScene } from "@/components/ThreeScene";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { Kitesurf } from "@/components/Kitesurf";
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
    <SectionContext.Provider value={{ currentSection, setCurrentSection }}>
      <div className="h-screen w-screen overflow-hidden relative">
        <ThreeScene />
        <div className="absolute inset-0 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {sections[currentSection].component}
          </AnimatePresence>
        </div>
        <div className="fixed right-8 top-1/2 transform -translate-y-1/2 space-y-4">
          {sections.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToSection(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSection === index ? 'bg-purple-500 scale-125' : 'bg-purple-300'
              }`}
            />
          ))}
        </div>
      </div>
    </SectionContext.Provider>
  );
};

export default Index;
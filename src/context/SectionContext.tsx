import { createContext, useContext } from 'react';

interface SectionContextType {
  currentSection: number;
  totalSections: number;
}

export const SectionContext = createContext<SectionContextType>({
  currentSection: 0,
  totalSections: 5
});

export const useSection = () => useContext(SectionContext);

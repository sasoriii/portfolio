import { createContext, useContext, Dispatch, SetStateAction } from 'react';

interface SectionContextType {
  currentSection: number;
  setCurrentSection: Dispatch<SetStateAction<number>>;
}

export const SectionContext = createContext<SectionContextType>({
  currentSection: 0,
  setCurrentSection: () => {}
});

export const useSection = () => useContext(SectionContext);

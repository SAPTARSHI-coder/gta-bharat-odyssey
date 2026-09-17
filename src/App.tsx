import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useGame } from './context/GameContext';
import { Landing } from './components/Landing/Landing';
import { CharacterCreator } from './components/CharacterCreator/CharacterCreator';
import { LosSantosScene } from './components/LosSantosScene/LosSantosScene';
import { Portal } from './components/Portal/Portal';
import { MumbaiScene } from './components/MumbaiScene/MumbaiScene';
import { DelhiScene } from './components/DelhiScene/DelhiScene';
import { JourneyEditor } from './components/JourneyEditor/JourneyEditor';
import { FinalShare } from './components/FinalShare/FinalShare';
import { HUD } from './components/HUD/HUD';

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const pageTransition = { duration: 0.6 };

function SceneRouter() {
  const { currentScene } = useGame();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentScene}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={pageTransition}
        className="w-full"
      >
        {currentScene === 'landing' && <Landing />}
        {currentScene === 'character' && <CharacterCreator />}
        {currentScene === 'los-santos' && <LosSantosScene />}
        {currentScene === 'portal' && <Portal />}
        {currentScene === 'mumbai' && <MumbaiScene />}
        {currentScene === 'delhi' && <DelhiScene />}
        {currentScene === 'editor' && <JourneyEditor />}
        {currentScene === 'final' && <FinalShare />}
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <>
      <HUD />
      <SceneRouter />
    </>
  );
}



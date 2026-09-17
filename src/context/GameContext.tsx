import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { GameState, Scene, Character } from '../types';

interface GameContextValue extends GameState {
  goToScene: (scene: Scene) => void;
  setCharacter: (char: Character) => void;
  setFinalPoster: (dataUrl: string) => void;
  resetGame: () => void;
}

const defaultState: GameState = {
  currentScene: 'landing',
  character: null,
  finalPosterDataUrl: null,
  journeyStartTime: null,
};

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GameState>(defaultState);

  const goToScene = useCallback((scene: Scene) => {
    setState(prev => ({ ...prev, currentScene: scene }));
    const targetElement = document.getElementById(`section-${scene}`);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const setCharacter = useCallback((character: Character) => {
    setState(prev => ({ ...prev, character, journeyStartTime: Date.now() }));
  }, []);

  const setFinalPoster = useCallback((dataUrl: string) => {
    setState(prev => ({ ...prev, finalPosterDataUrl: dataUrl }));
  }, []);

  const resetGame = useCallback(() => {
    setState(defaultState);
    const landing = document.getElementById('section-landing');
    if (landing) {
      landing.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <GameContext.Provider value={{ ...state, goToScene, setCharacter, setFinalPoster, resetGame }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be inside GameProvider');
  return ctx;
}

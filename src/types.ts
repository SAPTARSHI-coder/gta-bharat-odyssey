// Types for the entire game experience
export type Scene =
  | 'landing'
  | 'character'
  | 'los-santos'
  | 'portal'
  | 'mumbai'
  | 'delhi'
  | 'editor'
  | 'final';

export interface CharacterStats {
  driving: number;
  street: number;
  tech: number;
  style: number;
  luck: number;
}

export interface Character {
  name: string;
  title: string;
  bio: string;
  appearance: 'urban' | 'tech' | 'street' | 'corporate';
  outfit: 'jacket' | 'hoodie' | 'suit' | 'casual';
  background: 'streets' | 'tech' | 'art' | 'hustle';
  stats: CharacterStats;
  avatar: string; // emoji or generated
}

export interface GameState {
  currentScene: Scene;
  character: Character | null;
  finalPosterDataUrl: string | null;
  journeyStartTime: number | null;
}

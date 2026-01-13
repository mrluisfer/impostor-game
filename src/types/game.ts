export interface Player {
  id: string;
  name: string;
  isImpostor: boolean;
  assignedWord: string; // Palabra para inocentes, pista para impostores
}

export interface Category {
  id: string;
  name: string;
  emoji: string;
  words: string[];
  clues: string[];
}

export type GamePhase = 'setup' | 'playing' | 'revealing' | 'finished';

export interface GameState {
  players: Player[];
  selectedCategories: Category[];
  currentWord: string;
  currentClue: string;
  phase: GamePhase;
  impostorCount: number;
  currentRevealIndex: number;
}

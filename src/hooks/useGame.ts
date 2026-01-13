import { useState, useCallback } from 'react';
import type { Player, Category, GameState } from '../types/game';
import { categories } from '../data/categories';

const generateId = () => Math.random().toString(36).substring(2, 9);

const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const PLAYERS_STORAGE_KEY = 'impostor-game-players';

const loadPlayersFromStorage = (): Player[] => {
  try {
    const stored = localStorage.getItem(PLAYERS_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading players from localStorage:', error);
  }
  return [];
};

const savePlayersToStorage = (players: Player[]) => {
  try {
    localStorage.setItem(PLAYERS_STORAGE_KEY, JSON.stringify(players));
  } catch (error) {
    console.error('Error saving players to localStorage:', error);
  }
};

const initialState: GameState = {
  players: loadPlayersFromStorage(),
  selectedCategories: [],
  currentWord: '',
  currentClue: '',
  phase: 'setup',
  impostorCount: 1,
  currentRevealIndex: 0,
};

export function useGame() {
  const [state, setState] = useState<GameState>(initialState);

  const addPlayer = useCallback((name: string) => {
    const trimmedName = name.trim();
    if (!trimmedName) return false;

    setState((prev) => {
      // Check for duplicate names
      if (prev.players.some((p) => p.name.toLowerCase() === trimmedName.toLowerCase())) {
        return prev;
      }

      const newPlayer: Player = {
        id: generateId(),
        name: trimmedName,
        isImpostor: false,
        assignedWord: '',
      };

      const newPlayers = [...prev.players, newPlayer];
      savePlayersToStorage(newPlayers);
      return {
        ...prev,
        players: newPlayers,
      };
    });

    return true;
  }, []);

  const removePlayer = useCallback((id: string) => {
    setState((prev) => {
      const newPlayers = prev.players.filter((p) => p.id !== id);
      savePlayersToStorage(newPlayers);
      return {
        ...prev,
        players: newPlayers,
      };
    });
  }, []);

  const selectCategory = useCallback((category: Category) => {
    setState((prev) => {
      const isSelected = prev.selectedCategories.some((c) => c.id === category.id);
      const newCategories = isSelected
        ? prev.selectedCategories.filter((c) => c.id !== category.id)
        : [...prev.selectedCategories, category];

      return {
        ...prev,
        selectedCategories: newCategories,
      };
    });
  }, []);

  const toggleAllCategories = useCallback(() => {
    setState((prev) => {
      // Si hay más del 50% seleccionadas, deseleccionar todas
      // Si no, seleccionar todas
      const threshold = categories.length / 2;
      const shouldSelectAll = prev.selectedCategories.length <= threshold;

      return {
        ...prev,
        selectedCategories: shouldSelectAll ? [...categories] : [],
      };
    });
  }, []);

  const setImpostorCount = useCallback((count: number) => {
    setState((prev) => ({
      ...prev,
      impostorCount: Math.max(1, Math.min(count, prev.players.length - 1)),
    }));
  }, []);

  const startGame = useCallback(() => {
    setState((prev) => {
      if (prev.players.length < 3 || prev.selectedCategories.length === 0) {
        return prev;
      }

      // Seleccionar una categoría aleatoria de las seleccionadas
      const category =
        prev.selectedCategories[Math.floor(Math.random() * prev.selectedCategories.length)];
      
      // Seleccionar una palabra aleatoria con sus pistas
      const wordWithClues = category.words[Math.floor(Math.random() * category.words.length)];
      const word = wordWithClues.word;
      const clue = wordWithClues.clues[Math.floor(Math.random() * wordWithClues.clues.length)];

      // Shuffle players and assign impostors
      const shuffledPlayers = shuffleArray(prev.players);
      const impostorCount = Math.min(prev.impostorCount, prev.players.length - 1);

      const assignedPlayers = shuffledPlayers.map((player, index) => ({
        ...player,
        isImpostor: index < impostorCount,
        assignedWord: index < impostorCount ? clue : word,
      }));

      // Re-shuffle to randomize display order
      const finalPlayers = shuffleArray(assignedPlayers);

      return {
        ...prev,
        players: finalPlayers,
        currentWord: word,
        currentClue: clue,
        phase: 'revealing',
        currentRevealIndex: 0,
      };
    });
  }, []);

  const previousReveal = useCallback(() => {
    setState((prev) => {
      if (prev.currentRevealIndex <= 0) {
        return prev;
      }
      return {
        ...prev,
        currentRevealIndex: prev.currentRevealIndex - 1,
      };
    });
  }, []);

  const nextReveal = useCallback(() => {
    setState((prev) => {
      const nextIndex = prev.currentRevealIndex + 1;
      if (nextIndex >= prev.players.length) {
        return {
          ...prev,
          phase: 'playing',
        };
      }
      return {
        ...prev,
        currentRevealIndex: nextIndex,
      };
    });
  }, []);

  const skipToGame = useCallback(() => {
    setState((prev) => ({
      ...prev,
      phase: 'playing',
    }));
  }, []);

  const revealImpostors = useCallback(() => {
    setState((prev) => ({
      ...prev,
      phase: 'finished',
    }));
  }, []);

  // Cambiar palabra manteniendo los roles de impostor
  const changeWord = useCallback(() => {
    setState((prev) => {
      if (prev.selectedCategories.length === 0) return prev;

      // Seleccionar una nueva categoría y palabra aleatoria
      const category =
        prev.selectedCategories[Math.floor(Math.random() * prev.selectedCategories.length)];
      const wordWithClues = category.words[Math.floor(Math.random() * category.words.length)];
      const word = wordWithClues.word;
      const clue = wordWithClues.clues[Math.floor(Math.random() * wordWithClues.clues.length)];

      // Mantener los roles pero actualizar las palabras asignadas
      const updatedPlayers = prev.players.map((player) => ({
        ...player,
        assignedWord: player.isImpostor ? clue : word,
      }));

      return {
        ...prev,
        players: updatedPlayers,
        currentWord: word,
        currentClue: clue,
        phase: 'revealing',
        currentRevealIndex: 0,
      };
    });
  }, []);

  const resetGame = useCallback(() => {
    setState((prev) => ({
      ...initialState,
      players: loadPlayersFromStorage().map((p) => ({
        ...p,
        isImpostor: false,
        assignedWord: '',
      })),
      selectedCategories: prev.selectedCategories,
      impostorCount: prev.impostorCount,
    }));
  }, []);

  const newGame = useCallback(() => {
    setState({
      ...initialState,
      players: loadPlayersFromStorage(),
      selectedCategories: [],
      impostorCount: 1,
    });
  }, []);

  const canStartGame = state.players.length >= 3 && state.selectedCategories.length > 0;

  return {
    // State
    players: state.players,
    selectedCategories: state.selectedCategories,
    currentWord: state.currentWord,
    currentClue: state.currentClue,
    phase: state.phase,
    impostorCount: state.impostorCount,
    currentRevealIndex: state.currentRevealIndex,
    categories,

    // Computed
    canStartGame,

    // Actions
    addPlayer,
    removePlayer,
    selectCategory,
    toggleAllCategories,
    setImpostorCount,
    startGame,
    previousReveal,
    nextReveal,
    skipToGame,
    revealImpostors,
    resetGame,
    newGame,
    changeWord,
  };
}

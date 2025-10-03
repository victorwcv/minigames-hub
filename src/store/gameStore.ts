import { create } from 'zustand';
import type { GameId, GameState } from '@/types';

interface GameStore extends GameState {
  setCurrentGame: (gameId: GameId | null) => void;
  updateScore: (gameId: GameId, score: number) => void;
  resetScores: () => void;
}

export const useGameStore = create<GameStore>((set) => ({
  currentGame: null,
  scores: {
    'tic-tac-toe': 0,
    'snake': 0,
    'simon': 0,
  },
  setCurrentGame: (gameId) => set({ currentGame: gameId }),
  updateScore: (gameId, score) =>
    set((state) => ({
      scores: {
        ...state.scores,
        [gameId]: Math.max(state.scores[gameId], score),
      },
    })),
  resetScores: () =>
    set({
      scores: {
        'tic-tac-toe': 0,
        'snake': 0,
        'simon': 0,
      },
    }),
}));
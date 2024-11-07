import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GameState {
  level: number;
  score: number;
  highScore: number;
  updateLevel: (level: number) => void;
  updateScore: (score: number) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      level: 1,
      score: 0,
      highScore: 0,
      updateLevel: (level) => set({ level }),
      updateScore: (score) => set((state) => ({ 
        score,
        highScore: Math.max(score, state.highScore)
      })),
      resetGame: () => set({ level: 1, score: 0 })
    }),
    {
      name: 'game-storage'
    }
  )
);
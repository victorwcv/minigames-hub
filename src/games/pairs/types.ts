export interface Card {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export type Difficulty = 'easy' | 'medium' | 'hard';

export type GameStatus = 'idle' | 'playing' | 'paused' | 'won' | 'gameOver';

export interface PairsGameState {
  cards: Card[];
  flippedCards: number[];
  matchedPairs: number;
  moves: number;
  timeLeft: number;
  gameStatus: GameStatus;
  difficulty: Difficulty;
  score: number;
  highScore: number;
}

export interface DifficultyConfig {
  pairs: number;
  initialTime: number;
  timeBonus: number;
  cols: number;
}
export type Player = 'X' | 'O' | null;
export type Board = Player[];
export type GameMode = 'pvp' | 'cpu';
export type GameStatus = 'playing' | 'won' | 'draw';

export interface TicTacToeState {
  board: Board;
  currentPlayer: Player;
  winner: Player;
  gameStatus: GameStatus;
  gameMode: GameMode;
  scores: {
    X: number;
    O: number;
    draws: number;
  };
}

export interface WinningLine {
  positions: number[];
  player: Player;
}
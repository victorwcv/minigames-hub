export interface Game {
  id: string;
  title: string;
  description: string;
  icon: string;
  players: string;
  duration: string;
  route: string;
  gradient: string;
}

export type GameId = "tic-tac-toe" | "snake" | "pairs";

export interface GameState {
  currentGame: GameId | null;
  scores: Record<GameId, number>;
}

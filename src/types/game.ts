export type GameLength = 10 | 20;
export type GameState = 'setup' | 'playing' | 'gameOver';

export interface GameSettings {
  questionsPerPlayer: GameLength;
  players: string[];
}
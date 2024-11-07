export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: string;
  level: number;
}

export interface Player {
  name: string;
  score: number;
  level: number;
  lives: number;
}

export interface LeaderboardEntry {
  name: string;
  score: number;
  level: number;
}
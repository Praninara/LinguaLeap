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

export interface Word {
  french: string;
  english: string;
}

export interface Story {
  level: number;
  title: string;
  content: string;
  words: Word[];
}
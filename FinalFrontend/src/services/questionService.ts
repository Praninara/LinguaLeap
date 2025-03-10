import { Question } from '../types';
import axios from 'axios';

export const generateQuestions = async (level: number): Promise<Question[]> => {
  try {
    const response = await axios.get(`http://localhost:5001/api/games/questions/${level}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch questions:', error);
    throw error;
  }
};

export const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};
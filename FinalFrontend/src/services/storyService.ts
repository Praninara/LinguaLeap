import { Story } from '../types';
import axios from 'axios';

export const generateStories = async (level: number): Promise<Story[]> => {
  try {
    const response = await axios.get(`http://localhost:5001/api/games/stories/${level}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch stories:', error);
    throw error;
  }
};
// import { Story } from '../types';
// import axios from 'axios';
//
// export const generateStories = async (level: number): Promise<Story[]> => {
//   try {
//     const response = await axios.get(`http://localhost:5001/api/games/stories/${level}`);
//     return response.data;
//   } catch (error) {
//     console.error('Failed to fetch stories:', error);
//     throw error;
//   }
// };
import { Story } from '../types';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const generateStories = async (level: number): Promise<Story[]> => {
  try {
    const response = await axios.get(`${API_URL}/api/games/stories/${level}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch stories:', error);
    throw error;
  }
};

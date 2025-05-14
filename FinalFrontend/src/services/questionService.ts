// // import { Question } from '../types';
// // import axios from 'axios';
// //
// // export const generateQuestions = async (level: number): Promise<Question[]> => {
// //   try {
// //     const response = await axios.get(`http://localhost:5001/api/games/questions/${level}`);
// //     return response.data;
// //   } catch (error) {
// //     console.error('Failed to fetch questions:', error);
// //     throw error;
// //   }
// // };
// //
// // // export const shuffleArray = <T>(array: T[]): T[] => {
// // //   const newArray = [...array];
// // //   for (let i = newArray.length - 1; i > 0; i--) {
// // //     const j = Math.floor(Math.random() * (i + 1));
// // //     [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
// // //   }
// // //   return newArray;
// // // };
// //
// // export const shuffleArray = <T>(array: T[]): T[] => {
// //   const newArray = [...array];
// //   for (let i = newArray.length - 1; i > 0; i--) {
// //     const j = Math.floor(Math.random() * (i + 1));
// //     [newArray[i]!, newArray[j]!] = [newArray[j]!, newArray[i]!]; // Non-null assertion
// //   }
// //   return newArray;
// // };
//
// import { Question } from '../types';
// import axios from 'axios';
//
// // Use VITE_API_URL from environment variables
// const API_URL = import.meta.env.VITE_API_URL;
//
// export const generateQuestions = async (level: number): Promise<Question[]> => {
//   try {
//     const response = await axios.get(`${API_URL}/api/games/questions/${level}`);
//     return response.data;
//   } catch (error) {
//     console.error('Failed to fetch questions:', error);
//     throw error;
//   }
// };
//
// export const shuffleArray = <T>(array: T[]): T[] => {
//   const newArray = [...array];
//   for (let i = newArray.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [newArray[i]!, newArray[j]!] = [newArray[j]!, newArray[i]!]; // Non-null assertion to silence TypeScript
//   }
//   return newArray;
// };

import { Question } from '../types';
import axios from 'axios';
import { BACKEND_URL } from '../config';

export const generateQuestions = async (level: number): Promise<Question[]> => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/games/questions/${level}`);
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
    [newArray[i]!, newArray[j]!] = [newArray[j]!, newArray[i]!];
  }
  return newArray;
};
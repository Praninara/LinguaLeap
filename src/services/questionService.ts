import { Question, Language } from '../types';
import axios from 'axios';
import { getLanguagePrompt } from '../data/languages';

const API_KEY = 'AIzaSyC3yHpnW2gV-LQShLOit_1av0S_pDcV_8w';
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

export const generateQuestions = async (level: number, language: Language): Promise<Question[]> => {
  try {
    const prompt = `Generate 10 ${language} learning questions for level ${level}. Format as JSON array:
[
  {
    "id": <number>,
    "text": "<${language} learning question>",
    "options": ["<option1>", "<option2>", "<option3>", "<option4>"],
    "correctAnswer": "<correct option>",
    "level": ${level}
  }
]`;

    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    const content = data.candidates[0].content.parts[0].text;
    const cleanedContent = content.replace(/```json|```/g, '').trim();
    const questions = JSON.parse(cleanedContent);

    return questions;
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
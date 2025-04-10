import { Story, Language } from '../types';
import axios from 'axios';
import { getLanguagePrompt } from '../data/languages';

const API_KEY = 'AIzaSyC3yHpnW2gV-LQShLOit_1av0S_pDcV_8w';
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

export const generateStories = async (level: number, language: Language): Promise<Story[]> => {
  try {
    const prompt = `Generate 5 ${language} learning stories for level ${level}. Format as JSON array:
[
  {
    "level": ${level},
    "title": "<brief title>",
    "content": "<2-3 sentence story>",
    "words": [
      {"word": "<${language} word>", "translation": "<English translation>"},
      {"word": "<${language} word>", "translation": "<English translation>"},
      {"word": "<${language} word>", "translation": "<English translation>"},
      {"word": "<${language} word>", "translation": "<English translation>"}
    ]
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
    const stories = JSON.parse(cleanedContent);

    return stories;
  } catch (error) {
    console.error('Failed to fetch stories:', error);
    throw error;
  }
};
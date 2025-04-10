import { Language } from '../types';
import { getLanguagePrompt } from '../data/languages';

const API_KEY = 'AIzaSyC3yHpnW2gV-LQShLOit_1av0S_pDcV_8w';
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

interface WordPair {
  word: string;
  translation: string;
  alternativeTranslations?: string[];
}

export const generateWordPairs = async (language: Language, count: number = 10): Promise<WordPair[]> => {
  const prompt = getLanguagePrompt(language, count);

  try {
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
    const wordPairs = JSON.parse(cleanedContent);

    return wordPairs.map((pair: WordPair) => ({
      ...pair,
      alternativeTranslations: pair.alternativeTranslations || []
    }));
  } catch (error) {
    console.error('Error generating word pairs:', error);
    throw error;
  }
};
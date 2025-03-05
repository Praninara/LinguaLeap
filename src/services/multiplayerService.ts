import { Word } from '../types';

const API_KEY = 'AIzaSyC3yHpnW2gV-LQShLOit_1av0S_pDcV_8w';
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

interface WordPair {
  word: string;
  translation: string;
  alternativeTranslations?: string[];
}

export const generateWordPairs = async (language: string, count: number = 10): Promise<WordPair[]> => {
  const prompt = `Generate ${count} ${language} word pairs for language learning. Format as JSON array:
  [
    {
      "word": "<${language} word>",
      "translation": "<english translation>",
      "alternativeTranslations": ["<alternative1>", "<alternative2>"]
    }
  ]
  
  For words with accents, include non-accented alternatives in alternativeTranslations.
  Example: { "word": "école", "translation": "school", "alternativeTranslations": ["ecole"] }`;

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
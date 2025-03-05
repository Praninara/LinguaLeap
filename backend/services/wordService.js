import fetch from 'node-fetch';

const API_KEY = 'AIzaSyC3yHpnW2gV-LQShLOit_1av0S_pDcV_8w';
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

export const generateWordPairs = async (language, count = 10) => {
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

    return wordPairs.map((pair) => ({
      ...pair,
      alternativeTranslations: pair.alternativeTranslations || []
    }));
  } catch (error) {
    console.error('Error generating word pairs:', error);
    throw error;
  }
};

// Fallback word pairs in case API fails
const FALLBACK_WORD_PAIRS = {
  french: [
    { word: "Bonjour", translation: "Hello", alternativeTranslations: [] },
    { word: "Merci", translation: "Thank you", alternativeTranslations: [] },
    { word: "Au revoir", translation: "Goodbye", alternativeTranslations: [] },
    { word: "S'il vous plaît", translation: "Please", alternativeTranslations: ["Sil vous plait"] },
    { word: "Oui", translation: "Yes", alternativeTranslations: [] }
  ],
  spanish: [
    { word: "Hola", translation: "Hello", alternativeTranslations: [] },
    { word: "Gracias", translation: "Thank you", alternativeTranslations: [] },
    { word: "Adiós", translation: "Goodbye", alternativeTranslations: ["Adios"] },
    { word: "Por favor", translation: "Please", alternativeTranslations: [] },
    { word: "Sí", translation: "Yes", alternativeTranslations: ["Si"] }
  ]
};

export const getFallbackWordPairs = (language) => {
  return FALLBACK_WORD_PAIRS[language] || [];
};
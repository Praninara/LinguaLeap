import fetch from 'node-fetch';
import OpenAI from 'openai';
import { GoogleGenerativeAI } from "@google/generative-ai";


const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY
});

async function generateWithGemini(language, count) {
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
    console.log(`Attempting to generate ${count} word pairs with Gemini for ${language}`);
    
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API request failed with status: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error('Invalid Gemini API response structure');
    }

    const content = data.candidates[0].content.parts[0].text;
    const cleanedContent = content.replace(/```json|```/g, '').trim();
    
    const wordPairs = JSON.parse(cleanedContent);
    return validateAndFormatPairs(wordPairs, count);
  } catch (error) {
    console.log('Gemini API Error:', error.message);
    throw error;
  }
}

async function generateWithGPT(language, count) {
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
    console.log(`Attempting to generate ${count} word pairs with GPT for ${language}`);

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a helpful language learning assistant that generates word pairs in the requested format."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    const content = completion.choices[0].message.content;
    const cleanedContent = content.replace(/```json|```/g, '').trim();
    
    const wordPairs = JSON.parse(cleanedContent);
    return validateAndFormatPairs(wordPairs, count);
  } catch (error) {
    console.log('GPT API Error:', error.message);
    throw error;
  }
}

function validateAndFormatPairs(wordPairs, count) {
  // Validate word pairs
  const validWordPairs = wordPairs.filter(pair => 
    pair &&
    typeof pair.word === 'string' &&
    typeof pair.translation === 'string' &&
    pair.word.trim() !== '' &&
    pair.translation.trim() !== ''
  );

  if (validWordPairs.length < count / 2) {
    throw new Error('Insufficient valid word pairs');
  }

  return validWordPairs.map((pair) => ({
    ...pair,
    alternativeTranslations: pair.alternativeTranslations || []
  }));
}

export const generateWordPairs = async (language, count = 10) => {
  try {
    // First try with Gemini
    try {
      return await generateWithGemini(language, count);
    } catch (geminiError) {
      console.log('Gemini API failed, trying GPT...');
      
      // If Gemini fails, try with GPT
      try {
        return await generateWithGPT(language, count);
      } catch (gptError) {
        console.log('GPT API failed as well, using fallback pairs...');
        throw new Error('Both APIs failed');
      }
    }
  } catch (error) {
    console.log('All APIs failed, using fallback pairs');
    return getFallbackWordPairs(language);
  }
};

// Expanded fallback word pairs
const FALLBACK_WORD_PAIRS = {
  french: [
    { word: "Bonjour", translation: "Hello", alternativeTranslations: [] },
    { word: "Merci", translation: "Thank you", alternativeTranslations: [] },
    { word: "Au revoir", translation: "Goodbye", alternativeTranslations: [] },
    { word: "S'il vous plaît", translation: "Please", alternativeTranslations: ["Sil vous plait"] },
    { word: "Oui", translation: "Yes", alternativeTranslations: [] },
    { word: "Non", translation: "No", alternativeTranslations: [] },
    { word: "Bonsoir", translation: "Good evening", alternativeTranslations: [] },
    { word: "Comment allez-vous", translation: "How are you", alternativeTranslations: [] },
    { word: "Très bien", translation: "Very good", alternativeTranslations: ["Tres bien"] },
    { word: "À bientôt", translation: "See you soon", alternativeTranslations: ["A bientot"] }
  ],
  spanish: [
    { word: "Hola", translation: "Hello", alternativeTranslations: [] },
    { word: "Gracias", translation: "Thank you", alternativeTranslations: [] },
    { word: "Adiós", translation: "Goodbye", alternativeTranslations: ["Adios"] },
    { word: "Por favor", translation: "Please", alternativeTranslations: [] },
    { word: "Sí", translation: "Yes", alternativeTranslations: ["Si"] },
    { word: "No", translation: "No", alternativeTranslations: [] },
    { word: "Buenos días", translation: "Good morning", alternativeTranslations: ["Buenos dias"] },
    { word: "Buenas noches", translation: "Good night", alternativeTranslations: [] },
    { word: "¿Cómo estás?", translation: "How are you?", alternativeTranslations: ["Como estas"] },
    { word: "Muy bien", translation: "Very good", alternativeTranslations: [] }
  ]
};

export const getFallbackWordPairs = (language) => {
  console.log(`Using fallback word pairs for ${language}`);
  return FALLBACK_WORD_PAIRS[language] || [];
};
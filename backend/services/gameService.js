import { GoogleGenerativeAI } from "@google/generative-ai";
import { SPANISH_QUESTIONS } from '../data/spanishQuestions.js';
import { FALLBACK_STORIES } from '../data/frenchStories.js';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent';

export const generateQuestions = async (level) => {
  try {
    const prompt = `Generate 10 Spanish learning questions as a JSON array. Each question should follow this format exactly:
      {
        "id": <number>,
        "text": "<Spanish learning question>",
        "options": ["<option1>", "<option2>", "<option3>", "<option4>"],
        "correctAnswer": "<correct option>",
        "level": ${level}
      }`;

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
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
    const cleanedContent = content.replace(/```json|```/g, "").trim();
    const questions = JSON.parse(cleanedContent);

    const validQuestions = questions.filter(q => (
      q.text && 
      Array.isArray(q.options) && 
      q.options.length === 4 &&
      q.options.includes(q.correctAnswer)
    ));

    if (validQuestions.length < 5) {
      throw new Error('Insufficient valid questions');
    }

    return shuffleArray(validQuestions);
  } catch (error) {
    console.warn('Using fallback questions due to:', error);
    return getFallbackQuestions(level);
  }
};

export const generateStories = async (startLevel = 1) => {
  const prompt = `Generate 5 French learning stories for level ${startLevel}. Format as JSON array:
  [
    {
      "level": ${startLevel},
      "title": "<brief title>",
      "content": "<2-3 sentence story>",
      "words": [
        {"french": "<word1>", "english": "<translation1>"},
        {"french": "<word2>", "english": "<translation2>"},
        {"french": "<word3>", "english": "<translation3>"},
        {"french": "<word4>", "english": "<translation4>"}
      ]
    }
  ]`;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    });

    if (!response.ok) {
      return FALLBACK_STORIES.map(story => ({ ...story, level: startLevel }));
    }

    const data = await response.json();
    const content = data.candidates[0].content.parts[0].text;
    const cleanedContent = content.replace(/```json|```/g, '').trim();
    const stories = JSON.parse(cleanedContent);

    const validStories = stories.filter(story => {
      return (
        story &&
        typeof story.level === 'number' &&
        typeof story.title === 'string' &&
        typeof story.content === 'string' &&
        Array.isArray(story.words) &&
        story.words.length === 4 &&
        story.words.every(word => 
          word &&
          typeof word.french === 'string' &&
          typeof word.english === 'string' &&
          word.french.trim() !== '' &&
          word.english.trim() !== ''
        )
      );
    });

    if (validStories.length < 5) {
      return FALLBACK_STORIES.map(story => ({ ...story, level: startLevel }));
    }

    return validStories;
  } catch (error) {
    console.warn('Story generation error, using fallback stories');
    return FALLBACK_STORIES.map(story => ({ ...story, level: startLevel }));
  }
};

const getFallbackQuestions = (level) => {
  const questionsForLevel = SPANISH_QUESTIONS.filter(q => q.level <= level);
  return shuffleArray(questionsForLevel);
};

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};
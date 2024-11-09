import { Question } from '../types';
import { SPANISH_QUESTIONS } from '../data/spanishQuestions';

const API_KEY = 'AIzaSyC3yHpnW2gV-LQShLOit_1av0S_pDcV_8w';
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

export const generateQuestions = async (level: number): Promise<Question[]> => {
  try {
    const prompt = `Generate 10 Spanish learning questions as a JSON array. Each question should follow this format exactly:
      {
        "id": <number>,
        "text": "<Spanish learning question>",
        "options": ["<option1>", "<option2>", "<option3>", "<option4>"],
        "correctAnswer": "<correct option>",
        "level": ${level}
      }
      
      Requirements:
      - Questions should be appropriate for level ${level} Spanish learners
      - Each question must have exactly 4 options
      - The correct answer must be one of the options
      - Include a mix of vocabulary and basic grammar
      - Keep questions concise and clear`;

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
    const cleanedContent = content.replace(/```json|```/g, "").trim();
    const questions = JSON.parse(cleanedContent);

    // Validate questions
    const validQuestions = questions.filter((q: Question) => (
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

const getFallbackQuestions = (level: number): Question[] => {
  const questionsForLevel = SPANISH_QUESTIONS.filter(q => q.level <= level);
  return shuffleArray(questionsForLevel);
};

export const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};
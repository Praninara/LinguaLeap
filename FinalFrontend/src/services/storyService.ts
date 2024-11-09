import { Story } from '../types';

const API_KEY = 'AIzaSyC3yHpnW2gV-LQShLOit_1av0S_pDcV_8w';
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

const FALLBACK_STORIES: Story[] = [
  {
    level: 1,
    title: "At the Café",
    content: "Marie visits a French café and learns essential phrases for ordering.",
    words: [
      { french: "Bonjour", english: "Hello" },
      { french: "S'il vous plaît", english: "Please" },
      { french: "Merci", english: "Thank you" },
      { french: "Au revoir", english: "Goodbye" }
    ]
  },
  {
    level: 1,
    title: "Shopping Day",
    content: "Pierre goes shopping and practices numbers and clothing vocabulary.",
    words: [
      { french: "Chemise", english: "Shirt" },
      { french: "Pantalon", english: "Pants" },
      { french: "Combien", english: "How much" },
      { french: "Taille", english: "Size" }
    ]
  },
  {
    level: 1,
    title: "Family Dinner",
    content: "The family gathers for dinner and discusses food preferences.",
    words: [
      { french: "Délicieux", english: "Delicious" },
      { french: "Famille", english: "Family" },
      { french: "Dîner", english: "Dinner" },
      { french: "Cuisine", english: "Kitchen" }
    ]
  },
  {
    level: 1,
    title: "Weather Talk",
    content: "Friends discuss the weather and make weekend plans.",
    words: [
      { french: "Soleil", english: "Sun" },
      { french: "Pluie", english: "Rain" },
      { french: "Chaud", english: "Hot" },
      { french: "Froid", english: "Cold" }
    ]
  },
  {
    level: 1,
    title: "At School",
    content: "Students learn classroom vocabulary and basic instructions.",
    words: [
      { french: "Livre", english: "Book" },
      { french: "Crayon", english: "Pencil" },
      { french: "École", english: "School" },
      { french: "Professeur", english: "Teacher" }
    ]
  }
];

export const generateStories = async (startLevel: number = 1): Promise<Story[]> => {
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
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
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
      console.warn('API response not ok, using fallback stories');
      return FALLBACK_STORIES.map(story => ({ ...story, level: startLevel }));
    }

    const data = await response.json();
    
    if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
      console.warn('Invalid API response structure, using fallback stories');
      return FALLBACK_STORIES.map(story => ({ ...story, level: startLevel }));
    }

    const content = data.candidates[0].content.parts[0].text;
    const cleanedContent = content.replace(/```json|```/g, '').trim();
    
    let stories: Story[];
    try {
      stories = JSON.parse(cleanedContent);
    } catch (e) {
      console.warn('JSON parsing error, using fallback stories');
      return FALLBACK_STORIES.map(story => ({ ...story, level: startLevel }));
    }

    const validStories = stories.filter((story: Story) => {
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
      console.warn('Insufficient valid stories, using fallback stories');
      return FALLBACK_STORIES.map(story => ({ ...story, level: startLevel }));
    }

    return validStories;
  } catch (error) {
    console.warn('Story generation error, using fallback stories');
    return FALLBACK_STORIES.map(story => ({ ...story, level: startLevel }));
  }
};
// // import { motion } from 'framer-motion';

// // interface StoryModalProps {
// //   level: number;
// //   onClose: () => void;
// // }

// // const stories = [
// //   {
// //     level: 1,
// //     title: "At the Café",
// //     content: "Marie walks into a café. She says 'Bonjour!' (Hello!) to the waiter. She orders 'un café' (a coffee) and says 'Merci!' (Thank you). When leaving, she says 'Au revoir!' (Goodbye).",
// //     words: [
// //       { french: 'Bonjour', english: 'Hello' },
// //       { french: 'Merci', english: 'Thank you' },
// //       { french: 'Au revoir', english: 'Goodbye' }
// //     ]
// //   },
// //   {
// //     level: 2,
// //     title: "At the Market",
// //     content: "Jean visits the market to buy some vegetables. He greets the vendor with 'Salut!' (Hi!). He asks for 'des pommes' (some apples) and 'des carottes' (some carrots). After paying, he says 'À bientôt!' (See you soon!).",
// //     words: [
// //       { french: 'Salut', english: 'Hi' },
// //       { french: 'des pommes', english: 'some apples' },
// //       { french: 'des carottes', english: 'some carrots' },
// //       { french: 'À bientôt', english: 'See you soon' }
// //     ]
// //   },
// //   {
// //     level: 3,
// //     title: "In the Park",
// //     content: "Sophie and Paul go for a walk in the park. Sophie points to a dog and says, 'Regarde le chien!' (Look at the dog!). They sit on a bench and enjoy the 'jardin' (garden). They talk about their plans for the 'weekend' (weekend).",
// //     words: [
// //       { french: 'Regarde', english: 'Look' },
// //       { french: 'le chien', english: 'the dog' },
// //       { french: 'jardin', english: 'garden' },
// //       { french: 'weekend', english: 'weekend' }
// //     ]
// //   }
// // ];


// // const StoryModal = ({ level, onClose }: StoryModalProps) => {
// //   const story = stories[level - 1];
// //   console.log(story)

// //   return (
// //     <motion.div
// //       initial={{ opacity: 0, scale: 0.9 }}
// //       animate={{ opacity: 1, scale: 1 }}
// //       className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
// //     >
// //       <div className="bg-[#3a3a3a] p-8 rounded-lg max-w-2xl w-full pixel-border">
// //         <h2 className="text-2xl mb-4 text-[#ffd700]">Level {level}: {story.title}</h2>
// //         <p className="mb-6 leading-relaxed">{story.content}</p>
        
// //         <div className="mb-6">
// //           <h3 className="text-xl mb-2 text-[#ffd700]">New Words:</h3>
// //           <div className="grid grid-cols-2 gap-4">
// //             {story.words.map((word, index) => (
// //               <div key={index} className="bg-[#2b2b2b] p-3 rounded">
// //                 <span className="text-[#ffd700]">{word.french}</span>
// //                 {' → '}
// //                 <span>{word.english}</span>
// //               </div>
// //             ))}
// //           </div>
// //         </div>

// //         <button 
// //           className="retro-button w-full"
// //           onClick={onClose}
// //         >
// //           Play Game
// //         </button>
// //       </div>
// //     </motion.div>
// //   );
// // };

// // export default StoryModal;


// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';

// interface Story {
//   level: number;
//   title: string;
//   content: string;
//   words: { french: string; english: string }[];
// }

// interface StoryModalProps {
//   level: number;
//   onClose: () => void;
// }

// const API_KEY = 'AIzaSyC3yHpnW2gV-LQShLOit_1av0S_pDcV_8w';
// const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

// const generateStories = async (): Promise<Story[]> => {
//   const prompt = `Generate 5 French learning stories in JSON format only, ordered by level, without any additional text or formatting. Each story should have:
//     {
//       "level": <level>,
//       "title": "<story title>",
//       "content": "<story content>",
//       "words": [
//         { "french": "<French word or phrase>", "english": "<English translation>" },
//         ...
//       ]
//     }
    
//     Level Details:
//     - Level 1: Beginner vocabulary, short phrases
//     - Level 2: Introductions and greetings
//     - Level 3: Daily activities with basic nouns and verbs
//     - Level 4: Travel-related phrases
//     - Level 5: Conversational sentences using A2-level vocabulary`;

//   try {
//     const response = await fetch(`${API_URL}?key=${API_KEY}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
//     });

//     const data = await response.json();
//     const cleanedResponse = data.candidates[0].content.parts[0].text.replace(/```json|```/g, "").trim();

//     // Parse the JSON string into a JavaScript object
//     console.log(cleanedResponse);
//     return JSON.parse(cleanedResponse);
//   } catch (error) {
//     console.error('Error generating stories:', error);

//     // Default fallback stories
//     return [
//       {
//         level: 1,
//         title: "At the Café",
//         content: "Marie walks into a café. She says 'Bonjour!' (Hello!) to the waiter. She orders 'un café' (a coffee) and says 'Merci!' (Thank you). When leaving, she says 'Au revoir!' (Goodbye).",
//         words: [
//           { french: 'Bonjour', english: 'Hello' },
//           { french: 'Merci', english: 'Thank you' },
//           { french: 'Au revoir', english: 'Goodbye' },
//         ],
//       },
//       // ... other fallback stories for levels 2-5
//     ];
//   }
// };

// const StoryModal = ({ level, onClose }: StoryModalProps) => {
//   const [story, setStory] = useState<Story | null>(null);

//   useEffect(() => {
//     const fetchStories = async () => {
//       const stories = await generateStories();
//       const levelStory = stories.find(story => story.level === level);
//       setStory(levelStory || null);
//     };

//     fetchStories();
//   }, [level]);

//   if (!story) return null;

//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.9 }}
//       animate={{ opacity: 1, scale: 1 }}
//       className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
//     >
//       <div className="bg-[#3a3a3a] p-8 rounded-lg max-w-2xl w-full pixel-border">
//         <h2 className="text-2xl mb-4 text-[#ffd700]">Level {level}: {story.title}</h2>
//         <p className="mb-6 leading-relaxed">{story.content}</p>
        
//         <div className="mb-6">
//           <h3 className="text-xl mb-2 text-[#ffd700]">New Words:</h3>
//           <div className="grid grid-cols-2 gap-4">
//             {story.words.map((word, index) => (
//               <div key={index} className="bg-[#2b2b2b] p-3 rounded">
//                 <span className="text-[#ffd700]">{word.french}</span>
//                 {' → '}
//                 <span>{word.english}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         <button 
//           className="retro-button w-full"
//           onClick={onClose}
//         >
//           Play Game
//         </button>
//       </div>
//     </motion.div>
//   );
// };

// export default StoryModal;
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Word {
  french: string;
  english: string;
  transliteration: string;
}

interface Story {
  level: number;
  title: string;
  content: string;
  words: Word[];
}

interface StoryModalProps {
  level: number;
  onClose: () => void;
}

const API_KEY = 'AIzaSyC3yHpnW2gV-LQShLOit_1av0S_pDcV_8w';
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

const generateStories = async (): Promise<Story[]> => {
  const prompt = `Generate 5 French learning stories in JSON format only, ordered by level, without any additional text or formatting. Each story should have:
    {
      "level": <level>,
      "title": "<story title>",
      "content": "<story content in French> <story content in English>",
      "words": [
        { "french": "<French word or phrase>", "english": "<English translation>", "transliteration": "<English transliteration>" },
        ...
      ]
    }
    
    Level Details:
    - Level 1: Beginner vocabulary, short phrases
    - Level 2: Introductions and greetings
    - Level 3: Daily activities with basic nouns and verbs
    - Level 4: Travel-related phrases
    - Level 5: Conversational sentences using A2-level vocabulary`;

  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    });

    const data = await response.json();
    console.log(data)
    // Extract and clean the JSON part from response
    const cleanedResponse = data.candidates[0].content.parts[0].text.replace(/```json|```/g, "").trim();

    // Parse the JSON string into a JavaScript object
    console.log(JSON.parse(cleanedResponse));
    return JSON.parse(cleanedResponse);
  } catch (error) {
    console.error('Error generating stories:', error);

    // Default fallback stories with transliterations
    // return [
    //   {
    //     level: 1,
    //     title: "At the Café",
    //     content: "Marie walks into a café. She says 'Bonjour!' (Hello!) to the waiter. She orders 'un café' (a coffee) and says 'Merci!' (Thank you). When leaving, she says 'Au revoir!' (Goodbye).",
    //     words: [
    //       { french: 'Bonjour', english: 'Hello', transliteration: 'bohn-zhoor' },
    //       { french: 'Merci', english: 'Thank you', transliteration: 'mehr-see' },
    //       { french: 'Au revoir', english: 'Goodbye', transliteration: 'oh ruh-vwah' },
    //     ],
    //   },
    //   // Additional fallback stories as needed
    // ];
    return []
  }
};

const StoryModal = ({ level, onClose }: StoryModalProps) => {
  const [story, setStory] = useState<Story | null>(null);

  useEffect(() => {
    const fetchStories = async () => {
      const stories = await generateStories();
      const levelStory = stories.find(story => story.level === level);
      setStory(levelStory || null);
    };

    fetchStories();
  }, [level]);

  if (!story) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
    >
      <div className="bg-[#3a3a3a] p-8 rounded-lg max-w-2xl w-full pixel-border">
        <h2 className="text-2xl mb-4 text-[#ffd700]">Level {level}: {story.title}</h2>
        <p className="mb-6 leading-relaxed">{story.content}</p>
        
        <div className="mb-6">
          <h3 className="text-xl mb-2 text-[#ffd700]">New Words:</h3>
          <div className="grid grid-cols-3 gap-4">
            {story.words.map((word, index) => (
              <div key={index} className="bg-[#2b2b2b] p-3 rounded">
                <span className="text-[#ffd700]">{word.french}</span>
                {' → '}
                <span>{word.english}</span>
                {' ('}
                <span className="text-gray-400 italic">{word.transliteration}</span>
                {')'}
              </div>
            ))}
          </div>
        </div>

        <button 
          className="retro-button w-full"
          onClick={onClose}
        >
          Play Game
        </button>
      </div>
    </motion.div>
  );
};

export default StoryModal;

import { motion } from 'framer-motion';

interface StoryModalProps {
  level: number;
  onClose: () => void;
}

const stories = [
  {
    level: 1,
    title: "At the Café",
    content: "Marie walks into a café. She says 'Bonjour!' (Hello!) to the waiter. She orders 'un café' (a coffee) and says 'Merci!' (Thank you). When leaving, she says 'Au revoir!' (Goodbye).",
    words: [
      { french: 'Bonjour', english: 'Hello' },
      { french: 'Merci', english: 'Thank you' },
      { french: 'Au revoir', english: 'Goodbye' }
    ]
  },
  {
    level: 2,
    title: "At the Market",
    content: "Jean visits the market to buy some vegetables. He greets the vendor with 'Salut!' (Hi!). He asks for 'des pommes' (some apples) and 'des carottes' (some carrots). After paying, he says 'À bientôt!' (See you soon!).",
    words: [
      { french: 'Salut', english: 'Hi' },
      { french: 'des pommes', english: 'some apples' },
      { french: 'des carottes', english: 'some carrots' },
      { french: 'À bientôt', english: 'See you soon' }
    ]
  },
  {
    level: 3,
    title: "In the Park",
    content: "Sophie and Paul go for a walk in the park. Sophie points to a dog and says, 'Regarde le chien!' (Look at the dog!). They sit on a bench and enjoy the 'jardin' (garden). They talk about their plans for the 'weekend' (weekend).",
    words: [
      { french: 'Regarde', english: 'Look' },
      { french: 'le chien', english: 'the dog' },
      { french: 'jardin', english: 'garden' },
      { french: 'weekend', english: 'weekend' }
    ]
  }
];


const StoryModal = ({ level, onClose }: StoryModalProps) => {
  const story = stories[level - 1];
  console.log(story)

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
          <div className="grid grid-cols-2 gap-4">
            {story.words.map((word, index) => (
              <div key={index} className="bg-[#2b2b2b] p-3 rounded">
                <span className="text-[#ffd700]">{word.french}</span>
                {' → '}
                <span>{word.english}</span>
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
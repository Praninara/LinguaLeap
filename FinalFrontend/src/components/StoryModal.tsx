import { motion } from 'framer-motion';

interface Word {
  french: string;
  english: string;
}

interface Story {
  level: number;
  title: string;
  content: string;
  words: Word[];
}

interface StoryModalProps {
  level: number;
  story: Story;
  onClose: () => void;
}

export function StoryModal({ level, story, onClose }: StoryModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
    >
      <div className="bg-[#3a3a3a] p-8 rounded-lg max-w-2xl w-full pixel-border">
        <h2 className="text-2xl mb-4 text-[#ffd700]">Level {level}: {story.title}</h2>
        <p className="mb-6 leading-relaxed text-white">{story.content}</p>
        
        <div className="mb-6">
          <h3 className="text-xl mb-2 text-[#ffd700]">Words to Remember:</h3>
          <div className="grid grid-cols-2 gap-4">
            {story.words.map((word, index) => (
              <div key={index} className="bg-[#2b2b2b] p-3 rounded">
                <span className="text-[#ffd700]">{word.french}</span>
                {' → '}
                <span className="text-white">{word.english}</span>
              </div>
            ))}
          </div>
        </div>

        <button 
          className="retro-button w-full"
          onClick={onClose}
        >
          Start Game
        </button>
      </div>
    </motion.div>
  );
}
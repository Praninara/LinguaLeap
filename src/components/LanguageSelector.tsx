import React from 'react';
import { motion } from 'framer-motion';
import { Globe2 } from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../data/languages';
import type { Language } from '../types';

interface LanguageSelectorProps {
  onSelect: (language: Language) => void;
  onBack: () => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onSelect, onBack }) => {
  return (
    <div className="min-h-screen bg-[#2b2b2b] p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-pixel text-[#ffd700] flex items-center gap-2">
            <Globe2 className="w-8 h-8" />
            Choose Language
          </h1>
          <button
            onClick={onBack}
            className="px-4 py-2 bg-[#3a3a3a] text-white rounded-lg font-pixel hover:bg-[#4a4a4a] transition-colors"
          >
            Back
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SUPPORTED_LANGUAGES.map((lang) => (
            <motion.div
              key={lang.code}
              whileHover={{ scale: 1.02 }}
              className="bg-[#3a3a3a] p-6 rounded-lg pixel-border cursor-pointer"
              onClick={() => onSelect(lang.code)}
            >
              <h2 className="text-xl font-pixel text-white mb-2">{lang.name}</h2>
              <p className="text-[#ffd700] font-pixel">{lang.nativeName}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;
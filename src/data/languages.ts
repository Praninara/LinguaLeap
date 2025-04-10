import { LanguageOption } from '../types';

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'french', name: 'French', nativeName: 'Français' },
  { code: 'spanish', name: 'Spanish', nativeName: 'Español' },
  { code: 'hindi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'telugu', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'kannada', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'marathi', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'tamil', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'japanese', name: 'Japanese', nativeName: '日本語' }
];

export const getLanguagePrompt = (language: string, count: number = 10): string => {
  const prompts: Record<string, string> = {
    french: `Generate ${count} French word pairs for language learning. Format as JSON array:
[
  {
    "word": "<French word>",
    "translation": "<English translation>",
    "alternativeTranslations": ["<alternative1>", "<alternative2>"]
  }
]

For words with accents, include non-accented alternatives in alternativeTranslations.
Example: { "word": "école", "translation": "school", "alternativeTranslations": ["ecole"] }`,

    spanish: `Generate ${count} Spanish word pairs for language learning. Format as JSON array:
[
  {
    "word": "<Spanish word>",
    "translation": "<English translation>",
    "alternativeTranslations": ["<alternative1>", "<alternative2>"]
  }
]

For words with accents, include non-accented alternatives in alternativeTranslations.
Example: { "word": "niño", "translation": "boy", "alternativeTranslations": ["nino"] }`,

    hindi: `Generate ${count} Hindi word pairs for language learning. Format as JSON array:
[
  {
    "word": "<Hindi word in Devanagari script>",
    "translation": "<English translation>",
    "alternativeTranslations": ["<romanized Hindi>", "<alternative translation>"]
  }
]

Include romanized versions in alternativeTranslations.
Example: { "word": "नमस्ते", "translation": "hello", "alternativeTranslations": ["namaste"] }`,

    telugu: `Generate ${count} Telugu word pairs for language learning. Format as JSON array:
[
  {
    "word": "<Telugu word in Telugu script>",
    "translation": "<English translation>",
    "alternativeTranslations": ["<romanized Telugu>", "<alternative translation>"]
  }
]

Include romanized versions in alternativeTranslations.
Example: { "word": "నమస్కారం", "translation": "hello", "alternativeTranslations": ["namaskaram"] }`,

    kannada: `Generate ${count} Kannada word pairs for language learning. Format as JSON array:
[
  {
    "word": "<Kannada word in Kannada script>",
    "translation": "<English translation>",
    "alternativeTranslations": ["<romanized Kannada>", "<alternative translation>"]
  }
]

Include romanized versions in alternativeTranslations.
Example: { "word": "ನಮಸ್ಕಾರ", "translation": "hello", "alternativeTranslations": ["namaskara"] }`,

    marathi: `Generate ${count} Marathi word pairs for language learning. Format as JSON array:
[
  {
    "word": "<Marathi word in Devanagari script>",
    "translation": "<English translation>",
    "alternativeTranslations": ["<romanized Marathi>", "<alternative translation>"]
  }
]

Include romanized versions in alternativeTranslations.
Example: { "word": "नमस्कार", "translation": "hello", "alternativeTranslations": ["namaskar"] }`,

    tamil: `Generate ${count} Tamil word pairs for language learning. Format as JSON array:
[
  {
    "word": "<Tamil word in Tamil script>",
    "translation": "<English translation>",
    "alternativeTranslations": ["<romanized Tamil>", "<alternative translation>"]
  }
]

Include romanized versions in alternativeTranslations.
Example: { "word": "வணக்கம்", "translation": "hello", "alternativeTranslations": ["vanakkam"] }`,

    japanese: `Generate ${count} Japanese word pairs for language learning. Format as JSON array:
[
  {
    "word": "<Japanese word in Kanji/Hiragana/Katakana>",
    "translation": "<English translation>",
    "alternativeTranslations": ["<romanized Japanese>", "<alternative translation>"]
  }
]

Include romanized (romaji) versions in alternativeTranslations.
Example: { "word": "こんにちは", "translation": "hello", "alternativeTranslations": ["konnichiwa"] }`
  };

  return prompts[language] || prompts.english;
};
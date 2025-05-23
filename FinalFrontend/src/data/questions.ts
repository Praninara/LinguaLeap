import { Question, LeaderboardEntry } from '../types';

export const questions: Question[] = [
  {
    id: 1,
    text: "What is 'Hello' in Spanish?",
    options: ["Hola", "Bonjour", "Ciao", "Hallo"],
    correctAnswer: "Hola",
    level: 1
  },
  {
    id: 2,
    text: "How do you say 'Thank you' in Spanish?",
    options: ["Grazie", "Merci", "Gracias", "Danke"],
    correctAnswer: "Gracias",
    level: 1
  },
  {
    id: 3,
    text: "What is 'Goodbye' in Spanish?",
    options: ["Au revoir", "Adiós", "Arrivederci", "Auf Wiedersehen"],
    correctAnswer: "Adiós",
    level: 1
  },
  {
    id: 4,
    text: "How do you say 'Good morning' in Spanish?",
    options: ["Buenos días", "Bon matin", "Buona mattina", "Guten Morgen"],
    correctAnswer: "Buenos días",
    level: 1
  },
  {
    id: 5,
    text: "What is 'Please' in Spanish?",
    options: ["S'il vous plaît", "Por favor", "Per favore", "Bitte"],
    correctAnswer: "Por favor",
    level: 1
  },
  {
    id: 6,
    text: "How do you say 'Good night' in Spanish?",
    options: ["Bonne nuit", "Buenas noches", "Buona notte", "Gute Nacht"],
    correctAnswer: "Buenas noches",
    level: 1
  },
  {
    id: 7,
    text: "What is 'Yes' in Spanish?",
    options: ["Oui", "Sí", "Si", "Ja"],
    correctAnswer: "Sí",
    level: 1
  },
  {
    id: 8,
    text: "How do you say 'No' in Spanish?",
    options: ["Non", "No", "No (Italian)", "Nein"],
    correctAnswer: "No",
    level: 1
  },
  {
    id: 9,
    text: "What is 'Water' in Spanish?",
    options: ["Eau", "Agua", "Acqua", "Wasser"],
    correctAnswer: "Agua",
    level: 1
  },
  {
    id: 10,
    text: "How do you say 'Friend' in Spanish?",
    options: ["Ami", "Amigo", "Amico", "Freund"],
    correctAnswer: "Amigo",
    level: 1
  },
  {
    id: 11,
    text: "What is 'Food' in Spanish?",
    options: ["Nourriture", "Comida", "Cibo", "Essen"],
    correctAnswer: "Comida",
    level: 2
  },
  {
    id: 12,
    text: "How do you say 'Family' in Spanish?",
    options: ["Famille", "Familia", "Famiglia", "Familie"],
    correctAnswer: "Familia",
    level: 2
  },
  {
    id: 13,
    text: "What is 'House' in Spanish?",
    options: ["Maison", "Casa", "Casa (Italian)", "Haus"],
    correctAnswer: "Casa",
    level: 2
  },
  {
    id: 14,
    text: "How do you say 'Book' in Spanish?",
    options: ["Livre", "Libro", "Libro (Italian)", "Buch"],
    correctAnswer: "Libro",
    level: 2
  },
  {
    id: 15,
    text: "What is 'Time' in Spanish?",
    options: ["Temps", "Tiempo", "Tempo", "Zeit"],
    correctAnswer: "Tiempo",
    level: 2
  }
];

export const mockLeaderboard: LeaderboardEntry[] = [
  { name: "Language Master", score: 1200, level: 5 },
  { name: "Word Wizard", score: 1000, level: 4 },
  { name: "Grammar Pro", score: 800, level: 3 },
  { name: "Vocab King", score: 600, level: 2 },
  { name: "Learning Hero", score: 400, level: 1 }
];
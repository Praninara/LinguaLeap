import express from 'express';
import { generateQuestions, generateStories } from '../services/gameService.js';

const router = express.Router();

router.get('/questions/:level', async (req, res) => {
  try {
    const level = parseInt(req.params.level);
    const questions = await generateQuestions(level);
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Error generating questions' });
  }
});

router.get('/stories/:level', async (req, res) => {
  try {
    const level = parseInt(req.params.level);
    const stories = await generateStories(level);
    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: 'Error generating stories' });
  }
});

export default router;
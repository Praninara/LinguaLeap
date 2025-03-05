# MemoryGame Component Documentation

## Purpose
The MemoryGame component implements a card-matching game for learning French vocabulary.

## Features
- Card flipping animation
- Score tracking
- Level progression
- Story-based learning
- XP rewards
- Progress persistence

## States
```typescript
interface GameState {
  cards: Card[];
  selectedCards: Card[];
  score: number;
  level: number;
  timer: number;
}
```

## Use Cases
1. Vocabulary memorization
2. Pattern recognition
3. Time management
4. Progressive learning
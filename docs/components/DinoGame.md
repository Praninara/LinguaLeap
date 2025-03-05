# DinoGame Component Documentation

## Purpose
The DinoGame component implements a runner-style game where players answer Spanish language questions to make the dinosaur jump over obstacles.

## Features
- Animated dinosaur character
- Obstacle generation
- Collision detection
- Score tracking
- Lives system
- Progressive difficulty

## Props
```typescript
interface DinoGameProps {
  isJumping: boolean;
  questionIndex: number;
  lives: number;
  onCollision: () => void;
}
```

## Use Cases
1. Language learning through gameplay
2. Quick reflexes training
3. Vocabulary practice
4. Score-based progression
# MultiplayerGame Component Documentation

## Purpose
The MultiplayerGame component enables real-time multiplayer word guessing games between players.

## Features
- Real-time gameplay
- Matchmaking system
- Private rooms
- Chat functionality
- Score tracking
- Language selection
- Global leaderboard

## States
```typescript
interface GameState {
  gameMode: 'matchmaking' | 'private' | null;
  language: 'french' | 'spanish' | null;
  roomId: string;
  players: Player[];
  scores: Record<string, number>;
}
```

## Use Cases
1. Competitive language learning
2. Social interaction
3. Real-time word practice
4. Global competition
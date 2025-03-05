# LinguaLeap - Interactive Language Learning Platform

A gamified language learning platform featuring multiple interactive games and real-time multiplayer challenges to help users learn new languages in a fun and engaging way.

## 🎮 Features

### Games
- **Memory Match Game**
  - Learn French vocabulary through card matching
  - Progressive difficulty levels
  - Story-based learning with context
  - Real-time scoring system

- **DinoLingo Runner Game**
  - Learn Spanish through an interactive runner game
  - Jump obstacles by answering questions correctly
  - Progressive difficulty system
  - Real-time scoring and lives system

- **Multiplayer Word Battle**
  - Real-time multiplayer word guessing
  - Support for both French and Spanish
  - Private rooms for playing with friends
  - Auto-matchmaking system
  - Global leaderboard

### Core Features
- 🏆 Achievement System
- 📊 Progress Tracking
- 🌟 XP-based Leveling System
- 👥 User Authentication
- 📱 Responsive Design
- 🏆 Global Leaderboards
- 🤝 Multiplayer Support
- 💾 Progress Persistence

## 🛠 Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Framer Motion for animations
- Zustand for state management
- React Router for navigation
- Socket.IO Client for real-time features
- React Hot Toast for notifications

### Backend
- Node.js with Express
- MongoDB with Mongoose
- Socket.IO for real-time communication
- JWT for authentication
- Redis for caching (with fallback)
- Cookie-based sessions
- Google's Generative AI for content generation

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB instance
- Redis (optional)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/lingualeap.git
cd lingualeap
```

2. Install backend dependencies:
```bash
npm install
```

3. Install frontend dependencies:
```bash
cd frontend
npm install
```

4. Create a .env file in the root directory:
```env
PORT=5001
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
REDIS_HOST=localhost
REDIS_PORT=6379
GEMINI_API_KEY=your_gemini_api_key
```

### Development

1. Start the backend server:
```bash
npm run dev
```

2. In a new terminal, start the frontend development server:
```bash
cd frontend
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Start the production server:
```bash
npm start
```

## 📁 Project Structure

```
├── backend/
│   ├── controllers/      # Request handlers
│   ├── middleware/       # Custom middleware
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   └── server.js        # Server entry point
├── frontend/
│   ├── public/          # Static assets
│   └── src/
│       ├── components/  # React components
│       ├── screens/     # Page components
│       ├── stores/      # State management
│       ├── services/    # API services
│       ├── types/       # TypeScript types
│       └── css/         # Stylesheets
├── docs/                # Documentation
└── README.md
```

## 🎯 Features in Detail

### Authentication System
- Email and password-based authentication
- JWT token-based session management
- Secure cookie storage
- Protected routes

### Memory Match Game
- Progressive difficulty levels
- Story-based learning context
- Real-time scoring
- Level progression system
- XP rewards

### DinoLingo Runner
- Dynamic obstacle generation
- Question-based gameplay
- Lives system
- Score multipliers
- Level progression

### Multiplayer System
- Real-time word guessing
- Private room creation
- Auto-matchmaking
- Player synchronization
- Global leaderboard
- Session persistence

### Progress System
- XP-based progression
- Global ranking system
- Achievement tracking
- Performance statistics
- Progress persistence

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.
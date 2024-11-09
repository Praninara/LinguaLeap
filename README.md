# LinguaLeap

A gamified language learning platform featuring memory games and interactive challenges to help users learn new languages in a fun and engaging way.

## Features

- 🎮 Interactive Language Games
  - Memory Match Game
  - DinoLingo Runner Game
- 🏆 Achievement System
- 📊 Progress Tracking
- 🔄 Daily Challenges
- 👥 User Authentication
- 📱 Responsive Design

## Tech Stack

### Frontend
- React with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Framer Motion for animations
- Zustand for state management
- React Router for navigation

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- Cookie-based sessions

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB instance
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/language-learning-platform.git
cd language-learning-platform
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
```
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
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

## Project Structure

```
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── screens/
│       ├── stores/
│       └── services/
├── package.json
└── README.md
```

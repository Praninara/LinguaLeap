import React, { useEffect, useState, useRef } from 'react';

interface DinoGameProps {
  isJumping: boolean;
  questionIndex: number;
  lives: number;
  onCollision: () => void;
}

const DinoGame: React.FC<DinoGameProps> = ({ isJumping, questionIndex, lives, onCollision }) => {
  const [isRunning, setIsRunning] = useState(true);
  const [legPosition, setLegPosition] = useState(0);
  const [dinoPosition, setDinoPosition] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(0);
  const animationFrameRef = useRef<number>();
  const lastTimestampRef = useRef<number>();
  const checkpointDistance = 200;
  const movementSpeed = 50; // pixels per second

  useEffect(() => {
    const runningInterval = setInterval(() => {
      setLegPosition(prev => (prev + 1) % 2);
    }, 200);

    return () => clearInterval(runningInterval);
  }, []);

  useEffect(() => {
    // Reset position when question changes
    setCurrentPosition(questionIndex * checkpointDistance);
    setDinoPosition(questionIndex * checkpointDistance);
  }, [questionIndex]);

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!lastTimestampRef.current) {
        lastTimestampRef.current = timestamp;
      }

      const deltaTime = (timestamp - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = timestamp;

      if (!isJumping) {
        const nextPosition = currentPosition + movementSpeed * deltaTime;
        const nextCheckpoint = (questionIndex + 1) * checkpointDistance;

        if (nextPosition < nextCheckpoint) {
          setCurrentPosition(nextPosition);
          setDinoPosition(nextPosition);
        } else if (currentPosition < nextCheckpoint) {
          // Collision with obstacle
          onCollision();
          setCurrentPosition(questionIndex * checkpointDistance);
          setDinoPosition(questionIndex * checkpointDistance);
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    if (isRunning) {
      animationFrameRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isRunning, isJumping, questionIndex, currentPosition, onCollision]);

  return (
    <div className="h-48 bg-gray-100 rounded-lg relative overflow-hidden">
      {/* Background with parallax effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-200 to-blue-100">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute bottom-20 opacity-20"
            style={{
              animation: `moveCloud ${8 + i * 2}s linear infinite`,
              left: `${i * 30}%`,
              transform: `scale(${0.5 + i * 0.3})`
            }}
          >
            <div className="w-24 h-8 bg-white rounded-full" />
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute top-4 left-4 right-4 h-2 bg-gray-200 rounded-full">
        <div 
          className="h-full bg-blue-500 rounded-full transition-all duration-300"
          style={{
            width: `${(currentPosition / (checkpointDistance * 5)) * 100}%`
          }}
        />
      </div>

      {/* Checkpoints */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute bottom-2 w-4 h-4 bg-yellow-400 rounded-full"
          style={{
            left: `${i * checkpointDistance}px`,
            opacity: i <= questionIndex ? 1 : 0.3
          }}
        />
      ))}

      {/* Dinosaur */}
      <div 
        className={`absolute bottom-0 transition-transform duration-500 ${
          isJumping ? '-translate-y-32' : 'translate-y-0'
        }`}
        style={{
          left: `${20 + dinoPosition}px`,
          transition: isJumping ? 'transform 0.5s ease-out' : 'none'
        }}
      >
        <div className="w-16 h-16 bg-green-600 rounded-lg relative">
          {/* Dino eyes */}
          <div className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full"></div>
          <div className="absolute top-2 right-5 w-1 h-2 bg-white rounded-full"></div>
          
          {/* Dino spikes */}
          <div className="absolute top-0 left-0 right-0 flex justify-center space-x-1">
            <div className="w-2 h-3 bg-green-700 rounded-t-lg"></div>
            <div className="w-2 h-4 bg-green-700 rounded-t-lg"></div>
            <div className="w-2 h-3 bg-green-700 rounded-t-lg"></div>
          </div>

          {/* Dino legs */}
          <div className="absolute -bottom-4 left-2 right-2 flex justify-between">
            <div 
              className={`w-3 h-6 bg-green-700 rounded-b-lg transform origin-top transition-transform ${
                isRunning && legPosition === 0 ? 'rotate-45' : ''
              }`}
            ></div>
            <div 
              className={`w-3 h-6 bg-green-700 rounded-b-lg transform origin-top transition-transform ${
                isRunning && legPosition === 1 ? '-rotate-45' : ''
              }`}
            ></div>
          </div>

          {/* Dino tail */}
          <div className="absolute left-0 top-1/2 transform -translate-x-4 -translate-y-1/2">
            <div className="w-4 h-8 bg-green-600 rounded-l-lg"></div>
          </div>

          {/* Dino arm */}
          <div className={`absolute right-2 top-1/2 w-3 h-4 bg-green-700 rounded-lg transform origin-top ${
            legPosition === 1 ? 'rotate-12' : '-rotate-12'
          }`}></div>
        </div>
      </div>
      
      {/* Obstacles at checkpoints */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute bottom-0"
          style={{
            left: `${(i + 1) * checkpointDistance}px`,
            opacity: i === questionIndex ? 1 : 0.3
          }}
        >
          <div className="w-8 h-16 bg-red-500 rounded-lg relative">
            <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
              <div className="w-2 h-8 bg-red-600 rounded-full transform rotate-45"></div>
              <div className="w-2 h-8 bg-red-600 rounded-full transform -rotate-45"></div>
            </div>
          </div>
        </div>
      ))}

      {/* Ground */}
      <div className="absolute bottom-0 w-full">
        <div className="h-2 bg-gray-300">
          <div className="absolute inset-0 flex items-center">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="w-1 h-1 bg-gray-400 rounded-full mx-4"
              ></div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes moveCloud {
          from {
            transform: translateX(100vw);
          }
          to {
            transform: translateX(-100vw);
          }
        }
      `}</style>
    </div>
  );
};

export default DinoGame;
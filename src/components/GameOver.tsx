import React from 'react';
import { Trophy } from 'lucide-react';

interface GameOverProps {
  scores: Record<string, number>;
  onNewGame: () => void;
}

export default function GameOver({ scores, onNewGame }: GameOverProps) {
  const sortedPlayers = Object.entries(scores).sort(([, a], [, b]) => b - a);
  const winner = sortedPlayers[0];

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg text-center">
      <div className="flex justify-center mb-6">
        <Trophy className="w-12 h-12 text-yellow-500" />
      </div>
      
      <h2 className="text-2xl font-bold mb-6">Game Over!</h2>
      
      <div className="mb-8">
        <p className="text-xl mb-4">
          Winner: <span className="font-bold text-blue-600">{winner[0]}</span>
          <br />
          Score: {winner[1]}
        </p>
        
        <div className="space-y-2">
          {sortedPlayers.slice(1).map(([player, score]) => (
            <p key={player}>
              {player}: {score}
            </p>
          ))}
        </div>
      </div>
      
      <button
        onClick={onNewGame}
        className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Play Again
      </button>
    </div>
  );
}
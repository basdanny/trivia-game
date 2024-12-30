import React, { useState } from 'react';
import { Trophy } from 'lucide-react';
import { GameLength } from '../types/game';
import { Player, avatarOptions } from '../types/player';
import AvatarSelect from './AvatarSelect';

interface PlayerSetupProps {
  onStartGame: (players: Player[], questionsPerPlayer: GameLength) => void;
}

export default function PlayerSetup({ onStartGame }: PlayerSetupProps) {
  const [players, setPlayers] = useState<Player[]>([
    { name: '', avatar: avatarOptions[0] },
    { name: '', avatar: avatarOptions[1] }
  ]);
  const [questionsPerPlayer, setQuestionsPerPlayer] = useState<GameLength>(10);
  
  const handleAddPlayer = () => {
    setPlayers([...players, { 
      name: '', 
      avatar: avatarOptions[(players.length + Math.floor(Math.random() * 10)) % avatarOptions.length] 
    }]);
  };

  const handleRemovePlayer = (index: number) => {
    if (players.length > 2) {
      setPlayers(players.filter((_, i) => i !== index));
    }
  };

  const handlePlayerChange = (index: number, field: keyof Player, value: string) => {    
    const newPlayers = [...players];
    newPlayers[index] = { ...newPlayers[index], [field]: value };
    setPlayers(newPlayers);
  };

  const handleSubmit = (e: React.FormEvent) => {
    console.log('handleSubmit', players, e);
    e.preventDefault();
    if (players.every(p => p.name.trim()) && players.length >= 2) {
      onStartGame(players, questionsPerPlayer);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-center mb-6">
        <Trophy className="w-8 h-8 text-yellow-500 mr-2" />
        <h1 className="text-2xl font-bold text-gray-800">Trivia Game</h1>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Questions per player
          </label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setQuestionsPerPlayer(10)}
              className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                questionsPerPlayer === 10
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              10 Questions
            </button>
            <button
              type="button"
              onClick={() => setQuestionsPerPlayer(20)}
              className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                questionsPerPlayer === 20
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              20 Questions
            </button>
          </div>
        </div>

        {players.map((player, index) => (
          <div key={index} className="mb-6">
            <div className="flex items-center">
              <input
                type="text"
                value={player.name}
                onChange={(e) => handlePlayerChange(index, 'name', e.target.value)}
                placeholder={`Player ${index + 1} name`}
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {players.length > 2 && (
                <button
                  type="button"
                  onClick={() => handleRemovePlayer(index)}
                  className="ml-2 p-2 text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              )}
            </div>
            <AvatarSelect
              index={index}
              selectedAvatar={player.avatar}
              onSelect={(avatar) => handlePlayerChange(index, 'avatar', avatar)}
            />
          </div>
        ))}
        
        <div className="flex gap-4 mt-6">
          <button
            type="button"
            onClick={handleAddPlayer}
            className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Add Player
          </button>
          <button
            type="submit"
            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Start Game
          </button>
        </div>
      </form>
    </div>
  );
}
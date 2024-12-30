import React from 'react';
import { Player } from '../types/player';

interface PlayerCardProps {
  player: Player;
  score?: number;
  isActive?: boolean;
}

export default function PlayerCard({ player, score, isActive }: PlayerCardProps) {
  return (
    <div className={`flex items-center gap-3 px-4 py-2 rounded-lg ${
      isActive ? 'bg-blue-50 ring-2 ring-blue-500' : 'bg-gray-100'
    }`}>
      <img
        src={player.avatar}
        alt={`${player.name}'s avatar`}
        className="w-8 h-8 rounded-full object-cover"
      />
      <span className="font-medium">{player.name}</span>
      {score !== undefined && (
        <span className="ml-auto font-semibold">{score}</span>
      )}
    </div>
  );
}
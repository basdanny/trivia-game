import React, { useState } from 'react';
import PlayerSetup from './components/PlayerSetup';
import GameBoard from './components/GameBoard';
import GameOver from './components/GameOver';
import { GameState, GameLength } from './types/game';
import { Player } from './types/player';

function App() {
  const [gameState, setGameState] = useState<GameState>('setup');
  const [players, setPlayers] = useState<Player[]>([]);
  const [questionsPerPlayer, setQuestionsPerPlayer] = useState<GameLength>(10);
  const [finalScores, setFinalScores] = useState<Record<string, number>>({});

  const handleStartGame = (playerList: Player[], questions: GameLength) => {
    setPlayers(playerList);
    setQuestionsPerPlayer(questions);
    setGameState('playing');
  };

  const handleGameEnd = (scores: Record<string, number>) => {
    setFinalScores(scores);
    setGameState('gameOver');
  };

  const handleNewGame = () => {
    setGameState('setup');
    setPlayers([]);
    setFinalScores({});
  };

  const handleExitGame = () => {
    if (window.confirm('Are you sure you want to exit the game? All progress will be lost.')) {
      handleNewGame();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      {gameState === 'setup' && <PlayerSetup onStartGame={handleStartGame} />}
      {gameState === 'playing' && (
        <GameBoard 
          players={players}
          questionsPerPlayer={questionsPerPlayer}
          onGameEnd={handleGameEnd}
          onExit={handleExitGame}
        />
      )}
      {gameState === 'gameOver' && (
        <GameOver 
          scores={finalScores}
          onNewGame={handleNewGame}
        />
      )}
    </div>
  );
}

export default App;
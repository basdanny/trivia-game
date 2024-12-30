import React, { useState } from 'react';
import { categories, questions } from '../data/questions/index';
import { LogOut } from 'lucide-react';
import { Player } from '../types/player';
import PlayerCard from './PlayerCard';

interface GameBoardProps {
  players: Player[];
  questionsPerPlayer: number;
  onGameEnd: (scores: Record<string, number>) => void;
  onExit: () => void;
}

export default function GameBoard({ players, questionsPerPlayer, onGameEnd, onExit }: GameBoardProps) {
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>(
    Object.fromEntries(players.map(player => [player.name, 0]))
  );
  const [selectedQuestion, setSelectedQuestion] = useState<typeof questions[0] | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [usedQuestions, setUsedQuestions] = useState<Set<number>>(new Set());
  const [questionsAnswered, setQuestionsAnswered] = useState(0);

  const handleCategorySelect = (category: string) => {
    const availableQuestions = questions.filter(
      q => q.category === category && !usedQuestions.has(q.id)
    );
    if (availableQuestions.length > 0) {
      const randomQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
      setSelectedQuestion(randomQuestion);
      setShowAnswer(false);
    }
  };

  const handleAnswer = (correct: boolean) => {
    if (selectedQuestion) {
      setUsedQuestions(prev => new Set([...prev, selectedQuestion.id]));
      if (correct) {
        const newScores = { ...scores };
        newScores[players[currentPlayerIndex].name] += 1;
        setScores(newScores);
      }
      setSelectedQuestion(null);
      setShowAnswer(false);
      setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
      setQuestionsAnswered(prev => prev + 1);

      if (questionsAnswered + 1 >= players.length * questionsPerPlayer) {
        onGameEnd(scores);
      }
    }
  };

  const currentPlayer = players[currentPlayerIndex];
  const remainingQuestions = (players.length * questionsPerPlayer) - questionsAnswered;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Current Player: <PlayerCard player={currentPlayer} isActive />
          </h2>
          <p className="text-sm text-gray-600">
            Questions Remaining: {remainingQuestions}
          </p>
        </div>
        <button
          onClick={onExit}
          className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Exit Game
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        {players.map(player => (
          <PlayerCard
            key={player.name}
            player={player}
            score={scores[player.name]}
            isActive={player === currentPlayer}
          />
        ))}
      </div>

      {!selectedQuestion ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map(category => (
            <button
              key={category.name}
              onClick={() => handleCategorySelect(category.name)}
              className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow text-center"
            >
              {category.name} {category.icon} 
            </button>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">{selectedQuestion.question}</h3>
          
          {!showAnswer ? (
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowAnswer(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Show Answer
              </button>
            </div>
          ) : (
            <>
              <p className="text-center mb-4 font-bold">{selectedQuestion.answer}</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => handleAnswer(true)}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                  Correct
                </button>
                <button
                  onClick={() => handleAnswer(false)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Incorrect
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
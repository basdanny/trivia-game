import { Question } from './types';
import { randomQuestions } from './random';
import { scienceQuestions } from './science';
import { historyQuestions } from './history';
import { geographyQuestions } from './geography';
import { sportsQuestions } from './sports';
import { entertainmentQuestions } from './entertainment';
import { technologyQuestions } from './technology';
import { musicQuestions } from './music';
import { foodQuestions } from './food';
import { Utils } from '../../utils/utils';

export const questions: Question[] = [
  ...Utils.shuffleArray(randomQuestions),
  ...Utils.shuffleArray(scienceQuestions),
  ...Utils.shuffleArray(historyQuestions),
  ...Utils.shuffleArray(geographyQuestions),
  ...Utils.shuffleArray(sportsQuestions),
  ...Utils.shuffleArray(entertainmentQuestions),
  ...Utils.shuffleArray(technologyQuestions),
  ...Utils.shuffleArray(musicQuestions),
  ...Utils.shuffleArray(foodQuestions)
];

export const categories = [
  { name: "Random", icon: "🎲" },
  { name: "Science", icon: "🔬" },
  { name: "History", icon: "📖" },
  { name: "Geography", icon: "🌍" },
  { name: "Sports", icon: "⚽" },
  { name: "Entertainment", icon: "🎭" },
  { name: "Technology", icon: "💻" },
  { name: "Music", icon: "🎵" },
  { name: "Food & Drink", icon: "🍔" }
];

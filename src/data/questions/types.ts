export interface Question {
  id: number;
  category: string;
  question: string;
  answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
}
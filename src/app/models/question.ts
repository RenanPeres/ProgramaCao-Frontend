export interface Question {
    id: number;
    title: string;
    description: string;
    options: string[];
    correctAnswer: number; // Índice da resposta correta
    explanation: string;   // Dica educativa após a resposta
}
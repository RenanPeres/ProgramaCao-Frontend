export interface Question {
    id: number;
    title: string;
    description: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
    category: 'Condicionais' | 'Looping' | 'Variaveis'; // Adicionado
}
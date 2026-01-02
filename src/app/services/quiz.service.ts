import { Injectable } from '@angular/core';
import { Question } from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private questions: Question[] = [
    {
      id: 1,
      title: 'O que é um Loop?',
      description: 'Se eu quero que o robô ande 10 vezes, o que eu uso?',
      options: ['Um Loop', 'Um Martelo', 'Uma Variável'],
      correctAnswer: 0,
      explanation: 'Loops servem para repetir tarefas!',
      category: 'Looping'
    },
    {
      id: 2,
      title: 'Se... então...',
      description: 'Se estiver chovendo, eu pego o guarda-chuva. Isso é:',
      options: ['Loop', 'Condicional', 'Variável'],
      correctAnswer: 1,
      explanation: 'Condicionais ajudam o computador a tomar decisões!',
      category: 'Condicionais'
    }
    // Você pode adicionar mais mocks para 'Variaveis' aqui
  ];

  getQuestionsByCategory(category: string): Question[] {
    return this.questions.filter(q => q.category === category);
  }
}
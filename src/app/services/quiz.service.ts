import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private categories = [
    {
      id: 'Condicionais', name: 'Se... Então', icon: '⚖️', color: '#FF5722', description: 'Tome decisões!', completed: false,
      phases: [
        { id: 1, name: 'Fase 1: Introdução', completed: false },
        { id: 2, name: 'Fase 2: Desafio Real', completed: false }
      ]
    },
    {
      id: 'Looping', name: 'Repetições', icon: '🔁', color: '#4CAF50', description: 'Repita tarefas!', completed: false,
      phases: [{ id: 1, name: 'Fase Única', completed: false }]
    },
    {
      id: 'Variaveis', name: 'Caixinhas', icon: '📦', color: '#2196F3', description: 'Guarde dados!', completed: false,
      phases: [{ id: 1, name: 'Fase Única', completed: false }]
    }
  ];

  // Esse é o método que o seu componente está chamando
  getCategories() {
    return this.categories;
  }

  getQuestionsByCategory(catId: string) {
    return [
      {
        title: 'Desafio de Programação',
        description: `Vamos praticar ${catId}!`,
        options: ['Sim!', 'Claro!', 'Com certeza!'],
        correctAnswer: 0
      }
    ];
  }
}
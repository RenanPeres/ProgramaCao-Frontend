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
      explanation: 'Loops servem para repetir tarefas!'
    }
    // Adicione mais aqui...
  ];

  getQuestions() {
    return this.questions;
  }
}
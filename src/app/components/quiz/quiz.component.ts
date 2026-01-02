import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizService } from '../../services/quiz.service';
import { Question } from '../../models/question';
import { QuestionCardComponent } from '../question-card/question-card.component';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, QuestionCardComponent],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  questions: Question[] = [];
  currentIndex: number = 0;
  score: number = 0;
  quizFinalizado: boolean = false;

  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    this.questions = this.quizService.getQuestions();
  }

  // Recebe o índice da resposta vindo do componente filho (card)
  handleAnswer(selectedOptionIndex: number): void {
    const currentQuestion = this.questions[this.currentIndex];

    if (selectedOptionIndex === currentQuestion.correctAnswer) {
      this.score++;
      alert('Correto! Parabéns! 🌟');
    } else {
      alert(`Ops! A resposta certa era: ${currentQuestion.options[currentQuestion.correctAnswer]}`);
    }

    this.nextStep();
  }

  nextStep(): void {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
    } else {
      this.quizFinalizado = true;
    }
  }

  restartQuiz(): void {
    this.currentIndex = 0;
    this.score = 0;
    this.quizFinalizado = false;
  }
}
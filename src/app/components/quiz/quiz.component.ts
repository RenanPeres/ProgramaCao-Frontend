import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizService } from '../../services/quiz.service';
import { Question } from '../../models/question';
import { QuestionCardComponent } from '../question-card/question-card.component';

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  completed: boolean;
}

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
  viewMode: 'category' | 'game' = 'category';
  selectedCategory: string = '';

  categories: Category[] = [
    { id: 'Condicionais', name: 'Se... Então', icon: '⚖️', color: '#FF5722', description: 'Aprenda a tomar decisões!', completed: false },
    { id: 'Looping', name: 'Repetições', icon: '🔁', color: '#4CAF50', description: 'Faça o robô repetir tarefas!', completed: false },
    { id: 'Variaveis', name: 'Caixinhas', icon: '📦', color: '#2196F3', description: 'Guarde informações!', completed: false }
  ];

  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    const saved = localStorage.getItem('quiz_progress');
    if (saved) {
      const progress = JSON.parse(saved);
      this.categories.forEach(cat => {
        cat.completed = progress[cat.id] || false;
      });
    }
  }

  selectCategory(catId: string): void {
    this.selectedCategory = catId;
    this.questions = this.quizService.getQuestionsByCategory(catId);

    if (this.questions.length > 0) {
      this.viewMode = 'game';
      this.currentIndex = 0;
      this.score = 0;
      this.quizFinalizado = false;
    } else {
      alert('🚀 Essa missão está em preparo!');
    }
  }

  handleAnswer(index: number): void {
    if (index === this.questions[this.currentIndex].correctAnswer) {
      this.score++;
    }
    this.nextStep();
  }

  nextStep(): void {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
    } else {
      this.quizFinalizado = true;
      this.markAsCompleted(this.selectedCategory);
    }
  }

  markAsCompleted(catId: string): void {
    const cat = this.categories.find(c => c.id === catId);
    if (cat) {
      cat.completed = true;
      this.saveProgress();
    }
  }

  saveProgress(): void {
    const progress: any = {};
    this.categories.forEach(c => progress[c.id] = c.completed);
    localStorage.setItem('quiz_progress', JSON.stringify(progress));
  }

  backToCategories(): void {
    this.viewMode = 'category';
  }
}
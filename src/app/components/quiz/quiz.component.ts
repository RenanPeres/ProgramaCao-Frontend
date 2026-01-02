import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizService } from '../../services/quiz.service';
import { QuestionCardComponent } from '../question-card/question-card.component';
import { CategoryListComponent } from '../category-list/category-list.component';
import { PhaseListComponent } from '../phase-list/phase-list.component';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, QuestionCardComponent, CategoryListComponent, PhaseListComponent],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  viewMode: 'category' | 'phase' | 'game' = 'category';
  selectedCategory: any;
  selectedPhase: any;
  questions: any[] = [];
  currentIndex = 0;
  score = 0;
  quizFinalizado = false;

  // Inicializa com os dados do Service
  categories: any[] = [];

  constructor(private quizService: QuizService) { }

  ngOnInit() {
    this.categories = this.quizService.getCategories();
    this.loadProgress();
  }

  handleCategorySelect(cat: any) {
    this.selectedCategory = cat;
    this.viewMode = 'phase';
  }

  handlePhaseSelect(phase: any) {
    this.selectedPhase = phase;
    this.questions = this.quizService.getQuestionsByCategory(this.selectedCategory.id);
    this.viewMode = 'game';
    this.resetGame();
  }

  handleAnswer(index: number) {
    if (index === this.questions[this.currentIndex].correctAnswer) this.score++;
    this.nextStep();
  }

  nextStep() {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
    } else {
      this.quizFinalizado = true;
      this.markComplete();
    }
  }

  private markComplete() {
    this.selectedPhase.completed = true;
    this.selectedCategory.completed = this.selectedCategory.phases.every((p: any) => p.completed);
    this.saveProgress();
  }

  private resetGame() {
    this.currentIndex = 0;
    this.score = 0;
    this.quizFinalizado = false;
  }

  private saveProgress() {
    const progress: any = {};
    this.categories.forEach(cat => {
      progress[cat.id] = cat.phases.map((p: any) => p.completed);
    });
    localStorage.setItem('portal_kids_progress', JSON.stringify(progress));
  }

  private loadProgress() {
    const saved = localStorage.getItem('portal_kids_progress');
    if (saved) {
      const progress = JSON.parse(saved);
      this.categories.forEach(cat => {
        if (progress[cat.id]) {
          cat.phases.forEach((p: any, index: number) => {
            p.completed = progress[cat.id][index] || false;
          });
          cat.completed = cat.phases.every((p: any) => p.completed);
        }
      });
    }
  }

  backToCategories() { this.viewMode = 'category'; }
  backToPhases() { this.viewMode = 'phase'; }
}
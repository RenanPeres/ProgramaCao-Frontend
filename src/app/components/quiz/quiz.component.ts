import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizService } from '../../services/quiz.service';
import { Question } from '../../models/question';
import { QuestionCardComponent } from '../question-card/question-card.component';

// Interface interna para organizar as categorias na tela inicial
interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
}

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, QuestionCardComponent],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  // Dados do Quiz
  questions: Question[] = [];
  currentIndex: number = 0;
  score: number = 0;
  quizFinalizado: boolean = false;

  // Controle de Estado da Interface
  viewMode: 'category' | 'game' = 'category';
  selectedCategory: string = '';

  // Definição das Categorias Lúdicas
  categories: Category[] = [
    {
      id: 'Condicionais',
      name: 'Se... Então',
      icon: '⚖️',
      color: '#FF5722',
      description: 'Aprenda a tomar decisões!'
    },
    {
      id: 'Looping',
      name: 'Repetições',
      icon: '🔁',
      color: '#4CAF50',
      description: 'Faça o robô repetir tarefas!'
    },
    {
      id: 'Variaveis',
      name: 'Caixinhas',
      icon: '📦',
      color: '#2196F3',
      description: 'Guarde informações importantes!'
    }
  ];

  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    // Inicialização se necessário
  }

  /**
   * Inicia a aventura selecionada
   */
  selectCategory(catId: string): void {
    this.selectedCategory = catId;
    this.questions = this.quizService.getQuestionsByCategory(catId);

    if (this.questions.length > 0) {
      this.viewMode = 'game';
      this.currentIndex = 0;
      this.score = 0;
      this.quizFinalizado = false;
    } else {
      alert('🚀 Essa missão está sendo preparada pelos robôs! Tente Looping ou Condicionais.');
    }
  }

  /**
   * Processa a resposta vinda do QuestionCard
   */
  handleAnswer(index: number): void {
    const isCorrect = index === this.questions[this.currentIndex].correctAnswer;

    if (isCorrect) {
      this.score++;
      // Aqui você poderia disparar um som de "vitoria.mp3"
    }

    this.nextStep();
  }

  /**
   * Avança para a próxima pergunta ou finaliza o jogo
   */
  nextStep(): void {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
    } else {
      this.quizFinalizado = true;
    }
  }

  /**
   * Reseta o estado para voltar à tela de seleção
   */
  backToCategories(): void {
    this.viewMode = 'category';
    this.quizFinalizado = false;
    this.questions = [];
  }
}
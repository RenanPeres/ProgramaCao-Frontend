import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Question } from '../../models/question';

@Component({
  selector: 'app-question-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss']
})
export class QuestionCardComponent {
  @Input() question!: Question;
  @Output() answerSelected = new EventEmitter<number>();

  // Cores divertidas para cada opção
  private colors = ['#FF6B6B', '#4DABF7', '#51CF66', '#FCC419'];

  selectOption(index: number) {
    this.answerSelected.emit(index);
  }

  getLetter(index: number): string {
    return String.fromCharCode(65 + index); // A, B, C...
  }

  getOptionColor(index: number): string {
    return this.colors[index % this.colors.length];
  }
}
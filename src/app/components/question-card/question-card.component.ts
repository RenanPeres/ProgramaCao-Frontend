import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importante para o *ngFor e *ngIf
import { Question } from '../../models/question';

@Component({
  selector: 'app-question-card',
  standalone: true, // Indica que é o novo padrão
  imports: [CommonModule],
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss']
})
export class QuestionCardComponent {
  @Input() question!: Question;
  @Output() answerSelected = new EventEmitter<number>();

  selectOption(index: number) {
    this.answerSelected.emit(index);
  }
}
import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-back-button',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './back-button.component.html',
    styleUrls: ['./back-button.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class BackButtonComponent {
    @Input() label: string = 'Voltar';
    @Input() icon: string = '⬅';
    @Input() theme: 'primary' | 'secondary' = 'primary';
    @Output() onClick = new EventEmitter<void>();
}
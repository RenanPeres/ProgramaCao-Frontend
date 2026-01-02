import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackButtonComponent } from '../back-button/back-button.component';

@Component({
    selector: 'app-phase-list',
    standalone: true,
    imports: [
        CommonModule,
        BackButtonComponent
    ],
    templateUrl: './phase-list.component.html',
    styleUrls: ['./phase-list.component.scss']
})
export class PhaseListComponent {
    @Input() phases: any[] = [];
    @Input() categoryName: string = '';
    @Output() onSelectPhase = new EventEmitter<any>();
    @Output() onBack = new EventEmitter<void>();
}
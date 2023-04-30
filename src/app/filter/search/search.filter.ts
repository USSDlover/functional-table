import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'search-user',
  standalone: true,
  imports: [MatFormFieldModule, FormsModule, MatInputModule],
  template: `
    <mat-form-field class="search-input" appearance="fill">
      <mat-label>Search Users</mat-label>
      <input matInput [ngModel]="model" (ngModelChange)="modelChange.emit($event)" type="search" placeholder="First/Last Name">
    </mat-form-field>
  `,
  styles: [`
    .search-input {
      min-width: 15rem;
    }
  `]
})
export class SearchFilter {
  @Input() model: string = '';
  @Output() modelChange = new EventEmitter<string>();

  constructor() {
  }
}

import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectEyeColors } from '../../state/users.selectors';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AsyncPipe, NgForOf } from '@angular/common';
import { UserFilter } from '../../user-list/users.model';

@Component({
  selector: 'eye-color-filter',
  standalone: true,
  imports: [
    MatInputModule,
    MatSelectModule,
    NgForOf,
    AsyncPipe
  ],
  template: `
    <mat-form-field>
      <mat-label>Filter by Eye Color</mat-label>
      <mat-select (selectionChange)="onSelectionChange.emit($event.value)" multiple>
        <ng-container *ngFor="let eyeColor of (eyeColors$ | async)">
          <mat-option [value]="eyeColor">{{eyeColor}}</mat-option>
        </ng-container>
      </mat-select>
    </mat-form-field>
  `
})
export class EyeColorFilter {
  eyeColors$ = this.store.select(selectEyeColors);
  @Output() onSelectionChange = new EventEmitter<UserFilter['eyeColor']>();
  constructor(
    private store: Store
  ) {}
}

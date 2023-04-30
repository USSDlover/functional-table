import { Component, EventEmitter, Output } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { AgeFilter as AgeFilterType } from '../../user-list/users.model';
import { NgForOf, TitleCasePipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'age-filter',
  standalone: true,
  imports: [
    MatSelectModule,
    NgForOf,
    TitleCasePipe,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="filter-wrapper">
      <mat-form-field>
        <mat-label>How to compare?</mat-label>
        <mat-select [formControl]="operationControl">
          <mat-option [value]="null">None</mat-option>
          <ng-container *ngFor="let option of ageOptions">
            <mat-option [value]="option">{{option | titlecase}}</mat-option>
          </ng-container>
        </mat-select>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Age</mat-label>
        <input matInput placeholder="18" [formControl]="ageControl" />
      </mat-form-field>
      <button
        style="width: 100%; margin: .75rem 0;"
        color="primary"
        [disabled]="!(!!operationControl.getRawValue()) || !(!!ageControl.getRawValue())"
        mat-raised-button
        (click)="onApplyFilter()"
      >
        Apply Filter
      </button>
    </div>
  `
})
export class AgeFilter {
  ageOptions: Array<AgeFilterType['op']> = [
    'greater',
    'smaller',
    'equal'
  ];
  operationControl = new FormControl<AgeFilterType['op'] | null>(null);
  ageControl = new FormControl<number | null>(null);

  @Output() onFilterChange = new EventEmitter<AgeFilterType>();

  onApplyFilter(): void {
    this.onFilterChange
      .emit({
        op: this.operationControl.getRawValue()!,
        val: this.ageControl.getRawValue()!
      });
  }

  constructor() {
  }
}

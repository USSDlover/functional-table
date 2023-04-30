import { Component, EventEmitter, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { UserFilter } from '../../user-list/users.model';

@Component({
  selector: 'birth-date-filter',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatMomentDateModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  template: `
    <mat-form-field appearance="fill">
      <mat-label>Start from</mat-label>
      <input [formControl]="fromDateController" matInput [matDatepicker]="fromDatePicker">
      <mat-hint>MM/DD/YYYY</mat-hint>
      <mat-datepicker-toggle matIconSuffix [for]="fromDatePicker"></mat-datepicker-toggle>
      <mat-datepicker #fromDatePicker></mat-datepicker>
    </mat-form-field>

    <mat-form-field appearance="fill">
      <mat-label>Limit to</mat-label>
      <input [formControl]="toDateController" matInput [matDatepicker]="toDatePicker">
      <mat-hint>MM/DD/YYYY</mat-hint>
      <mat-datepicker-toggle matIconSuffix [for]="toDatePicker"></mat-datepicker-toggle>
      <mat-datepicker #toDatePicker></mat-datepicker>
    </mat-form-field>


    <button (click)="onSubmit()" mat-raised-button color="primary" [disabled]="!(!!fromDateController.getRawValue()) && !(!!toDateController.getRawValue())">
      Apply Filter
    </button>
  `
})
export class BirthDateFilter {
  fromDateController = new FormControl<Date | null>(null);
  toDateController = new FormControl<Date | null>(null);

  @Output() onApplyFilter = new EventEmitter<UserFilter['birthDate']>();

  onSubmit(): void {
    this.onApplyFilter.emit({
      from: this.fromDateController.getRawValue() ?? undefined,
      to: this.toDateController.getRawValue() ?? undefined
    })
  }
  constructor() {}
}

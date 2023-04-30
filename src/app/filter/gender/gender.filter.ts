import { Component, EventEmitter, Output } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { Genders } from '../../user-list/users.model';

@Component({
  selector: 'gender-filter',
  standalone: true,
  imports: [MatSelectModule],
  template: `
    <mat-form-field>
      <mat-label>Select Gender</mat-label>
      <mat-select (selectionChange)="onSelectionChange.emit($event.value)" multiple>
        <mat-option [value]="'female'">Female</mat-option>
        <mat-option [value]="'male'">Male</mat-option>
        <mat-option [value]="'other'">Other</mat-option>
      </mat-select>
    </mat-form-field>
  `
})
export class GenderFilter {
  @Output() onSelectionChange = new EventEmitter<Genders[]>()
  constructor() {
  }
}

import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SearchFilter } from './search/search.filter';
import { AsyncPipe, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { UsersApiActions } from '../state/users.action';
import { GenderFilter } from './gender/gender.filter';
import { Genders, UserFilter } from '../user-list/users.model';
import { AgeFilter } from './age/age.filter';
import { EyeColorFilter } from './eye-color/eye-color.filter';
import { BirthDateFilter } from './birth-date/birth-date.filter';

const Components = [
  SearchFilter
]

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    ...Components,
    AsyncPipe,
    NgIf,
    GenderFilter,
    AgeFilter,
    EyeColorFilter,
    BirthDateFilter,
  ],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  searchQueryModel = '';

  appliedFilter: UserFilter = {};

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store,
    ) {}

  onSearchQueryChange(query: string): void {
    this.store.dispatch(UsersApiActions.searchUser({ query }));
  }

  onGenderSelectionChange(genders: Genders[]): void {
    this.appliedFilter = {
      ...this.appliedFilter,
      gender: genders
    }
    this.store.dispatch(UsersApiActions.filterUser({ filter: this.appliedFilter }));
  }

  onAgeFilterApplied(filter: UserFilter['age']): void {
    this.appliedFilter = {
      ...this.appliedFilter,
      age: filter
    }
    this.store.dispatch(UsersApiActions.filterUser({ filter: this.appliedFilter }));
  }

  onEyeColorSelect(filter: UserFilter['eyeColor']): void {
    this.appliedFilter = {
      ...this.appliedFilter,
      eyeColor: filter
    }
    this.store.dispatch(UsersApiActions.filterUser({ filter: this.appliedFilter }));
  }

  onBirthdateFilterApplied(filter: UserFilter['birthDate']): void  {
    this.appliedFilter = {
      ...this.appliedFilter,
      birthDate: filter
    }
    this.store.dispatch(UsersApiActions.filterUser({ filter: this.appliedFilter }));
  }

}

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
    this.store.dispatch(UsersApiActions.filterUser({ filter: { ...this.appliedFilter, gender: genders } }))
  }

  onAgeFilterApplied(filter: UserFilter['age']): void {
    this.store.dispatch(UsersApiActions.filterUser({ filter: { ...this.appliedFilter, age: filter } }))
  }

  onEyeColorSelect(filter: UserFilter['eyeColor']): void {
    this.store.dispatch(UsersApiActions.filterUser({ filter: { ...this.appliedFilter, eyeColor: filter } }));
  }

}

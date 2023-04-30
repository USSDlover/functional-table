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
import { Genders } from '../user-list/users.model';

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

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store,
    ) {}

  onSearchQueryChange(query: string): void {
    this.store.dispatch(UsersApiActions.searchUser({ query }));
  }

  onGenderSelectionChange(genders: Genders[]): void {
    this.store.dispatch(UsersApiActions.filterUser({ filter: { gender: genders } }))
  }

}

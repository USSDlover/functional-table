import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersApiActions } from './users.action';
import { UsersService } from '../user-list/users.service';
import { exhaustMap } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UsersEffect {
  constructor(
    private actions$: Actions,
    private usersService: UsersService
  ) {}

  fetchUsers$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UsersApiActions.retrieveUserList),
        exhaustMap(() =>
          this.usersService.getUsers().pipe(
            map(users => UsersApiActions.retrievedUserList({ users }))
          )
        )
      )
  );

  searchUsers$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UsersApiActions.searchUser),
        exhaustMap(action =>
          this.usersService.searchUsers(action.query).pipe(
            map(users => UsersApiActions.retrievedUserList({ users }))
          )
        )
      )
  );

}

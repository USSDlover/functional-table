import { User, UserFilter } from '../user-list/users.model';
import { createReducer, on } from '@ngrx/store';
import { UsersApiActions } from './users.action';
import * as moment from 'moment';

export const initialState: ReadonlyArray<User> = [];

export const usersReducer = createReducer(
  initialState,
  on(UsersApiActions.retrievedUserList, (_state, { users }) => users),
  on(UsersApiActions.filterUser, (_state, { filter }) => {
    let filteredUsers: User[] = _state.slice();

    if (filter.gender)
      filteredUsers = helpers.filter.gender(filter.gender, filteredUsers.slice()).slice();

    if (filter.age)
      filteredUsers = helpers.filter.age(filter.age, filteredUsers.slice()).slice();

    if (filter.eyeColor)
      filteredUsers = helpers.filter.eyeColor(filter.eyeColor, filteredUsers.slice()).slice();

    if (filter.birthDate)
      filteredUsers = helpers.filter.birthDate(filter.birthDate, filteredUsers.slice()).slice();

    return filteredUsers;
  })
)

const helpers = {
  filter: {
    gender: (filter: UserFilter['gender'], users: User[]): User[] => {
      return users.filter(user => {
        if (filter!.indexOf(user.gender!) > -1) return user;
        return;
      });
    },
    age: (filter: UserFilter['age'], users: User[]): User[] => {
      return users.filter(user => {
        switch (filter?.op) {
          case 'equal':
            return user.age === filter.val;
          case 'smaller':
            return user.age <= filter.val;
          case 'greater':
            return user.age >= filter.val;
          default:
            return;
        }
      });
    },
    eyeColor: (filter: UserFilter['eyeColor'], users: User[]): User[] => {
      return users.filter(user => {
        if (filter?.indexOf(user.eyeColor)! > -1) {
          return user;
        }
        return;
      });
    },
    birthDate: (filter: UserFilter['birthDate'], users: User[]): User[] => {
      return users.filter(user => {
        const userBirthDate = moment(user.birthDate);

        if (userBirthDate.isSameOrAfter(filter?.from) && userBirthDate.isSameOrBefore(filter?.to))
          return user;

        return;
      });
    },
  }
}

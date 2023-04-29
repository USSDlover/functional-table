import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User, UserFilter } from '../user-list/users.model';

export const UsersApiActions = createActionGroup({
  source: 'Users API',
  events: {
    'Retrieve User List': emptyProps(),
    'Retrieved User List': props<{ users: ReadonlyArray<User> }>(),
    'Search User': props<{ query: string }>(),
    'Filter User': props<{ filter: UserFilter }>()
  }
})

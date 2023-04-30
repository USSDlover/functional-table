import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '../user-list/users.model';

// TODO: Introduce the filtered and not filtered collections
export const selectUsers = createFeatureSelector<ReadonlyArray<User>>('users');

// TODO: Introduce solution collect eye color on not filtered collection
export const selectEyeColors = createSelector(
  selectUsers,
  users => new Set(users.map(user => (user.eyeColor)))
);

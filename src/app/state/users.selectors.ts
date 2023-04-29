import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '../user-list/users.model';

export const selectUsers = createFeatureSelector<ReadonlyArray<User>>('users');

export const selectEyeColors = createSelector(
  selectUsers,
  users => users.map(user => ({eyeColor: user.eyeColor}))
);

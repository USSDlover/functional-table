import { User } from './user-list/users.model';

export interface ApiResponse {
  users?: Array<User>;
  total: number;
  skip: number;
  limit: number;
}

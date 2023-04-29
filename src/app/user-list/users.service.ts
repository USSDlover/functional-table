import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './users.model';
import { ApiResponse } from '../api.models';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UsersService {
  resourceKeys = 'id,firstName,lastName,age,gender,email,phone,birthDate,eyeColor';
  resourceLimit = 0;
  resourceSkip = 0;

  genericQuery = `limit=${this.resourceLimit}&skip=${this.resourceSkip}&select=${this.resourceKeys}`;

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<Array<User>> {
    return this.http
      .get<ApiResponse>(`https://dummyjson.com/users/?${this.genericQuery}`)
      .pipe(map((response) => response.users || []));
  }

  searchUsers(query: string): Observable<Array<User>> {
    return this.http
      .get<ApiResponse>(`https://dummyjson.com/users/search?q=${query}&${this.genericQuery}`)
      .pipe(map((response) => response.users || []));
  }
}

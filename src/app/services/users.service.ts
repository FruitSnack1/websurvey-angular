import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  url: string = 'http://localhost:3001/api/users'
  constructor(private httpClient: HttpClient) {
  }

  getUsers() {
    return this.httpClient.get(this.url)
  }

  registerUser(user: User) {
    console.log(user);
    return this.httpClient.post(`${this.url}/register`, user);
  }

  loginUser(user: object) {
    console.log(user);
    return this.httpClient.post(`${this.url}/login`, user, { withCredentials: true });
  }
}

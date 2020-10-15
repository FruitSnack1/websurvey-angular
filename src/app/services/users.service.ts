import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user.model";
import { environment } from "./../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  url: string = `${environment.API_URL}/users`;
  constructor(private httpClient: HttpClient) {}

  getUsers() {
    return this.httpClient.get(this.url);
  }

  registerUser(user: User) {
    return this.httpClient.post(`${this.url}/register`, user);
  }

  loginUser(user: object) {
    return this.httpClient.post(`${this.url}/login`, user, {
      withCredentials: true,
    });
  }
}

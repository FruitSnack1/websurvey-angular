import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user.model";
import { environment } from "src/environments/environment";
import { CookieService } from "ngx-cookie-service";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  url: string = `${environment.API_URL}/api/users`;
  username$ = new BehaviorSubject<String>("");
  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) {}

  getUsername(): Observable<String> {
    return this.username$.asObservable();
  }

  setUsername(username: String) {
    this.username$.next(username);
  }

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

  loggedIn(): boolean {
    return this.cookieService.check("accessToken");
  }

  changeUsername(username: String) {
    this.setUsername(username);
    return this.httpClient.post(
      `${this.url}/changeusername`,
      { username },
      {
        withCredentials: true,
      }
    );
  }

  logout() {
    this.cookieService.delete("accessToken", "/");
  }
}

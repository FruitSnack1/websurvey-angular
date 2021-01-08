import { Injectable, Output } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user.model";
import { environment } from "src/environments/environment";
import { CookieService } from "ngx-cookie-service";
import { factor } from "@rxweb/reactive-form-validators";
import { EventEmitter } from "protractor";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  url: string = `${environment.API_URL}/users`;
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
    console.log(this.url);
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
    console.log("token", this.cookieService.check("accessToken"));
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
}

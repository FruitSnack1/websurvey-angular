import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user.model";
import { environment } from "./../../environments/environment";
import { CookieService } from "ngx-cookie-service";
import { factor } from "@rxweb/reactive-form-validators";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  url: string = `${environment.API_URL}/users`;
  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) {}

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
}

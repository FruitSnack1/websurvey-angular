import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "./../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class PlayService {
  url: string = `${environment.API_URL}/play`;
  constructor(private httpClient: HttpClient) {}

  getAneta(id: string) {
    return this.httpClient.get(`${this.url}/${id}`);
  }
}

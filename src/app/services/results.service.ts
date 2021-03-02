import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ResultsService {
  url: string = `${environment.API_URL}/api/results`;
  constructor(private httpClient: HttpClient) {}

  postResults(result: object) {
    return this.httpClient.post(`${this.url}`, result, {
      withCredentials: true,
    });
  }

  getResults(id: string) {
    return this.httpClient.get(`${this.url}/${id}`, { withCredentials: true });
  }

  deleteSurveyResults(id: string) {
    return this.httpClient.delete(`${this.url}/delete/${id}`, {
      withCredentials: true,
    });
  }
}

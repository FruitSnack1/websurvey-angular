import { Injectable } from "@angular/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AnketyService {
  url: string = `${environment.API_URL}/api/ankety`;

  constructor(private httpClient: HttpClient) {}

  getAnkety() {
    return this.httpClient.get(`${this.url}`, { withCredentials: true });
  }

  deleteAnketa(id: string) {
    return this.httpClient.delete(`${this.url}/${id}`, {
      withCredentials: true,
    });
  }

  createAnketa(anketa) {
    return this.httpClient.post(`${this.url}`, anketa, {
      withCredentials: true,
    });
  }

  getAnketa(id: string) {
    return this.httpClient.get(`${this.url}/${id}`, { withCredentials: true });
  }

  updateSurvey(id, anketa) {
    return this.httpClient.put(`${this.url}/${id}`, anketa, {
      withCredentials: true,
    });
  }

  enableSurvey(id, enabled) {
    return this.httpClient.put(
      `${this.url}/${id}/enabled`,
      { enabled },
      {
        withCredentials: true,
      }
    );
  }

  duplicateSurvey(id) {
    return this.httpClient.post(
      `${this.url}/duplicate/${id}`,
      {},
      { withCredentials: true }
    );
  }
}

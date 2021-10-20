import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogsService {
  url: string = `${environment.API_URL}/logs`;
  
  constructor(private httpClient: HttpClient) {}

  getLogs(){
    return this.httpClient.get(this.url);
  }
}

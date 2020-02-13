import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AnketyService {
  url: string = 'http://localhost:3001/api/ankety'

  constructor(private httpClient:HttpClient) { }

  getAnkety(){
    return this.httpClient.get(`${this.url}`, {withCredentials:true})
  }
}

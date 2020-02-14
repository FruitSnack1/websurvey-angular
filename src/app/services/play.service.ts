import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalVariables } from 'src/global';

@Injectable({
  providedIn: 'root'
})
export class PlayService {
  url: string = `${GlobalVariables.API_URL}/play`
  constructor(private httpClient: HttpClient) { }

  getAneta(id:string){
    return this.httpClient.get(`${this.url}/${id}`)
  }
}

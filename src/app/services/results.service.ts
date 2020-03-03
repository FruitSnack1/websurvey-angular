import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalVariables } from 'src/global';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {
  url: string = `${GlobalVariables.API_URL}/results`
  constructor(private httpClient: HttpClient) {}

  postResults(result: object){
    return this.httpClient.post(`${this.url}`, result)
  }

  getResults(id:string){
    return this.httpClient.get(`${this.url}/${id}`, {withCredentials:true})
  }
}

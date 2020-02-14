import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { GlobalVariables } from 'src/global';

@Injectable({
  providedIn: 'root'
})
export class AnketyService {
  url: string = `${GlobalVariables.API_URL}/ankety`

  constructor(private httpClient:HttpClient) { }

  getAnkety(){
    return this.httpClient.get(`${this.url}`, {withCredentials:true})
  }

}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  url:string = 'http://localhost:3001/api/users'
  constructor(private httpClient:HttpClient){

  }

  getUsers(){
    return this.httpClient.get(this.url)  
  }
}

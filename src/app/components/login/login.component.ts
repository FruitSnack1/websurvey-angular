import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService:UsersService) { }

  users : object

  ngOnInit() {
    this.userService.getUsers().subscribe(data =>{
      this.users = data
    })
  }

}

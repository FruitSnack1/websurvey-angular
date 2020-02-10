import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  model = new User('','','')
  
  constructor(private usersService: UsersService, private router:Router) { 
    
  }

  ngOnInit() {

  }

  registerUser() {
    this.usersService.registerUser(this.model).subscribe(data =>{
      if(data)
        this.router.navigateByUrl('/login');
    });
  }

}

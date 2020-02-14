import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  username: string

  constructor(public router:Router) { }

  ngOnInit() {
    this.username = history.state.username
    console.log(this.username);
    
  }

}

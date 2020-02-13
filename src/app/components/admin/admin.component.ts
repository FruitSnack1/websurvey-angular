import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  username: string

  constructor() { }

  ngOnInit() {
    this.username = history.state.username
    console.log(this.username);
    
  }

}

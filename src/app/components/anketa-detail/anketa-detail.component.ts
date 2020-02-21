import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-anketa-detail',
  templateUrl: './anketa-detail.component.html',
  styleUrls: ['./anketa-detail.component.css']
})
export class AnketaDetailComponent implements OnInit {

  constructor() { }

  ngOnInit(){
    console.log(history.state)
  }

}

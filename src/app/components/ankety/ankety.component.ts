import { Component, OnInit } from '@angular/core';
import { AnketyService } from 'src/app/services/ankety.service';

@Component({
  selector: 'app-ankety',
  templateUrl: './ankety.component.html',
  styleUrls: ['./ankety.component.css']
})
export class AnketyComponent implements OnInit {
  ankety:object
  constructor(private anketyService: AnketyService) { }

  ngOnInit() {
    this.anketyService.getAnkety().subscribe(data => {
      this.ankety = data
      console.log(this.ankety)
    })
  }
  
}

import { Component, OnInit } from '@angular/core';
import { AnketyService } from 'src/app/services/ankety.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ankety',
  templateUrl: './ankety.component.html',
  styleUrls: ['./ankety.component.css']
})
export class AnketyComponent implements OnInit {
  ankety:object
  constructor(private anketyService: AnketyService, private router:Router) { }

  ngOnInit() {
   this.getAnkety() 
  }

  playAnketa(id:string){
    this.router.navigateByUrl(`/play/${id}`)
  }

  deleteAnketa(id:string){
    this.anketyService.deleteAnketa(id).subscribe(data =>{
      this.getAnkety()
    })
  }

  getAnkety(){
    this.anketyService.getAnkety().subscribe(data => {
      this.ankety = data
    })
  }
}

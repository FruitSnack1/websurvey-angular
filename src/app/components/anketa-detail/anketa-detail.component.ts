import { Component, OnInit } from '@angular/core';
import { AnketyService } from 'src/app/services/ankety.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-anketa-detail',
  templateUrl: './anketa-detail.component.html',
  styleUrls: ['./anketa-detail.component.css']
})
export class AnketaDetailComponent implements OnInit {

  constructor(private anketyService:AnketyService, private route: ActivatedRoute) { }

  anketa
  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id')
    this.anketyService.getAnketa(id).subscribe(data=>{
      this.anketa =data
    })    
  }

}

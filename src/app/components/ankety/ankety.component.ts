import { Component, OnInit } from '@angular/core';
import { AnketyService } from 'src/app/services/ankety.service';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-ankety',
  templateUrl: './ankety.component.html',
  styleUrls: ['./ankety.component.css'],
  animations: [
    trigger('displayState',[
      state('show', style({
        opacity:1
      })),
      state('hide', style({
        opacity:0
      })),
      transition('show => hide', animate('600ms ease-out')),
      transition('hide => show', animate('600ms ease-out'))
    ])
  ]
})
export class AnketyComponent implements OnInit {
  
  ankety:object
  show: boolean = false
  anketaId: string
  deleteModal: boolean = false
  constructor(private anketyService: AnketyService, private router:Router) { }

  ngOnInit() {
   this.getAnkety() 
  }

  playAnketa(id:string){
    this.router.navigateByUrl(`/play/${id}`)
  }

  deleteAnketa(){
    this.anketyService.deleteAnketa(this.anketaId).subscribe(data =>{
      this.toggleDeleteModal()      
      this.getAnkety()
    })
  }

  setAnketa(id:string){
    this.anketaId = id
    this.toggleDeleteModal()
  }

  toggleDeleteModal(){
    this.deleteModal = !this.deleteModal
  }

  getAnkety(){
    this.anketyService.getAnkety().subscribe(data => {
      this.ankety = data
    })
  }

  showAnketaDetail(id){
    console.log(id)
    this.router.navigateByUrl(`/admin/detail/${id}`, { skipLocationChange: true })
  }

  get animationState(){
    return this.show ? 'show' : 'hide'
  }

  get isAdded(){
    console.log(this.router.url)
    return this.router.url == '/admin/ankety/new' ? true : false
  }

  animateElement(){
    this.show = !this.show
    console.log(this.show)
  }

  
}

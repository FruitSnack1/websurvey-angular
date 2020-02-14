import { Component, OnInit } from '@angular/core';
import { PlayService } from 'src/app/services/play.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {
  anketa
  stage: number = 0
  questionNumber: number = 0
  constructor(private playService: PlayService, private route:ActivatedRoute) { }

  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id')
    this.playService.getAneta(id).subscribe(data => {
      this.anketa = data
    })
  }

  nextStage(){
    this.stage++
    console.log(this.stage)
  }

  answer(answer:number = 1){
    if(this.questionNumber == this.anketa.questions.length-1)
      this.nextStage()
    else
      this.questionNumber++
  }

}

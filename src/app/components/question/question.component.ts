import { Component, OnInit, Input } from '@angular/core'
import {Chart} from 'chart.js'

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  constructor() { }
  @Input('question') question:string
  chart
  ngOnInit(){
    this.chart = new Chart('chart',{
      type: 'bar',
      data: {
        labels: ['1','5','2','5',','],
        datasets: [{
          data: [2,5,8,6,4],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 206, 86)',
            'rgb(75, 192, 192)',
            'rgb(153, 102, 255)'
          ]
        }]
      }
    })
    console.log(this.question)
  }

}

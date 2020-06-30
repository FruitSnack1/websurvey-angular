import { Component, OnInit, Input } from '@angular/core'
import { Chart } from 'chart.js'

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  @Input() name: string
  @Input() results

  constructor() { }
  chart
  ngOnInit() {
    this.chart = new Chart('chart', {
      type: 'bar',
      data: {
        labels: ['Určitě ano', 'Spíše ano', 'Nevím', 'Spíše ne', 'Určitě ne'],
        datasets: [{
          data: [2, 3, 7, 6, 4],
          backgroundColor: [
            'rgb(75, 168, 46)',
            'rgb(129, 194, 109)',
            'rgb(219, 238, 213)',
            'rgb(234, 81, 103)',
            'rgb(210, 38, 48)'
          ]
        }]
      },
      options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        legend:{
          display:false
        }
    }
    })
    console.log(this.results)
  }

}

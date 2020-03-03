import { Component, OnInit } from '@angular/core';
import { AnketyService } from 'src/app/services/ankety.service';
import { ActivatedRoute } from '@angular/router';
import { ResultsService } from 'src/app/services/results.service';
import { Chart } from 'chart.js'

@Component({
  selector: 'app-anketa-detail',
  templateUrl: './anketa-detail.component.html',
  styleUrls: ['./anketa-detail.component.css']
})
export class AnketaDetailComponent implements OnInit {

  constructor(private anketyService: AnketyService, private route: ActivatedRoute, private resultsService: ResultsService) { }

  anketa
  results
  questionResults = []
  chartDonut = []
  chartRadar = []

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')
    this.anketyService.getAnketa(id).subscribe(data => {
      this.anketa = data
    })

    this.resultsService.getResults(id).subscribe(data => {
      this.results = data

      for (let i = 0; i < this.results[0].answers.length; i++) {
        let count = 0
        for (let j = 0; j < this.results.length; j++) {
          count += this.results[j].answers[i].answer
        }
        count /= this.results.length
        this.questionResults.push(`${this.map_range(count, 1, 5, 100, 0)}%`)
      }

      let chartData = [0, 0, 0, 0, 0]
      for (let i = 0; i < this.results.length; i++) {
        for (let j = 0; j < this.results[i].answers.length; j++) {
          chartData[this.results[i].answers[j].answer - 1]++
        }
      }

      let chartLabels = this.anketa.answers.map(answer => answer.name)

      this.chartDonut = new Chart('donut', {
        type: 'doughnut',
        data: {
          labels: chartLabels,
          datasets: [{
            data: chartData,
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

      this.chartRadar = new Chart('radar', {
        type: 'radar',
        data: {
          labels: chartLabels,
          datasets: [{
            data: chartData,
            backgroundColor: [
              'rgba(75, 168, 46, .5)',
            ]
          }]
        },
        options:{
          legend:false
        }
      })
    })

    





  }

  map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
  }

}

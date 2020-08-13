import { Component, OnInit } from "@angular/core";
import { AnketyService } from "src/app/services/ankety.service";
import { ActivatedRoute } from "@angular/router";
import { ResultsService } from "src/app/services/results.service";
import { Chart } from "chart.js";
import { GlobalVariables } from 'src/global';

@Component({
  selector: "app-anketa-detail",
  templateUrl: "./anketa-detail.component.html",
  styleUrls: ["./anketa-detail.component.css"],
})
export class AnketaDetailComponent implements OnInit {
  constructor(
    private anketyService: AnketyService,
    private route: ActivatedRoute,
    private resultsService: ResultsService
  ) { }

  anketa: any;
  results: any;
  anketa_qr:string

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    this.anketyService.getAnketa(id).subscribe((data) => {
      this.anketa = data;
      this.anketa_qr = `${GlobalVariables.QR_URL}/${this.anketa._id}.png`
    });

    this.resultsService.getResults(id).subscribe((data) => {
      this.results = data;
      this.setBarChart();
      this.setRadarChart();
    });
  }

  map_range(value, low1, high1, low2, high2) {
    return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
  }

  setBarChart() {
    var myChart = new Chart("bar", {
      type: "doughnut",
      data: {
        labels: this.labels,
        datasets: [
          {
            label: "# of Votes",
            data: this.chartResults,
            backgroundColor: [
              "#81c26d",
              "#bfdd92",
              "#fff374",
              "#f4c385",
              "#d22630",
            ],
            borderWidth: 0,
          },
        ],
      },
    });
  }

  setRadarChart() {
    var myChart = new Chart("radar", {
      type: "radar",
      data: {
        labels: this.labels,
        datasets: [
          {
            label: "Počet hlasů",
            data: this.chartResults,
            backgroundColor: ["rgba(129,194,107,.5)"],
            borderWidth: 0,
          },
        ],
      }, 
      options: {
        scale: {
          ticks: {
            beginAtZero: true,
            min: 0,
            stepSize: 1
          },
        },
      },
    });
  }

  get labels() {
    if (!this.anketa) return [];
    let answers = [];
    for (let answer of this.anketa.answers) {
      answers.push(answer.cs);
    }
    return answers;
  }

  get questionResults() {
    if (!this.results) return [[]];
    let arr = [];
    for (let i = 0; i < this.anketa.questions.length; i++) {
      let answers = [0, 0, 0, 0, 0];
      for (let result of this.results) {
        answers[result.answers[i].answer - 1]++;
      }
      arr.push(answers);
    }
    return arr;
  }

  get chartResults() {
    let arr = [0, 0, 0, 0, 0];
    for (let a of this.questionResults) {
      arr[0] += a[0];
      arr[1] += a[1];
      arr[2] += a[2];
      arr[3] += a[3];
      arr[4] += a[4];
    }
    return arr;
  }

  getBarWidth(i, j) {
    if (!this.results) return [0, 0, 0, 0, 0];
    return (this.questionResults[i][j] / this.results.length) * 100 + "%";
  }
}

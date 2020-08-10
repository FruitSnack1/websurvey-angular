import { Component, OnInit, Input, ElementRef } from "@angular/core";
import { Chart } from "chart.js";

@Component({
  selector: "app-question",
  templateUrl: "./question.component.html",
  styleUrls: ["./question.component.css"],
})
export class QuestionComponent implements OnInit {
  @Input() question: any;
  @Input() results;
  @Input() index;

  constructor(private elementRef: ElementRef) {}
  chart;
  ngOnInit() {
    let id = `chart${this.index + 1}`;
    console.log(this.results);

    this.chart = new Chart("chart0", {
      type: "bar",
      data: {
        labels: ["Určitě ano", "Spíše ano", "Nevím", "Spíše ne", "Určitě ne"],
        datasets: [
          {
            data: this.questionResults,
            backgroundColor: [
              "#81c26d",
              "#bfdd92",
              "#fff374",
              "#f4c385",
              "#d22630",
            ],
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                stepSize: 1,
              },
            },
          ],
        },
        legend: {
          display: false,
        },
      },
    });
    console.log(this.chart);
  }

  get questionResults() {
    let arr = [0, 0, 0, 0, 0];
    for (let i = 0; i < this.results.length; i++) {
      arr[this.results[i].answers[this.index].answer - 1]++;
    }
    return arr;
  }
}

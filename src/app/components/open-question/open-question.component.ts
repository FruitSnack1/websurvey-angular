import { Component, OnInit, Input, ElementRef } from "@angular/core";
import { Question } from "src/app/models/question.model";
// import { Chart } from "chart.js";

@Component({
  selector: "app-open-question",
  templateUrl: "./open-question.component.html",
  styleUrls: ["./open-question.component.css"],
})
export class OpenQuestionComponent implements OnInit {
  @Input() question: any;
  @Input() results;
  @Input() index;

  constructor(private elementRef: ElementRef) {}

  public barChartOptions = {
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
    scaleShowVerticalLines: false,
    responsive: true,
    lineOnHover: {
      enabled: false,
    },
  };
  // public barChartLabels = [
  //   "Určitě ne",
  //   "Spíše ne",
  //   "Nevím",
  //   "Spíše ano",
  //   "Určitě ano",
  // ];
  public barChartLabels;
  public barChartType = "bar";
  public barChartLegend = false;
  public barChartData;

  ngOnInit() {
    console.log(this.question);
    this.barChartLabels = this.question.answers;
    this.barChartData = [
      {
        data: this.questionResults,
        labels: this.questionAnswers,
        backgroundColor: [
          "#d22630",
          "#f4c385",
          "#fff374",
          "#bfdd92",
          "#81c26d",
        ],
        hoverBackgroundColor: [
          "#d22630",
          "#f4c385",
          "#fff374",
          "#bfdd92",
          "#81c26d",
        ],
        borderWidth: 0,
      },
    ];
  }

  get questionResults() {
    let arr = [0, 0, 0, 0, 0];
    console.log(this.results);
    for (let result of this.results) {
      arr[this.barChartLabels.indexOf(result.answers[this.index].answer)]++;
    }
    return arr;
  }

  get questionAnswers() {
    console.log(this.results);
    let arr = [];
    for (let i = 0; i < this.results.length; i++) {
      arr.push(this.results[i].answers[this.index].answer.cs);
    }
    console.log(arr);
    return arr;
  }
}

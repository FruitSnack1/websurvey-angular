import { Component, OnInit, Input, ElementRef } from "@angular/core";

@Component({
  selector: "app-result-question-single",
  templateUrl: "./result-question-single.component.html",
  styleUrls: ["./result-question-single.component.css"],
})
export class ResultQuestionSingleComponent implements OnInit {
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
  public barChartLabels;
  public barChartType = "bar";
  public barChartLegend = false;
  public barChartData;

  ngOnInit() {
    this.barChartLabels = this.question.answers;
    this.barChartData = [
      {
        data: this.questionResults,
        labels: this.barChartLabels,
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
    let allResults = [];
    for (let result of this.results) {
      if (result.answers[this.index])
        allResults = allResults.concat(result.answers[this.index].answer);
    }
    for (let e of allResults) {
      arr[this.barChartLabels.indexOf(e)]++;
    }
    return arr;
  }

  get questionAnswers() {
    return this.question.answers;
  }

  get otherAnswers() {
    let arr = [];
    let allResults = [];
    for (let result of this.results) {
      allResults = allResults.concat(result.answers[this.index].answer);
    }
    for (let e of allResults) {
      if (!this.barChartLabels.includes(e)) arr.push(e);
    }
    return arr;
  }
}

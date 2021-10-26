import { Component, OnInit, Input, ElementRef } from "@angular/core";

@Component({
  selector: "app-result-question-open",
  templateUrl: "./result-question-open.component.html",
  styleUrls: ["./result-question-open.component.css"],
})
export class ResultQuestionOpenComponent implements OnInit {
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
    let arr = [];
    if (!this.results) return [];
    for (let result of this.results) {
      if (result.answers[this.index].answer[0])
        arr.push(result.answers[this.index].answer[0]);
    }
    return arr;
  }

  get questionAnswers() {
    return this.question.answers;
  }
}

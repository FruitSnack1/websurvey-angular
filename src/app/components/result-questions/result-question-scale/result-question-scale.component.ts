import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-result-question-scale",
  templateUrl: "./result-question-scale.component.html",
  styleUrls: ["./result-question-scale.component.css"],
})
export class ResultQuestionScaleComponent implements OnInit {
  @Input() question: any;
  @Input() results;
  @Input() index;
  constructor() {}

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
    console.log(this.results);
    console.log(this.question);
    let labelArray = [];
    for (let i = 1; i <= this.question.scale_end; i++) {
      labelArray.push(i);
    }
    this.barChartLabels = labelArray;
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
    let arr = [];
    for (let i = 1; i <= this.question.scale_end; i++) {
      arr.push(0);
    }
    for (let result of this.results) {
      if (result.answers[this.index])
        arr[result.answers[this.index].answer - 1]++;
    }
    return arr;
  }

  get questionAnswers() {
    return ["0a", "1a", "2a", "3a", "4a", "5a"];
  }
}

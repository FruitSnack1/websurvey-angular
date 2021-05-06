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

  public barChartLabels = [];

  ngOnInit() {
    for (let i = this.question.scale_start; i <= this.question.scale_end; i++) {
      this.barChartLabels.push(i);
    }
  }

  get questionResults() {
    let arr = [];
    for (let i = this.question.scale_start; i <= this.question.scale_end; i++) {
      arr.push(0);
    }
    for (let result of this.results) {
      if (result.answers[this.index])
        arr[result.answers[this.index].answer - this.question.scale_start]++;
    }
    return arr;
  }
}

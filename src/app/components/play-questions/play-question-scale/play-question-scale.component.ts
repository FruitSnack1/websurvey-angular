import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-play-question-scale",
  templateUrl: "./play-question-scale.component.html",
  styleUrls: ["./play-question-scale.component.css"],
})
export class PlayQuestionScaleComponent implements OnInit {
  @Input() question;
  @Output() questionAnswerd = new EventEmitter<any>();
  scaleAnswer;
  scale;
  constructor() {}

  ngOnInit(): void {
    this.scale = Array(5).map((x, i) => i);
  }

  answer() {
    console.log([this.scaleAnswer]);
    this.questionAnswerd.emit([this.scaleAnswer]);
  }

  get questionImg() {
    return this.question.img
      ? `${environment.API_URL}${this.question.img}`
      : null;
  }
}

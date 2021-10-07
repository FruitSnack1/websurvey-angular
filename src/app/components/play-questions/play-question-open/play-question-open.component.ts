import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-play-question-open",
  templateUrl: "./play-question-open.component.html",
  styleUrls: ["./play-question-open.component.css"],
})
export class PlayQuestionOpenComponent implements OnInit {
  @Input() question;
  @Input() lang;
  @Output() questionAnswerd = new EventEmitter<any>();
  openAnswer;
  answerSelected = false;
  constructor() {}

  ngOnInit() {}

  answer() {
    if (!this.openAnswer) this.answerSelected = false;
    else this.questionAnswerd.emit([this.openAnswer]);
  }

  textareaChanged() {
    this.answerSelected = true;
  }

  get questionImg() {
    return this.question.img
      ? `${environment.API_URL}${this.question.img}`
      : null;
  }
}

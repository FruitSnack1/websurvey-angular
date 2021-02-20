import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-play-question-single",
  templateUrl: "./play-question-single.component.html",
  styleUrls: ["./play-question-single.component.css"],
})
export class PlayQuestionSingleComponent implements OnInit {
  @Input() question;
  @Output() questionAnswerd = new EventEmitter<any>();
  selected;
  constructor() {}

  ngOnInit(): void {}

  answer() {
    this.questionAnswerd.emit(this.question.answers[this.selected]);
  }

  showOtherAnswer() {}

  select(index) {
    this.selected = index;
  }

  get questionImg() {
    return this.question.img
      ? `${environment.API_URL}${this.question.img}`
      : null;
  }
}

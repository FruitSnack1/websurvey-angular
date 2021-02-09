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
  constructor() {}

  ngOnInit(): void {}

  answer(answer) {
    console.log(answer);
    this.questionAnswerd.emit(answer);
  }

  showOtherAnswer() {}

  get questionImg() {
    return this.question.img
      ? `${environment.API_URL}${this.question.img}`
      : null;
  }
}

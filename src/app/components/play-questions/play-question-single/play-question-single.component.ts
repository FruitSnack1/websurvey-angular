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
  selected = [];
  constructor() {}

  ngOnInit(): void {}

  answer() {
    this.questionAnswerd.emit(
      this.selected.map((e) => this.question.answers[e])
    );
    this.selected = [];
  }

  showOtherAnswer() {}

  select(index) {
    if (this.question.limit > 1) {
      if (this.selected.includes(index))
        return this.selected.splice(this.selected.indexOf(index), 1);
      if (this.selected.length == this.question.limit) return;
      else this.selected.push(index);
    } else {
      this.selected = [index];
    }
  }

  get questionImg() {
    return this.question.img
      ? `${environment.API_URL}${this.question.img}`
      : null;
  }
}

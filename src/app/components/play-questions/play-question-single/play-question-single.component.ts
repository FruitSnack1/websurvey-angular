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
  other = "";
  answerSelected = false;
  constructor() {}

  ngOnInit() {}

  answer() {
    let answer = [];
    for (let i = 0; i < this.question.answers.length; i++) {
      if (this.selected.includes(i)) {
        answer.push(this.question.answers[i]);
      }
    }
    if (this.other) answer.push(this.other);
    console.log("answer array : ", answer);
    this.answerSelected = false
    this.questionAnswerd.emit(answer);
    this.selected = [];
    this.other = "";
  }

  showOtherAnswer() {}

  select(index) {
    if (this.question.limit > 1) {
      if (this.selected.includes(index)){
        this.selected.splice(this.selected.indexOf(index), 1);
        this.answerSelected = this.selected.length > 0
        return
      }
      if (this.selected.length == this.question.limit) return;
      else {
        this.selected.push(index);
        this.answerSelected = this.selected.length > 0
      }
    } else {
      this.selected = [index];
      this.answerSelected = true
    }
    // this.answerSelected = this.selected.length > 0
  }

  otherChange() {}

  get questionImg() {
    return this.question.img
      ? `${environment.API_URL}${this.question.img}`
      : null;
  }
}
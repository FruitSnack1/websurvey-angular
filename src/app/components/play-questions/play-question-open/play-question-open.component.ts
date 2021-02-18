import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-play-question-open",
  templateUrl: "./play-question-open.component.html",
  styleUrls: ["./play-question-open.component.css"],
})
export class PlayQuestionOpenComponent implements OnInit {
  @Input() question;
  @Output() questionAnswerd = new EventEmitter<any>();
  openAnswer;
  constructor() {}

  ngOnInit() {}

  answer() {
    this.questionAnswerd.emit(this.openAnswer);
  }
}

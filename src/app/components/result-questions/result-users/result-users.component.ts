import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-result-users",
  templateUrl: "./result-users.component.html",
  styleUrls: ["./result-users.component.css"],
})
export class ResultUsersComponent implements OnInit {
  @Input() results;
  @Input() survey;
  constructor() {}

  ngOnInit(): void {}

  question(id) {
    return this.survey.questions.find((e) => e._id == id)?.question?.cs;
  }

  type(id) {
    const type = this.survey.questions.find((e) => e._id == id)?.type;
    if (type == "open") return "Otevřená otázka";
    if (type == "scale") return "Škála";
    return "Výběr z možností";
  }
}

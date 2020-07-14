import { Component, OnInit } from "@angular/core";
import { PlayService } from "src/app/services/play.service";
import { ActivatedRoute } from "@angular/router";
import { ResultsService } from "src/app/services/results.service";

@Component({
  selector: "app-play",
  templateUrl: "./play.component.html",
  styleUrls: ["./play.component.css"],
})
export class PlayComponent implements OnInit {
  anketa;
  textarea_value = "";
  stage = 0;
  result = {
    answers: [],
    anketa_id: "",
  };
  questionNumber: number = 0;
  constructor(
    private playService: PlayService,
    private route: ActivatedRoute,
    private resultsService: ResultsService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    this.playService.getAneta(id).subscribe((data) => {
      this.anketa = data;
      this.result.anketa_id = this.anketa._id;
    });
  }

  nextStage() {
    this.stage++;
  }

  answer(answer: number = 1) {
    console.log(this.result);
    this.textarea_value = "";
    console.log(this.textarea_value);

    this.result.answers.push({
      question: this.anketa.questions[this.questionNumber].question,
      answer,
    });
    if (this.questionNumber == this.anketa.questions.length - 1) {
      this.nextStage();
      this.postResult();
    } else {
      this.questionNumber++;
    }
  }

  postResult() {
    this.resultsService.postResults(this.result).subscribe((data) => {
      console.log(data);
    });
  }
}

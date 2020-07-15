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
  progress_bar = 0;
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
    this.updateProgressBar();
  }

  answer(answer: number = 1) {
    this.textarea_value = "";
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
    this.updateProgressBar();
  }

  updateProgressBar() {
    this.progress_bar =
      ((this.questionNumber + 1) / this.anketa.questions.length) * 100;

    console.log(this.progress_bar);
  }

  postResult() {
    this.resultsService.postResults(this.result).subscribe((data) => {});
  }
}

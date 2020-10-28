import { Component, OnInit } from "@angular/core";
import { PlayService } from "src/app/services/play.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ResultsService } from "src/app/services/results.service";
import { GlobalVariables } from "src/global";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-play",
  templateUrl: "./play.component.html",
  styleUrls: ["./play.component.css"],
})
export class PlayComponent implements OnInit {
  anketa;
  progress_bar = 0;
  questionTime;
  textarea_value = "";
  stage = -1;
  result = {
    answers: [],
    anketa_id: "",
  };
  lang = "cs";
  langCounter = 0;
  questionNumber: number = 0;
  constructor(
    private playService: PlayService,
    private route: ActivatedRoute,
    private resultsService: ResultsService,
    private cookieService: CookieService,
    public router: Router
  ) {}

  ngOnInit() {
    if (this.cookieService.get("pin")) this.stage = 0;
    const id = this.route.snapshot.paramMap.get("id");
    this.playService.getAneta(id).subscribe((data) => {
      this.anketa = data;
      this.result.anketa_id = this.anketa._id;
    });
  }

  onRegister() {
    this.stage++;
  }

  changeLang() {
    this.langCounter = ++this.langCounter % this.anketa.languages.length;
    this.lang = this.anketa.languages[this.langCounter];
  }

  nextStage() {
    this.stage++;
    this.updateProgressBar();
    if (this.stage == 1) {
      this.questionTime = Date.now();
    }
  }

  get questionImage() {
    return this.anketa.questions[this.questionNumber].img
      ? `${GlobalVariables.API_URL.substring(
          0,
          GlobalVariables.API_URL.length - 4
        )}${this.anketa.questions[this.questionNumber].img}`
      : null;
  }

  get bgClass() {
    if (this.anketa?.theme) return `bg-${this.anketa.theme}`;
  }

  answer(answer) {
    this.textarea_value = "";
    this.result.answers.push({
      question_id: this.anketa.questions[this.questionNumber]._id,
      answer,
      time: Date.now() - this.questionTime,
    });
    this.questionTime = Date.now();
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
    setTimeout(() => {
      this.router.navigateByUrl("/");
    }, 3000);
  }
}

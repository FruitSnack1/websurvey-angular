import { Component, HostListener, OnInit } from "@angular/core";
import { PlayService } from "src/app/services/play.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ResultsService } from "src/app/services/results.service";
import { environment } from "src/environments/environment";
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
    user_data: [],
  };
  lang = "cs";
  langCounter = 0;
  questionNumber: number = 0;
  innerHeight;
  other = false;

  languages = {
    beginBtn: {
      cs: "Začít",
      en: "Start",
      de: "Start",
    },
    endText: {
      cs: "Děkujeme za spolupráci",
      en: "Thank you for your cooperation",
      de: "Danke für Ihre Mitarbeit",
    },
  };
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
      if (this.anketa.user_data) this.stage = -1;
      console.log(this.anketa);
      this.result.anketa_id = this.anketa._id;
      const userLang = navigator.language;
      if (this.anketa.languages.includes(userLang)) this.lang = userLang;
      else this.lang = "en";
      if (this.anketa.type === 2) this.lang = "cs";
    });
    this.innerHeight = window.innerHeight;
  }

  onRegister(data) {
    this.result.user_data = data;
    this.stage++;
  }

  @HostListener("window:resize", [])
  onResize() {
    this.innerHeight = window.innerHeight;
  }

  changeLang() {
    this.langCounter = ++this.langCounter % this.anketa.languages.length;
    this.lang = this.anketa.languages[this.langCounter];
    console.log(this.langCounter);
    console.log(this.lang);
  }

  nextStage() {
    this.stage++;
    this.updateProgressBar();
    if (this.stage == 1) {
      this.questionTime = Date.now();
    }
  }

  showOtherAnswer() {
    this.other = true;
  }

  get questionImage() {
    return this.anketa.questions[this.questionNumber].img
      ? `${environment.API_URL}${
          this.anketa.questions[this.questionNumber].img
        }`
      : null;
  }

  get bgClass() {
    if (this.anketa?.theme) return `bg-${this.anketa.theme}`;
  }

  get bgBtn() {
    if (this.anketa?.theme) return `bg-${this.anketa.theme}-btn`;
  }

  answer(answer) {
    this.textarea_value = "";
    this.result.answers.push({
      question_id: this.anketa.questions[this.questionNumber]._id,
      answer,
      time: Date.now() - this.questionTime,
    });
    console.log(this.result);
    this.questionTime = Date.now();
    if (this.questionNumber == this.anketa.questions.length - 1) {
      this.nextStage();
      this.postResult();
    } else {
      this.questionNumber++;
    }
    this.updateProgressBar();
    this.other = false;
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
    }, 2000);
  }
}

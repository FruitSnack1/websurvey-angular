import { Component, HostListener, OnInit } from "@angular/core";
import { PlayService } from "src/app/services/play.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ResultsService } from "src/app/services/results.service";
import { environment } from "src/environments/environment";
import { CookieService } from "ngx-cookie-service";
import { LoginComponent } from "../login/login.component";

@Component({
  selector: "app-play",
  templateUrl: "./play.component.html",
  styleUrls: ["./play.component.css"],
})
export class PlayComponent implements OnInit {
  anketa;
  elem;
  fullscreen = false;
  progress_bar = 0;
  questionTime;
  textarea_value = "";
  stage = 0;
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
  preview = false;

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
    this.elem = document.documentElement;
    if (this.cookieService.get("pin")) this.stage = 0;
    const id = this.route.snapshot.paramMap.get("id");
    if (this.router.url.includes("preview")) {
      this.preview = true;
    }
    this.playService.getAneta(id).subscribe((data: any) => {
      if (!data.enabled) {
        this.anketa = false;
        this.stage = -2;
      } else {
        this.anketa = data;
        if (this.anketa.user_data) this.stage = -1;
        this.result.anketa_id = this.anketa._id;
        const userLang = navigator.language;
        if (userLang != "cs" && userLang != "en") this.lang = "en";
        else this.lang = userLang;
        console.log(this.lang);
        // if (this.anketa.languages.includes(userLang)) this.lang = userLang;
        // else this.lang = "en";
        // if (this.anketa.type === 2) this.lang = "cs";
        // this.lang = "cs";
      }
    });
    this.innerHeight = window.innerHeight;
  }

  onRegister(data) {
    this.result.user_data = data;
    this.stage++;
  }

  openFullscreen() {
    this.fullscreen = true;
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }
  }

  onQuestionAnswerd(answer) {
    console.log(answer);

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
    this.other = false;
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

  get questionImg() {
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
    setTimeout(() => {
      this.progress_bar =
        ((this.questionNumber + 1) / this.anketa.questions.length) * 100;
    }, 1);
  }

  postResult() {
    if (this.preview) {
      // setTimeout(() => {
      //   this.router.navigateByUrl("/");
      // }, 2000);
    } else {
      this.resultsService.postResults(this.result).subscribe((data) => {
        if (this.anketa.fill_reset) {
          setTimeout(() => {
            this.stage = 0;
            this.progress_bar = 0;
            this.questionNumber = 0;
            this.textarea_value = "";
            this.result.answers = [];
          }, 2000);
        } else {
          if (!localStorage.getItem("filled"))
            localStorage.setItem("filled", '["0"]');
          let ls = localStorage.getItem("filled");
          localStorage.setItem(
            "filled",
            `${ls.substring(0, ls.length - 1)},"${this.anketa._id}"]`
          );
          setTimeout(() => {
            this.router.navigateByUrl("/34NpBVU2wjeE4hQstqGUY97sPmTfVu");
          }, 2000);
        }
      });
    }
  }
}

import { Component, OnInit, NgModule } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormArray,
  AbstractControl,
} from "@angular/forms";
import { AnketyService } from "src/app/services/ankety.service";
import { Router, ActivatedRoute } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-form-anketa",
  templateUrl: "./form-anketa.component.html",
  styleUrls: ["./form-anketa.component.css"],
})
export class FormAnketaComponent implements OnInit {
  anketaForm: FormGroup;
  files: Object = {};
  imagesPreviews = [];
  lang = "cs";
  languages = ["cs"];
  addLangModal = false;
  editSurvey: any;
  editMode = false;
  editId: string;
  constructor(
    private fb: FormBuilder,
    private anketyService: AnketyService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.editMode = true;
      this.editId = id;
      this.fetchSurvey(id);
    }
    this.anketaForm = this.fb.group({
      name: this.fb.group({
        cs: "",
        en: "",
        de: "",
      }),
      description: this.fb.group({
        cs: "",
        en: "",
        de: "",
      }),
      random_order: false,
      user_data: false,
      answers: this.fb.array([]),
      questions: this.fb.array([]),
      theme: null,
    });

    const defaultAnswers = [
      "Určitě ano",
      "Spíše ano",
      "Nemohu rozhodnout",
      "Spíše ne",
      "Určitě ne",

      "Definitely yes",
      "Rather yes",
      "Cannot decide",
      "Rather not",
      "Definitely not",

      "Sicherlich ja",
      "Eher ja",
      "Kann nicht entscheinden",
      "Lieber nicht",
      "Eher nicht",
    ];
    for (let i = 0; i < 5; i++) {
      const obj = this.fb.group({
        answer: this.fb.group({
          cs: defaultAnswers[i],
          en: defaultAnswers[i + 5],
          de: defaultAnswers[i + 10],
        }),
        value: i + 1,
      });

      this.answerForms.push(obj);
    }
    if (!this.editMode) this.addQuestion();
  }

  changeLang(lang: string) {
    this.lang = lang;
  }

  get questionForms() {
    return this.anketaForm.get("questions") as FormArray;
  }

  get answerForms() {
    return this.anketaForm.get("answers") as FormArray;
  }

  get nameForm() {
    return this.anketaForm.get("name") as FormGroup;
  }

  get descForm() {
    return this.anketaForm.get("description") as FormGroup;
  }

  onFileChange(event, i) {
    if (!event.target.files) return;
    this.files[`img${i}`] = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event: any) => {
      this.imagesPreviews[i] = event.target.result;
    };
  }

  toggleLang(lang: string) {
    if (this.languages.includes(lang)) {
      this.languages.splice(this.languages.indexOf(lang), 1);
      if (this.lang == lang) this.changeLang("cs");
    } else {
      this.languages.push(lang);
      let name = this.anketaForm.get("name") as FormGroup;
    }
  }

  addQuestion() {
    const question = this.fb.group({
      question: this.fb.group({
        cs: "",
        en: "",
        de: "",
      }),
      open: false,
    });

    this.questionForms.push(question);
  }

  fetchSurvey(id) {
    this.anketyService.getAnketa(id).subscribe((data) => {
      let survey: any = data;
      this.editSurvey = data;
      this.anketaForm.get("random_order").setValue(survey.random_order);
      this.anketaForm.get("user_data").setValue(survey.user_data);
      this.languages = survey.languages;

      for (let lan of survey.languages) {
        this.nameForm.get(lan).setValue(survey.name[lan]);
        this.descForm.get(lan).setValue(survey.description[lan]);

        for (let i = 0; i < 5; i++) {
          this.answerForms
            .at(i)
            .get("answer")
            .get(lan)
            .setValue(survey.answers[i].answer[lan]);
        }

        for (let i = 0; i < survey.questions.length; i++) {
          if (lan == "cs") this.addQuestion();
          this.questionForms
            .at(i)
            .get("question")
            .get(lan)
            .setValue(survey.questions[i].question[lan]);
        }
      }

      for (let i = 0; i < survey.questions.length; i++) {
        this.questionForms.at(i).get("open").setValue(survey.questions[i].open);
      }
    });
  }

  getQuestionText(lang) {
    const langs = {
      cs: "češtině",
      en: "angličtině",
      de: "němčině",
    };
    return langs[lang];
  }

  getImageSrc(index) {
    if (this.imagesPreviews[index]) return this.imagesPreviews[index];
    else if (this.editSurvey) {
      if (this.editSurvey.questions[index].img)
        return this.sanitizer.bypassSecurityTrustUrl(
          `http://localhost:3001${this.editSurvey.questions[index].img}`
        );
      else return "assets/images/no-image.png";
    } else return "assets/images/no-image.png";
  }

  deleteQuestion(i) {
    this.questionForms.removeAt(i);
  }

  toggleAddLang() {
    this.addLangModal = !this.addLangModal;
  }

  submitAnketa() {
    if (this.editMode) {
      let anketaFormValue = this.anketaForm.value;
      anketaFormValue.languages = this.languages;
      const formData = new FormData();
      for (let key in this.files) {
        formData.append(key, this.files[key]);
      }
      formData.append("anketa", JSON.stringify(anketaFormValue));
      this.anketyService
        .updateSurvey(this.editId, formData)
        .subscribe((data) => {
          this.router.navigateByUrl("/admin/ankety");
        });
    } else {
      let anketaFormValue = this.anketaForm.value;
      anketaFormValue.languages = this.languages;
      console.log(anketaFormValue);
      const formData = new FormData();
      for (let key in this.files) {
        formData.append(key, this.files[key]);
      }
      formData.append("anketa", JSON.stringify(anketaFormValue));
      this.anketyService.createAnketa(formData).subscribe((data) => {
        this.router.navigateByUrl("/admin/ankety");
      });
    }
  }
}

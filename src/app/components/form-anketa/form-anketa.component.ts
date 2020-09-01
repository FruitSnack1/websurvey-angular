import { Component, OnInit, NgModule } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormArray,
  AbstractControl,
} from "@angular/forms";
import { AnketyService } from "src/app/services/ankety.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-form-anketa",
  templateUrl: "./form-anketa.component.html",
  styleUrls: ["./form-anketa.component.css"],
})
export class FormAnketaComponent implements OnInit {
  anketaForm: FormGroup;
  files: Object = {};
  lang = "cs";
  languages = ["cs"];
  addLangModal = false;
  constructor(
    private fb: FormBuilder,
    private anketyService: AnketyService,
    private router: Router
  ) {}

  ngOnInit() {
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

    this.addQuestion();
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
    if (event.target.files.length > 0) {
      this.files[`img${i}`] = event.target.files[0];
    }
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

  getQuestionText(lang) {
    const langs = {
      cs: "češtině",
      en: "angličtině",
      de: "němčině",
    };
    return langs[lang];
  }

  deleteQuestion(i) {
    this.questionForms.removeAt(i);
  }

  toggleAddLang() {
    this.addLangModal = !this.addLangModal;
  }

  submitAnketa() {
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

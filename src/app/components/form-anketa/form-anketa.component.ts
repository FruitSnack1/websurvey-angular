import { Component, OnInit, NgModule } from "@angular/core";
import { FormGroup, FormBuilder, FormArray } from "@angular/forms";
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
      "Nevím",
      "Spíše ne",
      "Určitě ne",
    ];
    console.log(this.anketaForm);
    console.log(this.anketaForm.get("answers") as FormGroup);
    for (let i = 0; i < defaultAnswers.length; i++) {
      const obj = this.fb.group({
        cs: [defaultAnswers[i]],
        en: [],
        de: [],
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

  addQuestion() {
    const question = this.fb.group({
      cs: [],
      en: [],
      de: [],
      open: false,
    });

    this.questionForms.push(question);
  }

  deleteQuestion(i) {
    this.questionForms.removeAt(i);
  }

  submitAnketa() {
    console.log(this.questionForms.value);
    console.log(this.anketaForm.value);
    const formData = new FormData();
    for (let key in this.files) {
      formData.append(key, this.files[key]);
    }
    formData.append("anketa", JSON.stringify(this.anketaForm.value));
    this.anketyService.createAnketa(formData).subscribe((data) => {
      this.router.navigateByUrl("/admin/ankety");
    });
  }
}

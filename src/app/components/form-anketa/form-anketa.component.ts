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

  constructor(
    private fb: FormBuilder,
    private anketyService: AnketyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.anketaForm = this.fb.group({
      name: "",
      description: "",
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
    for (let i = 0; i < defaultAnswers.length; i++) {
      const obj = this.fb.group({
        name: [defaultAnswers[i]],
        value: [i + 1],
      });
      this.answerForms.push(obj);
    }

    this.addQuestion();
  }

  get questionForms() {
    return this.anketaForm.get("questions") as FormArray;
  }

  get answerForms() {
    return this.anketaForm.get("answers") as FormArray;
  }

  addQuestion() {
    const question = this.fb.group({
      question: [],
      img: [],
      open: false,
    });

    this.questionForms.push(question);
  }

  deleteQuestion(i) {
    this.questionForms.removeAt(i);
  }

  submitAnketa() {
    this.anketyService.createAnketa(this.anketaForm.value).subscribe((data) => {
      this.router.navigateByUrl("/admin/ankety/new");
    });
  }
}

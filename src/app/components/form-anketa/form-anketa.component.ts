import { Component, OnInit, NgModule, ViewChild } from "@angular/core";
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
  @ViewChild('Img') Img;
  file: File
  constructor(
    private fb: FormBuilder,
    private anketyService: AnketyService,
    private router: Router
  ) { }

  ngOnInit() {
    this.anketaForm = this.fb.group({
      name: "",
      description: "",
      random_order: false,
      user_data: false,
      answers: this.fb.array([]),
      questions: this.fb.array([]),
      img: null
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

  onFileChange(event) {
    console.log(event)
    if (event.target.files.length > 0) {
      this.file = event.target.files[0]
      this.anketaForm.get('img').setValue(this.file)
    }
  }

  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.anketaForm.patchValue({
      img: file
    });
    this.anketaForm.get('img').updateValueAndValidity()
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
    const formData = new FormData()
    const formValue = this.anketaForm.value

    console.log(formValue)
    formData.append('file', this.file)
    formData.append('name', this.anketaForm.get('name').value)
    formData.append('description', this.anketaForm.get('description').value)
    formData.append('questions', JSON.stringify(this.anketaForm.get('questions').value))
    // formData.append('a', JSON.parse(formValue))
    // formData.append('answers', formValue.answers)
    // formData.append('random_order', formValue.random_order)
    // formData.append('user_data', formValue.user_data)
    // this.anketyService.createAnketa(formData).subscribe((data) => {
    this.anketyService.createAnketa(formData).subscribe((data) => {
      this.router.navigateByUrl("/admin/ankety");
    });
  }
}

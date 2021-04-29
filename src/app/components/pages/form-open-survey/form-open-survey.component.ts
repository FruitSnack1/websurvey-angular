import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { Result } from "src/app/models/result.model";
import { AnketyService } from "src/app/services/ankety.service";
import { ResultsService } from "src/app/services/results.service";
import { environment } from "src/environments/environment";
import { runInThisContext } from "vm";

@Component({
  selector: "app-form-open-survey",
  templateUrl: "./form-open-survey.component.html",
  styleUrls: ["./form-open-survey.component.css"],
})
export class FormOpenSurveyComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private anketyService: AnketyService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private resultsService: ResultsService
  ) {}

  surveyForm: FormGroup;
  editMode = false;
  imagesPreviews = [];
  editSurvey = null;
  files = [];
  editId;
  resultsExists = false;
  imagePreviews = [];

  ngOnInit() {
    this.surveyForm = this.fb.group({
      name: this.fb.group({
        cs: "Nová anketa",
      }),
      description: this.fb.group({
        cs: "",
      }),
      random_order: false,
      user_data: false,
      type: 2,
      questions: this.fb.array([]),
      user_data_fields: this.fb.array([]),
    });

    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.editMode = true;
      this.editId = id;
      this.fetchSurvey(id);
    } else this.addQuestion("single");
  }

  get questionForms() {
    return this.surveyForm.get("questions") as FormArray;
  }

  questionAnswersForms(i) {
    let answers = this.questionForms.at(i) as FormArray;
    return answers.get("answers") as FormArray;
  }

  addQuestion(type) {
    const question = this.fb.group({
      question: this.fb.group({
        cs: "",
      }),
      other_answer: false,
      description: "",
      answers: this.fb.array(["", ""]),
      type,
      limit: 1,
      img: "",
      scale_end: 5,
      scale_start: 1,
    });

    this.questionForms.push(question);
  }

  fetchSurvey(id) {
    this.anketyService.getAnketa(id).subscribe((data) => {
      let survey: any = data;
      console.log(survey);
      this.editSurvey = data;
      this.surveyForm.get("random_order").setValue(survey.random_order);
      this.surveyForm.get("user_data").setValue(survey.user_data);
      this.surveyForm.get("name").get("cs").setValue(survey.name.cs);
      this.surveyForm
        .get("description")
        .get("cs")
        .setValue(survey.description.cs);
      // for (let question of this.editSurvey.questions) {
      for (let i = 0; i < this.editSurvey.questions.length; i++) {
        const question = this.editSurvey.questions[i];
        this.addQuestion(question.type);
        let questionForm = this.questionForms.at(i) as FormGroup;
        let answersForm = questionForm.get("answers") as FormArray;
        answersForm.clear();
        for (let answer of question.answers) {
          answersForm.insert(0, this.fb.control(""));
        }

        questionForm.patchValue(question);
      }
    });
  }

  onNewFieldEvent(fields) {
    this.surveyForm.setControl("user_data_fields", this.fb.array(fields || []));
  }

  // onQuestionChange(data) {
  //   if (data.question.type == "single") {
  //     let answers = this.questionForms
  //       .at(data.index)
  //       .get("answers") as FormArray;
  //     answers.clear();
  //     for (let answer of data.question.answers) {
  //       answers.insert(0, this.fb.control(""));
  //     }
  //   }
  //   this.questionForms.at(data.index).patchValue(data.question);
  // }

  onImageChange(data) {
    if (data.image) this.files[`img${data.index}`] = data.image;
    this.imagePreviews[data.index] = data.imagePreview;
  }

  submitSurvey() {
    if (this.editMode) {
      if (this.editSurvey.result_count > 0) {
        this.resultsExists = true;
        return;
      }
      let anketaFormValue = this.surveyForm.value;
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
      let anketaFormValue = this.surveyForm.value;
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

  onQuestionDelete(i) {
    let questions = this.surveyForm.get("questions") as FormArray;
    questions.removeAt(i);
  }

  postEditSurvey(deleteResults) {
    if (deleteResults) {
      this.resultsService
        .deleteSurveyResults(this.editSurvey._id)
        .subscribe((data) => {
          console.log(data);
        });
    }
    let anketaFormValue = this.surveyForm.value;
    const formData = new FormData();
    for (let key in this.files) {
      formData.append(key, this.files[key]);
    }
    formData.append("anketa", JSON.stringify(anketaFormValue));
    this.anketyService.updateSurvey(this.editId, formData).subscribe((data) => {
      this.router.navigateByUrl("/admin/ankety");
    });
  }

  onQuestionMove(event) {
    if (event.up) {
      if (event.i === 0) return;
      const q1 = this.questionForms.at(event.i).value;
      const q2 = this.questionForms.at(event.i - 1).value;
      this.patchQuestion(q1, event.i - 1);
      this.patchQuestion(q2, event.i);

      const imageTmp = this.imagePreviews[event.i];
      this.imagePreviews[event.i] = this.imagePreviews[event.i - 1];
      this.imagePreviews[event.i - 1] = imageTmp;

      const fileTmp = this.files[`img${event.i}`];
      this.files[`img${event.i}`] = this.files[`img${event.i - 1}`];
      this.files[`img${event.i - 1}`] = fileTmp;
    } else {
      if (event.i === this.questionForms.length - 1) return;
      const q1 = this.questionForms.at(event.i).value;
      const q2 = this.questionForms.at(event.i + 1).value;
      this.patchQuestion(q1, event.i + 1);
      this.patchQuestion(q2, event.i);

      const imageTmp = this.imagePreviews[event.i];
      this.imagePreviews[event.i] = this.imagePreviews[event.i + 1];
      this.imagePreviews[event.i + 1] = imageTmp;

      const fileTmp = this.files[`img${event.i}`];
      this.files[`img${event.i}`] = this.files[`img${event.i + 1}`];
      this.files[`img${event.i + 1}`] = fileTmp;
    }
  }

  patchQuestion(question, index) {
    const update = this.questionForms.at(index) as FormGroup;
    const answers = update.get("answers") as FormArray;
    answers.clear();
    for (let answer of question.answers) {
      answers.insert(0, this.fb.control(""));
    }
    update.patchValue(question);
  }
}

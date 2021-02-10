import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { AnketyService } from "src/app/services/ankety.service";
import { environment } from "src/environments/environment";

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
    private sanitizer: DomSanitizer
  ) {}

  surveyForm: FormGroup;
  editMode = false;
  imagesPreviews = [];
  editSurvey = null;
  files = [];
  editId;

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
    } else this.addQuestion();
  }

  get questionForms() {
    return this.surveyForm.get("questions") as FormArray;
  }

  questionAnswersForms(i) {
    let answers = this.questionForms.at(i) as FormArray;
    return answers.get("answers") as FormArray;
  }

  addQuestion() {
    const question = this.fb.group({
      question: this.fb.group({
        cs: "",
      }),
      other_answer: false,
      description: "",
      answers: this.fb.array([]),
      type: "",
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
      for (let question of this.editSurvey.questions) {
        this.addQuestion();
      }
    });
  }

  onNewFieldEvent(fields) {
    this.surveyForm.setControl("user_data_fields", this.fb.array(fields || []));
  }

  onQuestionChange(data) {
    let answers = this.questionForms.at(data.index).get("answers") as FormArray;
    answers.clear();
    for (let answer of data.question.answers) {
      answers.insert(0, this.fb.control(""));
    }
    this.questionForms.at(data.index).patchValue(data.question);
  }

  onImageChange(data) {
    if (data.image) this.files[`img${data.index}`] = data.image;
  }

  submitSurvey() {
    console.log(this.surveyForm.value);
    if (this.editMode) {
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

  deleteQuestion(i) {
    let questions = this.surveyForm.get("questions") as FormArray;
    questions.removeAt(i);
  }
}

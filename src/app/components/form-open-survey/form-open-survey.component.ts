import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { AnketyService } from "src/app/services/ankety.service";

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
        cs: "",
      }),
      description: this.fb.group({
        cs: "",
      }),
      random_order: false,
      user_data: false,
      type: 2,
      questions: this.fb.array([]),
    });

    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.editMode = true;
      this.editId = id;
      this.fetchSurvey(id);
    } else this.addQuestion(false);
  }

  get questionForms() {
    return this.surveyForm.get("questions") as FormArray;
  }

  questionAnswersForms(i) {
    let answers = this.questionForms.at(i) as FormArray;
    return answers.get("answers") as FormArray;
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

  addQuestion(empty: boolean) {
    let defaultArray = ["", "", "", ""];
    if (empty) defaultArray = [];
    const question = this.fb.group({
      question: this.fb.group({
        cs: "",
      }),
      open: false,
      answers: this.fb.array(defaultArray),
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

      //questions
      for (let i = 0; i < survey.questions.length; i++) {
        this.addQuestion(true);
        this.questionForms.at(i).get("open").setValue(survey.questions[i].open);
        this.questionForms
          .at(i)
          .get("question")
          .get("cs")
          .setValue(survey.questions[i].question.cs);

        //answers
        for (let j = 0; j < survey.questions[i].answers.length; j++) {
          let answers = this.questionForms.at(i).get("answers") as FormArray;
          answers.removeAt(j);
          this.addAnswer(i, j);
          answers.at(j).setValue(survey.questions[i].answers[j]);
        }
      }

      //open
      for (let i = 0; i < survey.questions.length; i++) {
        this.questionForms.at(i).get("open").setValue(survey.questions[i].open);
      }
    });
  }

  deleteAnswer(i, j) {
    let answers = this.questionForms.at(i).get("answers") as FormArray;
    answers.removeAt(j);
  }

  addAnswer(i, j) {
    let answer = this.fb.control("");
    let answers = this.questionForms.at(i).get("answers") as FormArray;
    answers.insert(j + 1, answer);
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

  getImageSrc(index) {
    // if (this.imagesPreviews[index]) return this.imagesPreviews[index];
    // else if (this.editSurvey) {
    //   if (this.editSurvey.questions[index].img)
    //     return this.sanitizer.bypassSecurityTrustUrl(
    //       `http://localhost:3001${this.editSurvey.questions[index].img}`
    //     );
    //   else return "assets/images/no-image.png";
    // } else return "assets/images/no-image.png";
  }
}
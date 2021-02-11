import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-question-single",
  templateUrl: "./form-question-single.component.html",
  styleUrls: ["./form-question-single.component.css"],
})
export class FormQuestionSingleComponent implements OnInit {
  @Output() questionChange = new EventEmitter<any>();
  @Output() imageChange = new EventEmitter<any>();
  @Input() index;
  @Input() question;
  questionForm: FormGroup;
  imagePreview;
  image;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.questionForm = this.fb.group({
      question: this.fb.group({
        cs: "",
      }),
      description: "",
      other_answer: false,
      answers: this.fb.array([""]),
      type: "single",
    });

    this.questionForm.valueChanges.subscribe(() => {
      this.questionChange.emit({
        question: this.questionForm.value,
        index: this.index,
      });
      console.log(this.questionForm.value);
    });

    if (this.question) {
      this.editQuestion();
    }
  }

  get answers() {
    return this.questionForm.get("answers") as FormArray;
  }

  addAnswer(i) {
    let answer = this.fb.control("");
    this.answers.insert(i + 1, answer);
  }

  deleteAnswer(i) {
    this.answers.removeAt(i);
  }

  onFileChange(event) {
    if (!event.target.files) return;
    this.image = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event: any) => {
      this.imagePreview = event.target.result;
    };
    this.imageChange.emit({
      image: this.image,
      index: this.index,
    });
  }

  get imageSrc() {
    if (this.imagePreview) return this.imagePreview;
    if (this.question?.img) return `${environment.API_URL}${this.question.img}`;
    else return "assets/images/no-image.png";
  }

  editQuestion() {
    this.answers.clear();
    for (let answer of this.question.answers) {
      this.answers.insert(0, this.fb.control(""));
    }
    this.questionForm.patchValue(this.question);
  }
}

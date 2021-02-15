import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-form-question-open",
  templateUrl: "./form-question-open.component.html",
  styleUrls: ["./form-question-open.component.css"],
})
export class FormQuestionOpenComponent implements OnInit {
  @Output() questionChange = new EventEmitter<any>();
  @Output() imageChange = new EventEmitter<any>();
  @Input() index;
  @Input() question;
  questionForm: FormGroup;
  imagePreview;
  image;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.questionForm = this.fb.group({
      question: this.fb.group({
        cs: "",
      }),
      description: "",
      type: "open",
    });

    this.questionForm.valueChanges.subscribe(() => {
      this.questionChange.emit({
        question: this.questionForm.value,
        index: this.index,
      });
    });

    if (this.question) {
      this.editQuestion();
    }
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
    this.questionForm.patchValue(this.question);
  }
}

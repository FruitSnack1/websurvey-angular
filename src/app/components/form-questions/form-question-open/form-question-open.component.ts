import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-form-question-open",
  templateUrl: "./form-question-open.component.html",
  styleUrls: ["./form-question-open.component.css"],
})
export class FormQuestionOpenComponent implements OnInit {
  @Output() imageChange = new EventEmitter<any>();
  @Output() questionDelete = new EventEmitter<any>();
  @Output() questionMove = new EventEmitter<any>();
  @Input() index;
  @Input() surveyForm;
  @Input() imagePreviews;
  imagePreview;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {}

  onFileChange(event) {
    if (!event.target.files) return;
    const image = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event: any) => {
      this.imageChange.emit({
        image,
        index: this.index,
        imagePreview: event.target.result,
      });
    };
  }

  get imageSrc() {
    if (this.imagePreviews[this.index]) return this.imagePreviews[this.index];
    if (this.questionForm?.value.img)
      return `${environment.API_URL}${this.questionForm?.value.img}`;
    else return "assets/images/no-image.png";
  }

  deleteQuestion() {
    this.questionDelete.emit(this.index);
  }

  moveQuestion(up) {
    this.questionMove.emit({ up, i: this.index });
  }

  get questionForm() {
    return this.surveyForm.get("questions").at(this.index) as FormGroup;
  }
}

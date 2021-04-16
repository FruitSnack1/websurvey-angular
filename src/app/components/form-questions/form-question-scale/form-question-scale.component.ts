import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-form-question-scale",
  templateUrl: "./form-question-scale.component.html",
  styleUrls: ["./form-question-scale.component.css"],
})
export class FormQuestionScaleComponent implements OnInit {
  @Output() imageChange = new EventEmitter<any>();
  @Output() questionDelete = new EventEmitter<any>();
  @Output() questionMove = new EventEmitter<any>();
  @Input() index;
  @Input() surveyForm;
  @Input() imagePreviews;
  constructor() {}

  ngOnInit(): void {}

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

  deleteQuestion() {
    this.questionDelete.emit(this.index);
  }

  moveQuestion(up) {
    this.questionMove.emit({ up, i: this.index });
  }

  get imageSrc() {
    if (this.imagePreviews[this.index]) return this.imagePreviews[this.index];
    if (this.questionForm.value.img)
      return `${environment.API_URL}${this.questionForm.value.img}`;
    else return "assets/images/no-image.png";
  }

  get questionForm() {
    return this.surveyForm.get("questions").at(this.index) as FormGroup;
  }
}

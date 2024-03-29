import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-form-question-single",
  templateUrl: "./form-question-single.component.html",
  styleUrls: ["./form-question-single.component.css"],
})
export class FormQuestionSingleComponent implements OnInit {
  @Output() imageChange = new EventEmitter<any>();
  @Output() questionDelete = new EventEmitter<any>();
  @Output() questionMove = new EventEmitter<any>();
  @Input() index;
  @Input() surveyForm;
  @Input() imagePreviews;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {}

  addAnswer(i) {
    this.answers.insert(i + 1, this.fb.control(""));
  }

  deleteAnswer(i) {
    if (this.questionForm.value.answers.length == 2) return;
    this.answers.removeAt(i);
  }

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

  moreAnswers() {
    if (this.questionForm.value.limit == 1)
      this.questionForm.get("limit").setValue(this.answers.length);
    else this.questionForm.get("limit").setValue(1);
  }

  moveQuestion(up) {
    this.questionMove.emit({ up, i: this.index });
  }

  get answers() {
    return this.questionForm.get("answers") as FormArray;
  }

  get questionForm() {
    return this.surveyForm.get("questions").at(this.index) as FormGroup;
  }

  get imageSrc() {
    if (this.imagePreviews[this.index]) return this.imagePreviews[this.index];
    if (this.questionForm.value.img)
      return `${environment.API_URL}${this.questionForm.value.img}`;
    else return "assets/images/no-image.png";
  }
}

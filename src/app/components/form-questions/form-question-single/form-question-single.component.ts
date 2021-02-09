import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-question-single",
  templateUrl: "./form-question-single.component.html",
  styleUrls: ["./form-question-single.component.css"],
})
export class FormQuestionSingleComponent implements OnInit {
  @Output() questionChange = new EventEmitter<any>();
  @Output() imageChange = new EventEmitter<any>();
  @Input() index;
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
    else return "assets/images/no-image.png";
  }
}

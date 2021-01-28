import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-form-user-data",
  templateUrl: "./form-user-data.component.html",
  styleUrls: ["./form-user-data.component.css"],
})
export class FormUserDataComponent implements OnInit {
  @Output() newFieldEvent = new EventEmitter<any>();
  constructor(private fb: FormBuilder) {}

  userDataForm: FormGroup;

  ngOnInit(): void {
    this.userDataForm = this.fb.group({
      fields: this.fb.array([""]),
    });

    this.userDataForm.valueChanges.subscribe((x) => {
      this.newFieldEvent.emit(this.fields.value);
    });
  }

  addField() {
    this.fields.push(this.fb.control(""));
    console.log(this.fields.value);
  }

  removeField(i) {
    this.fields.removeAt(i);
  }

  get fields() {
    return this.userDataForm.get("fields") as FormArray;
  }
}

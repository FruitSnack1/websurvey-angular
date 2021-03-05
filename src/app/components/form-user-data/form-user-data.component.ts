import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-form-user-data",
  templateUrl: "./form-user-data.component.html",
  styleUrls: ["./form-user-data.component.css"],
})
export class FormUserDataComponent implements OnInit {
  @Output() newFieldEvent = new EventEmitter<any>();
  @Input() userData;
  constructor(private fb: FormBuilder) {}

  userDataForm: FormGroup;

  ngOnInit(): void {
    this.userDataForm = this.fb.group({
      fields: this.fb.array([""]),
    });

    this.userDataForm.valueChanges.subscribe((x) => {
      this.newFieldEvent.emit(this.fields.value);
    });

    if (this.userData) this.editUserData();
  }

  addField() {
    this.fields.push(this.fb.control(""));
  }

  removeField(i) {
    this.fields.removeAt(i);
  }

  editUserData() {
    this.fields.clear();
    for (let field of this.userData) {
      this.fields.insert(0, this.fb.control(""));
    }
    this.fields.patchValue(this.userData);
  }

  get fields() {
    return this.userDataForm.get("fields") as FormArray;
  }
}

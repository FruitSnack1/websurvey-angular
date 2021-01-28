import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";

@Component({
  selector: "app-play-register",
  templateUrl: "./play-register.component.html",
  styleUrls: ["./play-register.component.css"],
})
export class PlayRegisterComponent implements OnInit {
  @Output() register: EventEmitter<any> = new EventEmitter();
  @Input() fields: [];
  constructor() {}

  ngOnInit(): void {}

  onSubmit(data) {
    let userData = [];
    for (let i = 0; i < this.fields.length; i++) {
      userData.push({
        key: this.fields[i],
        value: data.target[i].value,
      });
    }
    this.register.emit(userData);
  }
}

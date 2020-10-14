import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-play-register",
  templateUrl: "./play-register.component.html",
  styleUrls: ["./play-register.component.css"],
})
export class PlayRegisterComponent implements OnInit {
  @Output() cookie: EventEmitter<any> = new EventEmitter();
  PIN: string;
  constructor(private cookieService: CookieService) {}

  ngOnInit(): void {}

  register() {
    this.cookieService.set("pin", this.PIN, 365);
    this.cookie.emit(null);
  }
}

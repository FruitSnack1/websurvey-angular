import { Component, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { EventEmitter } from "events";
import { UsersService } from "src/app/services/users.service";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.css"],
})
export class SettingsComponent implements OnInit {
  constructor(private userService: UsersService, private router: Router) {}
  username = localStorage.getItem("username");
  alertClosed = true;
  ngOnInit(): void {}

  changeUsername() {
    this.userService.changeUsername(this.username).subscribe((data: any) => {
      localStorage.setItem("username", data.username);
      this.alertClosed = false;
      setTimeout(() => {
        this.alertClosed = true;
      }, 3000);
    });
  }
}

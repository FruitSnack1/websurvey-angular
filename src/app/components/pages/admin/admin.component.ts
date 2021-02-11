import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { EventEmitter } from "protractor";
import { Observable } from "rxjs";
import { UsersService } from "src/app/services/users.service";
import { SettingsComponent } from "../settings/settings.component";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"],
})
export class AdminComponent implements OnInit {
  username: string;

  constructor(public router: Router, private userService: UsersService) {}

  ngOnInit() {
    this.username = localStorage.getItem("username");
    this.userService.getUsername().subscribe((username) => {
      this.username = localStorage.getItem("username");
    });
  }

  changeUsername(elementRef) {
    elementRef.subscribe((event) => {
      this.username = localStorage.getItem("username");
    });
  }
}

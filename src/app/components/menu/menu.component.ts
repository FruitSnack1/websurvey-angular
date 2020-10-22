import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"],
})
export class MenuComponent implements OnInit {
  themeSelector = 0;
  constructor() {}

  ngOnInit(): void {}

  openTheme(id) {
    this.themeSelector = id;
  }
}

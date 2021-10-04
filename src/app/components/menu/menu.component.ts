import { Component, HostListener, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AnketyService } from "../../services/ankety.service";
@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"],
})
export class MenuComponent implements OnInit {
  themeSelector = 0;
  ankety: any;
  innerHeight;
  constructor(private anketyService: AnketyService, private router: Router) {}

  ngOnInit() {
    this.anketyService.getIvetAnkety().subscribe((data) => {
      console.log(data);
      this.ankety = data;
    });
    this.innerHeight = window.innerHeight;
  }

  @HostListener("window:resize", [])
  onResize() {
    this.innerHeight = window.innerHeight;
  }

  anketyTheme(theme) {
    if (!this.ankety) return [];
    return this.ankety.filter((anketa) => anketa.theme == theme);
  }

  playAnketa(id: string) {
    console.log(id);
    this.router.navigateByUrl(`/play/${id}`);
  }

  openTheme(id) {
    this.themeSelector = id;
  }
}

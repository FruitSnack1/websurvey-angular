import { Component, OnInit } from "@angular/core";
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
  constructor(private anketyService: AnketyService, private router: Router) {}

  ngOnInit() {
    this.anketyService.getAnkety().subscribe((data) => {
      console.log(data);
      this.ankety = data;
    });
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

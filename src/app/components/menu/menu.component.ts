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
  ankety = null;
  innerHeight;
  constructor(private anketyService: AnketyService, private router: Router) {}

  ngOnInit() {
    if(!localStorage.getItem('filled'))
      localStorage.setItem('filled', '["0"]')
    const filled:[string] = JSON.parse(localStorage.getItem('filled'))
    // console.log(filled)
    this.anketyService.getIvetAnkety().subscribe((data:[any]) => {
      this.ankety = data.filter(e => e.theme && !filled.includes(e._id) && e.theme !='null');
      this.ankety.sort((a,b) =>{ return a.theme.localeCompare(b.theme) });
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
    this.router.navigateByUrl(`/play/${id}`);
  }

  openTheme(id) {
    this.themeSelector = id;
  }
}

import { Component, OnInit } from "@angular/core";
import { AnketyService } from "src/app/services/ankety.service";
import { Router } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from "@angular/animations";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-ankety",
  templateUrl: "./ankety.component.html",
  styleUrls: ["./ankety.component.css"],
  animations: [
    trigger("displayState", [
      state(
        "show",
        style({
          opacity: 1,
        })
      ),
      state(
        "hide",
        style({
          opacity: 0,
        })
      ),
      transition("show => hide", animate("600ms ease-out")),
      transition("hide => show", animate("600ms ease-out")),
    ]),
  ],
})
export class AnketyComponent implements OnInit {
  ankety: [any];
  show: boolean = false;
  anketaId: string;
  deleteModal: boolean = false;
  createModal: boolean = false;
  interval;
  grid = true;
  constructor(private anketyService: AnketyService, private router: Router) {}

  ngOnInit() {
    if (localStorage.getItem("grid"))
      this.grid = localStorage.getItem("grid") === "true";
    this.getAnkety();
    this.interval = setInterval(() => {
      this.getAnkety();
    }, 5000);
  }

  enableSurvey(id) {
    const { enabled } = this.ankety.find((e) => e._id === id);
    this.anketyService.enableSurvey(id, !enabled).subscribe(() => {});
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  playAnketa(id: string) {
    window.open(`/play/${id}`, "_blank");
  }

  editAnketa(id, type) {
    this.router.navigateByUrl(`/admin/edit/${id}/${type}`);
  }

  deleteAnketa() {
    this.anketyService.deleteAnketa(this.anketaId).subscribe((data) => {
      this.toggleDeleteModal();
      this.getAnkety();
    });
  }

  setAnketa(id: string) {
    this.anketaId = id;
    this.toggleDeleteModal();
  }

  toggleView() {
    this.grid = !this.grid;
    localStorage.setItem("grid", `${this.grid}`);
  }

  toggleDeleteModal() {
    this.deleteModal = !this.deleteModal;
  }

  toggleCreateModal() {
    this.createModal = !this.createModal;
  }

  getAnkety() {
    this.anketyService.getAnkety().subscribe((data: any) => {
      if (this.ankety != data) this.ankety = data;
    });
  }

  showAnketaDetail(id) {
    this.router.navigateByUrl(`/admin/detail/${id}`);
  }

  downloadExcelFile() {
    window.location.href = `${environment.API_URL}/api/results/excelAll`;
  }

  get animationState() {
    return this.show ? "show" : "hide";
  }

  get isAdded() {
    return this.router.url == "/admin/ankety/new" ? true : false;
  }

  animateElement() {
    this.show = !this.show;
  }

  duplicateAnketa(id) {
    this.anketyService.duplicateSurvey(id).subscribe((data) => {
      this.getAnkety();
    });
  }
}

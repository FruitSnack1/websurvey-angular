import { Component, OnInit } from "@angular/core";
import { AnketyService } from "src/app/services/ankety.service";

@Component({
  selector: "app-console",
  templateUrl: "./console.component.html",
  styleUrls: ["./console.component.css"],
})
export class ConsoleComponent implements OnInit {
  ankety;
  highest = 0;
  constructor(private anketyService: AnketyService) {}

  ngOnInit(): void {
    this.getResults();
    setInterval(() => {
      this.getResults();
    }, 5000);
  }

  getResults() {
    this.anketyService.getAnkety().subscribe((data) => {
      if (this.ankety == data) return;
      this.ankety = data;
      this.ankety.sort((first, second) => {
        if (first.result_count > second.result_count) return -1;
        if (first.result_count < second.result_count) return 1;
        return 0;
      });
      this.ankety.forEach((e) => {
        if (e.result_count > this.highest) this.highest = e.result_count;
      });
    });
  }

  width(a) {
    return (a.result_count / this.highest) * 100;
  }
}

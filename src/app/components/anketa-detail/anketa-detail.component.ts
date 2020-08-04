import { Component, OnInit } from "@angular/core";
import { AnketyService } from "src/app/services/ankety.service";
import { ActivatedRoute } from "@angular/router";
import { ResultsService } from "src/app/services/results.service";
import { Chart } from "chart.js";
import { Anketa } from "../../models/anketa.model";
import { Result } from "../../models/result.model";

@Component({
  selector: "app-anketa-detail",
  templateUrl: "./anketa-detail.component.html",
  styleUrls: ["./anketa-detail.component.css"],
})
export class AnketaDetailComponent implements OnInit {
  constructor(
    private anketyService: AnketyService,
    private route: ActivatedRoute,
    private resultsService: ResultsService
  ) {}

  anketa: Anketa;
  results: Result[];
  questionsResults;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    this.anketyService.getAnketa(id).subscribe((data) => {
      this.anketa = data;
      console.log(this.anketa);
    });

    this.resultsService.getResults(id).subscribe((data) => {
      this.results = data;
      console.log(this.results);
    });

    console.log(this.labels);
  }

  map_range(value, low1, high1, low2, high2) {
    return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
  }

  get labels() {
    if (!this.anketa) return [];
    let answers = [];
    for (let answer in this.anketa.answers) {
      answers.push(answer.cs);
    }
    return answers;
  }
}

import { Component, OnInit } from "@angular/core";
import { AnketyService } from "src/app/services/ankety.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ResultsService } from "src/app/services/results.service";
import { Chart } from "chart.js";
import { environment } from "src/environments/environment";
import { Clipboard } from "@angular/cdk/clipboard";

@Component({
  selector: "app-anketa-detail",
  templateUrl: "./anketa-detail.component.html",
  styleUrls: ["./anketa-detail.component.css"],
})
export class AnketaDetailComponent implements OnInit {
  constructor(
    private anketyService: AnketyService,
    private route: ActivatedRoute,
    private resultsService: ResultsService,
    private clipboard: Clipboard,
    private router: Router
  ) {}

  anketa: any;
  results: any;
  anketa_qr: string;
  surveyUrl: string;
  id;
  interval;
  enabled;
  users = false;

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    this.anketyService.getAnketa(this.id).subscribe((data) => {
      this.anketa = data;
      if (!this.anketa.enabled) this.enabled = true;
      else this.enabled = this.anketa.enabled;
      this.anketa_qr = `${environment.API_URL}/qrcodes/${this.anketa._id}.png`;
      this.surveyUrl = `${window.location.protocol}//${window.location.host}/play/${this.anketa._id}`;
    });
    this.fetchData();
    this.interval = setInterval(() => {
      this.fetchData();
    }, 5000);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  fetchData() {
    this.resultsService.getResults(this.id).subscribe((data) => {
      if (this.results != data) this.results = data;
    });
  }

  map_range(value, low1, high1, low2, high2) {
    return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
  }

  deleteResults() {
    this.resultsService
      .deleteSurveyResults(this.anketa._id)
      .subscribe((data) => this.fetchData());
  }

  setBarChart() {
    var myChart = new Chart("bar", {
      type: "doughnut",
      data: {
        labels: this.labels,
        datasets: [
          {
            label: "# of Votes",
            data: this.chartResults,
            backgroundColor: [
              "#81c26d",
              "#bfdd92",
              "#fff374",
              "#f4c385",
              "#d22630",
            ],
            hoverBackgroundColor: [
              "#81c26d",
              "#bfdd92",
              "#fff374",
              "#f4c385",
              "#d22630",
            ],
            borderWidth: 0,
          },
        ],
      },
    });
  }

  setRadarChart() {
    var myChart = new Chart("radar", {
      type: "radar",
      data: {
        labels: this.labels,
        datasets: [
          {
            label: "Počet hlasů",
            data: this.chartResults,
            backgroundColor: ["rgba(129,194,107,.5)"],
            borderWidth: 0,
          },
        ],
      },
      options: {
        scale: {
          ticks: {
            beginAtZero: true,
            min: 0,
            stepSize: 1,
          },
        },
      },
    });
  }

  get labels() {
    if (!this.anketa) return [];
    let answers = [];
    for (let answer of this.anketa.answers) {
      answers.push(answer.answer.cs);
    }
    return answers;
  }

  get questionResults() {
    
    return [];
  }

  get chartResults() {
    
    return [];
  }

  getBarWidth(i, j) {
    if (!this.results || this.anketa.type == 2) return [0, 0, 0, 0, 0];
    return (this.questionResults[i][j] / this.results.length) * 100 + "%";
  }

  copySurveyUrl() {
    this.clipboard.copy(this.surveyUrl);
  }

  editSurvey() {
    this.router.navigateByUrl(
      `admin/edit/${this.anketa._id}/${this.anketa.type}`
    );
  }

  deleteSurvey() {
    this.anketyService.deleteAnketa(this.anketa._id).subscribe((data) => {
      this.router.navigateByUrl(`admin/ankety`);
    });
  }

  previewSurvey() {
    this.router.navigateByUrl(`preview/${this.anketa._id}`);
  }

  downloadExcelFile() {
    window.location.href = `${environment.API_URL}/api/results/${this.anketa._id}/excel`;
  }

  enableSurvey() {
    this.enabled = !this.enabled;
    this.anketyService.enableSurvey(this.id, this.enabled).subscribe(() => {});
  }
}

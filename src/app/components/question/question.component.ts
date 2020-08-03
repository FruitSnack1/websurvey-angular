import { Component, OnInit, Input, ElementRef } from "@angular/core";
import { Chart } from "chart.js";

@Component({
  selector: "app-question",
  templateUrl: "./question.component.html",
  styleUrls: ["./question.component.css"],
})
export class QuestionComponent implements OnInit {
  @Input() question: any;
  @Input() results;

  constructor(private elementRef: ElementRef) {}
  chart;
  ngOnInit() {
    console.log(this.question);
    let htmlRef = this.elementRef.nativeElement.querySelector(`#chart`);
    this.chart = new Chart(htmlRef, {
      type: "bar",
      data: {
        labels: ["Určitě ano", "Spíše ano", "Nevím", "Spíše ne", "Určitě ne"],
        datasets: [
          {
            data: [2, 3, 7, 6, 4],
            backgroundColor: [
              "rgb(75, 168, 46)",
              "rgb(129, 194, 109)",
              "rgb(219, 238, 213)",
              "rgb(234, 81, 103)",
              "rgb(210, 38, 48)",
            ],
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
        legend: {
          display: false,
        },
      },
    });
    console.log(this.chart);
  }
}

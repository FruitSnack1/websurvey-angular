import { Component, Input, OnInit } from "@angular/core";
import * as Chart from "chart.js";

@Component({
  selector: "[app-chart-bar]",
  templateUrl: "./chart-bar.component.html",
  styleUrls: ["./chart-bar.component.css"],
})
export class ChartBarComponent implements OnInit {
  @Input() data;
  @Input() labels;
  @Input() id;
  chart;

  ngAfterViewInit() {
    // console.log(this.width(0));
    // let ctx: any = document.getElementById(this.id);
    // this.chart = new Chart(ctx, {
    //   type: "bar",
    //   data: {
    //     labels: this.labels,
    //     datasets: [
    //       {
    //         data: this.data,
    //         backgroundColor: "#4ba82e",
    //         hoverBackgroundColor: "#419128",
    //         borderWidth: 0,
    //         label: "",
    //       },
    //     ],
    //   },
    //   options: {
    //     legend: {
    //       display: false,
    //     },
    //     scales: {
    //       yAxes: [
    //         {
    //           ticks: {
    //             beginAtZero: true,
    //             stepSize: 1,
    //           },
    //         },
    //       ],
    //     },
    //     responsive: true,
    //   },
    // });
  }

  ngOnInit() {}

  // ngOnChanges(changes) {
  //   if (this.chart) this.update();
  // }

  update() {
    this.chart.data.datasets[0].data = this.data;
    this.chart.update();
  }

  get sum() {
    return this.data.reduce((a, b) => a + b);
  }

  width(i): number {
    if (!this.sum) return 0;
    return (this.data[i] / this.sum) * 100;
  }

  percent(width) {
    return `${Math.floor(width * 10) / 10}%`;
  }
}

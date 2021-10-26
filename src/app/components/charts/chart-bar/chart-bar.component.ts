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
    
  }

  ngOnInit() {}

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

  count(i) {
    return this.data[i];
  }

  percent(width) {
    return `${Math.floor(width)}%`;
  }
}

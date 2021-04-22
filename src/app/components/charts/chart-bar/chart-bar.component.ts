import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "[app-chart-bar]",
  templateUrl: "./chart-bar.component.html",
  styleUrls: ["./chart-bar.component.css"],
})
export class ChartBarComponent implements OnInit {
  @Input() data;
  @Input() labels;
  public barChartOptions = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            stepSize: 1,
          },
        },
      ],
    },
    scaleShowVerticalLines: false,
    responsive: true,
    lineOnHover: {
      enabled: false,
    },
  };
  public barChartLabels;
  public barChartType = "bar";
  public barChartLegend = false;
  public barChartData;

  ngOnInit() {
    this.barChartLabels = this.labels;
    this.barChartData = [
      {
        data: this.data,
        labels: this.barChartLabels,
        backgroundColor: "#4ba82e",
        hoverBackgroundColor: "#4ba82e",
        borderWidth: 0,
      },
    ];
  }
}

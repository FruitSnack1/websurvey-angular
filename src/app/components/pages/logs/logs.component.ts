import { Component, OnInit } from "@angular/core";
import { LogsService } from "src/app/services/logs.service";

@Component({
  selector: "app-logs",
  templateUrl: "./logs.component.html",
  styleUrls: ["./logs.component.css"],
})
export class LogsComponent implements OnInit {
  logs: any[];
  data: any[];
  filter = "date";
  d = 1;
  search = "";
  constructor(private logService: LogsService) {}

  ngOnInit(): void {
    this.logService.getLogs().subscribe((data: [any]) => {
      this.data = data;
      this.logs = this.data;
      this.sort("date");
    });
  }

  actionIcon(action) {
    switch (action) {
      case "login":
        return "fas fa-sign-in-alt text-info mr-1 w-25";
      case "create":
        return "fas fa-plus text-success mr-1 w-25";
      case "update":
        return "fas fa-edit text-info mr-1 w-25";
      case "delete":
        return "far fa-trash-alt text-danger mr-1 w-25";
      case "result":
        return "fas fa-plus text-info mr-1 w-25";
    }
  }

  sort(filter) {
    if (this.filter == filter) this.d *= -1;
    this.filter = filter;
    if (filter == "date") {
      this.logs = this.logs.sort((a, b) => {
        return (
          <any>new Date(b.date) * -this.d - <any>new Date(a.date) * -this.d
        );
      });
    } else if (filter == "user") {
      this.logs = this.logs.sort((a, b) => {
        if (!a.user || !b.user) return -this.d;
        if (a.user.username < b.user.username) return -this.d;
        if (a.user.username > b.user.username) return this.d;
        return 0;
      });
    } else {
      this.logs = this.logs.sort((a, b) => {
        if (a[filter] < b[filter]) return -this.d;
        if (a[filter] > b[filter]) return this.d;
        return 0;
      });
    }
  }

  getIcon(filter) {
    if (this.filter == filter) {
      if (this.d == -1) return "fas fa-sort-down mr-3 text-success";
      if (this.d == 1) return "fas fa-sort-up mr-3 text-success";
    }
    return "fas fa-sort mr-3";
  }

  filterLogs() {
    this.logs = this.data.filter((e) => {
      if (e?._id.includes(this.search)) return true;
      if (e?.action.includes(this.search)) return true;
      if (e?.city.includes(this.search)) return true;
      if (e?.ip.includes(this.search)) return true;
      if (e?.survey?.includes(this.search)) return true;
      if (e?.user?.username?.includes(this.search)) return true;
      return false;
    });
  }
}

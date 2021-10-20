import { Component, OnInit } from '@angular/core';
import { LogsService } from 'src/app/services/logs.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
  logs:any;
  constructor(private logService: LogsService) { }

  ngOnInit(): void {
    this.logService.getLogs().subscribe(data =>{
      console.log(data)
      this.logs = data;
    })
  }

}

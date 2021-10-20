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
    this.logService.getLogs().subscribe((data:[any]) =>{
      console.log(data)
      data.sort((a, b)=>{
        return <any>new Date(b.date) - <any>new Date(a.date);
      })
      this.logs = data;
    })
  }

}

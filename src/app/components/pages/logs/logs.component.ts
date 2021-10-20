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

  actionIcon(action){
    switch (action){
      case 'login':
        return 'fas fa-sign-in-alt text-info mr-1 w-25'
      case 'create':
        return 'fas fa-plus text-success mr-1 w-25'
      case 'update':
        return 'fas fa-edit text-info mr-1 w-25'
      case 'delete':
        return 'far fa-trash-alt text-danger mr-1 w-25'
      case 'result':
        return 'fas fa-plus text-info mr-1 w-25'

    }
    
  }

}

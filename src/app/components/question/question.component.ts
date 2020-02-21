import { Component, OnInit, Input } from '@angular/core';
import { Question } from 'src/app/models/question.model';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  @Input() questionNumber: Number
  questionN
  question = new Question()
  constructor() { }

  ngOnInit() {
    this.questionN = this.questionNumber
  }

}

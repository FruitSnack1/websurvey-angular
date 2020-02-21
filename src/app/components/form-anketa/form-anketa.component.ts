import { Component, OnInit } from '@angular/core';
import {Anketa} from '../../models/anketa.model'
import { QuestionComponent} from '../question/question.component'
import { Question } from 'src/app/models/question.model';
@Component({
  selector: 'app-form-anketa',
  templateUrl: './form-anketa.component.html',
  styleUrls: ['./form-anketa.component.css']
})
export class FormAnketaComponent implements OnInit {
  anketa = new Anketa()
  constructor() { }

  ngOnInit() {
  }

  addQuestion(){
    this.anketa.questions.push(new Question)
  }

}

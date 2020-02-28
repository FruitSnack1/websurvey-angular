import { Component, OnInit, NgModule } from '@angular/core'
import { FormGroup, FormBuilder, FormArray } from '@angular/forms'
import { AnketyService } from 'src/app/services/ankety.service'
import { Router } from '@angular/router'


@Component({
  selector: 'app-form-anketa',
  templateUrl: './form-anketa.component.html',
  styleUrls: ['./form-anketa.component.css']
})


export class FormAnketaComponent implements OnInit {

  anketaForm: FormGroup

  constructor(private fb: FormBuilder, private anketyService: AnketyService, private router:Router) { }

  ngOnInit() {
    

    this.anketaForm = this.fb.group({
      name: '',
      description: '',
      random_order: false,
      user_data: false,
      answers: this.fb.array([]),
      questions: this.fb.array([])
    })

    
    for (let i = 1; i <= 5; i++) {
      const answer = this.fb.group({
        name: [],
        value: [i]
      })
      this.answerForms.push(answer);
    }

    this.addQuestion()
  }

  get questionForms() {
    return this.anketaForm.get('questions') as FormArray
  }

  get answerForms() {
    return this.anketaForm.get('answers') as FormArray
  }

  addQuestion() {
    const question = this.fb.group({
      question: [],
      img: []
    })

    this.questionForms.push(question);
  }

  submitAnketa(){
    this.anketyService.createAnketa(this.anketaForm.value).subscribe(data =>{
      this.router.navigateByUrl('/adnkety')
    })
  }


}

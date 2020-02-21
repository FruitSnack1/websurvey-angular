import { Answer } from './answer.model'
import { Question } from './question.model'

export class Anketa {
    name:string
    description:string
    answers: Answer[] = [
        {
            name: 'Určitě ano',
            value: 1
        },
        {
            name: 'Spíše ano',
            value: 2
        },
        {
            name: 'Neutrální postoj',
            value: 3
        },
        {
            name: 'Spíše ne',
            value: 4
        },
        {
            name: 'Určitě ne',
            value: 5
        },
    ]
    questions: Question[] = [{
        question: '',
        img: ''
    }]
    random_order: boolean = false
    user_data: boolean = false
}

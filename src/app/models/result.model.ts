export class Result {
  anketa_id: string;
  answers: Answer[];
  _id: string;
}

class Answer {
  question_id: string;
  answer: string;
  time: number;
}

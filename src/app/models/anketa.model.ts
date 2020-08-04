import { Answer } from "./answer.model";
import { Question } from "./question.model";

export class Anketa {
  name: {
    cs: string;
    en: string;
    de: string;
  };
  description: {
    cs: string;
    en: string;
    de: string;
  };
  answers: Answer[];
  questions: Question[];
  random_order: boolean = false;
  user_data: boolean = false;
}

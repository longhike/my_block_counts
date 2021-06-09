export class Question {
  name: string;
  question: string;
  answerType: string;
  possibleAnswers: string[] | null;
  
  constructor(_n: string, _q: string, _t: string, _p: string[] | null) {
    this.name = _n;
    this.question = _q;
    this.answerType = _t;
    this.possibleAnswers = _p;
  }
}

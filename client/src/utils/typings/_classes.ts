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

export class FilterHandler {
  rawFilter: any;
  length: number;
  constructor(r: any) {
    this.rawFilter = r;
    this.length = Object.keys(r).length;
  }

  public getQueryString(): string {
    let query = "";
    let i = 0;
    for (const key in this.rawFilter) {
      if (i === this.length - 1) {
        query += `${key}=${this.rawFilter[key]}`;
        continue;
      }
      query += `${key}=${this.rawFilter[key]}+`;
      i++;
    }
    return query;
  }
}

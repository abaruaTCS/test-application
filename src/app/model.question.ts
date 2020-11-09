export class Question {
  constructor(
    public q: string,
    public oOne: string,
    public oTwo: string,
    public oThree: string,
    public oFour: string,
    public ans: string,
    public correct: boolean,
    public userResponse: string
  ) {}
}

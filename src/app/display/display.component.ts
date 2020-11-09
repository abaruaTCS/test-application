import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Question } from '../model.question';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css'],
})
export class DisplayComponent implements OnInit {
  flag = true;
  submitFlag = false;
  questionInfo: Question[];

  answerRef = new FormGroup({
    one: new FormControl(),
    two: new FormControl(),
    three: new FormControl(),
    four: new FormControl(),
  });

  constructor(private questionService: QuestionService) {}

  i = 0;
  q = null;
  oOne = null;
  oTwo = null;
  oThree = null;
  oFour = null;
  ans = null;
  total = null;
  totalCorrect = 0;
  correct = null;

  ngOnInit(): void {
    this.questionService
      .loadQuestionDetails()
      .subscribe((data) => (this.questionInfo = data));
  }

  takeQuiz(): void {
    this.flag = false;
    this.total = this.questionInfo.length;
    this.q = this.questionInfo[this.i].q;
    this.oOne = this.questionInfo[this.i].oOne;
    this.oTwo = this.questionInfo[this.i].oTwo;
    this.oThree = this.questionInfo[this.i].oThree;
    this.oFour = this.questionInfo[this.i].oFour;
    this.ans = this.questionInfo[this.i].ans;
  }

  loadNextQuestion(): void {
    this.answerRef.reset();
    if (this.i < this.questionInfo.length - 1) {
      this.i++;
    }
    this.q = this.questionInfo[this.i].q;
    this.oOne = this.questionInfo[this.i].oOne;
    this.oTwo = this.questionInfo[this.i].oTwo;
    this.oThree = this.questionInfo[this.i].oThree;
    this.oFour = this.questionInfo[this.i].oFour;
    this.ans = this.questionInfo[this.i].ans;
  }

  loadPrevQuestion(): void {
    if (this.i > 0) {
      this.i--;
    }
    this.q = this.questionInfo[this.i].q;
    this.oOne = this.questionInfo[this.i].oOne;
    this.oTwo = this.questionInfo[this.i].oTwo;
    this.oThree = this.questionInfo[this.i].oThree;
    this.oFour = this.questionInfo[this.i].oFour;
    this.ans = this.questionInfo[this.i].ans;
  }

  loadFirstQuestion(): void {
    this.i = 0;
    this.q = this.questionInfo[this.i].q;
    this.oOne = this.questionInfo[this.i].oOne;
    this.oTwo = this.questionInfo[this.i].oTwo;
    this.oThree = this.questionInfo[this.i].oThree;
    this.oFour = this.questionInfo[this.i].oFour;
    this.ans = this.questionInfo[this.i].ans;
  }

  loadLastQustion(): void {
    this.i = this.questionInfo.length - 1;
    this.q = this.questionInfo[this.i].q;
    this.oOne = this.questionInfo[this.i].oOne;
    this.oTwo = this.questionInfo[this.i].oTwo;
    this.oThree = this.questionInfo[this.i].oThree;
    this.oFour = this.questionInfo[this.i].oFour;
    this.ans = this.questionInfo[this.i].ans;
  }

  checkAnswer(): void {
    let c = this.ans;
    if (this.answerRef.value[c] == true) {
      this.totalCorrect++;
      this.questionInfo[this.i].correct = true;
    }
    console.log(c);
    console.log(this.answerRef.value);
    this.questionInfo[this.i]['userResponse'] = Object.keys(
      this.answerRef.value
    )[Object.values(this.answerRef.value).indexOf(true)];
    console.log(this.questionInfo[this.i].userResponse);
    console.log(`${this.totalCorrect} / ${this.total}`);
  }

  submitQuiz(): void {
    console.log('submit quiz');
    this.submitFlag = true;
  }
}

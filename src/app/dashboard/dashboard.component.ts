import { Component, OnInit } from '@angular/core';
import {Test} from "../models/test";
import {DashboardService} from "../services/dashboard.service";
import {Question} from "../models/Question";
import {Observable, Observer} from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  choices: string[] = [];
  questionInfo: string = 1 + "/" + 4;
  duration: any;
  time = new Observable<number>((observer: Observer<number>) => {
  setInterval(() => observer.next(this.setTime()), 1000);
});
  tests: Test[] = [];
  question: Question = new Question();
  questions: Question[] = [];
  index = 0;
  gameNotOver: boolean = true;
  averageResult: number = 0;
  averageTime: number = 0;
  currentResult: number = 0;
  currentTest: Test;
  testResults: Array<Test> = [];
  private newQuestion: boolean = false;

  constructor(private dashboardService :DashboardService) {
    this.currentTest = new Test();
    this.currentTest.date = new Date();
  }

  ngOnInit(): void {
    this.dashboardService.getQuestions().subscribe(
      (questions: Array<Question>) => {
        this.questions = questions;
        this.newQuestion = true;
        this.gameNotOver = false;
      })
  }

  /* Names of methods indicacate what their do*/

  setNewQuestion(){
    console.log( "index",this.index);
    if (this.questions){
      this.question = this.questions[this.index++%5];
    }
  }

// methods is call when the player clic on a choice(answer)
  nextQuestion(ind: number) {
    this.checkAnswers(ind);
    this.setNewQuestion();
    this.setChoices();
    this.setQuestionInfo();
  }

  // method to set new test when clicked on start new test
  startNewTest() {
    this.startGame();
    if (this.newQuestion) {
      this.nextQuestion(-1);
    } else {
      this.dashboardService.getQuestions().subscribe(
        (questions: Array<Question>) => {
          this.questions = questions;
          this.nextQuestion(-1);
        })
    }
  }

  private setChoices() {
    if (this.question){
      this.choices = this.question.choices;
    }
  }

  private setQuestionInfo() {
    if(this.index%5 === 0){
      this.endGame();
    }
    this.questionInfo = this.index%5 + "/" + this.questions.length;
    this.duration = 0;
  }

  private setTime() {
    const now = new Date();
    this.duration = Math.floor((now.getTime() - this.currentTest.date.getTime())/1000) ;
    return this.duration
  }

  private endGame() {
    this.gameNotOver = false;
    this.newQuestion = false;
    this.index = 0;
    const testResultsJson = localStorage.getItem("testResults");
    if (testResultsJson != null) {
      this.testResults = JSON.parse(testResultsJson);
    }
    this.currentTest.result = this.currentResult;
    this.currentTest.duration = this.duration;
    this.testResults.push(this.currentTest);

    const len = this.testResults.length;
    this.testResults.forEach((t) => {
      this.averageResult = t.result/len, this.averageTime = t.duration/len });
    localStorage.setItem("testResults", JSON.stringify(this.testResults));
  }

  private startGame() {
    this.gameNotOver = true;
    this.question = new Question();
    this.currentTest = new Test();
    this.duration = 0;
    this.currentResult = 0;
    this.currentTest.date = new Date();
  }

  private checkAnswers(ind: number) {
    if (ind === -1 || !this.question ){
      return
    }
    if(this.question.response === this.choices[ind]) {
      console.log("erfolg", this.currentResult);
      ++this.currentResult;
      this.currentTest.result = this.currentResult;
    }
  }

  emptyStorage(){
    localStorage.removeItem("testResults");
    window.location.reload();
  }
}

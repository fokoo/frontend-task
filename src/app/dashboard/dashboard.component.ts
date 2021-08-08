import { Component, OnInit } from '@angular/core';
import {Test} from "../models/test";
import {DashboardService} from "../services/dashboard.service";
import {Question} from "../models/Question";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  choices: any;
  questionInfo: any;
  duration: any;
  tests: Test[] = [];
  question: Question = new Question();
  questions: Question[] = [];
  index = 0;
  gameNotOver: boolean = true;


  constructor(private dashboardService :DashboardService) {
  }

  ngOnInit(): void {
    this.dashboardService.getQuestions().subscribe(
      (questions: Array<Question>) => {
      this.questions = questions;
      this.nextQuestion();
     })
  }

  setNewQuestion(){
    console.log( "index",this.index)
    this.question = this.questions[this.index++%5];
  }
  nextQuestion() {
    this.setNewQuestion();
    this.setQuestionInfo();
    this.setChoices();
    this.setTime();
    this.checkAnswers();
    // calcule current result
  }

  startNewTest() {
    this.startGame();
    this.ngOnInit();
  }

  private setChoices() {
    this.choices = this.question.choices;
  }

  private setQuestionInfo() {
    if(this.index%5 === 0){
      this.endGame();
    }
    this.questionInfo = this.index%5 + "/" + this.questions.length;
  }

  private setTime() {
    this.duration = 100 + "secondes"
  }

  private endGame() {
    this.gameNotOver = false;
    this.index = 0;
  }

  private startGame() {
    this.gameNotOver = true;
  }

  private checkAnswers() {

  }
}

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
  choices: string[] = [];
  questionInfo: string = 1 + "/" + 4;
  duration:  string = "0 seconde";
  tests: Test[] = [];
  question: Question = new Question();
  questions: Question[] = [];
  index = 0;
  gameNotOver: boolean = true;
  colorAnswer: string = "color: darkblue";


  constructor(private dashboardService :DashboardService) {

  }

  ngOnInit(): void {
    this.dashboardService.getQuestions().subscribe(
      (questions: Array<Question>) => {
      this.questions = questions;
      this.nextQuestion(-1);
     })
  }

  setNewQuestion(){
    console.log( "index",this.index)
    this.question = this.questions[this.index++%5];
  }
  nextQuestion(ind: number) {
    this.setNewQuestion();
    this.setQuestionInfo();
    this.setChoices();
    this.setTime();
    this.checkAnswers(ind);
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

  private checkAnswers(ind: number) {
    if (ind === -1){
      return
    }
    if(this.question.response === this.choices[ind]){
      this.colorAnswer = "color: darkblue; background-color: green"
    } else {
      this.colorAnswer = "color: darkblue; background-color: red"
    }
    this.colorAnswer = "color: darkblue";
  }
}

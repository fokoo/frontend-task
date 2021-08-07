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
  time: any;
  tests: Test[] = [];
  question: Question = new Question();
  questions: Question[] = [];
  index = 0;


  constructor(private dashboardService :DashboardService) {
  }

  ngOnInit(): void {
    this.dashboardService.getQuestions().subscribe(
      (questions: Array<Question>) => {
      this.questions = questions;
      this.setNewQuestion();
     })
  }

  setNewQuestion(){
    this.question = this.questions[this.index++%4];
  }
  nextQuestion() {
    this.setNewQuestion();
    // check if good answers
    // calcule current result
  }

  startNewTest() {
    this.ngOnInit();
  }
}

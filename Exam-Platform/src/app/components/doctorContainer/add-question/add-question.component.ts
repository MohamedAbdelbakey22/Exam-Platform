import { Component, EventEmitter, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Course } from 'src/app/interfaces/course.js';
import { Exam } from 'src/app/interfaces/exam.js';
import { Question } from 'src/app/interfaces/question.js';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  constructor(private _AuthService:AuthService , private _ActivatedRoute:ActivatedRoute){}

  courseId!:any;

  courseActive!:Course

  exam: any = {};

  timerValue !: number;

  examDateTime!: string;

  onChange() {
    this._AuthService.setTimerValue(this.timerValue);
  }

  onDateChange(): void {
    // Store the exam date and time in local storage
    localStorage.setItem(`examDateTime_${this.courseId}`, this.examDateTime);
  }

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe((params)=>{
      this.courseId = params.get('id')
    })
    this.getCourse()

    this._AuthService.timerValue$.subscribe((value) => {
      this.timerValue = value;
    });

  }

  getCourse(){
    this._AuthService.getCourse(this.courseId).subscribe({
      next:(response)=>{
        // console.log(response);
        this.courseActive = response.course;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  questions: Question[] = [];

  currentQuestion: any = {};

  addQuestion() {
    this.questions.push({ ...this.currentQuestion, options: [] });
    this.currentQuestion = {};
  }

  selectExam(exam: Exam) {
    this.exam = { ...exam };
  }

  removeQuestion(index: number) {
    this.questions.splice(index, 1);
  }

  removeOption(question: any, index: number) {
    question.options.splice(index, 1);
  }

  addOption(question: any) {
    question.options.push('');
  }

   // ==== Add Questions ====

  submitQuestions(){

    this.timerValue
      this._AuthService.addQuestion([...this.questions], this.courseId).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (err) => {
          console.error(err);
        }
      });

      this.onDateChange()
  }

  setTimer() {
    this._AuthService.setTimerValue(this.timerValue);
  }

  preventNextField(event: KeyboardEvent, questionIndex: number, optionIndex: number) {
    const currentOption = this.questions[questionIndex].options[optionIndex];
  
    if (currentOption.length >= 1 && event.key != 'Backspace') {
      event.preventDefault();
    }
  }

}

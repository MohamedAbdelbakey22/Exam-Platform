import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/interfaces/course';
import { Question } from 'src/app/interfaces/question';
import { AuthService } from 'src/app/services/auth.service'; // Assuming AuthService is used for API calls

@Component({
  selector: 'app-sexam',
  templateUrl: './sexam.component.html',
  styleUrls: ['./sexam.component.css']
})
export class SexamComponent implements OnInit {

  constructor(private _authService: AuthService, private _ActivatedRoute: ActivatedRoute) {}

  courseId!: any;

  courseActive!: Course;

  questions: Question[] = [];

  currentQuestionIndex = 0;

  selectedOptions: string[] = [];

  studentAnswers: { [key: string]: any } = {};

  questionsNum!: number;

  submitted = false;

  soundPlayed = false;

  result!: any;

  score = 0;

  timer!: number;

  examStartDateTime!: string;

  canTakeExam = false;

  openCam:boolean = false;

  // selectedFile: File | null = null;

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe(params => {
      this.courseId = params.get('id');
      this.getCourse();
    });
    // this.startTimer();

    this._authService.timerValue$.subscribe((value) => {
      this.timer = value * 60;
    });

    this.checkExamDateTime();

  }

  // ==== Open Camera ====
  openCamera(){
    this.openCam = !this.openCam;
  }

  checkExamDateTime(): void {
    this.examStartDateTime = localStorage.getItem(`examDateTime_${this.courseId}`) || '';
    const examStartDate = new Date(this.examStartDateTime);
    const currentTime = new Date();
    this.canTakeExam = currentTime >= examStartDate;

    if (!this.canTakeExam) {
      setInterval(() => {
        const currentTimeCheck = new Date();
        if (currentTimeCheck >= examStartDate) {
          this.canTakeExam = true;
        }
      }, 1000);
    }

    if (this.canTakeExam) {
      this.startTimer();
    }
  }

  getCourse(): void {
    this._authService.getCourse(this.courseId).subscribe({
      next: (response) => {
        // console.log(response);
        this.courseActive = response.course;
        this.getQuestions(this.courseId);
      },
      error: (err) => {
        console.error('Error fetching course:', err);
      }
    });
  }

  getQuestions(id: string): void {
    this._authService.getQuestions(id).subscribe({
      next: (response) => {
        // console.log(response);
        this.questionsNum = response.quests.length;
        this.questions = response.quests;
        this.selectedOptions = new Array(this.questionsNum);
      },
      error: (err) => {
        console.error('Error fetching questions:', err);
      }
    });
  }

  nextQuestion(): void {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  previousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  startTimer(): void {
    setInterval(() => {
      this.timer--;
      if (this.timer <= 0) {
        this.submitQuestions();
      } else if (this.timer < 60 && !this.soundPlayed) {
        this.playSound();
      }
    }, 1000);
  }

  playSound(): void {
    const audio = new Audio('./assets/sounds/timer.mp3');
    audio.play();
    this.soundPlayed = true;
  }

  submitQuestions(): void {

    this.studentAnswers = this.questions.map((question, index) => ({
      questionId: question.id,
      answer: this.selectedOptions[index]
    }));

    this.calculateScore();
    this.submitted = true;

  }

  calculateScore(): void {
    this.score = 0;
    this.questions.forEach((question, index) => {
      if (this.selectedOptions[index] === question.correctAnswer) {
        this.score++;
      }
    });
    this.result = `${this.score} from ${this.questionsNum}`;
  }

  // onFileSelected(event: any) {
  //   this.selectedFile = event.target.files[0];
  //   if (this.selectedFile) {
  //     this._authService.detectFaces(this.selectedFile).subscribe({
  //       next: (response) => {
  //         console.log('Face detection response:', response);
  //       },
  //       error: (err) => {
  //         console.error('Face detection error:', err);
  //       }
  //     });
  //   }
  // }

}

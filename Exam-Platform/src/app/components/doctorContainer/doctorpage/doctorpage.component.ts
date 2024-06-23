import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/interfaces/course.js';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-doctorpage',
  templateUrl: './doctorpage.component.html',
  styleUrls: ['./doctorpage.component.css']
})
export class DoctorpageComponent implements OnInit {
  
  constructor(private _AuthService:AuthService){
  }

  ngOnInit(): void {
    this.getCourses();
  }

  doctorName = localStorage.getItem('doctorName');

  courses:Course[] = [];

  showCourses = false;

  instructions:boolean = true;

  instructionBtn(){
    this.instructions = false;
  }

  toggle() {
    this.showCourses =!this.showCourses;
  }

   // ==== Get Courses ====
   getCourses(){
    this._AuthService.getCourses().subscribe({
      next:(response)=>{
        // console.log(response);
        this.courses = response.courses;
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
  
  logOut(){
    this._AuthService.logoutDoc();
  }

}

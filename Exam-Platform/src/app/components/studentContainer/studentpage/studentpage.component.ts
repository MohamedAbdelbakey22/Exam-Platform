import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/interfaces/course.js';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-studentpage',
  templateUrl: './studentpage.component.html',
  styleUrls: ['./studentpage.component.css']
})
export class StudentpageComponent implements OnInit{

  constructor(private _AuthService:AuthService , private _Router:Router){
    
  }

  ngOnInit(): void {
    this.getCourses();
  }

  studentName = localStorage.getItem('studentName');

  isAdmin = localStorage.getItem('isAdmin')

  courses:Course[] = [];

  showCourses = false;

  toggle() {
    this.showCourses = !this.showCourses;
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
    this._AuthService.logoutStu();
  }

}

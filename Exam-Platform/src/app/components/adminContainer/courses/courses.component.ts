import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/interfaces/course.js';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  constructor(private _AuthService:AuthService , private _ToastrService:ToastrService){}

  ngOnInit(): void {
    this.getCourses()
  }

  courses!:Course[]

  searchCourse:string='';

  add:boolean = false;

  manageCourses:boolean = true;

  inValidForm:boolean = false;

  errorMsg:string = '';

  isLoading:boolean = false;

  addCoursesBtn(){
    this.manageCourses = false;
    this.add = true;
  }

  mangeCourseBtn(){
    this.add = false;
    this.manageCourses = true;
  }

  // ==== Get Courses ====
  getCourses(){
    this._AuthService.getCourses().subscribe({
      next:(response)=>{
        if(response.message == 'success'){
          this.courses = response.courses;
          console.log(response);
        }
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  // ==== Delete Courses ====
  deleteCourse(id:string){
    this._AuthService.deleteCourse(id).subscribe({
      next:(response)=>{
        console.log(response);
        this.getCourses();
        this.removeCourse(id);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  courseForm:FormGroup = new FormGroup({
    name:new FormControl(null,[Validators.required]),
    code:new FormControl(null,[Validators.required]),
    department:new FormControl(null,[Validators.required]),
  })

  // ==== Add Course ====

  addCourse(courseForm:FormGroup){
    this.isLoading = true;
    if(courseForm.valid){
      this._AuthService.addCourse(courseForm.value).subscribe({
        next:(response)=>{
          console.log(response);
          this.isLoading = false;
          this.alertCourse(response.courses.at(-1).name)
          this.getCourses();
          courseForm.reset();
        },
        error:(err)=>{
          console.log(err);
          this.isLoading = false;
        }
      })
    }else{
      this.inValidForm = true;
      this.isLoading = false;
    }
  }

  //  ==== Show Toastor ====
   alertCourse(courseName:string){
    this._ToastrService.success(`${courseName} has been added successfully`,'',{
      timeOut: 1500,
      progressBar: true,
      progressAnimation: 'increasing',
      positionClass:'toast-top-center'
    })                                                        
    }
    
  removeCourse(courseId:string){
    let courseName = '';
    for(let i=0 ; i<this.courses.length ; i++){   
      if(this.courses[i]._id == courseId){
        courseName = this.courses[i].name;
      }
    }
    this._ToastrService.error(`${courseName} has been Deleted successfully`,'',{
      timeOut: 1500,
      progressBar: true,
      progressAnimation: 'increasing',
      positionClass:'toast-top-center'
    })                                                        
    }

}

import { User } from 'src/app/interfaces/user.js';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-managestudent',
  templateUrl: './managestudent.component.html',
  styleUrls: ['./managestudent.component.css']
})

export class ManagestudentComponent implements OnInit {

  constructor(private _AuthService:AuthService , private _ToastrService:ToastrService , private _Router:Router){}

  studentsData!:User[] ;

  ngOnInit(): void {
    // ==== Get All Students ====
    this.getAllStudents()
  }

  getAllStudents(){
    // ==== Get All Students ====
    this._AuthService.getAllStudent().subscribe({
      next:(response)=>{
        if(response.message == 'success'){
          // console.log(response.Students);
          this.studentsData = response.Students
        }
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  isLoading:boolean = false;

  errorMsg:string = '';

  inValidForm:boolean = false;

  searchByNID:string ='';

  registerForm:FormGroup = new FormGroup({
    name: new FormControl(null,[Validators.required]),
    nationalPerson: new FormControl(null,[Validators.required,Validators.pattern(/^[\d]{14}$/)]),
    gmail: new FormControl(null,[Validators.required,Validators.email]),
    level: new FormControl(null,[Validators.required]),
    password: new FormControl(null,[Validators.required]),
    code: new FormControl(null,[Validators.required]),
  })

  handleRegisterForm(registerForm:FormGroup){
    this.isLoading = true;
    if(registerForm.valid){
      this._AuthService.addStudent(registerForm.value).subscribe({
        next:(response)=>{
          this.isLoading = false;
          this.getAllStudents()
          this.addStudent(response.newUser.name);
          registerForm.reset();
          // console.log(response);
        },
        error:(err)=>{
          this.isLoading = false;
          this.errorMsg = err.error.message;
          console.log(err);
        }
      })
    }else{
      this.inValidForm = true;
      this.isLoading = false;
    }
  }

  // ==== Remove Student ====
  removeStudent(id:string){
    this._AuthService.removeStudent(id).subscribe({
      next:(response)=>{
        if(response.message ==='Deleted'){
          this.getAllStudents()
          this.deleteStudent(id);
          console.log(response);
        }
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

    // ==== Show Toastor ====
    addStudent(studentName:string){
      this._ToastrService.success(`${studentName} has been added successfully`,'',{
        timeOut: 1500,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass:'toast-top-center'
      })                                                        
      }
      
    deleteStudent(studentId:string){
      let studentName = '';
      for(let i=0 ; i<this.studentsData.length ; i++){   
        if(this.studentsData[i]._id == studentId){
          studentName = this.studentsData[i].name;
        }
      }
      this._ToastrService.error(`${studentName} has been Deleted successfully`,'',{
        timeOut: 1500,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass:'toast-top-center'
      })                                                        
      }

  hideStudent(){
      document.getElementById('displayStudent')?.classList.add('hidden')
      document.getElementById('search')?.classList.add('hidden')
      document.getElementById('manageStudents')?.classList.remove('hidden')
  }

  showStudent(){
      document.getElementById('displayStudent')?.classList.remove('hidden')
      document.getElementById('search')?.classList.remove('hidden')
      document.getElementById('manageStudents')?.classList.add('hidden')
  }

}


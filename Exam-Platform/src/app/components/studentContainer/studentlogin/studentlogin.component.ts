import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-studentlogin',
  templateUrl: './studentlogin.component.html',
  styleUrls: ['./studentlogin.component.css']
})
export class StudentloginComponent {

  constructor(private _AuthService:AuthService , private _Router:Router){
    if(localStorage.getItem('userToken') != null){
      _Router.navigate(['/studentpage'])
    }
  }

  loginError:string = '';

  isLoading:boolean = false;

  signIn:FormGroup = new FormGroup({
    gmail:new FormControl(null,[Validators.required]),
    password:new FormControl(null,[Validators.required]),
  })

  handleSignIn(signIn:FormGroup){
    this.isLoading = true;
    if(signIn.valid){
      this._AuthService.signin(signIn.value).subscribe({
        next:(response)=>{
          if(response.message == 'success' && (response.user.isAdmin == 'admin' || response.user.isAdmin == 'student')){
            localStorage.setItem('userToken',response.token);
            this._AuthService.decodeUserToken();
            localStorage.setItem('isAdmin',response.user.isAdmin)
            localStorage.setItem('studentName',response.user.name)
            localStorage.setItem('studentCode',response.user.code)
            localStorage.setItem('studentNationalID',response.user.nationalPerson)
            localStorage.setItem('studentLevel',response.user.level)
            localStorage.setItem('studentID',response.user._id)
            this.isLoading = false;
            this._Router.navigate(['/studentpage'])
            // console.log(response);
          }else{
            this.isLoading = false;
            this.loginError = 'Not Authorized to Signin as student'
          }
        },
        error:(err)=>{
          this.isLoading = false;
          this.loginError = err.error.message;
          console.log(err);
        }
      })
    }
  }

}

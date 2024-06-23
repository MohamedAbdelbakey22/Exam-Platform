import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-doctorlogin',
  templateUrl: './doctorlogin.component.html',
  styleUrls: ['./doctorlogin.component.css']
})
export class DoctorloginComponent {
  constructor(private _AuthService:AuthService , private _Router:Router){
    if(localStorage.getItem('userToken') != null){
      _Router.navigate(['/doctorpage'])
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
          if(response.message == 'success' && (response.user.isAdmin == 'admin' || response.user.isAdmin == 'doctor')){
            localStorage.setItem('userToken',response.token);
            this._AuthService.decodeUserToken();
            localStorage.setItem('isAdmin',response.user.isAdmin)
            localStorage.setItem('doctorName',response.user.name)
            this.isLoading = false;
            this._Router.navigate(['/doctorpage'])
            // console.log(response);
          }else{
            this.isLoading = false;
            this.loginError = 'Not Authorized to Signin as doctor'
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

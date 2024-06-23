import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminComponent {

  constructor(private _AuthService:AuthService , private _Router:Router){
    if(localStorage.getItem('userToken') != null){
      _Router.navigate(['/adminpage'])
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
          if(response.message == 'success' && response.user.isAdmin == 'admin'){
              localStorage.setItem('userToken',response.token);
              this._AuthService.decodeUserToken();
              localStorage.setItem('isAdmin',response.user.isAdmin)
              this.isLoading = false;
              this._Router.navigate(['/adminpage'])
              // console.log(response);
          }else{
            this.isLoading = false;
            this.loginError = 'Not Authorized to Signin as Admin'
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

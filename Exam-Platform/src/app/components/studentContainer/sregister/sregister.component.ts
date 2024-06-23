import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sregister',
  templateUrl: './sregister.component.html',
  styleUrls: ['./sregister.component.css']
})
export class SregisterComponent {

  constructor(private _AuthService:AuthService , private _Router:Router){}

  isLoading:boolean = false;

  errorMsg:string = '';

  inValidForm:boolean = false;

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
      this._AuthService.signup(registerForm.value).subscribe({
        next:(response)=>{
          this._Router.navigate(['/confirmaccount'])
            console.log(response);
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

}

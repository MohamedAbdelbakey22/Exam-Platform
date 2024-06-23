import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dchangepassword',
  templateUrl: './dchangepassword.component.html',
  styleUrls: ['./dchangepassword.component.css']
})
export class DchangepasswordComponent {

  constructor(private _AuthService:AuthService , private _Router:Router){}

  isLoading:boolean = false;

  errorMsg:string = '';

  inValidForm:boolean = false;

  changePassword:FormGroup = new FormGroup({
    oldPassword:new FormControl(null,[Validators.required]),
    newPassword:new FormControl(null,[Validators.required]),
  })

  handleChangePassword(changePassword:FormGroup){
    this.isLoading = true;
    if(changePassword.valid){
      this._AuthService.changePassword(changePassword.value).subscribe({
        next:(response)=>{
          this.isLoading = false;
          // console.log(response);
          this._Router.navigate(['/doctorpage'])
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

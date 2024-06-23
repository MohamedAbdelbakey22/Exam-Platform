import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-confirmaccount',
  templateUrl: './confirmaccount.component.html',
  styleUrls: ['./confirmaccount.component.css']
})
export class ConfirmaccountComponent {
  constructor(private _AuthService:AuthService , private _Router:Router){}

  isLoading:boolean = false;

  msgError:string = '';

  confirmAccount:FormGroup = new FormGroup({
    gmail:new FormControl(null,[Validators.required]),
    code:new FormControl(null,[Validators.required]),
  })

  handleConfirmAccount(confirmAccount:FormGroup){
    this.isLoading = true;
    if(confirmAccount.valid){
      this._AuthService.vertifyEmail(confirmAccount.value).subscribe({
        next:(response)=>{
          this.isLoading = false;
          this._Router.navigate(['/studentlogin'])
          console.log(response);
        },
        error:(err)=>{
          this.isLoading = false;
          this.msgError = err.error.message;
          console.log(err);
          
        }
      })
    }
  }

}

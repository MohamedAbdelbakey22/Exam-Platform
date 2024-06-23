import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent {

  constructor(private _AuthService:AuthService , private _Router:Router){}

  msgError:string = '';

  isLoading:boolean = false;

  gmail:FormControl = new FormControl(null);

  handleUserPassword(gmail:FormControl){
    this.isLoading = true;
    if(gmail.valid){
      this._AuthService.forgetPassword(gmail.value).subscribe({
        next:(response)=>{
          this.isLoading = false;
          this._Router.navigate(['/adminlogin'])
          console.log(response);
        },
        error:(err)=>{
          this.isLoading = false;
          this.msgError = err.error.message;
        }
      })
    }
  }

}

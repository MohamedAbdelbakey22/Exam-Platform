import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dforgetpassword',
  templateUrl: './dforgetpassword.component.html',
  styleUrls: ['./dforgetpassword.component.css']
})
export class DforgetpasswordComponent {

  constructor(private _AuthService:AuthService , private _Router:Router){}

  msgError:string = '';

  isLoading:boolean = false;

  gmail:FormControl = new FormControl(null);

  handleDoctorPassword(gmail:FormControl){
    this.isLoading = true;
    if(gmail.valid){
      this._AuthService.forgetPassword(gmail.value).subscribe({
        next:(response)=>{
          this.isLoading = false;
          this._Router.navigate(['/doctorlogin'])
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

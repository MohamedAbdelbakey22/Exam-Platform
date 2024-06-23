import { User } from './../../../interfaces/user';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-managedoctor',
  templateUrl: './managedoctor.component.html',
  styleUrls: ['./managedoctor.component.css']
})
export class ManagedoctorComponent implements OnInit {

  constructor(private _AuthService:AuthService , private _ToastrService:ToastrService){}

  doctorsData!:User[];

  searchById:string = '';

  ngOnInit(): void {

        // ==== Get All Doctors ====
        this.getAllDoctors()
    
  }

  // ==== Get All Doctors ====
  getAllDoctors(){
    this._AuthService.getAllDoctors(this._AuthService.headers.token).subscribe({
      next:(response)=>{
        if(response.message ==='success'){
          // console.log(response.doctors);
          this.doctorsData = response.doctors;
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

  registerForm:FormGroup = new FormGroup({
    name: new FormControl(null,[Validators.required]),
    nationalPerson: new FormControl(null,[Validators.required,Validators.pattern(/^[\d]{14}$/)]),
    gmail: new FormControl(null,[Validators.required,Validators.email]),
    // level: new FormControl(null,[Validators.required]),
    password: new FormControl(null,[Validators.required]),
    // code: new FormControl(null,[Validators.required]),
  })

  handleRegisterForm(registerForm:FormGroup){
    this.isLoading = true;
    if(registerForm.valid){
      this._AuthService.addDoctor(registerForm.value).subscribe({
        next:(response)=>{
          this.addDoctor(response.newUser.name);
          this.getAllDoctors()
          registerForm.reset();
          this.isLoading = false;
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

   // ==== Remove Doctor ====
  removeDoctor(id:string){
    this._AuthService.removeDoctor(id).subscribe({
      next:(response)=>{
        if(response.message ==='Deleted'){
          this.getAllDoctors()
          this.deleteDoctor(id);
          console.log(response);
        }
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }


   // ==== Show Toastor ====
  addDoctor(doctorName:string){
    this._ToastrService.success(`${doctorName} has been added successfully`,'',{
      timeOut: 1500,
      progressBar: true,
      progressAnimation: 'increasing',
      positionClass:'toast-top-center'
    })                                                        
    }

    deleteDoctor(doctorId:string){
      let doctorName = '';
      for(let i=0 ; i<this.doctorsData.length ; i++){   
        if(this.doctorsData[i]._id === doctorId){
          doctorName = this.doctorsData[i].name;
        }
      }
      this._ToastrService.error(`${doctorName} has been Deleted successfully`,'',{
        timeOut: 1500,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass:'toast-top-center'
      })                                                        
      }

  hideDoctor(){
    document.getElementById('displayDoctor')?.classList.add('hidden')
    document.getElementById('search')?.classList.add('hidden')
    document.getElementById('manageDoctors')?.classList.remove('hidden')
  }

  showDoctor(){
    document.getElementById('displayDoctor')?.classList.remove('hidden')
    document.getElementById('search')?.classList.remove('hidden')
    document.getElementById('manageDoctors')?.classList.add('hidden')
  }

}

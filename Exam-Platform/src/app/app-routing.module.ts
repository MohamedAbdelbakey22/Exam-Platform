import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ForgetpasswordComponent } from './components/adminContainer/forgetpassword/forgetpassword.component';
import { ConfirmpasswordComponent } from './components/adminContainer/confirmpassword/confirmpassword.component';
import { AdminpageComponent } from './components/adminContainer/adminpage/adminpage.component';
import { ManagestudentComponent } from './components/adminContainer/managestudent/managestudent.component';
import { ManagedoctorComponent } from './components/adminContainer/managedoctor/managedoctor.component';
import { AdminComponent } from './components/adminContainer/adminlogin/adminlogin.component';
import { DoctorloginComponent } from './components/doctorContainer/doctorlogin/doctorlogin.component';
import { DforgetpasswordComponent } from './components/doctorContainer/dforgetpassword/dforgetpassword.component';
import { DconfirmpasswordComponent } from './components/doctorContainer/dconfirmpassword/dconfirmpassword.component';
import { DoctorpageComponent } from './components/doctorContainer/doctorpage/doctorpage.component';
import { AddQuestionComponent } from './components/doctorContainer/add-question/add-question.component';
import { DchangepasswordComponent } from './components/doctorContainer/dchangepassword/dchangepassword.component';
// import { ConfirmaccountComponent } from './components/studentContainer/confirmaccount/confirmaccount.component';
import { AuthGuard } from './components/guards/admin-auth.guard';
import { DoctorGuard } from './components/guards/doctor.guard';
import { StudentloginComponent } from './components/studentContainer/studentlogin/studentlogin.component';
// import { SregisterComponent } from './components/studentContainer/sregister/sregister.component';
import { StudentpageComponent } from './components/studentContainer/studentpage/studentpage.component';
import { StudentGuard } from './components/guards/student.guard';
import { SchangepasswordComponent } from './components/studentContainer/schangepassword/schangepassword.component';
import { StudentdataComponent } from './components/studentContainer/studentdata/studentdata.component';
import { SexamComponent } from './components/studentContainer/sexam/sexam.component';
import { CoursesComponent } from './components/adminContainer/courses/courses.component';
import { DresultComponent } from './components/doctorContainer/dresult/dresult.component';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component:HomeComponent,title:'Home Page'},
  {path:'adminlogin',component:AdminComponent,title:'Admin Page'},
  {path:'forgetpassword',component:ForgetpasswordComponent,title:'Admin Page'},
  {path:'confirmpassword',component:ConfirmpasswordComponent,title:'Admin Page'},
  {path:'adminpage',canActivate:[AuthGuard],component:AdminpageComponent,title:'Admin Page',children:[
    {path:'',redirectTo:'managestudents',pathMatch:'full'},
    {path:'managestudents',canActivate:[AuthGuard],component:ManagestudentComponent},
    {path:'managedoctors',canActivate:[AuthGuard],component:ManagedoctorComponent},
    {path:'courses',canActivate:[AuthGuard],component:CoursesComponent},
  ]},
  {path:'doctorlogin',component:DoctorloginComponent,title:'Doctor Page'},
  {path:'dforgetpassword',component:DforgetpasswordComponent,title:'Doctor Page'},
  {path:'dconfirmpassword',component:DconfirmpasswordComponent,title:'Doctor Page'},
  {path:'doctorpage',canActivate:[DoctorGuard],component:DoctorpageComponent,title:'Doctor Page',children:[
    // {path:'',redirectTo:'dcourses',pathMatch:'full'},
    {path:'addquestion/:id',canActivate:[DoctorGuard],component:AddQuestionComponent},
    {path:'dresult',canActivate:[DoctorGuard],component:DresultComponent},
    // ]},
    {path:'dchangepassword',canActivate:[DoctorGuard],component:DchangepasswordComponent},
  ]},
  {path:'studentlogin',component:StudentloginComponent,title:'Student Page'},
  // {path:'sregister',component:SregisterComponent,title:'Student Page'},
  // {path:'confirmaccount',component:ConfirmaccountComponent,title:'Student Page'},
  {path:'studentpage',canActivate:[StudentGuard],component:StudentpageComponent,title:'Student Page',children:[
    {path:'',redirectTo:'studentdata',pathMatch:'full'},
    {path:'studentdata',canActivate:[StudentGuard],component:StudentdataComponent},
    {path:'schangepassword',canActivate:[StudentGuard],component:SchangepasswordComponent},
    {path:'sexam/:id',canActivate:[StudentGuard],component:SexamComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}

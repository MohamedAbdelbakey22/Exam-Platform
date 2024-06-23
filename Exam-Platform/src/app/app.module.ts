import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ForgetpasswordComponent } from './components/adminContainer/forgetpassword/forgetpassword.component';
import { ConfirmpasswordComponent } from './components/adminContainer/confirmpassword/confirmpassword.component';
import { AdminpageComponent } from './components/adminContainer/adminpage/adminpage.component';
import { ManagestudentComponent } from './components/adminContainer/managestudent/managestudent.component';
import { ManagedoctorComponent } from './components/adminContainer/managedoctor/managedoctor.component';
import { DoctorloginComponent } from './components/doctorContainer/doctorlogin/doctorlogin.component';
import { AdminComponent } from './components/adminContainer/adminlogin/adminlogin.component';
import { DforgetpasswordComponent } from './components/doctorContainer/dforgetpassword/dforgetpassword.component';
import { DconfirmpasswordComponent } from './components/doctorContainer/dconfirmpassword/dconfirmpassword.component';
import { DoctorpageComponent } from './components/doctorContainer/doctorpage/doctorpage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AddQuestionComponent } from './components/doctorContainer/add-question/add-question.component';
import { DchangepasswordComponent } from './components/doctorContainer/dchangepassword/dchangepassword.component';
import { ConfirmaccountComponent } from './components/studentContainer/confirmaccount/confirmaccount.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SearchPipe } from './pipes/search.pipe';
import { StudentloginComponent } from './components/studentContainer/studentlogin/studentlogin.component';
import { SregisterComponent } from './components/studentContainer/sregister/sregister.component';
import { StudentpageComponent } from './components/studentContainer/studentpage/studentpage.component';
import { SchangepasswordComponent } from './components/studentContainer/schangepassword/schangepassword.component';
import { StudentdataComponent } from './components/studentContainer/studentdata/studentdata.component';
import { SexamComponent } from './components/studentContainer/sexam/sexam.component';
import { TimeFormatPipe } from './pipes/time-format.pipe';
import { CoursesComponent } from './components/adminContainer/courses/courses.component';
import { CoursesearchPipe } from './pipes/coursesearch.pipe';
import { DresultComponent } from './components/doctorContainer/dresult/dresult.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    ForgetpasswordComponent,
    ConfirmpasswordComponent,
    AdminpageComponent,
    ManagestudentComponent,
    ManagedoctorComponent,
    DoctorloginComponent,
    DforgetpasswordComponent,
    DconfirmpasswordComponent,
    DoctorpageComponent,
    AddQuestionComponent,
    DchangepasswordComponent,
    ConfirmaccountComponent,
    SearchPipe,
    StudentloginComponent,
    SregisterComponent,
    StudentpageComponent,
    SchangepasswordComponent,
    StudentdataComponent,
    SexamComponent,
    TimeFormatPipe,
    CoursesComponent,
    CoursesearchPipe,
    DresultComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      // timeOut: 1000,
      // progressBar: true,
      // preventDuplicates: true,
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

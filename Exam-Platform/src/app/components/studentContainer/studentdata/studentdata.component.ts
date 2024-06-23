import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-studentdata',
  templateUrl: './studentdata.component.html',
  styleUrls: ['./studentdata.component.css']
})
export class StudentdataComponent{

  constructor(){}

  studentName = localStorage.getItem('studentName')

  studentCode = localStorage.getItem('studentCode')

  studentLevel = localStorage.getItem('studentLevel')

  studentNationalID = localStorage.getItem('studentNationalID')

  isAdmin = localStorage.getItem('isAdmin')

}
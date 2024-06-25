import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  private timerValueSource = new BehaviorSubject<number>(30); // Default value in minutes
  timerValue$ = this.timerValueSource.asObservable();

  setTimerValue(value: number): void {
    this.timerValueSource.next(value);
  }


  constructor(private _HttpClient:HttpClient , private _Router:Router) { 
    if(localStorage.getItem('userToken') != null){
      this.decodeUserToken();
    }
  }

  userData = new BehaviorSubject(null);

  decodeUserToken(){
    if(localStorage.getItem('userToken') != null){
      let encodeToken = JSON.stringify(localStorage.getItem('userToken'));
      let decodedToken:any = jwtDecode(encodeToken);
      this.userData.next(decodedToken);
    }
  }

  headers:any = {
    token : localStorage.getItem('userToken')
  }

  // ==== Signin ====
  signin(data:any):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl+'users/signIn'}`,data)
  }

  // ==== Signup ====
  signup(data:any):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl+'users/signUp'}`,data)
  }

  // ==== Add Student ====
  addStudent(data:any):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl+'student'}`,data,{headers:this.headers})
  }

  // ==== Add Doctor ====
  addDoctor(data:any):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl+'doctor'}`,data,{headers:this.headers})
  }

  // ==== Get All Student
  getAllStudent():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl+'student'}`,{headers:this.headers})
  }

  // ==== Get All Doctors ====
  getAllDoctors(adminToken:string):Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl+'doctor?token='}${adminToken}`,{headers:this.headers})
  }

  // Remove Student
  removeStudent(id:string):Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl+'student'}`,{ headers: this.headers, body: { id: id } })
  }

  // Remove Doctor
  removeDoctor(id:string):Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl+'doctor'}`,{ headers: this.headers, body: { id: id } })
  }

  // ==== Change Password ====
  changePassword(data:any):Observable<any>{
    return this._HttpClient.patch(`${environment.baseUrl+'users'}`,data,{headers:this.headers})
  }

  // ==== Forget Password ====
  forgetPassword(gmail:string):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl+'users/forgot-password'}`,{gmail:gmail})
  }

  // ==== Vertify Email ====

  vertifyEmail(data:any):Observable<any>{
    return this._HttpClient.patch(`${environment.baseUrl+'users/verfiyEmail'}`,data)
  }

  // ==== Get Data ====
  getData():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl+'users/getme'}`,{headers:this.headers})
  }

  // ==== Logout ====
  logout(){
    localStorage.removeItem('userToken');
    this.userData.next(null),
    this._Router.navigate(['/adminlogin'])
  }

  logoutDoc(){
    localStorage.removeItem('userToken');
    this.userData.next(null),
    this._Router.navigate(['/doctorlogin'])
  }

  logoutStu(){
    localStorage.removeItem('userToken');
    this.userData.next(null),
    this._Router.navigate(['/studentlogin'])
  }

  // ==================================== Exam =======================================

  // ==== Get Courses ====
  getCourses():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl+'exam/courses'}`)
  }

  // ==== Delete Course ====
  deleteCourse(id:string):Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl+'exam/course/delete'}`,{ headers: this.headers, body: { _id: id } })
  }

  // ==== Add Course ====
  addCourse(data:any):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl+'exam/course/addCourse'}`,data,{headers:this.headers})
  }

  // ==== Get Course ====
  getCourse(id: string): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl+'exam/course/'}${id}`);
  }

  // ==== Add Question ====
  addQuestion(questions: any, CrseId: string) {

    const body = {
      questions,
      CrseId
    };

    return this._HttpClient.post(`${environment.baseUrl+'exam/courses/exams/addQuestion'}`, body, { headers:{
      token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjU0NDgwMWNmMDI5ZDhiNTk5OTExZDQiLCJ1c2VyTmFtZSI6IkRvY3RvciIsIkVtYWlsIjoiZG9jdG9yQGdtYWlsLmNvbSIsInN0YXR1cyI6ImRvY3RvciIsImlhdCI6MTcxODM3NDQ3OH0.r0uHvuzIPE5oU_wmDFomNlH_U8W7D1RN_3x-uMstU5U'
    } });
  }

  // ==== Get Questions ====
  getQuestions(CrseId: string):Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl+'exam/courses/exams/Questions?CrseId='}${CrseId}`,{headers:this.headers})
  }

  // ==== Add Answer ====
  addAnswers(selectAnswer:any,questID:string, studentID:  string):Observable<any>{

    if (!selectAnswer || !questID || !studentID) {
      throw new Error('questID is required');
    }

    const body = {
      "selectAnswer": selectAnswer,
      "questID": questID,
      "studentID": studentID
    };

          return this._HttpClient.post(`${environment.baseUrl+'exam/courses/exams/Answer/'}${studentID}`,body,{headers:this.headers})

  }

  // detectFaces(image: File): Observable<any> {
  //   const formData: FormData = new FormData();
  //   formData.append('image', image, image.name);
  //   return this._HttpClient.post(`${environment.baseUrl+'detect_faces'}`, formData);
  // }


}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private router: Router, private http: HttpClient) { }
  isLoggedIn: boolean = false

  loginCheck(username: any, password: any) {

    let body = {
      userName: username, password: password
    }
    return this.http.post<any>('http://localhost:7000/loginverify', body)

    // if (userEmailId == 'lmonisha12@gmail.com' && password == 'xxxxxxxxyyyyy') {
    //   this.isLoggedIn = true;
    // }
    // console.log('this.isLoggedIn------------>', this.isLoggedIn)
    // return this.isLoggedIn

  }

  setIsLoggedIn(value:any){
    this.isLoggedIn=value
  }

  forgotPasswrd(values:any){

    return this.http.post('http://localhost:7000/forgotPassword',values)
  }

}

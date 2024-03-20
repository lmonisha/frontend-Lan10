import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router, private loginservice: LoginService,private toastr: ToastrService) { }
  loginForm!: FormGroup
  ngOnInit() {
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    })
  }

  submit() {
    console.log('loginform values------------>', this.loginForm.value)
    let username = this.loginForm.value.username
    let userPasswrd = this.loginForm.value.password
    let value = this.loginservice.loginCheck(username, userPasswrd).subscribe((response) => {
      console.log('response form login check--------->', response)
      if (response.status == 200) {
        this.loginservice.setIsLoggedIn(true); 
        // this.toastr.success(response.message, 'Success');
        this.toastr.success('Login successful', 'Success');
        this.router.navigate(['/dashboard'])

      } else {
        console.log('iam in else part-------------->')
      }

    })

  }

  forgetPass() {
    this.router.navigate(['/forgotPassword'])
  }
}


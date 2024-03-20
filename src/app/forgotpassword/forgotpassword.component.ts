import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { LoginService } from '../login/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
constructor(private fb:FormBuilder,private loginservice: LoginService, private toastr: ToastrService,){}
forgotForm!:FormGroup
ngOnInit(){
this.forgotForm=this.fb.group({
  userName:[''],
  passwordNew: ['', Validators.required],
      confrmPasswrd: ['', Validators.required]
}, {
  validator: this.passwordMatchValidator('passwordNew', 'confrmPasswrd')
});
}

passwordMatchValidator(controlName: string, matchingControlName: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const password = control.get(controlName)?.value;
    const confirmPassword = control.get(matchingControlName)?.value;
    return password === confirmPassword ? null : { 'passwordMismatch': true };
  };
}

Onsubmit(){
  let formvalues=this.forgotForm.value
  console.log('formvalues==========>', formvalues)

  this.loginservice.forgotPasswrd(formvalues).subscribe((data:any)=>{
    console.log('data==========>', data)
    let message = data?.message || ''

    if (data.success == true) {
      this.toastr.success(message, 'Success')
    } else {
      this.toastr.error(message, 'Error')

    }
  })
}

Oncancel(){
  this.forgotForm.setValue({
    userName:'',
    passwordNew:'',
    confrmPasswrd:''
  })
}

}

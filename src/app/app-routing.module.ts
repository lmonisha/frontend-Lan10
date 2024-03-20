import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmpNewComponent } from './emp-new/emp-new.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { authGuard } from './guards/auth.guard';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';

const routes: Routes = [

  {
    path: '', component: LoginComponent,
  },
  {
    path: 'NewEmployee', component: EmpNewComponent,canActivate:[authGuard]
  },
  {
    path: 'dashboard', component: SideNavComponent,canActivate:[authGuard]
  },
  {
    path: 'Employees', component: EmployeeComponent,canActivate:[authGuard]
  },
  {
    path: 'forgotPassword', component: ForgotpasswordComponent
  },
  {
    path: 'login', component: LoginComponent

  },
  // { path: 'NewEmployee/:id', component: EmpNewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field'
import { MatDialogModule } from '@angular/material/dialog';
import {MatListModule} from '@angular/material/list'
import {MatIconModule} from '@angular/material/icon'
import {MatInputModule} from '@angular/material/input'
import {MatButtonModule} from '@angular/material/button'
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatSidenavModule} from '@angular/material/sidenav'
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeComponent } from './employee/employee.component';
import { FormsModule } from '@angular/forms';
import { EmpNewComponent } from './emp-new/emp-new.component';
import { SideNavComponent } from './side-nav/side-nav.component';

import { ToastrModule } from 'ngx-toastr';
import { HttpInterceptorService } from './interceptors/http-interceptor.service';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ConfirmationDialogComponentComponent } from './confirmation-dialog-component/confirmation-dialog-component.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SideNavComponent,
    EmployeeComponent,
    EmpNewComponent,
    ForgotpasswordComponent,ConfirmationDialogComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,MatListModule,MatIconModule,MatInputModule,MatButtonModule,MatToolbarModule,
    MatSidenavModule,HttpClientModule,FormsModule,
    MatDialogModule ,
    ToastrModule.forRoot({
      // timeOut: 3000, // Time to close the toast automatically
      // positionClass: 'toast-top-right', // Position of the toast
      // preventDuplicates: true, // Prevent duplicates of the same toast
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
       useClass: HttpInterceptorService,
        multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

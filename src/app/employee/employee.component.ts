import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service'
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponentComponent } from '../confirmation-dialog-component/confirmation-dialog-component.component';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [DatePipe]
})
export class EmployeeComponent implements OnInit {
  constructor(private empservice: EmployeeService, private datePipe: DatePipe , private router: Router, private toastr: ToastrService, private dialog: MatDialog) { }
  employeeList: any
  currentPage = 1;
  pageSize = 10;

  ngOnInit() {
    this.getAllEmployess()
  }


  addEmployee() {
    this.router.navigate(['/NewEmployee'])
  }
  getAllEmployess() {
    this.empservice.getAllEmployees(this.currentPage).subscribe((data) => {
      console.log('dataaa----->', data.data)
      this.employeeList = data.data;
      console.log('this.employeeList----->', this.employeeList)
       // Format dates before displaying them in the template
      //  this.employeeList.forEach((employee: any) => {
      //   employee.staffId.Date_Of_Birth = this.formatDate(employee.staffId.Date_Of_Birth);
      // });

      let message = data?.message || ''
      this.toastr.success(message, 'Success')
    })
  }

  formatDate(date: string) {
    return this.datePipe.transform(date, 'dd-MM-yyyy') || '';
  }
  nextPage() {
    this.currentPage++;
    this.getAllEmployess()
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getAllEmployess()
    }
  }
  updateForm(emp: any) {
    console.log('in update froms-------------->', emp)
    emp.editMode = true
    this.router.navigate(['/NewEmployee'], { state: { userData: emp } });

  }

  deleteForm(emp: any) {
    console.log('indelete---->', emp)
    const dialogRef = this.dialog.open(ConfirmationDialogComponentComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.empservice.deleteEmployee(emp).subscribe((data: any) => {
          // Handle success or failure of the deletion
          console.log('data---->', data)
          if (data.success) {
            // Refresh the employee list
            this.getAllEmployess();
            this.toastr.success(data.message, 'Success');
          } else {
            this.toastr.error(data.message, 'Error');
          }

        });
      }
    });
  }

}

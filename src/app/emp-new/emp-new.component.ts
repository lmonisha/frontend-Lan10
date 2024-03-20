import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { EmployeeService } from '../employee/employee.service'
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router, Navigation } from '@angular/router';

@Component({
  selector: 'app-emp-new',
  templateUrl: './emp-new.component.html',
  styleUrls: ['./emp-new.component.css']
})

export class EmpNewComponent implements OnInit {
  newempForm: FormGroup
  employeeAge: number = 0;
  constructor(private fb: FormBuilder,
    private empservice: EmployeeService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router) {
    this.newempForm = this.fb.group({
      name: [''],
      dob: [''],
      gender: [''],
      age: [''],
      mobileNo: [''],
      email: ['']
    });
  }
  selectedDate: string = '';
  formattedDate: string = ''
  editMode = false
  userData: any
  testdata: any
  ngOnInit() {
    this.userData = history.state.userData;
    console.log('userData-------->', this.userData);
    if (this.userData) {
      console.log('userData---------------->', this.userData);
      const parsedUserData = this.userData;
      this.editMode = true
      const staffId = parsedUserData?.staffId || {};
      const selectedDate = new Date(parsedUserData?.staffId.Date_Of_Birth);

      // Extract day, month, and year from the selectedDate
      const day = selectedDate.getDate();
      const month = selectedDate.getMonth() + 1; // Months are zero-based
      const year = selectedDate.getFullYear();
      const formattedDay = day < 10 ? `0${day}` : `${day}`;
      const formattedMonth = month < 10 ? `0${month}` : `${month}`;
      // this.formattedDate = `${formattedDay}-${formattedMonth}-${year}`;
      this.formattedDate = `${year}-${formattedMonth}-${formattedDay}`;


      // Construct the formatted date string
      // this.formattedDate = `${day}-${month}-${year}`;
      // this.formattedDate='12-03-1998';
      console.log('formattedDate------>', this.formattedDate);

      if (staffId) {
        this.newempForm.patchValue({
          name: staffId?.Name || '',
          dob: this.formattedDate || '',
          gender: staffId?.Gender || '',
          age: staffId?.Age || '',
          mobileNo: staffId?.Mobile_Number || '',
          email: staffId?.emailId || '',
        });
      }




    }

    const dobControl = this.newempForm.get('dob');
    if (dobControl) {
      dobControl.valueChanges.subscribe((dob: Date) => {
        this.calculateEmployeeAge(dob);
      });
    }
  }


  onDateChange(event: Event) {
    const selectedDate = (event.target as HTMLInputElement).value;
    console.log('------>', selectedDate)
    const dateParts = selectedDate.split('-');
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]);
    const day = parseInt(dateParts[2]);

    // Verify that all parts are valid numbers
    if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
      this.formattedDate = `${day}-${month}-${year}`;
      console.log('formattedDate------>', this.formattedDate)

      this.newempForm.get('dob')?.setValue(selectedDate);
    } else {
      console.error('Invalid date format:', selectedDate);
    }

  }




  addUser() {
    console.log('newempForm----->', this.newempForm.value)
    if (this.editMode == true) {
      const user: any = this.newempForm.get('name');
      console.log('user--->', user)
      let empValues = this.newempForm.value
      empValues.createdby = user.value
      console.log('this.editMode------->', this.editMode)
      let updateFormEmployee = this.newempForm.value
      updateFormEmployee._id = this.userData.staffId._id
      console.log('updateFormEmployee------>', updateFormEmployee)

      this.empservice.updateEmployee(updateFormEmployee).subscribe((data: any) => {
        console.log('emp for update------>', data)
        let message = data?.message || ''
        if (data.success == true) {
          this.toastr.success(message, 'Success')
          this.router.navigate(['/Employees'])
        } else {
          this.toastr.error(message, 'Error')

        }
      })
    } else {
      const user: any = this.newempForm.get('name');
      console.log('user--->', user)
      let empValues = this.newempForm.value
      empValues.createdby = user.value
      empValues.dob = this.formattedDate
      console.log('empValues--->', empValues)

      this.empservice.createUser(empValues).subscribe((data: any) => {
        console.log('data==========>', data)
        let message = data?.message || ''

        if (data.success == true) {
          this.toastr.success(message, 'Success')
          this.router.navigate(['/Employees'])

        } else {
          this.toastr.error(message, 'Error')

        }

      })
    }
  }

  calculateEmployeeAge(dob: Date) {
    console.log('in calculate----?', dob)
    this.employeeAge = this.calculateAge(dob);

    this.newempForm.patchValue({
      age: this.employeeAge
    })
  }

  calculateAge(dob: Date): number {
    const today = new Date();
    const birthDate = new Date(dob);

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // If the birth month is in the future of the current month,
    // or if the birth month is the same as the current month
    // but the birth day is after the current day,
    // then decrement the age by 1
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }


}

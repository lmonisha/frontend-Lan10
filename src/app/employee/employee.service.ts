import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }

  getAllEmployees(page: number){
    return this.http.get<any>('http://localhost:7000/getallData?page=${page}')
  }

  // getAllData(currentPage:number,pageSize:number){

  //   const params={
  //     page:currentPage.toString(),
  //     limit:pageSize.toString()
  //   }
  //   return  this.http.get<any>('https://jsonplaceholder.typicode.com/posts',{params})
  // }

  updateEmployee(emp:any){
    let body={}
    return this.http.post('http://localhost:7000/updatestaffDetails',emp)
  }

  deleteEmployee(emp:any){
    console.log('emp----->',emp)
    return this.http.post('http://localhost:7000/deletestaffDetails',emp)

  }

  createUser(emp:any){
    return this.http.post('http://localhost:7000/insert',emp)
  }
  
}

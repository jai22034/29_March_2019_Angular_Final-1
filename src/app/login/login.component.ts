import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { NgForm, FormGroup } from '@angular/forms';
import {AuthService} from '../auth.service';
import {ExpenseService} from '../expense.service';
import {Employee} from '../employee'

import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public employee = [];
  
employeeform:FormGroup;

  constructor(private expense:ExpenseService,private employeeservice: EmployeeService,private router: Router,public authService: AuthService) 
  {}

  onSubmit(employeeform) {

    
    this.employee.forEach((key) => {
     if(employeeform.value.email===key.email && employeeform.value.password===key.password)
     {

       console.log("Login Success");
       localStorage.setItem('isLoggedIn',"true");
       localStorage.setItem('token',employeeform.value.email);
       this.router.navigate(['/Signin',key.name] );

     }
     
    });

     
  }


  ngOnInit() {
  this.employeeform=this.employeeservice.form;
    if(localStorage.getItem('isLoggedIn')=="true"){
      this.router.navigate(['/Signin'] );
      console.log(localStorage.getItem('isLoggedIn'));
    }
    this.employeeservice.getEmployees().subscribe((data) => {
      Object.keys(data).forEach((key) => {
        this.employee.push(data[key])
      });
   
    });
   
    
     
  }

  get email()
  {
    return this.employeeform.get('email');
  }

  get password()
  {
    return this.employeeform.get('password');
  }
 logout(): void{

  console.log("Logout");
  this.authService.logout();
  this.router.navigate(['/login']);
 }
}

import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { HttpClient } from '@angular/common/http';
import { Employee } from './employee';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private _url: string = 'https://final-4184f.firebaseio.com/person.json';



  constructor(private http: HttpClient) { }


  form: FormGroup = new FormGroup({
  
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    
  });

  initializeFormGroup() {
    this.form.setValue({
    
      name: '',
      email: '',
      password: '',
    });
  }



  getEmployees(): Observable<Employee[]> {

    return this.http.get<Employee[]>(this._url);
  }
  setEmployee(empdata): Observable<Employee[]> {
    console.log(empdata);
    return this.http.post<Employee[]>(this._url, empdata);
  }
}

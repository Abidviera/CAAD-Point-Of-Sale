import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Employee } from '../models/Employee/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  async sendEmail(emailData: any): Promise<Observable<any>> {
    return this.http
      .post<any>(environment.apiUrl + 'email/send/', emailData)
      .pipe(catchError(this.handleError));
  }

    findOne(id: string): Observable<Employee> {
    return this.http
      .get<Employee>(environment.apiUrl + 'employee/findOne/' + id)
      .pipe(catchError(this.handleError));
  }

  private handleError(errorRes: HttpErrorResponse) {
    console.log('error message: ' + JSON.stringify(errorRes.error));
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes) {
      return throwError(errorMessage);
    }
    switch (errorRes.statusText) {
      case 'Unauthorized':
        errorMessage = 'This password/email is not correct.';
        break;

      case 'Bad Request':
        errorMessage = 'Please check the input';
        break;

      default:
        errorMessage = errorRes.statusText;
    }
    return throwError(errorMessage);
  }

}

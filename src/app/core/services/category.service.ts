import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CategoryNode } from '../models/Category/categoryNode.model';
import { CommonUtil } from '../../shared/utils/CommonUtil';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {}
  
  getCategoryTree(usageType: string = 'Other'): Observable<CategoryNode[]> {
    const url = environment.apiUrl + 'category/getCategoryTree/' + CommonUtil.getCurrentCompany() + (usageType ? '/' + usageType : '');
    return this.http.get<CategoryNode[]>(url).pipe(catchError(this.handleError));
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

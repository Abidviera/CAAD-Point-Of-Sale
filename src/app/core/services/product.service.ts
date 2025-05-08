import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Product } from '../models/Products/product.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {}
  currentPath = 'products/';
  getProductByCategoryIds(ids: string[]): Observable<Product[]> {
    return this.http.post<Product[]>(environment.apiUrl + this.currentPath + 'findByCategories', ids).pipe(catchError(this.handleError));
  }


  private handleError(errorRes: HttpErrorResponse) {
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

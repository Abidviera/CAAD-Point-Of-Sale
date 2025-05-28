import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockSummaryReportService {
  currentPath = `${environment.apiUrl}stockReport`;
  constructor(private http: HttpClient) {}
  
   fetchStockSummaryReport(pageFilters: any): Observable<any> {
    const params = { ...pageFilters };
    return this.http.get<any>(`${this.currentPath}/getStockSummaryreport`, { params }).pipe(catchError(this.handleError));
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
    }
    return throwError(errorMessage);
  }
}

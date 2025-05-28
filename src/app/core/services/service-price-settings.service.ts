import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

import { CommonUtil } from '../../shared/utils/CommonUtil';
import { ServicePriceSettingFilterDTO } from '../models/servicePriceSetting.model copy';

@Injectable({
  providedIn: 'root'
})
export class ServicePriceSettingsService {
constructor(private http: HttpClient) {}
  currentPath = 'service-price-settings/';

  getPriceSetting(filter: ServicePriceSettingFilterDTO) {
    return this.http.post<any>(environment.apiUrl + this.currentPath + 'getServicePrice/' + CommonUtil.getCurrentCompany(), filter).pipe(catchError(this.handleError));
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

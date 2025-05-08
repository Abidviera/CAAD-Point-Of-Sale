import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonUtil } from '../../shared/utils/CommonUtil';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private router: Router) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      this.router.url === '/form/registration' ||
      this.router.url.includes('/form/get-details')
    ) {
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Zjc5NmIzYTA4ZTBiNjA0YmVhZTJlYzEiLCJlbWFpbCI6InN1cGVyQG1hbi5uZXQiLCJyb2xlcyI6WyJhZG1pbiJdLCJpYXQiOjE3MDc4ODgzMzEsImV4cCI6MTcxMTQ4ODMzMX0.QPZ2-so-YStzKk7Kk6F61W2Adg7z2iRgjdop9cNrAmo';
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
    }
    const userInfo = CommonUtil.getCurrentUserFormatted();
    if (userInfo) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${userInfo.jwt_bearer_token}` },
      });
    }
    return next.handle(request);
  }
}

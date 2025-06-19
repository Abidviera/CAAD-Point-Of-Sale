import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { appConstant } from '../../shared/constants/appConstants';
import { CommonUtil } from '../../shared/utils/CommonUtil';
import { UserCompanyDTO } from '../models/company.model';
import { UserLogin } from '../models/userlogin.model';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CurrentShift } from '../models/currentShift.model';
import { AuthResponseData } from '../models/authModels/AuthResponseData.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<UserLogin | null>(null);
  private tokenExpirationTimer: any;
  constructor(private http: HttpClient, private router: Router) {}

  public login(
    email: string,
    password: string,
    company: string
  ): Observable<AuthResponseData> {
    return this.http
      .post<AuthResponseData>(environment.apiUrl + 'auth/login', {
        email: email,
        password: password,
        companyCode: company,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.user,
            resData.jwt_bearer_token,
            +resData.expiresIn,
            resData.company,
            resData.currentShift
          );
        })
      );
  }

  autoLogin(): void {
    const userDataString = localStorage.getItem(appConstant.userStorageKey);
    if (!userDataString) return;

    const userData: {
      user: any;
      jwt_bearer_token: string;
      _tokenExpirationDate: string;
      companyId: string;
      company: UserCompanyDTO;
      role: string;
    } = JSON.parse(userDataString);
    if (!userData) {
      return;
    }
    const loadedUser = new UserLogin(
      userData.user,
      userData.jwt_bearer_token,
      new Date(userData._tokenExpirationDate),
      userData.company,
      userData.role
    );

    if (loadedUser.jwt_bearer_token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  public logout(): void {
    this.user.next(null);
    CommonUtil.clearLocalStorage();
    const savedLogin = localStorage.getItem('savedLogin');

    localStorage.clear();

    if (savedLogin) {
      localStorage.setItem('savedLogin', savedLogin);
    }

    this.router.navigate(['/signin']);

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number): void {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(
    user: any,
    jwt_bearer_token: string,
    expiresIn: number,
    company: UserCompanyDTO,
    currentshift?: any
  ): void {
    const expirationDate = new Date(
      new Date().getTime() + expiresIn * 100000000000000
    );
    const userLogin = new UserLogin(
      user,
      jwt_bearer_token,
      expirationDate,
      company,
      user?.roles?.userRoleName,
      currentshift
    );
    this.user.next(user);
    localStorage.setItem(appConstant.userStorageKey, JSON.stringify(userLogin));
  }

  public checkAuth(
    email: string,
    password: string,
    company: string
  ): Observable<AuthResponseData> {
    return this.http
      .post<AuthResponseData>(environment.apiUrl + 'auth/login', {
        email: email,
        password: password,
        companyCode: company,
        returnSecureToken: true,
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes) {
      return throwError(errorMessage);
    }
    switch (errorRes.statusText) {
      case 'Unauthorized':
        errorMessage = errorRes?.error?.message[0]?.message
          ? errorRes.error.message[0].message
          : 'This password/email is not correct.';
        break;
    }
    return throwError(errorMessage);
  }
}

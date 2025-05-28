import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Settings } from '../../core/models/settings/settings.model';
import { CommonUtil } from '../../shared/utils/CommonUtil';
import { PrintImage } from '../../core/models/settings/printSettings.model';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
constructor(private http: HttpClient) {}

  currentPath = 'Settings/';

  save(dto: Settings): Observable<Settings> {
    delete dto['_id'];
    const companyId = CommonUtil.getCurrentCompany();
    const module = dto.module;
    const cacheKey = `settings:${companyId}:${module}`;
    localStorage.removeItem(cacheKey);
    return this.http
      .post<Settings>(environment.apiUrl + this.currentPath, {
        ...dto,
      })
      .pipe(catchError(this.handleError));
  }

  async delete(id: string): Promise<Observable<Settings>> {
    return this.http.delete<Settings>(environment.apiUrl + this.currentPath + id).pipe(catchError(this.handleError));
  }

  async findOne(id: string): Promise<Observable<Settings>> {
    return this.http.get<Settings>(environment.apiUrl + this.currentPath + 'findOne/' + id).pipe(catchError(this.handleError));
  }

  findByKeyword(keyword: string): Observable<Settings> {
    return this.http
      .get<Settings>(`${environment.apiUrl}${this.currentPath}findByKeyword/${CommonUtil.getCurrentCompany()}/${keyword}`)
      .pipe(catchError(this.handleError));
  }

  findAll(module: string): Observable<Settings[]> {
    const companyId = CommonUtil.getCurrentCompany();
    const cacheKey = `settings:${companyId}:${module}`;
    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
      return of(JSON.parse(cachedData));
    }
  
    return this.http
      .get<Settings[]>(`${environment.apiUrl}${this.currentPath}${companyId}/${module}`)
      .pipe(
        map((response) => {
          const convertedResponse = this.convertBooleanValue(response);
          localStorage.setItem(cacheKey, JSON.stringify(convertedResponse));
          return convertedResponse;
        }),
        catchError((error) => this.handleError(error))
      );
  }

  async isExist(id: string, name: string): Promise<Observable<boolean>> {
    return this.http
      .get<boolean>(environment.apiUrl + this.currentPath + 'isExist/' + name + '/' + CommonUtil.getCurrentCompany())
      .pipe(catchError(this.handleError));
  }

  async getTimezones(name: string): Promise<Observable<any>> {
    return this.http.get<any>(environment.apiUrl + this.currentPath + 'timezone/' + name).pipe(catchError(this.handleError));
  }

  async uploadImage(data: PrintImage): Promise<any> {
    return this.http.post<any>(environment.apiUrl + this.currentPath + 'upload-logo', data).pipe(catchError(this.handleError));
  }

  async getImages(): Promise<any> {
    return this.http.get<any>(environment.apiUrl + this.currentPath + 'get-logo/' + CommonUtil.getCurrentCompany()).pipe(catchError(this.handleError));
  }

  convertBooleanValue(settings: Settings[]): Settings[] {
    settings
      .filter((setting) => setting.settingsValue === 'true' || setting.settingsValue === 'false')
      .forEach((setting) => {
        setting.settingsValue = setting.settingsValue === 'true';
      });
    return settings;
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

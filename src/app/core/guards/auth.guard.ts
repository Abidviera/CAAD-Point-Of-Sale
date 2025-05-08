import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Inject, Injectable } from '@angular/core';
import { CommonUtil } from '../../shared/utils/CommonUtil';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(@Inject(Router) private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {
    const isUserExisit = CommonUtil.getCurrentUser() != undefined;
    const isCompanyExisit = CommonUtil.getCurrentCompany() != undefined;
    if (!isUserExisit || !isCompanyExisit) {
      alert('Session expired. Please login to continue.');
      this.router.navigate(['signin']);
    }

    const allowedUrls: string[] = ['/PointOfSale', 'signin'];

    const currentUrl: string = state.url;

    if (!allowedUrls.includes(currentUrl)) {
    }

    return isCompanyExisit && isUserExisit;
  }
}

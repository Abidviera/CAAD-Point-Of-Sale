import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Inject, Injectable } from "@angular/core";
import { CommonUtil } from "../../shared/utils/CommonUtil";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(
    private authService: AuthService,
    @Inject(Router) private router: Router,
   
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
    const isUserExisit = CommonUtil.getCurrentUser() != undefined;
    const isCompanyExisit = CommonUtil.getCurrentCompany() != undefined;
    if (!isUserExisit || !isCompanyExisit) {
      alert('Session expired. Please login to continue.');
      this.router.navigate(['/auth/signin']);
    }

    const allowedUrls: string[] = ['/dashboard', '/auth/signin'];

    const currentUrl: string = state.url;

    if (!allowedUrls.includes(currentUrl)) {
  
    }

    return isCompanyExisit && isUserExisit;
  }
}

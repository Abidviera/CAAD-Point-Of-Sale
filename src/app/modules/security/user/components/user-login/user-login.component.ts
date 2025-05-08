import { formatDate } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { CommonUtil } from '../../../../../shared/utils/CommonUtil';
import { EmployeeService } from '../../../../../core/services/employee.service';
import { login } from '../../../../../core/models/authModels/login.model';
import { ToastAlert } from '../../../../../shared/alert/toast.alert';


@Component({
  selector: 'app-user-login',
  standalone: false,
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.scss',
})
export class UserLoginComponent {
  showPassword: boolean = false;
  isLoginMode = true;
  isLoading = false;
  error: string | null = null;
  @ViewChild('authForm') authForm!: NgForm;
  login: login = new login();
  today: string = formatDate(new Date(), 'dd-MM-yyyy hh:mm:ss', 'en');
  allSettings = {};
  rememberMe = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private employeeService: EmployeeService,

  ) {}

  ngOnInit() {
    const savedLogin = localStorage.getItem('savedLogin');
    if (savedLogin) {
      const loginData = JSON.parse(savedLogin);
      this.login = loginData;
      this.rememberMe = true;
    }
  }

  async onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    CommonUtil.clearCurrentUser();
    localStorage.clear();
    try {
      const email = form.value.email;
      const password = form.value.password;
      const companyCode = form.value.companyCode;
      this.isLoading = true;
      const authObs = await this.authService
        .login(email, password, companyCode)
        .toPromise();
      this.router.navigateByUrl('/d');
   

      if (this.rememberMe) {
        const loginData = { email, password, companyCode };
        localStorage.setItem('savedLogin', JSON.stringify(loginData));
        ToastAlert.success('success')
      } else {
        localStorage.removeItem('savedLogin');
      }
    } catch (errorMessage) {
      this.error = errorMessage as string;
    } finally {
      this.isLoading = false;
    }

    
  }

  async sendEmail(loginData: any): Promise<void> {
    try {
      const emailTemplate = `<!DOCTYPE html><html lang='en'><head> <meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1.0'><title>Confirmation Email</title></head><body><div class="container"><table align="center" border="0" cellpadding="0" cellspacing="0" width="550" bgcolor="white" style="border: 1px solid; margin-top: 10px; margin-bottom: 10px">
    <tr>
     <td> Logged in Date & Time : ${this.today}</td>
    </tr>
    <tr>
     <td> User : ${loginData?.user.name}</td>
    </tr>
    <tr>
    <td>Email: ${loginData?.user?.email}</td>
    </tr>
    </table></div></body> <html>`;
      const emailData = {
        company: CommonUtil.getCurrentCompany(),
        to: CommonUtil.getLoggedCompany().emailId,
        subject: 'Logged in User Details',
        emailBody: emailTemplate,
      };
      const result = (
        await this.employeeService.sendEmail(emailData)
      ).toPromise();
    } catch {}
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  closeError() {
    this.error = null;
  }
}

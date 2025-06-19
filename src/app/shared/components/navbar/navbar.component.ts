import { Component, EventEmitter, Input, Output } from '@angular/core';
import {  ElementRef, ViewChild } from '@angular/core';
import { CommonUtil } from '../../utils/CommonUtil';
import { EmployeeService } from '../../../core/services/employee.service';
import { SettingsService } from '../../../core/services/settings.service';
import { AuthService } from '../../../core/services/auth.service';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @Input() isFullScreen: boolean = false;
  @Output() openFullscreen = new EventEmitter<void>();
  @Output() closeFullscreen = new EventEmitter<void>();
  selectedTab: number = 0;
  withoutCustandPro: boolean = false;

  elem: any;
 allSettings: any = {};
  onTabChange(index: number) {
    this.selectedTab = index;
  }

    constructor(
    private authservice: AuthService,
    private employeeService: EmployeeService,
     private settingService: SettingsService,
  ) {
  }

  toggleTheme() {
    this.withoutCustandPro = !this.withoutCustandPro;
  }


  async ngOnInit() {
    
    document.addEventListener('fullscreenchange', () => {
      this.isFullScreen = !!document.fullscreenElement;
    });
    this.findAllSettings();
  
  }



 async findAllSettings(): Promise<void> {
    try {
      this.settingService.findAll('General').subscribe((res)=>{
        res.forEach((setting) => {
          this.allSettings[setting.keyword] = setting.settingsValue;
        });
      })
    } catch {
      this.allSettings = {};
    }
  }



    logout() {
    if (confirm('The current active session will be cleared. Are you sure to continue?')) {
      if (this.allSettings['enableEmail']) this.sendLogoutEmail();
      this.authservice.logout();
    }
  }


   async sendLogoutEmail(): Promise<void> {
    try {

       const currentUser = CommonUtil.getCurrentUser();
      if (!currentUser) {
        throw new Error('No current user found');
      }
      const loginData = JSON.parse(currentUser);
      const today = formatDate(new Date(), 'dd-MM-yyyy hh:mm:ss', 'en');
      const emailTemplate = `<!DOCTYPE html><html lang='en'><head> <meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1.0'><title>Confirmation Email</title></head><body><div class="container"><table align="center" border="0" cellpadding="0" cellspacing="0" width="550" bgcolor="white" style="border: 1px solid; margin-top: 10px; margin-bottom: 10px">
    <tr>
     <td> Logged Out Date & Time : ${today}</td>
    </tr>
    <tr>
     <td> User : ${loginData?.user?.name}</td>
    </tr>
    <tr>
    <td>Email: ${loginData?.user?.email}</td>
    </tr>
    </table></div></body> <html>`;
      const emailData = {
        company: CommonUtil.getCurrentCompany(),
        to: CommonUtil.getLoggedCompany()?.emailId,
        subject: 'Logged Out User Details',
        emailBody: emailTemplate,
      };
      const result = (await this.employeeService.sendEmail(emailData)).toPromise();
    } catch {}
  }
}

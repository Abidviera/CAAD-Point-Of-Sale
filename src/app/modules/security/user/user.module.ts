import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserForgotPasswordComponent } from './components/user-forgot-password/user-forgot-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [
    UserLoginComponent,
    UserForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    SharedModule
  ]
})
export class UserModule { }

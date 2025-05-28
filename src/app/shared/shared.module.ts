import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ServicePriceSettingPopupComponent } from './modals/service-price-setting-popup/service-price-setting-popup.component';




@NgModule({
  declarations: [
    NavbarComponent,
    ServicePriceSettingPopupComponent,
  
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NavbarComponent,
    ServicePriceSettingPopupComponent,
   
  ]
})
export class SharedModule { }

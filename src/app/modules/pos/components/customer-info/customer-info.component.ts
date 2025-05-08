import { Component } from '@angular/core';

@Component({
  selector: 'app-customer-info',
  standalone: false,
  templateUrl: './customer-info.component.html',
  styleUrl: './customer-info.component.scss'
})
export class CustomerInfoComponent {
  withoutCustandPro: boolean = false;
  isMobileView: boolean = window.innerWidth <= 600;
  selectedTab: number = 0;
}

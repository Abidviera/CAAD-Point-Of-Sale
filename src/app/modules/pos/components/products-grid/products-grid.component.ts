import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-products-grid',
  standalone: false,
  templateUrl: './products-grid.component.html',
  styleUrl: './products-grid.component.scss'
})
export class ProductsGridComponent {
  withoutCustandPro: boolean = false
  OrderTypeClicked: boolean = false;
  QuantityheaderText: string = 'Quantity';
  isMobileView: boolean = window.innerWidth <= 600;
  selectedTab: number = 0;
  toggleTheme() {
    this.withoutCustandPro = !this.withoutCustandPro;
  }

  onTabChange(index: number) {
    this.selectedTab = index;
  }

  updateHeaderText(): void {
    if (window.innerWidth <= 600) {
      this.QuantityheaderText = 'Qty';
    } else {
      this.QuantityheaderText = 'Quantity';
    }
  }


  async ngOnInit() {
    this.isMobileView = window.innerWidth <= 600;
    this.updateHeaderText();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isMobileView = window.innerWidth <= 600;
    this.updateHeaderText();
    
  }

}

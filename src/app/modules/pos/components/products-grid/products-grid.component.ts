import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { GridCartService } from '../../../../core/services/grid-cart.service';

@Component({
  selector: 'app-products-grid',
  standalone: false,
  templateUrl: './products-grid.component.html',
  styleUrl: './products-grid.component.scss',
})
export class ProductsGridComponent {
  @Input() products: any[] = [];
  @Output() quantityChanged = new EventEmitter<{
    index: number;
    isAdd: boolean;
  }>();
  withoutCustandPro: boolean = false;
  OrderTypeClicked: boolean = false;
  QuantityheaderText: string = 'Quantity';
  isMobileView: boolean = window.innerWidth <= 600;
  selectedTab: number = 0;
  posSettings: any = {};
  error: any = [];

  constructor(private gridCartService: GridCartService) {}

  toggleTheme() {
    this.withoutCustandPro = !this.withoutCustandPro;
  }

  onTabChange(index: number) {
    this.selectedTab = index;
  }

  handleQuantityChange(index: number, isAdd: boolean) {
    this.gridCartService.updateQuantity(index, isAdd);
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

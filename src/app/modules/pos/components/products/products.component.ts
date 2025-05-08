import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  @ViewChild('productsContainer') productsContainer!: ElementRef;
  scrollProducts(offset: number) {
    this.productsContainer?.nativeElement?.scrollBy({
      top: offset,
      behavior: 'auto',
    });
  }
}

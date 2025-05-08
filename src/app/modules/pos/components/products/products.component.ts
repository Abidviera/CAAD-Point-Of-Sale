import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import { Product } from '../../../../core/models/Products/product.model';
import { ProductService } from '../../../../core/services/product.service';
import { ToastAlert } from '../../../../shared/alert/toast.alert';
import { CommonUtil } from '../../../../shared/utils/CommonUtil';
import { Company } from '../../../../core/models/company.model';

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

  @Input() categoryIds: string[] = [];
  products: Product[] = [];
  isProductLoading = false;
   currentLoggedCompany: Company | null = null;

  constructor(private productService: ProductService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['categoryIds'] && this.categoryIds?.length) {
      this.getProductsByCategoryIds(this.categoryIds);
    }
  }
  async ngOnInit() {
    this.currentLoggedCompany = CommonUtil.getLoggedCompany();
  console.log(this.currentLoggedCompany)
  }

  async getProductsByCategoryIds(ids: string[]) {
    if (!ids?.length) {
      this.products = [];
      return;
    }

    this.isProductLoading = true;
    try {
      const products = await this.productService.getProductByCategoryIds(ids).toPromise();
      this.products = products || [];
    } catch (error) {
      // ToastAlert.error(error.message || 'Failed to load products');
    } finally {
      this.isProductLoading = false;
    }
  }
}

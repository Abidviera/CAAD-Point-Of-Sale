import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Product } from '../../../../core/models/Products/product.model';
import { ProductService } from '../../../../core/services/product.service';
import { CommonUtil } from '../../../../shared/utils/CommonUtil';
import { Company } from '../../../../core/models/company.model';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  @Input() categoryIds: string[] = [];
  @Output() productClicked = new EventEmitter<any>();
  @ViewChild('productsContainer') productsContainer!: ElementRef;

  products: Product[] = [];
  isProductLoading = false;
  currentLoggedCompany: Company | null = null;

  constructor(private productService: ProductService) {}

  scrollProducts(offset: number) {
    this.productsContainer?.nativeElement?.scrollBy({
      top: offset,
      behavior: 'auto',
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['categoryIds'] && this.categoryIds?.length) {
      this.getProductsByCategoryIds(this.categoryIds);
    }
  }

  async ngOnInit() {
    this.currentLoggedCompany = CommonUtil.getLoggedCompany();
  }

  async getProductsByCategoryIds(ids: string[]) {
    if (!ids?.length) {
      this.products = [];
      return;
    }

    this.isProductLoading = true;
    try {
      const products = await this.productService
        .getProductByCategoryIds(ids)
        .toPromise();
      this.products = products || [];
    } catch (error) {
      // ToastAlert.error(error.message || 'Failed to load products');
    } finally {
      this.isProductLoading = false;
    }
  }

  onProductClick(product: any) {
    this.productClicked.emit(product);
    console.log(product);
  }
}

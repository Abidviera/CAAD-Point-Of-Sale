import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { CategoryNode } from '../../../../core/models/Category/categoryNode.model';
import { CategoryService } from '../../../../core/services/category.service';
import { ToastAlert } from '../../../../shared/alert/toast.alert';
import { Product } from '../../../../core/models/Products/product.model';
import { Observable } from 'rxjs';
import { ProductService } from '../../../../core/services/product.service';

@Component({
  selector: 'app-category',
  standalone: false,
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent {
  @ViewChild('categoryWithChild') categoryWithChild!: ElementRef;
  @ViewChild('categorySection') categorySection!: ElementRef;
  @Output() categorySelected = new EventEmitter<{
    node: CategoryNode;
    parentNodes: CategoryNode[];
  }>();
  @Output() productsRequested = new EventEmitter<string[]>();
  

  allowSubCategory: boolean = true;
  isCategoryLoading = false;
  withoutCustandPro: boolean = false;
  categoryTreeData: CategoryNode[] = [];
  unTouchedcategoryTreeData: CategoryNode[] = [];
  selectedCategory: CategoryNode | null = null;
  subCategories: CategoryNode | null = null;
  categoryActive = false;
  parentNodes: CategoryNode[] = [];
  products: Product[] = [];
  isProductLoading = false;
  posSettings: any = {};


  constructor(
    private categoryService: CategoryService,
    private productService: ProductService
  ) {}

  async ngOnInit() {
    this.getCategoryTree();
    // this.loadProducts();
  }


  scrollCategory(offset: number) {
    this.categoryWithChild?.nativeElement?.scrollBy({
      left: offset,
      behavior: 'smooth',
    });
  }

  scrollCategoryVertical(offset: number) {
    this.categorySection?.nativeElement?.scrollBy({
      top: offset,
      behavior: 'smooth',
    });
  }

  toggleTheme() {
    this.withoutCustandPro = !this.withoutCustandPro;
  }

  async getCategoryTree() {
    this.isCategoryLoading = true;
   this.categoryService.getCategoryTree('POS').subscribe(
      (treeData) => {
        this.categoryTreeData = treeData;
        this.unTouchedcategoryTreeData = treeData;
        this.CategorySelected(this.categoryTreeData[0], this.categoryTreeData);
        this.isCategoryLoading = false;
      },
      (errorMessage) => {
        ToastAlert.error(errorMessage);
        this.isCategoryLoading = false;
      }
    );
  }

  async CategorySelected(node: CategoryNode, parentNodes: CategoryNode[] = []) {
    const isParentCategory = !node?.parent;
    if (isParentCategory) {
      this.subCategories = node.childrens?.length ? node : null;
    } else if (this.selectedCategory?.parent !== node.parent) {
      // Keep current subCategories
    }

    this.selectedCategory = node;
    this.categorySelected.emit({node, parentNodes});
    
    if (node.childrens && node.childrens.length > 0) {
      this.parentNodes = parentNodes || [];
      const parentNode = this.findCategoryNodeById(this.unTouchedcategoryTreeData, node.parent);
      this.categoryTreeData = this.allowSubCategory ? this.categoryTreeData : (parentNodes || []);
    }

    const ids = this.getCategoryChilds(node);
    this.productsRequested.emit(ids);
  }



  findCategoryNodeById(categoryNodes: CategoryNode[], categoryId: any): CategoryNode | null {
    if (!categoryId) return null;
    for (const node of categoryNodes) {
      if (node.categoryId === categoryId) return node;
      if (node.childrens) {
        const found = this.findCategoryNodeById(node.childrens, categoryId);
        if (found) return found;
      }
    }
    return null;
  }


  getCategoryChilds(category: CategoryNode): string[] {
    let selected: string[] = [];
    if (!category.childrens || category.childrens.length === 0) {
      selected.push(category.categoryId);
      return selected;
    }
    for (const child of category.childrens) {
      selected = selected.concat(this.getCategoryChilds(child));
    }
    selected.push(category.categoryId);
    return selected;
  }

 
}

import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-category',
  standalone: false,
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {
  allowSubCategory: boolean = false;
  isCategoryLoading = false;
  withoutCustandPro: boolean = false
  @ViewChild('categoryWithChild') categoryWithChild!: ElementRef;
  @ViewChild('categorySection') categorySection!: ElementRef;

  scrollCategory(offset: number) {
    this.categoryWithChild?.nativeElement?.scrollBy({ left: offset, behavior: 'auto' });
  }

  scrollCategoryVertical(offset: number) {
    this.categorySection?.nativeElement?.scrollBy({ top: offset, behavior: 'auto' });
  }

  toggleTheme() {
    this.withoutCustandPro = !this.withoutCustandPro;
  }
}

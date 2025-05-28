export class CategoryNode {
  categoryName: string;
  categoryImage: string;
  categoryId: any;
  childrens: CategoryNode[];
  parent: any;
  expanded?: boolean;
}
export class Product {
  _id: any;
  company?: string;
  sn?: string;
  barcode?: string;
  productCode?: string;
  productName?: string;
  productNameArabic?: string;
  productDescription?: string;
  baseCost?: number;
  taxPercentage?: number;
  taxCode: any;
  costWithTax?: number;
  grossProfitPercentage?: number;
  retailPrice?: number;
  grossProfit?: number;
  discountPercentage?: number;
  discountPrice?: number;
  wholeSalePrice?: number;
  creditPrice?: number;
  packingQty?: number;
  openingStock?: number;
  openingStockRate?: number;
  openingStockTotalValue?: number;
  productType?: string;
  baseItem: any;
  category: any;
  uom: any;
  purchaseAccount: any;
  salesAccount: any;
  supplier: any;
  brand: any;
  binMaster?: string;
  location: any;
  countryOfOrigin?: string;
  size?: string;
  cupSize?: string;
  productTemparature?: string;
  productShelfPeriod?: string;
  reorderLevel?: number;
  reorderQty?: number;
  offerPrice?: number;
  offerStartDate?: Date | string;
  offerEndDate?: Date | string;
  vegetarianType?: string;
  blockMinSalePrice?: string;
  blockNegetiveSale?: boolean;
  productionandExpiryDateOnBarcode?: boolean;
  isActive?: boolean;
  weightingScaleItem?: boolean;
  isPriceType?: boolean;
  isPriceTypeQtyisOne?: boolean;
  trackExpiry?: boolean;
  remarks?: string;
  mediaumRate?: number;
  largeRate?: number;
  purchaseCharges?: number;
  paymentAccount: any;
  serviceCharges?: number;
  proCommisionAccount: any;
  proCommision?: number;
  onlinePrices?: ProductOnlinePriceDTO[];
  alternateBarcodes?: ProductBarcodeDTO[];
  assortedItems?: ProductAssortedItemDTO[];
  images?: ProductImageDTO[];
  weighingQuantity?: any;
  weighingPrice?: any;
  notes?: ProductNotesDTO[];
  productionDate?: Date;
  expiryDate?: Date;
  qty?: number;
}

export class ProductUpdateDTO {
  id?: string;
  baseCost?: number;
  openingStock?: number;
  retailPrice?: number;
}

export class GetProductCodeDTO {
  productCode?: string;
}

export class GetProductBarcodeDTO {
  barcode?: string;
}

export class ProductOnlinePriceDTO {
  app: any;
  price?: number;
}

export class getDrodownProductDTO {
  _id: any;
  productCode?: string;
  barcode?: string;
  productName?: string;
  productNameArabic?: string;
}

export class getSubProductDTO {
  _id: any;
  productCode?: string;
  barcode?: string;
  productName?: string;
  productNameArabic?: string;
  baseCost?: number;
  retailPrice?: number;
}

export class ProductBarcodeDTO {
  constructor(_barcode = '') {
    this.barcode = _barcode;
  }
  barcode: string;
}

export class ProductAssortedItemDTO {
  product: any;
  qty?: number;
}

export class UploadProductImageDTO {
  /**
   *
   */
  constructor() {
    this.imageStrings = '';
  }
  productId?: string;
  imageStrings: string;
}

export class ProductImageDTO {
  publicId?: string;
  assetId?: string;
  url?: string;
  secureUrl?: string;
  fileFormat?: string;
}

export class ProductFilterDTO {
  barcode?: string;
  productName?: string;
  company: any;
  brandId?: string;
  categoryId?: string;
  locationId?: string;
}

export class ProductNotesDTO {
  prdtId?: string;
  id?: string;
  notes?: string;
  isDefault?: boolean;
}

export enum EproductType {
  BASE_ITEM = 'Base Item',
  SUB_ITEM = 'Sub Item',
  ASSORTED_ITEM = 'Assorted Item',
  MATERIAL = 'Material',
  NON_INV_ITEM = 'Non Inventory Item',
  SERVICE_ITEM = 'Service Item',
}

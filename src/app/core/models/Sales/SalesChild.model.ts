import { PriceType } from "../../../shared/enums/priceType.enums";


export class SalesChild {
  Product: any;
  Barcode: string;
  ItemCode: string;
  productName: string;
  description: string;
  qty: number;
  focQty: number;
  totalQtyWithFoc: number;
  unit: any;
  pcsinunit: number;
  price: number;
  discPercentage: number;
  discount: number;
  netUnitRate: number;
  tax: number;
  taxCode: any;
  taxAmount: number;
  unitRateWithTax: number;
  totalTax: number;
  totalTaxExclusive: number;
  totalWithTax: number;
  location: any;
  project: any;
  purchaseAccount: any;
  timestamp: number;
  totalCost: number;
  baseCost: number;
  costWithTax: number;
  address: string;
  unitName?: string;
  doDate?: Date;
  doNo?: string;
  plateNo: string;
  amtWithoutTax: number;
  profitPercentage: number;
  grossProfit: number;
  totalgrossProfit: number;
  currentStock: number;
  priceType?: PriceType;
  isOfferPrice?: boolean;
  service?: any;
  serviceName?: any;
  Addon?: any;
  AddonName?: any;
  deliveryType?: string;
  servicePriceType?: string;
  ExpDate?: Date;
  amount?: number;
  
}


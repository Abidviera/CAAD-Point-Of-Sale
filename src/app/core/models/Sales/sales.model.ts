import { AppType } from '../../../shared/enums/appType.enum';
import { DeliveryStatus } from '../../../shared/enums/deliveryStatus.enum';
import { OrderScreenStatus } from '../../../shared/enums/orderScreenStatus.enum';
import { OrderStatus } from '../../../shared/enums/orderStatus.enum';
import { OrderTypes } from '../../../shared/enums/orderTypes.enum';
import { paymentAccount } from './paymentAccount.model';
import { PaymentTypes } from './paymentType.model';
import { SalesChild } from './SalesChild.model';
import { salesReceipt } from './salesReceipts.model';

export class EyePrescription {
  eye: 'Right' | 'Left';
  spherical: number;
  cylindrical: number;
  axis: number;
  add?: number;
  ipd?: number;
}

export class Sales {
  /**
   *
   */
  constructor() {
    this.isDeleted = false;
    this.measurement = {
      detailType: {
        western: false,
        kuwaiti: false,
        qatari: false,
        arabic: false,
      },
      measurements: {
        shoulder: null,
        height: null,
        waist: null,
        chest: null,
        neck: null,
        sleeves: null,
      },
      sleeveType: 'shortSleeves',
      serviceType: {
        type: '',
      },
      referanceImg: [
        {
          Photo: [],
        },
      ],

      additionalNotes: {
        notes: '',
      },
    };
  }

  _id: string;
  company: any;
  billNo: string;
  kotNumber?: string;
  saleDate: Date;
  lpoNo: string;
  grnNo: string;
  salesQuotationNo?: any;
  salesDeliveryNoteNo?: any;
  salesJobOrderNo?: any;
  customer: any;
  customerInvoiceNo: string;
  customerTRN?: string;
  customerAddress?: string;
  salesman: any;
  location: any;
  project: any;
  isCash: boolean;
  totalAmountExcTax: number;
  Tax: number;
  totalAmountInclTax: number;
  roundOff: number;
  shipping: number;
  Discount: number;
  Total: number;
  paymentAccount: paymentAccount[];
  salesAccount: any;
  Paid: number;
  paymentRef: string;
  Balance: number;
  chequeNo: string;
  chequeDate: Date;
  remarks: string;
  note?: string;
  bankingNote?: string;
  products: SalesChild[] = [];
  eyePrescription?: EyePrescription[] = [];
  bankName: string;
  branchName: string;
  bankAccountno: string;
  bankIBAN: string;
  bankSwiftCode: string;
  isDeleted: boolean;
  isPendingJobOrder = false;
  jobOrderRef: any;
  paymentTerms?: string;
  costAmount: number;
  isHold: boolean;
  appType: AppType;
  print?: boolean;
  isThermal?: boolean;
  receipts?: salesReceipt[];
  authorized?: string;
  joborders?: string[];
  shift?: any;
  paymentTypes: PaymentTypes[];
  orderType: OrderTypes;
  orderStatus?: OrderStatus;
  OrderScreenStatus?: OrderScreenStatus;
  KOTorderStatusTime?: Date;
  orderStatusTime?: Date;
  printedButNotSetteled?: boolean;
  table?: any;
  chair?: any;
  PaymnetReferenceno?: string;
  hideUnitRate?: boolean;
  DeliveryEmployeeId?: any;
  DeliveryStatus?: DeliveryStatus;
  AssignEmployeeDate?: Date;
  PickupTime?: Date;
  selected?: boolean;
  MobileNumber?: string;
  DOB?: string;
  CustomerAge?: number;
  Address?: string;
  Email?: string;
  PrescribedPerson?: string;
  DeliveryDate?: Date;
  cancelledProducts: SalesChild[];
  cash?: number;
  bankCard?: number;
  measurement?: Measurement;
  onlineApp?: any;
  kotPrint?: boolean;
}
export class SalesInvoiceDto {
  InvoiceNumber: string;
}

export class salesPaymentRefNoDTO {
  PaymentRefNumber: string;
}

export class SalesListFilterDTO {
  constructor() {
    this.fromDate = undefined;
    this.toDate = undefined;
    this.customer = undefined;
    this.paymentAccount = undefined;
    this.paymentMode = undefined;
    this.isHold = false;
  }

  isHold: boolean;
  appType?: AppType;
  fromDate?: Date;
  toDate?: Date;
  customer?: any;
  paymentAccount?: any;
  paymentMode?: string;
  shiftId?: string;
}

export class SalesByJob {
  company: string;
  joborders: string[];
  customer: string;
  bankName: string;
  branchName: string;
  bankAccountno: string;
  bankIBAN: string;
  bankSwiftCode: string;
  costAmount: number;
  isHold: boolean;
  appType: AppType;
  receipts?: salesReceipt[];
  paid: number;
}

export enum InvoiceFormats {
  FORMAT_ONE = 'Format 1',
  FORMAT_TWO = 'Format 2',
  FORMAT_THREE = 'Format 3',
  FORMAT_DM_ONE = 'Dot Matrix Fomat',
}

export class Measurement {
  detailType: {
    western: boolean;
    kuwaiti: boolean;
    qatari: boolean;
    arabic: boolean;
  };
  measurements: {
    shoulder: number | null;
    height: number | null;
    waist: number | null;
    chest: number | null;
    neck: number | null;
    sleeves: number | null;
  };
  sleeveType: 'shortSleeves' | 'longSleeves';
  selectedFabrics?: {
    productName: string;
    name: string;
    code: string;
    image?: string;
    meterSize: string;
  }[];
  serviceType: {
    type: string;
  };
  referanceImg: {
    Photo: string[];
  }[];

  additionalNotes: {
    notes: string;
  };
}

export class TailotingRefImage {
  constructor() {
    this.imageStrings = '';
  }
  imageStrings: string;
}

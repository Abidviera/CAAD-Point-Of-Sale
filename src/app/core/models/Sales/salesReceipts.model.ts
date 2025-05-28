export class salesReceipt {
  company?: string;
  paymentAccount: any;
  date: string;
  voucherNumber: number;
  referenceNo: string;
  amount: number;
  chequeDate: Date = new Date();
  chequeNo: string;
  paymentMethod: string;
  remark: string;
  serialNumber: string;
  createdAt: Date = new Date();
  allocationId?: any;
}

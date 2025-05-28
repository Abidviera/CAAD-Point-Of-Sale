import { Customer } from "./customer.model";
import { SalesChild } from "./Sales/SalesChild.model";

export class ledger {
  _id: string;
  fullName: string;
  ledgerName: string;
  Group: any;
  address?: any;
  mobile?: string;
  phone?: string;
  typeofData?: string;
  mailingName?: string;
  email?: string;
  Representative?: string;
  accountsManager?: string;
  country?: string;
  state?: string;
  identityNumber?: number;
  customerCode?: string;
  openingbalance?: number;
  creditLimit?: number;
  creditPeriod?: number;
  remarks?: string;
  website?: string;
  name: string;
  deleted?: boolean;
  openingBalanceType: string; // DEBIT OR CREDIT ENUM.
  costCenterApplicable: boolean;
  company: string;
  trn: string;
  customerDetails: Customer;
  cart?: SalesChild[];
}
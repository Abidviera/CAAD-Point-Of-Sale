export class Company {
  _id: string;
  companyName: string;
  companyCode: string;
  ParentCompany: string;
  companyNameArabic: string;
  barcode: string;
  address: string;
  TRN: string;
  phoneNo: string;
  phoneIcon?: string;
  mobileNo: string;
  mobileIcon?: string;
  license?: string;
  licenseIssue?: Date;
  licenseExpire?: Date;
  emailId: string;
  web: string;
  country: string;
  state: string;
  postBox: string;
  financialYearStart: Date;
  currencySymbol: string;
  timezone: string;
  remarks: string;
  logoPath: string;
  bankName: string;
  branchName: string;
  bankAccountno: string;
  bankIBAN: string;
  bankSwiftCode: string;
  businessType: any;
}

export class UserCompanyDTO {
  _id: string;
  companyName: string;
  businessTypeName: string;
}

export class LogoPath {
  constructor() {
    this.logoPath = '';
  }
  logoPath: string;
}

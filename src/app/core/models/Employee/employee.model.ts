import { EmployeeDocument } from "./employeeDoc.models";

export class Employee {
  _id: string;
  company: string;
  customer: any;
  employeeNumber: string;
  fullName: string;
  ledgerName: string;

  imagePath: string;
  isLoginRequired: boolean;
  loginUserName: string;
  loginPassword: string;
  isActive: boolean;
  cashAccount: any;
  designation: any;
  userRole: any;
  department: any;
  reportingTo: any;
  location: any;
  employementType: string;
  gender: string;
  DOJ: Date;
  DOB: Date;
  bloodGroup: string;
  fatherName: string;
  motherName: string;
  spouseName: string;
  address: string;
  country: string;
  city: string;
  nationality: string;
  religion: string;
  contactNumber: string;
  emailId: string;
  bankName: string;
  branchName: string;
  bankAccountno: string;
  bankIBAN: string;
  bankSwiftCode: string;
  remarks: string;
  nextApprisalDate: Date;
  probotionEndDate: Date;

  labourCardNo: string;
  labourCardIssueDate: Date;
  labourCardExpiryDate: Date;

  passportNo: string;
  passportIssueDate: Date;
  passportExpiryDate: Date;

  emiratesId: string;
  emiratesIdIssueDate: Date;
  emiratesIdExpiryDate: Date;

  visaNo: string;
  visaIssueDate: Date;
  visaExpiryDate: Date;

  licenceNo: string;
  allowedVehicleCategories: string;
  licenceIssueDate: Date;
  licenceExpiryDate: Date;

  healthInsuranceNo: string;
  healthInsuranceIssueDate: Date;
  healthInsuranceExpiryDate: Date;

  vehicleNo: string;
  vehicleDetails: string;
  vehicleIssueDate: Date;
  vehicleExpiryDate: Date;
  documents: EmployeeDocument[];
  employeeLedger: any;
  target?: any;
  createdAt?: Date;
  employeePin: string;
}

import { PosButtonType } from "../../shared/enums/posButtonType.enum";

export class PosButton {
  _id: any;
  company: any;
  isActive: boolean;
  displayText: string;
  type: PosButtonType;
  sortOrder: number;
}
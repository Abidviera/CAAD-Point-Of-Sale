import { PosOrderActionButtonsType } from "../../shared/enums/PosOrderActionButtonsType.enum";

export class PosOrderActionButton {
    _id: any;
    company: any;
    isActive?: boolean ;
    displayText?: string;
    type?: PosOrderActionButtonsType;
    sortOrder?: number;
  }
  
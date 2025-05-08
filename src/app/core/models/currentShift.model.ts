import { POSDay } from "./posDay.model";
import { ShiftBreak } from "./shiftBreak.model";

export class CurrentShift {
    constructor() {
      this.deleted = false;
    }
    _id?: string;
    breaks?: ShiftBreak[];
    company?: string;
    createdAt?: Date;
    deleted: boolean;
    openingBalalnce?: number;
    posDay?: POSDay;
    salesman?: string;
    shiftDate?: Date;
    shiftDuration?: number;
    shiftEnd?: Date;
    shiftNumber?: number;
    shiftStart?: Date;
    updatedAt?: Date;
  }
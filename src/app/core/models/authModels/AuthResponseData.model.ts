import { UserCompanyDTO } from "../company.model";
import { CurrentShift } from "../currentShift.model";

export interface AuthResponseData {
    user: any;
    jwt_bearer_token: string;
    expiresIn: string;
    company: UserCompanyDTO;
    currentShift: CurrentShift;
  }
  
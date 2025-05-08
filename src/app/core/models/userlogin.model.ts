import { UserCompanyDTO } from "./company.model";

export class UserLogin {
    constructor(
      public user: any,
      public jwt_bearer_token: string,
      private _tokenExpirationDate: Date,
      private company: UserCompanyDTO,
      public role: string,
      public currentShift?: any
    ) {}
  
    get token() {
      if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
        return null;
      }
      return this.jwt_bearer_token;
    }
  }
  
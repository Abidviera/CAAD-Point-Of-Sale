import { AppMenuModule } from "../../core/models/menu/appMenuModule";
import { appConstant } from "../constants/appConstants";
import storageUtility from "./storageUtility";

export class CommonUtil {
     static getCurrentCompany(): string | undefined {
    const val = this.getCurrentUserFormatted();
    if (val == undefined) {
      return undefined;
    }
    return val?.company?._id;
  }

  static getLoggedCompany() {
    const val = this.getCurrentUserFormatted();
    if (val == undefined) {
      return undefined;
    }
    return val?.company;
  }

  static getLoggedUserRole(): string | undefined {
    const val = this.getCurrentUserFormatted();
    if (val == undefined) {
      return undefined;
    }
    return val?.role || '';
  }

  static getCurrentUser() {
    const val = storageUtility.getValue(appConstant.userStorageKey);
    if (val == undefined || val == null) {
      return undefined;
    }
    return val;
  }

  static getCurrentUserDetail() {
    const val = this.getCurrentUserFormatted();
    if (val == undefined || val == null) {
      return undefined;
    }
    return val;
  }

  static getCurrentUserFormatted() {
    const val = storageUtility.getValue(appConstant.userStorageKey);
    if (val == undefined || val == null) {
      return undefined;
    }
    const userObj = JSON.parse(val);
    return userObj;
  }

  static clearLocalStorage() {
    this.clearCurrentUser();
    storageUtility.removeValue(appConstant.menuStorageKey);
  }
  
  static clearCurrentUser() {
    storageUtility.removeValue(appConstant.userStorageKey);
  }

  static formatStringIdValue(id: string) {
    if (id == undefined || id == null || id == '') {
      return 'null';
    }
    return id;
  }

  static capitalizeFirstLetter(input: string): string {
    if (input === null || input === undefined || input.trim().length == 0) {
      return '';
    }

    input = input.trim();
    return input.charAt(0).toUpperCase() + input.slice(1);
  }

  static getUserMenu(): AppMenuModule[] | undefined {
    const val = storageUtility.getValue(appConstant.menuStorageKey);
    if (val == undefined || val == null) {
      return undefined;
    }
    const menus: AppMenuModule[] = JSON.parse(val) as AppMenuModule[];
    return menus;
  }

  static setUserMenu(menus: AppMenuModule[]) {
    storageUtility.setKey(appConstant.menuStorageKey, JSON.stringify(menus));
  }
}
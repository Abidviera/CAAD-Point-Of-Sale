import { AppMenu } from "./appMenu";

export interface AppMenuGroup {
    groupName: string;
    sortOrder: number;
    menus: AppMenu[];
    showGroup?: boolean;
    isAccessAllEnabled?: boolean;
  }
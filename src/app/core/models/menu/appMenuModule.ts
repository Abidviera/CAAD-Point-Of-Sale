import { AppMenuGroup } from "./appMenuGroup";


export interface AppMenuModule {
  isRootMenu?: boolean;
  moduleName: string;
  moduleIcon: string;
  sortOrder: number;
  groups: AppMenuGroup[];
  showModule?: boolean;
}

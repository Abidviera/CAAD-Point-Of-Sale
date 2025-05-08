export class AppMenuModuleJsonModel {
    moduleName?: string;
    moduleIcon?: string;
    isRootMenu?: boolean;
    sortOrder?: number;
    groups?: AppMenuGroupJsonModel[];
  }
  
  export class AppMenuGroupJsonModel {
    groupName?: string;
    sortOrder?: number;
    menus?: AppMenuJsonModel[];
  }
  
  export class AppMenuJsonModel {
    menuId?: number;
    menuName?: string;
    title?: string;
    path?: string;
    component?: string;
    sortOrder?: number;
  }
  
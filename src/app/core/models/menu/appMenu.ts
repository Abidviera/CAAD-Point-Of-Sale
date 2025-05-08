export interface AppMenu {
    menuId?: number;
    menuName: string;
    title: string;
    path: string;
    component: string;
    sortOrder: number;
    isSaveEnabled?: boolean;
    isDeleteEnabled?: boolean;
    isUpdateEnabled?: boolean;
    isViewEnabled?: boolean;
    isFullAccess?: boolean;
  }
  
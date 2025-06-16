
export interface NavigationItem {
  id: string;
  label: string;
  path?: string; // Optional for parent items
  icon?: string;
  description?: string;
  requiredRoles: string[];
  requiredPermissions?: string[];
  children?: NavigationItem[];
  metadata?: {
    order?: number;
    isNew?: boolean;
    isBeta?: boolean;
    external?: boolean;
  };
}

export interface UserRole {
  id: string;
  name: string;
  displayName: string;
  description: string;
  permissions: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  email: string;
  name: string;
  roles: string[];
  permissions: string[];
  departmentAccess: string[];
  isActive: boolean;
}

export interface PermissionMatrix {
  [roleId: string]: {
    navigationItems: string[];
    permissions: string[];
    lastUpdated: Date;
    updatedBy: string;
  };
}

export interface NavigationState {
  expandedItems: Set<string>;
  activeItem: string | null;
  isCollapsed: boolean;
}

export interface NavigationConfig {
  items: NavigationItem[];
  defaultExpanded: string[];
  allowMultipleExpanded: boolean;
  rememberState: boolean;
}

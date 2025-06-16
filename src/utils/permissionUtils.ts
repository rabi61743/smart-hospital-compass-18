
import { NavigationItem, PermissionMatrix, User } from '@/types/navigation';

/**
 * Check if a user has permission to access a specific navigation item
 */
export const hasNavigationAccess = (
  user: User,
  itemId: string,
  permissionMatrix: PermissionMatrix
): boolean => {
  // Super admin has access to everything
  if (user.roles.includes('super-admin')) return true;
  
  // Check if any of the user's roles allow this item
  return user.roles.some(role => {
    const rolePermissions = permissionMatrix[role];
    if (!rolePermissions) return false;
    
    // Check if role has wildcard access or specific item access
    return rolePermissions.navigationItems.includes('*') ||
           rolePermissions.navigationItems.includes(itemId);
  });
};

/**
 * Filter navigation items recursively based on user permissions
 */
export const filterNavigationByPermissions = (
  items: NavigationItem[],
  user: User,
  permissionMatrix: PermissionMatrix
): NavigationItem[] => {
  const filterRecursive = (items: NavigationItem[]): NavigationItem[] => {
    return items
      .filter(item => hasNavigationAccess(user, item.id, permissionMatrix))
      .map(item => ({
        ...item,
        children: item.children ? filterRecursive(item.children) : undefined
      }))
      .filter(item => !item.children || item.children.length > 0);
  };

  return filterRecursive(items);
};

/**
 * Get all navigation item IDs recursively
 */
export const getAllNavigationIds = (items: NavigationItem[]): string[] => {
  const ids: string[] = [];
  
  const collectIds = (items: NavigationItem[]) => {
    items.forEach(item => {
      ids.push(item.id);
      if (item.children) {
        collectIds(item.children);
      }
    });
  };
  
  collectIds(items);
  return ids;
};

/**
 * Get parent path for a navigation item
 */
export const getNavigationParentPath = (
  items: NavigationItem[],
  targetId: string,
  path: string[] = []
): string[] => {
  for (const item of items) {
    const currentPath = [...path, item.id];
    if (item.id === targetId) {
      return currentPath;
    }
    if (item.children) {
      const childPath = getNavigationParentPath(item.children, targetId, currentPath);
      if (childPath.length > 0) return childPath;
    }
  }
  return [];
};

/**
 * Find navigation item by ID
 */
export const findNavigationItem = (
  items: NavigationItem[],
  targetId: string
): NavigationItem | null => {
  for (const item of items) {
    if (item.id === targetId) {
      return item;
    }
    if (item.children) {
      const found = findNavigationItem(item.children, targetId);
      if (found) return found;
    }
  }
  return null;
};

/**
 * Find navigation item by path
 */
export const findNavigationItemByPath = (
  items: NavigationItem[],
  targetPath: string
): NavigationItem | null => {
  for (const item of items) {
    if (item.path === targetPath) {
      return item;
    }
    if (item.children) {
      const found = findNavigationItemByPath(item.children, targetPath);
      if (found) return found;
    }
  }
  return null;
};

/**
 * Validate permission matrix structure
 */
export const validatePermissionMatrix = (matrix: PermissionMatrix): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];
  
  Object.entries(matrix).forEach(([roleId, permissions]) => {
    if (!permissions.navigationItems || !Array.isArray(permissions.navigationItems)) {
      errors.push(`Role ${roleId} missing or invalid navigationItems array`);
    }
    
    if (!permissions.permissions || !Array.isArray(permissions.permissions)) {
      errors.push(`Role ${roleId} missing or invalid permissions array`);
    }
    
    if (!permissions.lastUpdated || !(permissions.lastUpdated instanceof Date)) {
      errors.push(`Role ${roleId} missing or invalid lastUpdated date`);
    }
    
    if (!permissions.updatedBy || typeof permissions.updatedBy !== 'string') {
      errors.push(`Role ${roleId} missing or invalid updatedBy field`);
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Generate breadcrumb from navigation path
 */
export const generateBreadcrumb = (
  items: NavigationItem[],
  activePath: string[]
): { id: string; label: string; path?: string }[] => {
  const breadcrumb: { id: string; label: string; path?: string }[] = [];
  
  let currentItems = items;
  
  for (const pathId of activePath) {
    const item = currentItems.find(i => i.id === pathId);
    if (item) {
      breadcrumb.push({
        id: item.id,
        label: item.label,
        path: item.path
      });
      
      if (item.children) {
        currentItems = item.children;
      }
    }
  }
  
  return breadcrumb;
};

/**
 * Export navigation permissions for backup/transfer
 */
export const exportPermissions = (matrix: PermissionMatrix) => {
  return {
    version: '1.0',
    exportDate: new Date().toISOString(),
    permissions: matrix
  };
};

/**
 * Import and validate navigation permissions
 */
export const importPermissions = (
  data: any
): { success: boolean; matrix?: PermissionMatrix; errors?: string[] } => {
  try {
    if (!data.version || !data.permissions) {
      return { success: false, errors: ['Invalid import format'] };
    }
    
    const validation = validatePermissionMatrix(data.permissions);
    if (!validation.isValid) {
      return { success: false, errors: validation.errors };
    }
    
    return { success: true, matrix: data.permissions };
  } catch (error) {
    return { success: false, errors: ['Failed to parse import data'] };
  }
};

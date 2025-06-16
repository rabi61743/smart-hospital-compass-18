
import { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { NavigationItem, NavigationState, User, PermissionMatrix } from '@/types/navigation';
import { NAVIGATION_SCHEMA } from '@/config/navigationSchema';

// Mock current user - in real app this would come from auth context
const MOCK_CURRENT_USER: User = {
  id: "user-1",
  email: "admin@mediflow.com",
  name: "Admin User",
  roles: ["super-admin"],
  permissions: ["*"],
  departmentAccess: ["*"],
  isActive: true
};

// Mock permission matrix - in real app this would come from API/database
const MOCK_PERMISSION_MATRIX: PermissionMatrix = {
  "super-admin": {
    navigationItems: ["*"],
    permissions: ["*"],
    lastUpdated: new Date(),
    updatedBy: "system"
  },
  "admin": {
    navigationItems: ["dashboard", "clinical", "financial", "operations", "administration"],
    permissions: ["admin.*", "users.*", "billing.*", "reports.*"],
    lastUpdated: new Date(),
    updatedBy: "system"
  },
  "doctor": {
    navigationItems: ["dashboard", "clinical", "clinical.doctor", "clinical.patients"],
    permissions: ["clinical.*", "patients.*", "medical-records.*"],
    lastUpdated: new Date(),
    updatedBy: "system"
  },
  "finance": {
    navigationItems: ["dashboard", "financial"],
    permissions: ["finance.*", "billing.*", "payroll.*"],
    lastUpdated: new Date(),
    updatedBy: "system"
  }
};

export const useNavigation = () => {
  const location = useLocation();
  const [navigationState, setNavigationState] = useState<NavigationState>({
    expandedItems: new Set(),
    activeItem: null,
    isCollapsed: false
  });

  // Get current user from context (mocked for now)
  const currentUser = MOCK_CURRENT_USER;

  // Filter navigation items based on user permissions
  const filterNavigationByPermissions = (
    items: NavigationItem[],
    userRoles: string[],
    permissionMatrix: PermissionMatrix
  ): NavigationItem[] => {
    const hasAccess = (item: NavigationItem): boolean => {
      // Super admin has access to everything
      if (userRoles.includes('super-admin')) return true;
      
      // Check if any of the user's roles allow this item
      return userRoles.some(role => {
        const rolePermissions = permissionMatrix[role];
        if (!rolePermissions) return false;
        
        // Check if role has access to this specific item or has wildcard access
        return rolePermissions.navigationItems.includes('*') ||
               rolePermissions.navigationItems.includes(item.id) ||
               item.requiredRoles.includes('*') ||
               item.requiredRoles.some(requiredRole => userRoles.includes(requiredRole));
      });
    };

    const filterRecursive = (items: NavigationItem[]): NavigationItem[] => {
      return items
        .filter(hasAccess)
        .map(item => ({
          ...item,
          children: item.children ? filterRecursive(item.children) : undefined
        }))
        .filter(item => !item.children || item.children.length > 0);
    };

    return filterRecursive(items);
  };

  // Get filtered navigation items
  const navigationItems = useMemo(() => {
    return filterNavigationByPermissions(
      NAVIGATION_SCHEMA,
      currentUser.roles,
      MOCK_PERMISSION_MATRIX
    );
  }, [currentUser.roles]);

  // Find active item based on current path
  const findActiveItem = (items: NavigationItem[], path: string): string | null => {
    for (const item of items) {
      if (item.path === path) {
        return item.id;
      }
      if (item.children) {
        const childActive = findActiveItem(item.children, path);
        if (childActive) return childActive;
      }
    }
    return null;
  };

  // Get all parent IDs for a given item
  const getParentPath = (items: NavigationItem[], targetId: string, path: string[] = []): string[] => {
    for (const item of items) {
      const currentPath = [...path, item.id];
      if (item.id === targetId) {
        return currentPath;
      }
      if (item.children) {
        const childPath = getParentPath(item.children, targetId, currentPath);
        if (childPath.length > 0) return childPath;
      }
    }
    return [];
  };

  // Update active item and expand parents when location changes
  useEffect(() => {
    const activeItem = findActiveItem(navigationItems, location.pathname);
    if (activeItem) {
      const parentPath = getParentPath(navigationItems, activeItem);
      const newExpandedItems = new Set(navigationState.expandedItems);
      
      // Expand all parents of active item
      parentPath.slice(0, -1).forEach(parentId => {
        newExpandedItems.add(parentId);
      });

      setNavigationState(prev => ({
        ...prev,
        activeItem,
        expandedItems: newExpandedItems
      }));
    }
  }, [location.pathname, navigationItems]);

  // Toggle expand/collapse of navigation item
  const toggleExpanded = (itemId: string) => {
    setNavigationState(prev => {
      const newExpandedItems = new Set(prev.expandedItems);
      if (newExpandedItems.has(itemId)) {
        newExpandedItems.delete(itemId);
      } else {
        newExpandedItems.add(itemId);
      }
      return {
        ...prev,
        expandedItems: newExpandedItems
      };
    });
  };

  // Toggle sidebar collapse
  const toggleCollapsed = () => {
    setNavigationState(prev => ({
      ...prev,
      isCollapsed: !prev.isCollapsed
    }));
  };

  // Check if item is expanded
  const isExpanded = (itemId: string) => {
    return navigationState.expandedItems.has(itemId);
  };

  // Check if item is active
  const isActive = (itemId: string) => {
    return navigationState.activeItem === itemId;
  };

  // Get breadcrumb path for current active item
  const getBreadcrumb = () => {
    if (!navigationState.activeItem) return [];
    return getParentPath(navigationItems, navigationState.activeItem);
  };

  return {
    navigationItems,
    navigationState,
    currentUser,
    toggleExpanded,
    toggleCollapsed,
    isExpanded,
    isActive,
    getBreadcrumb,
    // Admin functions (for permission management)
    permissionMatrix: MOCK_PERMISSION_MATRIX,
    allNavigationItems: NAVIGATION_SCHEMA
  };
};

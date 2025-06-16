
import React, { createContext, useContext } from 'react';
import { useNavigation } from '@/hooks/useNavigation';

interface NavigationContextType {
  navigationItems: any[];
  navigationState: any;
  currentUser: any;
  toggleExpanded: (itemId: string) => void;
  toggleCollapsed: () => void;
  isExpanded: (itemId: string) => boolean;
  isActive: (itemId: string) => boolean;
  getBreadcrumb: () => string[];
  permissionMatrix: any;
  allNavigationItems: any[];
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigationData = useNavigation();

  return (
    <NavigationContext.Provider value={navigationData}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigationContext = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigationContext must be used within a NavigationProvider');
  }
  return context;
};

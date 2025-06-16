
import React from 'react';
import { NavigationProvider } from '../navigation/NavigationProvider';
import { EnterpriseNavigation } from '../navigation/EnterpriseNavigation';

interface HorizontalLayoutProps {
  children: React.ReactNode;
}

export function HorizontalLayout({ children }: HorizontalLayoutProps) {
  return (
    <NavigationProvider>
      <div className="flex min-h-screen w-full bg-gray-50">
        <EnterpriseNavigation />
        <main className="flex-1 overflow-hidden">
          <div className="h-full p-6">
            {children}
          </div>
        </main>
      </div>
    </NavigationProvider>
  );
}

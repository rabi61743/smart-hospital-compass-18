
import React from 'react';
import { HorizontalNavbar } from '../navigation/HorizontalNavbar';

interface HorizontalLayoutProps {
  children: React.ReactNode;
}

export function HorizontalLayout({ children }: HorizontalLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <HorizontalNavbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
    </div>
  );
}

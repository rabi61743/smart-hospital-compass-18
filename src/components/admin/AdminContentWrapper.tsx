
import React from 'react';
import { ContentSection } from "@/components/layout/ContentSection";

interface AdminContentWrapperProps {
  currentUserRole: string;
  activeTab: string;
  navigationItems: Array<{ id: string; label: string; }>;
  children: React.ReactNode;
}

const AdminContentWrapper = ({ 
  currentUserRole, 
  activeTab, 
  navigationItems, 
  children 
}: AdminContentWrapperProps) => {
  return (
    <div className="flex-1 overflow-auto bg-gradient-to-br from-gray-50 to-gray-100/50">
      <div className="p-4 lg:p-6 xl:p-8">
        {/* Content container with enhanced styling */}
        <div className="max-w-full">
          <ContentSection 
            variant="transparent" 
            className="w-full"
          >
            {/* Main content card with enhanced styling */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200/60 overflow-hidden backdrop-blur-sm">
              {/* Content header with subtle gradient */}
              <div className="bg-gradient-to-r from-white to-gray-50/30 border-b border-gray-100 px-4 lg:px-6 xl:px-8 py-4 lg:py-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {navigationItems.find(item => item.id === activeTab)?.label || "Overview"}
                      </h3>
                      <p className="text-sm text-gray-500 mt-0.5">
                        {currentUserRole === "super-admin" ? "System Administration" : "Department Management"}
                      </p>
                    </div>
                  </div>
                  
                  {/* Status indicator */}
                  <div className="flex items-center space-x-2 px-3 py-1.5 bg-green-50 rounded-full border border-green-200">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-medium text-green-700">Live</span>
                  </div>
                </div>
              </div>
              
              {/* Content body with responsive padding */}
              <div className="p-4 lg:p-6 xl:p-8">
                {children}
              </div>
            </div>
          </ContentSection>
        </div>
      </div>
    </div>
  );
};

export default AdminContentWrapper;

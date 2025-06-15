
import React from 'react';
import { Shield, Users, Settings, Database, Activity, AlertTriangle } from "lucide-react";

interface AdminSidebarProps {
  currentUserRole: string;
  departmentAccess: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  setCurrentUserRole: (role: string) => void;
}

const AdminSidebar = ({ 
  currentUserRole, 
  departmentAccess, 
  activeTab, 
  setActiveTab, 
  setCurrentUserRole 
}: AdminSidebarProps) => {
  // Define navigation items with access control
  const allNavigationItems = [
    { id: "overview", label: "Overview", icon: Activity, requiredRole: ["super-admin", "department-admin"] },
    { id: "users", label: "Users", icon: Users, requiredRole: ["super-admin", "department-admin"] },
    { id: "roles", label: "Roles", icon: Shield, requiredRole: ["super-admin"] },
    { id: "rbac", label: "RBAC", icon: Shield, requiredRole: ["super-admin", "department-admin"] },
    { id: "department-admin", label: "Dept Admin", icon: Shield, requiredRole: ["super-admin", "department-admin"] },
    { id: "module-admin", label: "Module Admin", icon: Database, requiredRole: ["super-admin", "department-admin"] },
    { id: "modules", label: "Modules", icon: Database, requiredRole: ["super-admin"] },
    { id: "configuration", label: "Config", icon: Settings, requiredRole: ["super-admin"] },
    { id: "monitoring", label: "Monitor", icon: Activity, requiredRole: ["super-admin"] },
    { id: "security", label: "Security", icon: Shield, requiredRole: ["super-admin"] },
    { id: "compliance", label: "Compliance", icon: AlertTriangle, requiredRole: ["super-admin", "department-admin"] },
    { id: "settings", label: "Settings", icon: Settings, requiredRole: ["super-admin"] }
  ];

  // Filter navigation items based on user role
  const navigationItems = allNavigationItems.filter(item => 
    item.requiredRole.includes(currentUserRole)
  );

  return (
    <div className="w-72 bg-white border-r border-gray-200 shadow-xl relative">
      {/* Header with gradient */}
      <div className="p-6 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold">
              {currentUserRole === "super-admin" ? "Super Admin" : "Department Admin"}
            </h3>
            <p className="text-blue-100 text-sm">
              {currentUserRole === "super-admin" ? "System Control Center" : `${departmentAccess.join(", ").toUpperCase()} Access`}
            </p>
          </div>
        </div>
        
        {/* Role Switcher for Demo */}
        <div className="mt-4 pt-4 border-t border-blue-300/30">
          <div className="text-xs text-blue-100 mb-2">Demo: Switch Role</div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentUserRole("super-admin")}
              className={`px-3 py-1 rounded text-xs ${
                currentUserRole === "super-admin" 
                  ? "bg-white text-blue-700" 
                  : "bg-blue-500/50 text-white"
              }`}
            >
              Super Admin
            </button>
            <button
              onClick={() => setCurrentUserRole("department-admin")}
              className={`px-3 py-1 rounded text-xs ${
                currentUserRole === "department-admin" 
                  ? "bg-white text-blue-700" 
                  : "bg-blue-500/50 text-white"
              }`}
            >
              Dept Admin
            </button>
          </div>
        </div>
      </div>

      {/* Navigation with enhanced styling */}
      <nav className="p-4 space-y-2 pb-32">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-3">
          Navigation
        </div>
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-blue-50 text-blue-700 shadow-md border border-blue-100'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm'
              }`}
            >
              <div className={`p-2 rounded-lg mr-3 transition-colors ${
                isActive 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
              }`}>
                <Icon className="h-4 w-4" />
              </div>
              <span className="font-medium">{item.label}</span>
              {isActive && (
                <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full"></div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Enhanced Footer section */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-gray-100 to-gray-50 border-t border-gray-200">
        <div className="space-y-3">
          {/* System Status */}
          <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">System Online</span>
            </div>
            <div className="text-xs text-gray-500 bg-green-50 px-2 py-1 rounded-full">
              99.9%
            </div>
          </div>
          
          {/* Version and Quick Stats */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">MediFlow Admin</span>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                v2.1
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <Activity className="h-3 w-3" />
                <span>15 Active</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="h-3 w-3" />
                <span>1,247 Users</span>
              </div>
            </div>
          </div>
          
          {/* Support Link */}
          <div className="text-center">
            <button className="text-xs text-gray-500 hover:text-blue-600 transition-colors">
              Need Help? Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;

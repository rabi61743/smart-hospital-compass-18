
import React from 'react';
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContentSection } from "@/components/layout/ContentSection";
import { Shield, Users, Settings, Database, Activity, AlertTriangle } from "lucide-react";
import AdminOverviewTab from "@/components/admin/AdminOverviewTab";
import UserManagementTab from "@/components/admin/UserManagementTab";
import SystemConfigurationTab from "@/components/admin/SystemConfigurationTab";
import ModuleManagementTab from "@/components/admin/ModuleManagementTab";
import SecurityAuditTab from "@/components/admin/SecurityAuditTab";
import SystemMonitoringTab from "@/components/admin/SystemMonitoringTab";
import RolePermissionTab from "@/components/admin/RolePermissionTab";
import GlobalSettingsTab from "@/components/admin/GlobalSettingsTab";
import ComplianceManagementTab from "@/components/admin/ComplianceManagementTab";
import DepartmentAdminTab from "@/components/admin/DepartmentAdminTab";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = React.useState("overview");

  // Simulate current user role - in real app this would come from authentication
  const [currentUserRole, setCurrentUserRole] = React.useState("super-admin"); // or "department-admin"
  const [departmentAccess, setDepartmentAccess] = React.useState(["finance", "hr"]); // for department admins

  const headerStats = [
    { label: "Total Users", value: "1,247", change: "+12 this week", icon: <Users className="h-5 w-5" /> },
    { label: "Active Modules", value: "15/18", change: "3 modules disabled", icon: <Database className="h-5 w-5" /> },
    { label: "System Health", value: "98.5%", change: "Excellent", icon: <Activity className="h-5 w-5" /> },
    { label: "Security Alerts", value: "3", change: "2 resolved today", icon: <AlertTriangle className="h-5 w-5" /> }
  ];

  // Define navigation items with access control
  const allNavigationItems = [
    { id: "overview", label: "Overview", icon: Activity, requiredRole: ["super-admin", "department-admin"] },
    { id: "users", label: "Users", icon: Users, requiredRole: ["super-admin", "department-admin"] },
    { id: "roles", label: "Roles", icon: Shield, requiredRole: ["super-admin"] },
    { id: "department-admin", label: "Dept Admin", icon: Shield, requiredRole: ["super-admin", "department-admin"] },
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

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <AdminOverviewTab />;
      case "users":
        return <UserManagementTab />;
      case "roles":
        return <RolePermissionTab />;
      case "department-admin":
        return <DepartmentAdminTab currentUserRole={currentUserRole} departmentAccess={departmentAccess} />;
      case "modules":
        return <ModuleManagementTab />;
      case "configuration":
        return <SystemConfigurationTab />;
      case "monitoring":
        return <SystemMonitoringTab />;
      case "security":
        return <SecurityAuditTab />;
      case "compliance":
        return <ComplianceManagementTab />;
      case "settings":
        return <GlobalSettingsTab />;
      default:
        return <AdminOverviewTab />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Enhanced Left Vertical Navigation */}
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

      {/* Enhanced Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Enhanced Header */}
        <div className="bg-white border-b border-gray-200 shadow-sm">
          <div className="px-8 py-6">
            <PageHeader
              title={currentUserRole === "super-admin" ? "Super Admin Portal" : "Department Admin Portal"}
              description={currentUserRole === "super-admin" 
                ? "Complete system administration and control center"
                : `Department administration for ${departmentAccess.join(", ").toUpperCase()} modules`
              }
              badge={currentUserRole === "super-admin" ? "Super Admin" : "Department Admin"}
              badgeVariant={currentUserRole === "super-admin" ? "destructive" : "secondary"}
              breadcrumbs={[
                { label: "Dashboard", href: "/dashboard" },
                { label: currentUserRole === "super-admin" ? "Admin Portal" : "Department Admin" }
              ]}
              stats={headerStats}
              actions={
                <div className="flex items-center space-x-3">
                  <Button variant="outline" size="sm" className="shadow-sm">
                    <Shield className="h-4 w-4 mr-2" />
                    Security Center
                  </Button>
                  {currentUserRole === "super-admin" && (
                    <Button size="sm" className="shadow-sm bg-blue-600 hover:bg-blue-700">
                      <Settings className="h-4 w-4 mr-2" />
                      Global Settings
                    </Button>
                  )}
                </div>
              }
            />
          </div>
        </div>

        {/* Enhanced Content Area with improved layout */}
        <div className="flex-1 overflow-auto bg-gradient-to-br from-gray-50 to-gray-100/50">
          <div className="p-8 max-w-[1600px] mx-auto">
            {/* Content container with enhanced styling */}
            <div className="min-h-full">
              <ContentSection 
                variant="transparent" 
                className="w-full"
              >
                {/* Main content card with enhanced styling */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200/60 overflow-hidden backdrop-blur-sm">
                  {/* Content header with subtle gradient */}
                  <div className="bg-gradient-to-r from-white to-gray-50/30 border-b border-gray-100 px-8 py-6">
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
                  
                  {/* Content body with enhanced padding */}
                  <div className="p-8">
                    {renderContent()}
                  </div>
                </div>
              </ContentSection>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

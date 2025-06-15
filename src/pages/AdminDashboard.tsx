
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

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = React.useState("overview");

  const headerStats = [
    { label: "Total Users", value: "1,247", change: "+12 this week", icon: <Users className="h-5 w-5" /> },
    { label: "Active Modules", value: "15/18", change: "3 modules disabled", icon: <Database className="h-5 w-5" /> },
    { label: "System Health", value: "98.5%", change: "Excellent", icon: <Activity className="h-5 w-5" /> },
    { label: "Security Alerts", value: "3", change: "2 resolved today", icon: <AlertTriangle className="h-5 w-5" /> }
  ];

  const navigationItems = [
    { id: "overview", label: "Overview", icon: Activity },
    { id: "users", label: "Users", icon: Users },
    { id: "roles", label: "Roles", icon: Shield },
    { id: "modules", label: "Modules", icon: Database },
    { id: "configuration", label: "Config", icon: Settings },
    { id: "monitoring", label: "Monitor", icon: Activity },
    { id: "security", label: "Security", icon: Shield },
    { id: "compliance", label: "Compliance", icon: AlertTriangle },
    { id: "settings", label: "Settings", icon: Settings }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <AdminOverviewTab />;
      case "users":
        return <UserManagementTab />;
      case "roles":
        return <RolePermissionTab />;
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
      <div className="w-72 bg-white border-r border-gray-200 shadow-xl">
        {/* Header with gradient */}
        <div className="p-6 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Admin Portal</h3>
              <p className="text-blue-100 text-sm">System Control Center</p>
            </div>
          </div>
        </div>

        {/* Navigation with enhanced styling */}
        <nav className="p-4 space-y-2">
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

        {/* Footer section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 bg-gray-50/50">
          <div className="text-xs text-gray-500 text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>System Online</span>
            </div>
            <div>MediFlow Admin v2.1</div>
          </div>
        </div>
      </div>

      {/* Enhanced Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Enhanced Header */}
        <div className="bg-white border-b border-gray-200 shadow-sm">
          <div className="px-8 py-6">
            <PageHeader
              title="Super Admin Portal"
              description="Complete system administration and control center"
              badge="Super Admin"
              badgeVariant="destructive"
              breadcrumbs={[
                { label: "Dashboard", href: "/dashboard" },
                { label: "Admin Portal" }
              ]}
              stats={headerStats}
              actions={
                <div className="flex items-center space-x-3">
                  <Button variant="outline" size="sm" className="shadow-sm">
                    <Shield className="h-4 w-4 mr-2" />
                    Security Center
                  </Button>
                  <Button size="sm" className="shadow-sm bg-blue-600 hover:bg-blue-700">
                    <Settings className="h-4 w-4 mr-2" />
                    Global Settings
                  </Button>
                </div>
              }
            />
          </div>
        </div>

        {/* Enhanced Content Area */}
        <div className="flex-1 overflow-auto bg-gray-50">
          <div className="p-8">
            <ContentSection variant="transparent" className="max-w-7xl mx-auto">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                {renderContent()}
              </div>
            </ContentSection>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

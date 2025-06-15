
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
    <div className="flex h-screen">
      {/* Left Vertical Navigation */}
      <div className="w-64 bg-white border-r border-gray-200 shadow-lg">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
            Admin Tools
          </h3>
        </div>
        <nav className="p-2">
          <div className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-3" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="space-y-6 p-6">
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
              <>
                <Button variant="outline" size="sm">
                  <Shield className="h-4 w-4 mr-2" />
                  Security Center
                </Button>
                <Button size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Global Settings
                </Button>
              </>
            }
          />
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          <ContentSection variant="transparent" className="p-6">
            {renderContent()}
          </ContentSection>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;


import React from 'react';
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminContentWrapper from "@/components/admin/AdminContentWrapper";
import { Activity, Users, Shield, Database, Settings, AlertTriangle } from "lucide-react";
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
      <AdminSidebar
        currentUserRole={currentUserRole}
        departmentAccess={departmentAccess}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setCurrentUserRole={setCurrentUserRole}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader
          currentUserRole={currentUserRole}
          departmentAccess={departmentAccess}
        />

        <AdminContentWrapper
          currentUserRole={currentUserRole}
          activeTab={activeTab}
          navigationItems={navigationItems}
        >
          {renderContent()}
        </AdminContentWrapper>
      </div>
    </div>
  );
};

export default AdminDashboard;

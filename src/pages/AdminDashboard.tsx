
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
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
  const headerStats = [
    { label: "Total Users", value: "1,247", change: "+12 this week", icon: <Users className="h-5 w-5" /> },
    { label: "Active Modules", value: "15/18", change: "3 modules disabled", icon: <Database className="h-5 w-5" /> },
    { label: "System Health", value: "98.5%", change: "Excellent", icon: <Activity className="h-5 w-5" /> },
    { label: "Security Alerts", value: "3", change: "2 resolved today", icon: <AlertTriangle className="h-5 w-5" /> }
  ];

  return (
    <div className="space-y-6">
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

      <ContentSection variant="transparent">
        <Tabs defaultValue="overview" className="space-y-6">
          <ScrollArea className="w-full whitespace-nowrap">
            <TabsList className="inline-flex w-max min-w-full bg-white border rounded-lg p-1">
              <TabsTrigger value="overview" className="data-[state=active]:bg-red-50 data-[state=active]:text-red-700">System Overview</TabsTrigger>
              <TabsTrigger value="users" className="data-[state=active]:bg-red-50 data-[state=active]:text-red-700">User Management</TabsTrigger>
              <TabsTrigger value="roles" className="data-[state=active]:bg-red-50 data-[state=active]:text-red-700">Roles & Permissions</TabsTrigger>
              <TabsTrigger value="modules" className="data-[state=active]:bg-red-50 data-[state=active]:text-red-700">Module Management</TabsTrigger>
              <TabsTrigger value="configuration" className="data-[state=active]:bg-red-50 data-[state=active]:text-red-700">System Configuration</TabsTrigger>
              <TabsTrigger value="monitoring" className="data-[state=active]:bg-red-50 data-[state=active]:text-red-700">System Monitoring</TabsTrigger>
              <TabsTrigger value="security" className="data-[state=active]:bg-red-50 data-[state=active]:text-red-700">Security & Audit</TabsTrigger>
              <TabsTrigger value="compliance" className="data-[state=active]:bg-red-50 data-[state=active]:text-red-700">Compliance</TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-red-50 data-[state=active]:text-red-700">Global Settings</TabsTrigger>
            </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>

          <TabsContent value="overview">
            <AdminOverviewTab />
          </TabsContent>

          <TabsContent value="users">
            <UserManagementTab />
          </TabsContent>

          <TabsContent value="roles">
            <RolePermissionTab />
          </TabsContent>

          <TabsContent value="modules">
            <ModuleManagementTab />
          </TabsContent>

          <TabsContent value="configuration">
            <SystemConfigurationTab />
          </TabsContent>

          <TabsContent value="monitoring">
            <SystemMonitoringTab />
          </TabsContent>

          <TabsContent value="security">
            <SecurityAuditTab />
          </TabsContent>

          <TabsContent value="compliance">
            <ComplianceManagementTab />
          </TabsContent>

          <TabsContent value="settings">
            <GlobalSettingsTab />
          </TabsContent>
        </Tabs>
      </ContentSection>
    </div>
  );
};

export default AdminDashboard;

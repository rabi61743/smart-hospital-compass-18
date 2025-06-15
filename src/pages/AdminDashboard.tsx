
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
          {/* Arc Browser Style Navigation */}
          <div className="flex items-center justify-center w-full">
            <TabsList className="inline-flex h-12 items-center justify-center rounded-full bg-gray-100/80 backdrop-blur-sm p-1 text-muted-foreground border border-gray-200/50 shadow-sm">
              <TabsTrigger 
                value="overview" 
                className="inline-flex items-center justify-center whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-sm h-9"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="users" 
                className="inline-flex items-center justify-center whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-sm h-9"
              >
                Users
              </TabsTrigger>
              <TabsTrigger 
                value="roles" 
                className="inline-flex items-center justify-center whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-sm h-9"
              >
                Roles
              </TabsTrigger>
              <TabsTrigger 
                value="modules" 
                className="inline-flex items-center justify-center whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-sm h-9"
              >
                Modules
              </TabsTrigger>
              <TabsTrigger 
                value="configuration" 
                className="inline-flex items-center justify-center whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-sm h-9"
              >
                Config
              </TabsTrigger>
              <TabsTrigger 
                value="monitoring" 
                className="inline-flex items-center justify-center whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-sm h-9"
              >
                Monitor
              </TabsTrigger>
              <TabsTrigger 
                value="security" 
                className="inline-flex items-center justify-center whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-sm h-9"
              >
                Security
              </TabsTrigger>
              <TabsTrigger 
                value="compliance" 
                className="inline-flex items-center justify-center whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-sm h-9"
              >
                Compliance
              </TabsTrigger>
              <TabsTrigger 
                value="settings" 
                className="inline-flex items-center justify-center whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-sm h-9"
              >
                Settings
              </TabsTrigger>
            </TabsList>
          </div>

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

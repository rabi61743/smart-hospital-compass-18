
import React from 'react';
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/PageHeader";
import { Shield, Users, Settings, Database, Activity, AlertTriangle } from "lucide-react";

interface AdminHeaderProps {
  currentUserRole: string;
  departmentAccess: string[];
}

const AdminHeader = ({ currentUserRole, departmentAccess }: AdminHeaderProps) => {
  const headerStats = [
    { label: "Total Users", value: "1,247", change: "+12 this week", icon: <Users className="h-5 w-5" /> },
    { label: "Active Modules", value: "15/18", change: "3 modules disabled", icon: <Database className="h-5 w-5" /> },
    { label: "System Health", value: "98.5%", change: "Excellent", icon: <Activity className="h-5 w-5" /> },
    { label: "Security Alerts", value: "3", change: "2 resolved today", icon: <AlertTriangle className="h-5 w-5" /> }
  ];

  return (
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
  );
};

export default AdminHeader;

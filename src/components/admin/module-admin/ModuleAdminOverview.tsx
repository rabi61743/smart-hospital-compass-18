
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCheck, Database, Shield, AlertTriangle } from "lucide-react";

interface ModuleAdminOverviewProps {
  moduleAdminsCount: number;
  currentDepartmentModulesCount: number;
  permissionTypesCount: number;
  criticalModulesCount: number;
}

const ModuleAdminOverview = ({
  moduleAdminsCount,
  currentDepartmentModulesCount,
  permissionTypesCount,
  criticalModulesCount
}: ModuleAdminOverviewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Module Admins</CardTitle>
          <UserCheck className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{moduleAdminsCount}</div>
          <p className="text-xs text-muted-foreground">Active administrators</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Managed Modules</CardTitle>
          <Database className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{currentDepartmentModulesCount}</div>
          <p className="text-xs text-muted-foreground">In selected department</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Permission Groups</CardTitle>
          <Shield className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{permissionTypesCount}</div>
          <p className="text-xs text-muted-foreground">Available permissions</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Critical Modules</CardTitle>
          <AlertTriangle className="h-4 w-4 text-orange-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{criticalModulesCount}</div>
          <p className="text-xs text-muted-foreground">Require special oversight</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModuleAdminOverview;

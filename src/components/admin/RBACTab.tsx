
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Users, Lock, Settings } from "lucide-react";
import RoleManagement from "./rbac/RoleManagement";
import PermissionManagement from "./rbac/PermissionManagement";
import UserRoleAssignment from "./rbac/UserRoleAssignment";
import RBACSettings from "./rbac/RBACSettings";

interface RBACTabProps {
  currentUserRole: string;
  departmentAccess: string[];
}

const RBACTab = ({ currentUserRole, departmentAccess }: RBACTabProps) => {
  return (
    <div className="space-y-6">
      {/* RBAC Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Role-Based Access Control (RBAC)
          </CardTitle>
          <CardDescription>
            Comprehensive role and permission management system for granular access control
          </CardDescription>
        </CardHeader>
      </Card>

      {/* RBAC Management Tabs */}
      <Tabs defaultValue="roles" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="roles" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Roles
          </TabsTrigger>
          <TabsTrigger value="permissions" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            Permissions
          </TabsTrigger>
          <TabsTrigger value="assignments" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            User Assignments
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="roles">
          <RoleManagement currentUserRole={currentUserRole} departmentAccess={departmentAccess} />
        </TabsContent>

        <TabsContent value="permissions">
          <PermissionManagement currentUserRole={currentUserRole} />
        </TabsContent>

        <TabsContent value="assignments">
          <UserRoleAssignment currentUserRole={currentUserRole} departmentAccess={departmentAccess} />
        </TabsContent>

        <TabsContent value="settings">
          <RBACSettings currentUserRole={currentUserRole} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RBACTab;

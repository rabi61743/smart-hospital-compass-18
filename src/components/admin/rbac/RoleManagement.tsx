
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Plus, Edit, Trash2, Users, Shield, AlertTriangle } from "lucide-react";

interface RoleManagementProps {
  currentUserRole: string;
  departmentAccess: string[];
}

const RoleManagement = ({ currentUserRole }: RoleManagementProps) => {
  const [isCreateRoleOpen, setIsCreateRoleOpen] = useState(false);

  const roles = [
    {
      id: 1,
      name: "Super Administrator",
      description: "Complete system access with all privileges",
      userCount: 2,
      isActive: true,
      isSystem: true,
      permissions: ["*"],
      level: "system"
    },
    {
      id: 2,
      name: "Department Administrator",
      description: "Administrative access within assigned departments",
      userCount: 8,
      isActive: true,
      isSystem: true,
      permissions: ["department.*", "users.view", "users.edit"],
      level: "department"
    },
    {
      id: 3,
      name: "Module Administrator",
      description: "Administrative access to specific modules",
      userCount: 15,
      isActive: true,
      isSystem: false,
      permissions: ["module.*", "users.view"],
      level: "module"
    },
    {
      id: 4,
      name: "Medical Staff",
      description: "Access to patient records and medical functions",
      userCount: 234,
      isActive: true,
      isSystem: false,
      permissions: ["patients.*", "medical.*", "appointments.*"],
      level: "operational"
    },
    {
      id: 5,
      name: "Finance Staff",
      description: "Access to financial and billing functions",
      userCount: 23,
      isActive: true,
      isSystem: false,
      permissions: ["billing.*", "finance.*", "reports.financial"],
      level: "operational"
    }
  ];

  const getRoleLevelColor = (level: string) => {
    switch (level) {
      case 'system': return 'bg-red-100 text-red-800';
      case 'department': return 'bg-blue-100 text-blue-800';
      case 'module': return 'bg-purple-100 text-purple-800';
      case 'operational': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Role Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Roles</CardTitle>
            <Shield className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{roles.length}</div>
            <p className="text-xs text-muted-foreground">Active roles</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Roles</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{roles.filter(r => r.isSystem).length}</div>
            <p className="text-xs text-muted-foreground">Protected roles</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Custom Roles</CardTitle>
            <Plus className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{roles.filter(r => !r.isSystem).length}</div>
            <p className="text-xs text-muted-foreground">User created</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{roles.reduce((sum, role) => sum + role.userCount, 0)}</div>
            <p className="text-xs text-muted-foreground">With role assignments</p>
          </CardContent>
        </Card>
      </div>

      {/* Role Management */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Role Management</CardTitle>
              <CardDescription>
                Create, edit, and manage user roles with specific permissions
              </CardDescription>
            </div>
            {currentUserRole === "super-admin" && (
              <Dialog open={isCreateRoleOpen} onOpenChange={setIsCreateRoleOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Role
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Create New Role</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="roleName">Role Name</Label>
                      <Input id="roleName" placeholder="Enter role name" />
                    </div>
                    <div>
                      <Label htmlFor="roleDescription">Description</Label>
                      <Textarea id="roleDescription" placeholder="Role description" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="roleActive" />
                      <Label htmlFor="roleActive">Active Role</Label>
                    </div>
                    <div className="flex gap-2 pt-4">
                      <Button className="flex-1">Create Role</Button>
                      <Button variant="outline" onClick={() => setIsCreateRoleOpen(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {roles.map((role) => (
              <div key={role.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold">{role.name}</h3>
                      <Badge className={getRoleLevelColor(role.level)}>
                        {role.level}
                      </Badge>
                      {role.isSystem && (
                        <Badge variant="outline" className="text-xs">
                          System Role
                        </Badge>
                      )}
                      <Badge className={role.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {role.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">{role.description}</p>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{role.userCount} users</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Shield className="h-4 w-4 text-muted-foreground" />
                        <span>{role.permissions.length} permissions</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    {!role.isSystem && currentUserRole === "super-admin" && (
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoleManagement;
